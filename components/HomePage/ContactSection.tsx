export function ContactSection() {
    return (
        <section className="py-24 bg-gradient-to-br from-gray-100 to-white">
            <div className="max-w-2xl mx-auto px-6">
                <div className="bg-white rounded-2xl shadow-lg p-10">
                    <h2 className="text-3xl font-extrabold mb-4 text-gray-800 text-center">
                        Contáctanos
                    </h2>
                    <div className="w-24 mx-auto mb-6 bg-red-400 h-1 rounded-full"></div>
                    <p className="mb-8 text-gray-600 text-center text-lg">
                        ¿Tienes dudas, sugerencias o necesitas ayuda? Completa el formulario y nuestro equipo te responderá lo antes posible.
                    </p>
                    <form className="space-y-6">
                        <div>
                            <label className="block text-left text-gray-700 font-semibold mb-2" htmlFor="email">
                                Correo electrónico
                            </label>
                            <input
                                id="email"
                                type="email"
                                placeholder="tu@email.com"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 transition"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-left text-gray-700 font-semibold mb-2" htmlFor="message">
                                Mensaje
                            </label>
                            <textarea
                                id="message"
                                placeholder="Escribe tu mensaje aquí..."
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 transition"
                                rows={5}
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-red-500 text-white font-bold py-3 rounded-lg shadow hover:bg-red-600 transition"
                        >
                            Enviar mensaje
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
}