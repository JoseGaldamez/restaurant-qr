import { CircleCheck } from "lucide-react"

export default function CompletePage() {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-5">
            <CircleCheck className="w-16 h-16 text-green-500 mb-4" />
            <h1 className="text-2xl font-bold py-3">Pedido Completo</h1>
            <p className="text-center">Gracias por su pedido. Su comida estará lista pronto.</p>
        </div>
    );
}