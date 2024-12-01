import React, { lazy, Suspense, useContext } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
const Default = lazy(
  () => import(/* webpackChunkName: "VidtuRouter" */ "./component/Default")
);
const Layout = lazy(
  () => import(/* webpackChunkName: "VidtuRouter" */ "./component/Layout")
);

export default function BillDistributionRouter() {
  const user = null;
  const router = createBrowserRouter([
    {
      element: (
        <Suspense fallback={<>...</>}>
          <Layout />
        </Suspense>
      ),
      children: [
        {
          path: "",
          element: (
            <Suspense fallback={<>...</>}>
              <Default />
            </Suspense>
          ),
        },
      ],
      errorElement: (
        <Suspense fallback={<>...</>}>
          <Default />
        </Suspense>
      ),
    },
  ]);

  return <RouterProvider router={router} />;
}
