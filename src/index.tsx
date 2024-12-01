import "./index.css";
import React, { lazy, Suspense, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
const BillDistributionRouter = lazy(
  () => import(/* webpackChunkName: "VidtuRouter" */ "./router")
);

const root = createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

function App() {
  return (
    <Suspense fallback={<>...</>}>
      <BillDistributionRouter />
    </Suspense>
  );
}
