import content from '../../public/_headers?raw';

interface HeaderRule {
  pattern: string;
  headers: Record<string, string>;
  detachedHeaders: string[];
}

let cachedRules: HeaderRule[] | null = null;

/**
 * Parse the _headers file and return an array of header rules
 */
function parseHeadersFile(): HeaderRule[] {
  if (cachedRules) {
    return cachedRules;
  }

  try {
    const lines = content.split('\n');

    const rules: HeaderRule[] = [];
    let currentRule: HeaderRule | null = null;

    for (const line of lines) {
      // Remove comments and trim whitespace
      const cleanLine = line.split('#')[0].trim();
      if (!cleanLine) continue;

      // Check if this is a URL pattern (not indented)
      if (!line.startsWith(' ') && !line.startsWith('\t')) {
        // Save previous rule if exists
        if (currentRule) {
          rules.push(currentRule);
        }

        // Start new rule
        currentRule = {
          pattern: cleanLine,
          headers: {},
          detachedHeaders: [],
        };
      } else if (currentRule && cleanLine.includes(':')) {
        // This is a header line (indented)
        const colonIndex = cleanLine.indexOf(':');
        let headerName = cleanLine.substring(0, colonIndex).trim();
        const headerValue = cleanLine.substring(colonIndex + 1).trim();

        // Check if this is a detached header (starts with !)
        if (headerName.startsWith('!')) {
          headerName = headerName.substring(1).trim();
          currentRule.detachedHeaders.push(headerName);
        } else {
          currentRule.headers[headerName] = headerValue;
        }
      }
    }

    // Don't forget the last rule
    if (currentRule) {
      rules.push(currentRule);
    }

    cachedRules = rules;
    return rules;
  } catch (error) {
    console.warn('Could not parse _headers file:', error);
    return [];
  }
}

/**
 * Check if a URL matches a pattern from the _headers file
 * Supports splats (*) and placeholders (:name)
 */
function matchesPattern(
  url: string,
  pattern: string,
): { matches: boolean; captures: Record<string, string> } {
  const captures: Record<string, string> = {};

  // Handle absolute URLs in patterns
  if (pattern.startsWith('https://')) {
    const patternUrl = new URL(pattern);
    const requestUrl = new URL(url, 'https://example.com');

    // Check if hostname matches (with placeholder support)
    const hostnameMatches = matchSegment(
      requestUrl.hostname,
      patternUrl.hostname,
      captures,
    );
    if (!hostnameMatches) {
      return { matches: false, captures: {} };
    }

    // Check if pathname matches
    const pathnameMatches = matchSegment(
      requestUrl.pathname,
      patternUrl.pathname,
      captures,
    );
    return { matches: pathnameMatches, captures };
  }

  // For relative patterns, just match the pathname
  const pathname = url.startsWith('/')
    ? url
    : new URL(url, 'https://example.com').pathname;
  const matches = matchSegment(pathname, pattern, captures);

  return { matches, captures };
}

/**
 * Match a single segment (hostname or pathname) against a pattern
 */
function matchSegment(
  segment: string,
  pattern: string,
  captures: Record<string, string>,
): boolean {
  // Convert pattern to regex
  const regexPattern = pattern
    // Escape special regex characters except * and :
    .replace(/[.+?^${}()|[\]\\]/g, '\\$&')
    // Handle splats (*)
    .replace(/\*/g, '(.*)')
    // Handle placeholders (:name)
    .replace(/:([a-zA-Z]\w*)/g, '([^/.]+)');

  const regex = new RegExp(`^${regexPattern}$`);
  const match = segment.match(regex);

  if (!match) {
    return false;
  }

  // Extract captures for splats and placeholders
  let captureIndex = 1;

  // Handle splats
  const splatMatches = pattern.match(/\*/g);
  if (splatMatches) {
    captures.splat = match[captureIndex++] || '';
  }

  // Handle placeholders
  const placeholderMatches = pattern.match(/:([a-zA-Z]\w*)/g);
  if (placeholderMatches) {
    for (const placeholder of placeholderMatches) {
      const name = placeholder.substring(1); // Remove the :
      captures[name] = match[captureIndex++] || '';
    }
  }

  return true;
}

/**
 * Apply header rules to a response based on the request URL
 */
export function applyHeaderRules(url: string, response: Response): void {
  const rules = parseHeadersFile();

  for (const rule of rules) {
    const { matches, captures } = matchesPattern(url, rule.pattern);

    if (matches) {
      // Apply headers with placeholder substitution
      for (const [name, value] of Object.entries(rule.headers)) {
        let finalValue = value;

        // Replace placeholders in header values
        for (const [captureName, captureValue] of Object.entries(captures)) {
          finalValue = finalValue.replace(`:${captureName}`, captureValue);
        }

        // If header already exists, combine values with comma
        const existingValue = response.headers.get(name);
        if (existingValue) {
          response.headers.set(name, `${existingValue}, ${finalValue}`);
        } else {
          response.headers.set(name, finalValue);
        }
      }

      // Remove detached headers
      for (const headerName of rule.detachedHeaders) {
        response.headers.delete(headerName);
      }
    }
  }
}
