'use client';
import { useEffect, useState } from "react";

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
    Select,
    SelectItem,
    Spinner,
} from "@heroui/react";

import { getDishesByMenuID, saveNewDish, updatePictureDish } from "@/server/dishes";
import { DishModel } from "@/models/dish.model";
import { CategoryModel } from "@/models/category.model";
import { showToast } from "nextjs-toast-notify";
import { uploadImageToCloudinary } from "@/server/cloudinary";


export const DishedList = ({ menu_id, categories }: { menu_id: string, categories: CategoryModel[] }) => {

    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const [loading, setloading] = useState(false);
    const [dishes, setDishes] = useState<DishModel[] | null>(null);

    // States for creating a new dish
    const [nameNew, setNameNew] = useState("");
    const [descriptionNew, setDescriptionNew] = useState("");
    const [priceNew, setPriceNew] = useState("0");
    const [categoryNew, setCategoryNew] = useState("");
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [savingNewDish, setSavingNewDish] = useState(false);


    useEffect(() => {
        getDishes();
    }, [])

    const getDishes = async () => {
        setloading(true);
        const dishes = await getDishesByMenuID(menu_id);

        setDishes(dishes);
        setloading(false);
    }

    const saveDish = async () => {

        if (!nameNew || !descriptionNew || !priceNew || !categoryNew) {
            showToast.error("Por favor completa todos los campos", {
                duration: 4000,
                progress: true,
                position: "bottom-right",
                transition: "bottomToTopBounce",
                icon: '',
                sound: false,
            });
            return;
        }
        if (isNaN(parseFloat(priceNew)) || parseFloat(priceNew) <= 0) {
            showToast.error("El precio debe ser un número válido mayor a 0", {
                duration: 4000,
                progress: true,
                position: "bottom-right",
                transition: "bottomToTopBounce",
                icon: '',
                sound: false,
            });
            return;
        }

        setSavingNewDish(true);

        // Call API to save the new dish
        const saved = await saveNewDish(
            nameNew,
            descriptionNew,
            priceNew,
            categoryNew,
            menu_id
        );

        if (!saved) {
            onOpenChange();
            showToast.error("Error al guardar el platillo", {
                duration: 4000,
                progress: true,
                position: "bottom-right",
                transition: "bottomToTopBounce",
                icon: '',
                sound: false,
            });
            setSavingNewDish(false);
            return;
        }


        // If an image file is selected, upload it
        if (imageFile) {
            if (!saved.data) {
                showToast.error("No se pudo obtener el ID del platillo guardado", {
                    duration: 4000,
                    progress: true,
                    position: "bottom-right",
                    transition: "bottomToTopBounce",
                    icon: '',
                    sound: false,
                });
                setSavingNewDish(false);
                onOpenChange();
                return;
            }
            // subiendo imagen a Cloudinary
            const imageSaved = await uploadImageToCloudinary(imageFile, "Restaurant-QR/dishes", saved.data.id);
            if (!imageSaved) {
                showToast.error("Error al subir la imagen del platillo", {
                    duration: 4000,
                    progress: true,
                    position: "bottom-right",
                    transition: "bottomToTopBounce",
                    icon: '',
                    sound: false,
                });
                setSavingNewDish(false);
                onOpenChange();
                return;
            }
            // Update the saved dish with the image URL
            const updatedDish = await updatePictureDish(saved.data.id, imageSaved);
            if (!updatedDish) {
                showToast.error("Error al actualizar la imagen del platillo", {
                    duration: 4000,
                    progress: true,
                    position: "bottom-right",
                    transition: "bottomToTopBounce",
                    icon: '',
                    sound: false,
                });
                setSavingNewDish(false);
                onOpenChange();
                return;
            }

        }


        showToast.success("Platillo guardado correctamente", {
            duration: 4000,
            progress: true,
            position: "bottom-right",
            transition: "bottomToTopBounce",
            icon: '',
            sound: false,
        });

        // Refresh the dish list
        getDishes();
        onOpenChange(); // Close the modal
        setNameNew("");
        setDescriptionNew("");
        setPriceNew("0");
        setCategoryNew("");
        setImageFile(null);
        setImagePreview(null);
        setSavingNewDish(false);
    }

    return (
        <>
            <div className="max-w-5xl mx-auto px-4 py-6">
                <div className="flex items-center justify-between mt-10 mb-3">
                    <div>
                        <h3 className="text-xl font-semibold">Platillos</h3>
                        <p className="text-gray-500 text-sm">Aquí puedes ver y agregar platillos a tu menú.</p>
                    </div>

                    <button
                        onClick={onOpen}
                        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                    >
                        <i className="fa-solid fa-plus"></i> Agregar Platillo
                    </button>

                </div>
                <hr />


                {loading && <div className="flex items-center justify-center py-24">
                    <Spinner color="danger" classNames={{ label: "text-gray-400" }} label="Cargando platillos..." variant="dots" />
                </div>}


                {dishes && dishes.length === 0 && (
                    <div className="text-center py-20 text-gray-500">
                        <p>Aún no hay platos en este menú.</p>
                    </div>
                )}
                {dishes && dishes.length > 0 && (
                    <div className="mt-10 w-full">
                        {dishes.map((dish) => (
                            <article key={dish.id} className="bg-white py-4 mb-4 border-b-1">
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-start gap-4 w-3/4">
                                        {dish.picture_url ? (
                                            <img
                                                src={"https://res.cloudinary.com/jose-galdamez-dev/image/upload/w_400/f_auto,q_auto/v1/Restaurant-QR/dishes/" + dish.id}
                                                alt={dish.name}
                                                className="w-36 h-36 object-cover rounded-lg"
                                            />
                                        ) : (
                                            <div className="w-36 h-36 bg-gray-200 rounded-lg flex items-center justify-center">
                                                <i className="fa-solid fa-utensils text-gray-400 text-2xl"></i>
                                            </div>
                                        )}
                                        <div className="flex flex-col mt-2">
                                            <Chip color="primary" variant="flat" className="mb-2" size="sm">
                                                L. {dish.price.toFixed(2)}
                                            </Chip>
                                            <h4 className="text-lg font-semibold">{dish.name}</h4>
                                            <p className="text-gray-600 mb-2">{dish.description}</p>
                                        </div>
                                    </div>
                                    <div className="w-1/4 flex items-center justify-end">
                                        <i className="fa-solid fa-pen cursor-pointer"></i>
                                        <i className="fa-solid fa-trash ml-4 text-red-500 cursor-pointer"></i>
                                    </div>
                                </div>

                            </article>
                        ))}
                    </div>
                )}
            </div>
            <Modal size="5xl" backdrop={'blur'} isOpen={isOpen} placement="top-center" onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Crear platillo</ModalHeader>
                            <ModalBody>
                                <div className="flex items-center justify-between mb-4">
                                    <div className="mb-4 w-1/3 p-5">
                                        <div className="flex items-center justify-center mb-3 w-full">
                                            <label htmlFor="image-upload" className="cursor-pointer bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded-lg transition-colors w-full text-center">
                                                <i className="fa-solid fa-upload mr-2"></i> Subir Imagen
                                            </label>
                                            <input className="hidden"
                                                id="image-upload"
                                                name="image-upload"
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) => {
                                                    const file = e.target.files?.[0];
                                                    if (file) {
                                                        setImageFile(file);
                                                        setImagePreview(URL.createObjectURL(file));
                                                    }
                                                }}
                                            />
                                        </div>
                                        {imagePreview && (
                                            <div className="mt-3 flex justify-center">
                                                <img
                                                    src={imagePreview}
                                                    alt="Vista previa"
                                                    className="w-full object-cover rounded-lg border"
                                                />
                                            </div>
                                        )}
                                    </div>
                                    <div className="mb-4 w-2/3 flex flex-col gap-4">

                                        <Input
                                            label="Nombre del Platillo"
                                            variant="bordered"
                                            size='lg'
                                            value={nameNew}
                                            onChange={(e) => setNameNew(e.target.value)}
                                        />
                                        <Textarea
                                            label="Descripción del Platillo"
                                            variant="bordered"
                                            size='lg'
                                            value={descriptionNew}
                                            onChange={(e) => setDescriptionNew(e.target.value)}
                                            type='textarea'
                                            rows={4}
                                        />
                                        <Input
                                            label="Precio"
                                            variant="bordered"
                                            size='lg'
                                            type="number"
                                            min="0"
                                            step="0.01"
                                            value={priceNew}
                                            onChange={(e) => setPriceNew(e.target.value)}
                                        />

                                        <Select className="mb-5" onChange={(e) => setCategoryNew(e.target.value)} label="Categoría">
                                            {categories.map((category) => (
                                                <SelectItem key={category.id}>{category.name}</SelectItem>
                                            ))}
                                        </Select>
                                    </div>
                                </div>
                                {/* Imagen del platillo */}

                            </ModalBody>
                            <ModalFooter>
                                <Button className='rounded-lg' color="default" variant="flat" onPress={onClose}>
                                    Cancelar
                                </Button>
                                <Button isDisabled={savingNewDish} color="primary" onPress={saveDish} className='px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition disabled:bg-gray-400 disabled:cursor-not-allowed'>
                                    {savingNewDish ? "Guardando..." : "Guardar Platillo"}
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}
