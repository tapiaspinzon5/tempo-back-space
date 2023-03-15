export const msalConfig = {
	auth: {
		redirectUri: "/",
		clientId: "e9c17bad-826c-4d45-a4fe-1c1c7ccce9e5",
		authority:
			"https://login.microsoftonline.com/638fcbaf-ba4c-43e1-adae-5475c970fe10",
	},
	cache: {
		cacheLocation: "memoryStorage", // This configures where your cache will be stored
		storeAuthStateInCookie: true, // Set this to "true" if you are having issues on IE11 or Edge
		secureCoookies: true,
	},
};
