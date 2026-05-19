/// <reference types="vite/client" />

declare interface ImportMetaEnv {
  readonly VITE_STRIPE_PUBLISHABLE_KEY: string;
}

declare interface ImportMeta {
  readonly env: ImportMetaEnv;
}
