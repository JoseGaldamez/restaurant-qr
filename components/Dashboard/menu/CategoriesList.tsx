'use client';
import React, { useEffect, useState } from 'react'
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
    Input,
    Chip,
    Textarea,
} from "@heroui/react";
import { getCategoriesByMenuID, saveNewCategory } from '@/server/categories';
import { CategoryModel } from '@/models/category.model';
import { showToast } from 'nextjs-toast-notify';

export const CategoriesList = ({ menu_id, setCats }: { menu_id: string, setCats: (cats: CategoryModel[]) => void }) => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const [listOfCategories, setlistOfCategories] = useState<CategoryModel[]>([]);
    const [catName, setCatName] = useState<string>('');
    const [catDescription, setCatDescription] = useState<string>('');
    const [categorySelected, setCategorySelected] = useState<string>("todas");


    useEffect(() => {
        getCategoriesByMenu();
    }, []);

    const getCategoriesByMenu = async () => {
        const cats = await getCategoriesByMenuID(menu_id);
        if (cats) {
            setlistOfCategories(cats);
            setCats(cats); // Actualiza el estado de las categorías en el componente padre
        } else {
            showToast.error("Error al obtener las categorías", {
                duration: 4000,
                progress: true,
                position: "bottom-right",
                transition: "bottomToTopBounce",
                icon: '',
                sound: false,
            });
        }
    }


    const saveCategory = async () => {

        const saved = await saveNewCategory(catName, catDescription, menu_id);
        if (!saved.success) {
            // Manejar el error, por ejemplo, mostrar un mensaje de error
            onOpenChange();
            showToast.error(saved.message ? saved.message : "Error al guardar la categoría", {
                duration: 4000,
                progress: true,
                position: "bottom-right",
                transition: "bottomToTopBounce",
                icon: '',
                sound: false,
            });

            return;
        }

        setCatName('');
        setCatDescription('');
        onOpenChange();

        showToast.success(saved.message ? saved.message : "Categoría guardada correctamente", {
            duration: 4000,
            progress: true,
            position: "bottom-right",
            transition: "bottomToTopBounce",
            icon: '',
            sound: false,
        });
        getCategoriesByMenu(); // Llama a la función para actualizar la lista de categorías
    }

    return (
        <>
            <div className='w-full border rounded-lg p-4'>
                <div className='flex items-center justify-between mb-4 border-b pb-4'>
                    <div>
                        <h2 className='text-xl font-semibold'>Categorías</h2>
                        <p className='text-foreground-500 text-sm'>Categoriza tu menú (ej. Entrantes, Platos principales, Postres)</p>
                    </div>
                    <button
                        className='px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition'
                        onClick={onOpen}
                    >
                        <i className="fa-solid fa-plus"></i> Agregar Categoría
                    </button>
                </div>

                <div className="flex gap-4">
                    {/* eslint-disable no-console */}
                    <Chip className={`cursor-pointer bg-slate-300 hover:opacity-80 ${categorySelected === 'todas' ? 'bg-red-400 text-white' : ''}`} variant='bordered' onClick={() => setCategorySelected('todas')} size='lg'>Todas</Chip>
                    {/* eslint-disable no-console */}
                    {listOfCategories.map((category) => (
                        <Chip
                            key={category.id}
                            className={`cursor-pointer bg-slate-300 hover:opacity-80 ${categorySelected === category.name ? 'bg-red-400 text-white' : ''}`}
                            variant='bordered'
                            onClick={() => setCategorySelected(category.name)}
                            size='lg'
                        >
                            {category.name}
                        </Chip>
                    ))}
                </div>
            </div>
            <Modal backdrop={'blur'} isOpen={isOpen} placement="top-center" onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Crear Categoría</ModalHeader>
                            <ModalBody>
                                <Input
                                    label="Nombre de la Categoría"
                                    variant="bordered"
                                    size='lg'
                                    value={catName}
                                    onChange={(e) => setCatName(e.target.value)}
                                />
                                <Textarea
                                    label="Descripción de la Categoría"
                                    variant="bordered"
                                    size='lg'
                                    value={catDescription}
                                    onChange={(e) => setCatDescription(e.target.value)}
                                    type='textarea'
                                    rows={4}
                                />

                            </ModalBody>
                            <ModalFooter>
                                <Button color="default" variant="flat" onPress={onClose}>
                                    Cancelar
                                </Button>
                                <Button color="primary" onPress={saveCategory} className='className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"'>
                                    Guardar Categoría
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}
