'use client';
import { RegisterDTO } from '@/models/registerDTO.model';
import { signup } from '@/server/auth';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { showToast } from 'nextjs-toast-notify';
import { useState } from 'react';

export const Register = () => {

    const router = useRouter();
    const [dataForm, setdataForm] = useState<RegisterDTO>({
        name: '',
        email: '',
        password: '',
        terms: false,
    });

    const [loading, setLoading] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        console.log({ dataForm });

        // validate terms
        if (!dataForm.terms) {
            showToast.error("¡Debes aceptar los términos y condiciones!", {
                duration: 4000,
                progress: true,
                position: "bottom-right",
                transition: "bottomToTopBounce",
                icon: '',
                sound: false,
            });
            return;
        }

        // validate data
        if (dataForm.name && dataForm.email && dataForm.password) {
            setLoading(true);
            try {
                const result = await signup(dataForm);

                if (result.success === false) {
                    showToast.error(result.message, {
                        duration: 4000,
                        progress: true,
                        position: "bottom-right",
                        transition: "bottomToTopBounce",
                        icon: '',
                        sound: false,
                    });
                    setLoading(false);
                    return;
                }
                showToast.success(result.message, {
                    duration: 4000,
                    progress: true,
                    position: "bottom-right",
                    transition: "bottomToTopBounce",
                    icon: '',
                    sound: false,
                });
                setLoading(false);
                router.push('/verify-email');
            } catch (error) {
                showToast.error("¡Error al registrarse! Intenta de nuevo.", {
                    duration: 4000,
                    progress: true,
                    position: "bottom-right",
                    transition: "bottomToTopBounce",
                    icon: '',
                    sound: false,
                });
                setLoading(false);
                return;
            }

        }

    };

    return (
        <div className='w-full max-w-lg mx-auto bg-white p-8'>
            <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">Registro</h1>
            <form className="space-y-5" onSubmit={handleOnSubmit}>
                <div>
                    <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">
                        Tu nombre
                    </label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        value={dataForm.name}
                        onChange={(e) => setdataForm({ ...dataForm, name: e.target.value })}
                        placeholder="Nombre completo"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 transition"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">
                        Correo electrónico
                    </label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        value={dataForm.email}
                        onChange={(e) => setdataForm({ ...dataForm, email: e.target.value })}
                        placeholder="tu@email.com"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 transition"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">
                        Contraseña
                    </label>
                    <div className="relative">
                        <input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            value={dataForm.password}
                            onChange={(e) => setdataForm({ ...dataForm, password: e.target.value })}
                            placeholder="Tu contraseña"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 transition pr-12"
                            required
                        />
                        <button
                            type="button"
                            tabIndex={-1}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-400"
                            onClick={() => setShowPassword((v) => !v)}
                            aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                        >
                            {showPassword ? (
                                <i className="fa-regular fa-eye-slash"></i>
                            ) : (
                                <i className="fa-regular fa-eye"></i>
                            )}
                        </button>
                    </div>
                </div>
                <div className="flex items-center mb-4">
                    <input
                        id="terms"
                        name="terms"
                        type="checkbox"
                        checked={dataForm.terms}
                        onChange={(e) => setdataForm({ ...dataForm, terms: e.target.checked })}
                        className="w-4 h-4 text-red-500 border-gray-300 rounded focus:ring-red-400"
                        required
                    />
                    <label htmlFor="terms" className="ml-2 text-gray-600">
                        Acepto los{' '}
                        <Link href="/terms" className="text-red-500 font-semibold hover:underline">
                            términos y condiciones
                        </Link>
                    </label>
                </div>
                <button
                    disabled={loading || !dataForm.terms}
                    type="submit"
                    className="w-full bg-red-500 text-white font-bold py-3 rounded-lg shadow hover:bg-red-600 transition disabled:opacity-50"
                >
                    {loading ? 'Cargando...' : 'Registrarse'}
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
            // onClick={handleGoogleRegister} // Aquí puedes agregar tu lógica de Google
            >
                <i className="fa-brands fa-google"></i>
                Registrarse con Google
            </button>
            <p className="mt-6 text-center text-gray-600 text-sm">
                ¿Ya tienes cuenta?{' '}
                <Link href="/login" className="text-red-500 font-semibold hover:underline">
                    Inicia sesión
                </Link>
            </p>
        </div>
    )
}
