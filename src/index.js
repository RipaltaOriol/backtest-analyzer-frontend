import React from "react";
import { createRoot } from "react-dom/client";
import { ErrorBoundary } from "react-error-boundary";
import { Provider } from "react-redux";
import "typeface-inter";

import App from "./App";
import "./index.css";
import CrashBoundry from "./pages/CrashBoundry";
import { store } from "./redux/store";
import reportWebVitals from "./reportWebVitals";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
    <React.StrictMode>
        <ErrorBoundary
            FallbackComponent={CrashBoundry}
            onReset={() => (window.location.href = "/")}
        >
            <Provider store={store}>
                <App />
            </Provider>
        </ErrorBoundary>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
