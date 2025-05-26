import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/navbar";
import Image from "next/image";

export default function DocsPage() {
  return (
    <div className="relative flex flex-col min-h-screen bg-gradient-to-br from-gray-100 to-white">
      <Navbar />
      <main className="flex-1 max-w-3xl mx-auto px-4 py-12">
        <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-4">
          Documentación
        </h2>
        <div className="w-24 mx-auto mb-10 bg-red-400 h-1 rounded-full"></div>

        {/* Guía rápida */}
        <section className="mb-12">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            Guía rápida para empezar
          </h3>
          <ol className="list-decimal list-inside space-y-10 text-gray-700">
            <li>
              <span className="font-semibold">Regístrate:</span>
              <span>
                {" "}
                Haz clic en{" "}
                <a
                  href="/register"
                  className="text-red-500 underline"
                >
                  Registrarse
                </a>{" "}
                y completa el formulario con tus datos y los de tu restaurante.
              </span>
              <div className="my-4 flex justify-start">
                <Image
                  src="https://res.cloudinary.com/jose-galdamez-dev/image/upload/f_auto,q_auto/v1/Restaurant-QR/esn0jbpetwp9oj4dytoj"
                  alt="Registro"
                  width={400}
                  height={200}
                  className="rounded-lg shadow"
                />
              </div>
            </li>
            <li>
              <span className="font-semibold">Verifica tu correo:</span>
              <span> Revisa tu bandeja de entrada y haz clic en el enlace de verificación.</span>
              <div className="my-4 flex justify-start">
                <Image
                  src="https://res.cloudinary.com/jose-galdamez-dev/image/upload/f_auto,q_auto/v1/Restaurant-QR/t8wii9r9uom03jwdes1w"
                  alt="Verificar correo"
                  width={400}
                  height={200}
                  className="rounded-lg shadow"
                />
              </div>
            </li>
            <li>
              <span className="font-semibold">Crea tu menú digital:</span>
              <span> Ingresa al panel, agrega tus platillos, precios y fotos.</span>
              <div className="my-4 flex justify-start">
                <Image
                  src="https://res.cloudinary.com/jose-galdamez-dev/image/upload/f_auto,q_auto/v1/Restaurant-QR/esn0jbpetwp9oj4dytoj"
                  alt="Panel de menú"
                  width={400}
                  height={200}
                  className="rounded-lg shadow"
                />
              </div>
            </li>
            <li>
              <span className="font-semibold">Descarga tu QR:</span>
              <span> Genera y descarga el código QR para imprimirlo y colocarlo en tu restaurante.</span>
              <div className="my-4 flex justify-start">
                <Image
                  src="https://res.cloudinary.com/jose-galdamez-dev/image/upload/f_auto,q_auto/v1/Restaurant-QR/esn0jbpetwp9oj4dytoj"
                  alt="Código QR"
                  width={400}
                  height={200}
                  className="rounded-lg shadow"
                />
              </div>
            </li>
          </ol>
        </section>

        {/* Preguntas frecuentes */}
        <section>
          <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-4 mt-32">
            Preguntas Frecuentes
          </h2>
          <div className="w-24 mx-auto mb-10 bg-red-400 h-1 rounded-full"></div>

          <div className="space-y-6">
            <div>
              <h4 className="font-semibold text-red-500">
                ¿Puedo actualizar mi menú después de crearlo?
              </h4>
              <p className="text-gray-700">
                Sí, puedes editar tu menú en cualquier momento desde el panel de
                administración. Los cambios se reflejan al instante en el menú
                digital.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-red-500">
                ¿Cómo comparto el menú con mis clientes?
              </h4>
              <p className="text-gray-700">
                Solo imprime el código QR generado y colócalo en las mesas o en
                la entrada de tu restaurante. Tus clientes podrán escanearlo con
                su teléfono y ver el menú.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-red-500">
                ¿El menú funciona en cualquier dispositivo?
              </h4>
              <p className="text-gray-700">
                Sí, el menú digital es responsivo y funciona en cualquier
                smartphone, tablet o computadora con acceso a internet.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-red-500">
                ¿Puedo personalizar el diseño del menú?
              </h4>
              <p className="text-gray-700">
                Puedes agregar el logo de tu restaurante, elegir colores y
                destacar platillos especiales para que tu menú refleje la
                identidad de tu negocio.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-red-500">
                ¿Qué hago si tengo problemas o dudas?
              </h4>
              <p className="text-gray-700">
                Puedes contactarnos desde la sección de contacto y nuestro equipo
                te ayudará lo antes posible.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
