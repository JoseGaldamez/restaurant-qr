"use server";

export const realizarPedido = async (pedido: any) => {
  try {
    const response = await fetch(
      "https://restaurant-qr-backend-default-rtdb.firebaseio.com/pedidos.json",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(pedido),
      }
    );
    if (!response.ok) {
      return false;
    }

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const getPedidos = async () => {
  try {
    const response = await fetch(
      "https://restaurant-qr-backend-default-rtdb.firebaseio.com/pedidos.json"
    );
    if (!response.ok) {
      return [];
    }

    const data = await response.json();

    const pedidos = Object.keys(data).map((key) => ({
      id: key,
      ...data[key],
    }));

    return pedidos;
  } catch (error) {
    console.error(error);
    return [];
  }
};
