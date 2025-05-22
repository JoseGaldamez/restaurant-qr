import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/navbar";
import { title } from "@/components/primitives";
import Link from "next/link";

const plans = [
  {
    name: "Gratis",
    price: "0",
    features: [
      "Menú digital básico",
      "Código QR estandar",
      "Hasta 20 platillos",
    ],
    highlight: false,
    url: "/register?plan=free",
  },
  {
    name: "Emprendedor",
    price: "9.99",
    features: [
      "Todo lo de Gratis",
      "Menú con imágenes",
      "Hasta 100 platillos",
      "Estadísticas básicas",
      "Soporte prioritario",
    ],
    highlight: true,
    url: "/register?plan=entrepreneur",
  },
  {
    name: "Pro",
    price: "29.99",
    features: [
      "Todo lo de Emprendedor",
      "Menús ilimitados",
      "Pedidos en línea",
      "Soporte premium 24/7",
    ],
    highlight: false,
    url: "/register?plan=pro",
  },
];

const comparison = [
  {
    feature: "Menú digital básico",
    Gratis: true,
    Emprendedor: true,
    Pro: true,
  },
  {
    feature: "Código QR personalizado",
    Gratis: false,
    Emprendedor: true,
    Pro: true,
  },
  {
    feature: "Hasta 20 platillos",
    Gratis: true,
    Emprendedor: false,
    Pro: false,
  },
  {
    feature: "Hasta 100 platillos",
    Gratis: false,
    Emprendedor: true,
    Pro: false,
  },
  {
    feature: "Menús ilimitados",
    Gratis: false,
    Emprendedor: false,
    Pro: true,
  },
  {
    feature: "Menú con imágenes",
    Gratis: true,
    Emprendedor: true,
    Pro: true,
  },
  {
    feature: "Estadísticas básicas",
    Gratis: false,
    Emprendedor: true,
    Pro: true,
  },
  {
    feature: "Pedidos en línea",
    Gratis: false,
    Emprendedor: false,
    Pro: true,
  },
  {
    feature: "Soporte por email",
    Gratis: false,
    Emprendedor: true,
    Pro: true,
  },
  {
    feature: "Soporte prioritario",
    Gratis: false,
    Emprendedor: true,
    Pro: true,
  },
  {
    feature: "Soporte premium 24/7",
    Gratis: false,
    Emprendedor: false,
    Pro: true,
  },
];

export default function PricingPage() {
  return (
    <div className="relative flex flex-col min-h-screen bg-gradient-to-br from-gray-100 to-white w-full">
      <Navbar />
      <main className="flex-1 max-w-6xl mx-auto md:px-4 py-16 w-full">
        <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-4">
          Precios
        </h2>
        <div className="w-32 mx-auto mb-12 bg-red-400 h-1 rounded-full"></div>
        {/* Planes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 w-full p-5">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-2xl shadow-lg p-8 bg-white flex flex-col items-center border-2 w-full ${plan.highlight
                ? "border-red-400 md:scale-105"
                : "border-transparent"
                } transition`}
            >
              <h3 className="text-2xl font-bold mb-2 text-gray-800">
                {plan.name}
              </h3>
              <div className="text-3xl font-extrabold text-red-500 mb-4">
                {plan.price === "0"
                  ? "Gratis"
                  : `$${plan.price}/mes`}
              </div>
              <ul className="mb-6 space-y-2 text-gray-700 text-left">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2">
                    <span className="text-green-500">✔</span>
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href={plan.url}
                className={`w-full text-center py-3 rounded-lg font-bold transition ${plan.highlight
                  ? "bg-red-500 text-white hover:bg-red-600"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
              >
                {plan.price === "0"
                  ? "Comenzar gratis"
                  : "Elegir plan"}
              </Link>
            </div>
          ))}
        </div>
        {/* Tabla de comparación */}
        <div className="mt-24 w-full overflow-x-auto">
          <table className="bg-white rounded-xl shadow-lg w-full min-w-[600px]">
            <thead>
              <tr>
                <th className="py-3 px-4 text-left text-gray-700 font-bold">
                  Características
                </th>
                <th className="py-3 px-4 text-center font-bold text-gray-800">
                  Gratis
                </th>
                <th className="py-3 px-4 text-center font-bold text-red-500">
                  Emprendedor
                </th>
                <th className="py-3 px-4 text-center font-bold text-gray-800">
                  Pro
                </th>
              </tr>
            </thead>
            <tbody>
              {comparison.map((row) => (
                <tr key={row.feature} className="border-t">
                  <td className="py-2 px-4 text-gray-700">
                    {row.feature}
                  </td>
                  <td className="py-2 px-4 text-center">
                    {row.Gratis ? (
                      <span className="text-green-500 font-bold">✔</span>
                    ) : (
                      <span className="text-gray-300">—</span>
                    )}
                  </td>
                  <td className="py-2 px-4 text-center">
                    {row.Emprendedor ? (
                      <span className="text-green-500 font-bold">✔</span>
                    ) : (
                      <span className="text-gray-300">—</span>
                    )}
                  </td>
                  <td className="py-2 px-4 text-center">
                    {row.Pro ? (
                      <span className="text-green-500 font-bold">✔</span>
                    ) : (
                      <span className="text-gray-300">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
      <Footer />
    </div>
  );
}
