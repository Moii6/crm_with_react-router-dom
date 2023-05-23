import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout";
import NuevoCliente, {
  action as actionNuevoCliente,
} from "./pages/NuevoCliente";
/**dado que muchos componentes pueden tener loader
 * se le asigna un alias para que no existan problemas al
 * momento de saber cual se est usando
 */
import Index, { loader as clientesloader } from "./pages/Index";
import EditarCliente, {
  loader as editarClienteLoader,
  action as editarClienteAction,
} from "./pages/EditarCliente";
import ErrorPage from "./components/ErrorPage";
import { action as deleteClienteAction } from "./components/Cliente";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Index />,
        errorElement: <ErrorPage />,
        loader: clientesloader,
      },
      {
        path: "/clientes/nuevo",
        element: <NuevoCliente />,
        errorElement: <ErrorPage />,
        action: actionNuevoCliente,
      },
      {
        path: "/clientes/:clienteId/editar",
        element: <EditarCliente />,
        errorElement: <ErrorPage />,
        loader: editarClienteLoader,
        action: editarClienteAction,
      },
      {
        path: "/clientes/:clienteId/eliminar",
        action: deleteClienteAction,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
