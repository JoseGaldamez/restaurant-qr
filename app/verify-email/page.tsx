export default function VerifyEmailPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-white">
            <div className="bg-white p-10 max-w-md w-full text-center">
                <div className="flex justify-center mb-6">
                    <i className="fa-regular fa-envelope text-red-400 text-5xl"></i>
                </div>
                <h1 className="text-2xl font-bold mb-4 text-gray-800">Verifica tu correo electrónico</h1>
                <p className="text-gray-600 mb-2">
                    Te hemos enviado un correo electrónico para verificar tu cuenta.
                </p>
                <p className="text-gray-500 text-sm">
                    Si no lo ves en tu bandeja de entrada, revisa la carpeta de spam o promociones.
                </p>
                <button className="mt-6 bg-red-500 text-white font-bold py-3 px-6 rounded-lg shadow hover:bg-red-600 transition disabled:bg-gray-200" disabled={true}>
                    Reenviar correo de verificación
                </button>
            </div>
        </div>
    );
}