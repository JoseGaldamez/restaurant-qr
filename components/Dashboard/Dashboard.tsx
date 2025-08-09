'use client';

import { getPedidos } from "@/server/pedidos";
import { Button } from "@heroui/button";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@heroui/modal";
import { Beef, ChartBar, HandPlatter } from "lucide-react";
import { useEffect, useState } from "react";


export const Dashboard = () => {
    const [pedidos, setPedidos] = useState<any[]>();
    const [isOpen, setIsOpen] = useState(false);
    const [selectedPedido, setSelectedPedido] = useState<any>(null);


    useEffect(() => {
        getAllPedidos();
    }, []);


    const getAllPedidos = async () => {
        const response: any[] = await getPedidos();
        console.log({ response });

        setPedidos(response);
    }

    const onOpenChange = (open: boolean) => {
        setIsOpen(open);
    }
    return (
        <div>
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <p className="mt-2 text-gray-600">Welcome to the dashboard!</p>
            <hr className="my-4" />
            <section className="flex items-start justify-center gap-5">
                <div className="bg-white shadow-md rounded-lg p-6 w-full md:w-1/3">
                    <HandPlatter className="w-12 h-12 text-red-500 mb-4" />
                    <h2 className="text-xl font-semibold mb-4">Pedidos</h2>
                    <div className="flex flex-col gap-4">

                        {pedidos && pedidos.length > 0 ? (
                            pedidos.map((pedido, index) => (
                                <div onClick={() => {
                                    setSelectedPedido(pedido);
                                    setIsOpen(true);
                                }} key={pedido.id} className="flex items-center justify-between bg-gray-100 hover:bg-gray-200 p-4 rounded-lg">
                                    <span className="text-gray-700">Pedido #{120 + index}</span>
                                    <span className="text-gray-500">Mesa #{pedido.mesa}</span>
                                </div>
                            ))
                        ) : (
                            <div className="flex items-center justify-between bg-gray-100 hover:bg-gray-200 p-4 rounded-lg">
                                <span className="text-gray-700">No hay pedidos</span>
                            </div>
                        )}

                    </div>
                </div>
                <div className="bg-white shadow-md rounded-lg p-6 w-full md:w-1/3">
                    <ChartBar className="w-12 h-12 text-red-500 mb-4" />
                    <h2 className="text-xl font-semibold mb-4">Estadísticas</h2>
                    <p className="text-gray-700">Lecturas de menú</p>
                    <div className="mt-2">
                        <p className="text-gray-500 flex items-center justify-between">
                            <span>Total: </span>
                            <span className="font-bold text-red-400 text-xl">150</span>
                        </p>
                        <p className="text-gray-500 flex items-center justify-between">
                            <span>Hoy: </span>
                            <span className="font-bold text-red-400 text-xl">20</span>
                        </p>
                    </div>
                </div>
                <div className="bg-white shadow-md rounded-lg p-6 w-full md:w-1/3">
                    <Beef className="w-12 h-12 text-red-500 mb-4" />
                    <h2 className="text-xl font-semibold mb-4">Tus menús</h2>
                    <p className="text-gray-700">Menú principal</p>
                    <p className="text-gray-700">
                        <span className="font-bold text-red-400">1</span>
                    </p>
                </div>
            </section>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Pedido: {selectedPedido?.id}</ModalHeader>
                            <ModalBody>
                                <h2 className="text-lg font-semibold mb-2">Detalles del pedido</h2>
                                <p className="text-gray-600 mb-4">Mesa: {selectedPedido?.mesa}</p>
                                {
                                    selectedPedido.plates && selectedPedido.plates.length > 0 ? (
                                        <ul className="list-disc pl-5">
                                            {selectedPedido.plates.map((plate: any, index: number) => (
                                                <li key={index} className="text-gray-700">
                                                    {plate.name} (Cantidad: {plate.quantity || 1})
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p className="text-gray-500">No hay platos en este pedido.</p>
                                    )}
                            </ModalBody>
                            <ModalFooter>

                                <Button color="primary" onPress={onClose}>
                                    Cerrar
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    )
}
