"use server";
import { v2 as cloudinary } from "cloudinary";

// Configura tus credenciales de Cloudinary (usa variables de entorno en producción)
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export async function uploadImageToCloudinary(
  file: File,
  folder = "uploads",
  public_id?: string // Nuevo parámetro opcional para el nombre
): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        { folder, public_id }, // Si public_id está definido, Cloudinary usará ese nombre
        (error, result) => {
          if (error || !result)
            return reject(error || new Error("No result from Cloudinary"));
          resolve(result.secure_url); // Solo retorna la URL segura de la imagen
        }
      )
      .end(buffer);
  });
}
