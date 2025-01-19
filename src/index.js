import React from "react";
import "react-app-polyfill/stable";
import ReactDOM from "react-dom/client";
import App from "./App";
import './index.css'
import { Analytics } from '@vercel/analytics/react';
import { ChakraProvider } from "@chakra-ui/react";
import { HelmetProvider } from "react-helmet-async";

const helmetContext = {}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HelmetProvider context={helmetContext}>
      <ChakraProvider>
        <App />
        <Analytics />
      </ChakraProvider>
    </HelmetProvider>
  </React.StrictMode>
);
