import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { Auth0Provider } from "@auth0/auth0-react";
import App from "./pages";
import theme from "./config/theme";
import "./config/icons";

const AuthWrapper: React.FC<Record<string, any>> = ({ children }) => {
  const navigate = useNavigate();
  const onRedirectCallback = (appState: any) => {
    navigate(
      appState && appState.returnTo
        ? appState.returnTo
        : window.location.pathname
    );
  };
  return (
    <Auth0Provider
      domain={process.env.REACT_APP_AUTH0_DOMAIN || ""}
      clientId={process.env.REACT_APP_AUTH0_CLIENT_ID || ""}
      audience={process.env.REACT_APP_AUTH0_AUDIENCE || ""}
      redirectUri={window.location.origin}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
};

const Main: React.FC<Record<string, any>> = () => {
  return (
    <Router>
      <ChakraProvider theme={theme}>
        <AuthWrapper>
          <App />
        </AuthWrapper>
      </ChakraProvider>
    </Router>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>,
  document.getElementById("root")
);
