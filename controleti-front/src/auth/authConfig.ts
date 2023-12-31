import { Configuration, LogLevel } from "@azure/msal-browser";
// Browser check variables
// If you support IE, our recommendation is that you sign-in using Redirect APIs
// If you as a developer are testing using Edge InPrivate mode, please add "isEdge" to the if check
const ua = window.navigator.userAgent;
const msie = ua.indexOf("MSIE ");
const msie11 = ua.indexOf("Trident/");
const msedge = ua.indexOf("Edge/");
const firefox = ua.indexOf("Firefox");
const isIE = msie > 0 || msie11 > 0;
const isEdge = msedge > 0;
const isFirefox = firefox > 0; // Only needed if you need to support the redirect flow in Firefox incognito

// Config object to be passed to Msal on creation
export const msalConfig: Configuration = {
    auth: {
        clientId: "181e3784-3727-407b-8e44-84f357dce946",
        authority: "https://login.microsoftonline.com/ab63d1d1-ce44-48bc-bf4a-e1d31dc43b14",
        redirectUri: process.env.REACT_APP_URL,
        postLogoutRedirectUri: process.env.REACT_APP_URL
    },
    cache: {
        cacheLocation: "localStorage",
        storeAuthStateInCookie: isIE || isEdge || isFirefox
    }
};

// Add here scopes for id token to be used at MS Identity Platform endpoints.
export const loginRequest = {
    scopes: ["api://181e3784-3727-407b-8e44-84f357dce946/access.users"]
};