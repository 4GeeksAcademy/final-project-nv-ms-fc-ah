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
    <GoogleOAuthProvider clientId="653613152975-b4ccn14o78vpr1orsnspde7llqtc3pbg.apps.googleusercontent.com">
      <Layout />
    </GoogleOAuthProvider>
  </React.StrictMode>,
  document.querySelector("#app")
);