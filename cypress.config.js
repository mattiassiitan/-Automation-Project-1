const {defineConfig} = require("cypress");

module.exports = defineConfig({
    pageLoadTimeout: 20000,
    chromeWebSecurity: false,

    env: {
        firstCookieValue: "firstValue",
    },

    e2e: {
        setupNodeEvents(on, config) {
            return config;
        }
    },
});
