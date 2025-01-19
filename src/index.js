import React from "react";
import "react-app-polyfill/stable";
import ReactDOM from "react-dom/client";
import App from "./App";
import './index.css'
import { Analytics } from '@vercel/analytics/react';
import { ChakraProvider } from "@chakra-ui/react";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ChakraProvider>
    <App />
    <Analytics />
  </ChakraProvider>
);
