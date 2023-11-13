import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import { Login, Order, Provider, Purchase, Stock } from "./pages";
import {
  ProviderList,
  ProviderMedicines,
  ProviderNotFound,
} from "./pages/provider/components";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "stock",
        element: <Stock />,
      },
      {
        path: "purchase",
        element: <Purchase />,
      },
      {
        path: "order",
        element: <Order />,
      },
      {
        path: "provider",
        element: <Provider />,
        children: [
          {
            path: "",
            element: <ProviderList />,
          },
          {
            path: ":id",
            element: <ProviderMedicines />,
            errorElement: <ProviderNotFound />,
          },
        ],
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);
