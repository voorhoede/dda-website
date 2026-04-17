type Runtime = import('@astrojs/cloudflare').Runtime<Env>;

declare namespace App {
  interface Locals extends Runtime {
    datocmsEnvironment: string;
    datocmsToken: string;
    isPreview: boolean;
    isPreviewAuthOk: boolean;
    previewSecret: string;
  }
}

declare module '*.query.graphql' {
  import { DocumentNode } from 'graphql';
  const value: DocumentNode;
  export = value;
}

interface Window {
  turnstile: {
    render: (element: HTMLElement, options: { sitekey: string; theme?: string }) => string;
    remove: (widgetId: string) => void;
  };
}
