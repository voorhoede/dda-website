import { useState, useEffect } from 'react';

export const useUrl = (initialUrl: string) => {
  const [url, setUrl] = useState(initialUrl);

  useEffect(() => {
    const handleUrlChange = () => {
      setUrl(window.location.href);
    };

    window.addEventListener('popstate', handleUrlChange);
    window.addEventListener('pushstate', handleUrlChange);
    window.addEventListener('replacestate', handleUrlChange);

    return () => {
      window.removeEventListener('popstate', handleUrlChange);
      window.removeEventListener('pushstate', handleUrlChange);
      window.removeEventListener('replacestate', handleUrlChange);
    };
  }, []);

  return url;
};
