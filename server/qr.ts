import qrcode from "qrcode";

export const generateQRCode = async (menuId: string) => {
  try {
    const response = await qrcode.toDataURL(
      `https://www.restaurant-qr.com/menu/${menuId}`,
      {
        errorCorrectionLevel: "H",
      }
    );
    return response;
  } catch (error) {
    console.error("Error al generar el código QR:", error);
    throw error; // Propaga el error para manejarlo en el componente
  }
};
