import React from "react";
import { createRoot } from "react-dom/client";
//import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./assets/sass/styles.scss";
import { PublicClientApplication, EventType } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import { msalConfig } from "./utils/auth";

const root = createRoot(document.getElementById("root"));
const msalInstance = new PublicClientApplication(msalConfig);
msalInstance.addEventCallback((event) => {
	if (event.eventType === EventType.LOGIN_SUCCESS) {
		msalInstance.setActiveAccount(event.payload.account);
	}
});

root.render(
	<MsalProvider instance={msalInstance}>
		<React.StrictMode>
			<App />
		</React.StrictMode>
	</MsalProvider>
);

reportWebVitals();
