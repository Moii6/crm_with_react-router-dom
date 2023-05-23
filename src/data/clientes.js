export async function obtenerClientes() {
  //const respuesta = await fetch(import.meta.env.VITE_API_URL); is not working
  const respuesta = await fetch("http://localhost:3000/clientes");
  const resultado = await respuesta.json();
  return resultado;
}

export async function getCliente(id) {
  const respuesta = await fetch(`http://localhost:3000/clientes/${id}`);
  const resultado = await respuesta.json();
  return resultado;
}

export async function agregarCliente(datos) {
  try {
    const respuesta = await fetch("http://localhost:3000/clientes", {
      method: "POST",
      body: JSON.stringify(datos),
      headers: { "Content-Type": "application/json" },
    });
    await respuesta.json();
  } catch (error) {
    console.log(error);
  }
}

export async function updateCliente(id, data) {
  try {
    const respuesta = await fetch(`http://localhost:3000/clientes/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });
    await respuesta.json();
  } catch (error) {
    console.log(error);
  }
}
export async function deleteCliente(id) {
  try {
    const respuesta = await fetch(`http://localhost:3000/clientes/${id}`, {
      method: "DELETE",
    });
    await respuesta.json();
  } catch (error) {
    console.log(error);
  }
}
