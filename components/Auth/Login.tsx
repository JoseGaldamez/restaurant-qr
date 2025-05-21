'use client';
import Link from 'next/link';

export const Login = () => {
    return (
        <div className='w-full max-w-md mx-auto bg-white p-8'>

            <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">Iniciar sesión</h1>
            <form className="space-y-5">
                <div>
                    <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">
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
                    <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">
                        Contraseña
                    </label>
                    <input
                        id="password"
                        type="password"
                        placeholder="Tu contraseña"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 transition"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-red-500 text-white font-bold py-3 rounded-lg shadow hover:bg-red-600 transition"
                >
                    Iniciar sesión
                </button>
            </form>
            <div className="my-6 flex items-center">
                <div className="flex-grow h-px bg-gray-200" />
                <span className="mx-4 text-gray-400">o</span>
                <div className="flex-grow h-px bg-gray-200" />
            </div>
            <button
                type="button"
                className="w-full flex items-center justify-center gap-3 border border-gray-300 py-3 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition"
            // onClick={handleGoogleLogin} // Aquí puedes agregar tu lógica de Google
            >
                <i className="fa-brands fa-google"></i>
                Iniciar sesión con Google
            </button>
            <p className="mt-6 text-center text-gray-600 text-sm">
                ¿No tienes cuenta?{' '}
                <Link href="/register" className="text-red-500 font-semibold hover:underline">
                    Regístrate
                </Link>
            </p>
        </div>
    )
}
