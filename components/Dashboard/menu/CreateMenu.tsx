'use client'
import React, { useState } from 'react'
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
    Checkbox,
    Input,
    Link,
} from "@heroui/react";
import { saveNewMenu } from '@/server/menus';
import { showToast } from 'nextjs-toast-notify';

export const CreateMenu = ({ getMenu }: { getMenu: () => void }) => {

    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [menuName, setMenuName] = useState<string>('');


    const saveMenu = async () => {

        const saved = await saveNewMenu(menuName);
        if (saved.success) {
            setMenuName('');
            onOpenChange();
            getMenu(); // Llama a la función para actualizar el menú
            // Aquí podrías agregar una notificación de éxito o redirigir a otra página
        } else {
            // Manejar el error, por ejemplo, mostrar un mensaje de error
            showToast.error(saved.message ? saved.message : "Error al guardar el menú", {
                duration: 4000,
                progress: true,
                position: "bottom-right",
                transition: "bottomToTopBounce",
                icon: '',
                sound: false,
            });
        }

    }


    return (
        <>
            <div className="max-w-7xl mx-auto py-24 border rounded-lg my-5 bg-white text-center">
                <span>
                    <i className="fa-solid fa-utensils text-7xl text-gray-500"></i>
                </span>
                <p className="mt-2 text-gray-600">No tienes ningún menú creado. Por favor, crea uno para comenzar.</p>
                <button onClick={onOpen} className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition">
                    Crear Menú
                </button>
            </div>
            <Modal backdrop={'blur'} isOpen={isOpen} placement="top-center" onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Crear Menú</ModalHeader>
                            <ModalBody>
                                <Input
                                    label="Nombre del Menú"
                                    variant="bordered"
                                    size='lg'
                                    value={menuName}
                                    onChange={(e) => setMenuName(e.target.value)}
                                />

                            </ModalBody>
                            <ModalFooter>
                                <Button color="default" variant="flat" onPress={onClose}>
                                    Cancelar
                                </Button>
                                <Button color="primary" onPress={saveMenu} className='className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"'>
                                    Guardar Menú
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}
