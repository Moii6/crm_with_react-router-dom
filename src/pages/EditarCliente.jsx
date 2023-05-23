import Formulario from "../components/Formulario";
import { getCliente, updateCliente } from "../data/clientes";
import {
  Form,
  useLoaderData,
  useNavigate,
  redirect,
  useActionData,
} from "react-router-dom";
import Error from "../components/Error";

export async function loader({ params }) {
  const cliente = await getCliente(params.clienteId);
  if (Object.values(cliente).length === 0) {
    throw new Response("", {
      status: 404,
      statusText: "cliente no encontrado",
    });
  }
  console.log(cliente);
  return cliente;
}

export async function action({ request, params }) {
  const formData = await request.formData();
  const datos = Object.fromEntries(formData);
  //const email = formData.get("email");
  const errores = [];
  if (Object.values(datos).includes("")) {
    errores.push("Todos los campos son obligatorios");
  }
  let regex = new RegExp(
    "([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|\"([]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|[[\t -Z^-~]*])"
  );
  if (regex.test(formData.email)) {
    errores.push("El Email no es válido");
  }
  if (Object.keys(errores).length) {
    return errores;
  }

  await updateCliente(params.clienteId, datos);

  return redirect("/");
}

function EditarCliente() {
  const cliente = useLoaderData();
  const navigate = useNavigate();
  const errores = useActionData();
  return (
    <>
      <h1 className="font-black text-4xl text-blue-900">Editar Cliente</h1>
      <p className="mt-3">
        Completa el formulario para agregar un muevo cliente
      </p>
      <div className="flex justify-end">
        <button
          onClick={() => navigate("/")} // se coloca la direccion a la que se quiere regresar con -1 redirecciona a la pagina anteior
          className="bg-blue-800 hover:bg-blue-500 text-white px-3 py-1 font-bold uppercase"
        >
          Volver
        </button>
      </div>
      <div className="bg-white shadow rounded-md md:w-3/4 mx-auto px-5 py-10  mt-20">
        {errores?.length &&
          errores.map((error, i) => <Error key={i}>{error}</Error>)}
        <Form method="post" noValidate>
          <Formulario cliente={cliente} />
          <input
            type="submit"
            className="mt-5 w-full bg-blue-800 hover:bg-blue-500 p-3 uppercase fonmt-bold text-white text-lg"
            value="Guardar Cambios"
          />
        </Form>
      </div>
    </>
  );
}

export default EditarCliente;
