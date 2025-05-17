export const FeaturesSection = () => {
    return (
        <div className="w-full py-10 bg-gray-100">
            <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10 mx-5">
                <div className="inline-block max-w-lg text-center justify-center">
                    <h1 className="text-2xl font-bold">Características</h1>
                    <p className="mt-4 text-gray-600">
                        Aquí puedes encontrar una lista de las características que ofrece nuestra aplicación.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-4 mt-10">
                    <div className="p-6 text-center text-gray-600">
                        <i className="fa-solid fa-bolt text-7xl mb-5"></i>
                        <h2 className="text-xl font-semibold mb-2">Rapidez</h2>
                        <p className="text-gray-500">Actualiza tu menú en segundos.</p>
                    </div>
                    <div className="p-6 text-center text-gray-600">
                        <i className="fa-solid fa-user-shield text-7xl mb-5"></i>
                        <h2 className="text-xl font-semibold mb-2">Seguridad</h2>
                        <p className="text-gray-500">Sin información sensible almacenada.</p>
                    </div>
                    <div className="p-6 text-center text-gray-600">
                        <i className="fa-solid fa-brush text-7xl mb-5"></i>
                        <h2 className="text-xl font-semibold mb-2">Personalización</h2>
                        <p className="text-gray-500">Adapta el menú a la imagen de tu marca.</p>
                    </div>

                </div>
            </section>
        </div>
    )
}
