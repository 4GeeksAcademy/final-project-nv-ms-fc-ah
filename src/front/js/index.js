// Import React into the bundle
import React from "react";
import ReactDOM from "react-dom";
import { GoogleOAuthProvider } from '@react-oauth/google';

// Include your index.css file into the bundle
import "../styles/index.css";

// Import your own components
import Layout from "./layout";

// Render your React application
ReactDOM.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
      <Layout />
    </GoogleOAuthProvider>
  </React.StrictMode>,
  document.querySelector("#app")
);