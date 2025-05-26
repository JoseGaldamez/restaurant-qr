import Image from "next/image"

export const EasyToUseSection = () => {
  return (
    <div className="max-w-5xl mx-auto py-36">
      <div className="flex flex-col md:flex-row items-center justify-center">
        <div className="w-1/2">
          <Image src="https://res.cloudinary.com/jose-galdamez-dev/image/upload/f_auto,q_auto/v1/Restaurant-QR/raodgmvxnyximf9c0cw8" alt="Easy to use" width={700} height={500} className="w-full rounded-xl" />
        </div>
        <div className="w-1/2 px-0 md:px-10">
          <h3 className="text-3xl font-semibold text-gray-800"><span className="text-red-400">Fácil y rápido</span>, desde cualquier dispositivo</h3>
          <p className="text-gray-800 mt-2 text-lg">Nuestros clientes pueden acceder a su menú digital desde cualquier dispositivo con conexión a Internet.</p>
        </div>
      </div>
    </div>
  )
}
