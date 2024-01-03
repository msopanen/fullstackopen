import { defineConfig } from "cypress";

/*eslint no-unused-vars: "off"*/
export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: "http://localhost:5173",
  },
  env: {
    BACKEND: "http://localhost:3001/api",
    USER_VAULT: "fi.fullstackopen.user",
  },
});
