import { RemixBrowser } from "@remix-run/react";
import { startTransition, StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { hydrateRoot } from "react-dom/client";
import { Provider } from 'react-redux'
import { store } from "./services/store"
import App from "./root";

if (import.meta.hot) {
  import.meta.hot.accept();
}

startTransition(() => {
  hydrateRoot(
    document,
    <StrictMode>
      <Provider store={store}>
        <RemixBrowser />
      </Provider>
    </StrictMode>
  );
});
