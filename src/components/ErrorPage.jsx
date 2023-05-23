import { useRouteError } from "react-router-dom";

function ErrorPage() {
  const error = useRouteError();
  return (
    <div className="space-y-8">
      <h1 className="text-center font-extrabold text-6xl mt-20 text-blue-900">
        CRM -Clientes
      </h1>
      <p className="text-center text-red-600">
        Se encontro un error durante la ultima peticion
      </p>
      <p className="text-center text-red-600">
        {error.statusText || error.message}
      </p>
    </div>
  );
}

export default ErrorPage;
