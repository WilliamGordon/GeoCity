import ReactDOM from "react-dom";
import { Auth0Provider } from "@auth0/auth0-react";
import { getConfig } from "./auth/config";
import { BrowserRouter } from "react-router-dom";
import history from "./auth/history";
import App from "./App";
import "./index.css";

const onRedirectCallback = (appState) => {
  history.push(
    appState && appState.returnTo ? appState.returnTo : window.location.pathname
  );
};

const config = getConfig();

const providerConfig = {
  domain: config.domain,
  clientId: config.clientId,
  ...(config.audience ? { audience: config.audience } : null),
  redirectUri: window.location.origin,
  onRedirectCallback,
};

ReactDOM.render(
  <BrowserRouter>
    <Auth0Provider {...providerConfig}>
      <App />
    </Auth0Provider>
  </BrowserRouter>,
  document.getElementById("root")
);
