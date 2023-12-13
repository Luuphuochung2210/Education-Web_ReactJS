import React from "react";
import ReactDOM from "react-dom";
import { EnvContextProvider } from "./components/context/EnvContext";
import App from "./App";

export default function Root() {
  return (
    <EnvContextProvider>
      <App />
    </EnvContextProvider>
  );
}

ReactDOM.render(<Root />, document.getElementById("edumint"));
