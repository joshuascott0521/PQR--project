import { IoMdPersonAdd } from "react-icons/io";
import { FloatingLabel } from "../../components/shared/FloatingLabel";
import { FaSearch } from "react-icons/fa";
import { FloatingSelect } from "../../components/shared/FloatingSelect";
import { useState } from "react";

const NuevoPqr = () => {
    const [rol, setRol] = useState("");

    const opciones = [
        { value: "admin", label: "Administrador" },
        { value: "user", label: "Usuario" },
        { value: "guest", label: "Invitado" },
    ];
    return (
        <div className="h-full flex flex-col">
            {/* Título con icono */}
            <div className="flex mb-4 items-center gap-3">
                <IoMdPersonAdd className="text-[32px]" />
                <h1 className="font-semibold text-2xl">Registrar un nuevo PQR</h1>
            </div>

            {/* Formulario */}
            <div className="bg-white rounded-lg w-full h-full p-6 shadow-md">
                <form>
                    {/* Sección de Datos del Cliente */}
                    <div className="mb-6">
                        <h2 className="text-xl font-semibold mb-2">Datos del cliente</h2>
                        <div className="border-b-2 border-gray-300 mb-4" />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {/* Input con botón interno */}
                            <div className="relative w-full md:w-lg">
                                <FloatingLabel
                                    id="documentoCliente"
                                    label="Documento Cliente"
                                    className="pr-12" // espacio para el botón
                                />

                                <button
                                    type="button"
                                    title="Buscar cliente"
                                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black p-2 rounded-full hover:bg-gray-800 transition-colors"
                                >
                                    <FaSearch className="text-white text-lg" />
                                </button>
                            </div>
                            <FloatingLabel id="nombresYApellidos" label="Nombres y Apellidos" className="w-lg" />
                            <FloatingSelect
                                label="Tipo Cliente"
                                value={rol}
                                onChange={setRol}
                                options={opciones}
                                placeholder="Elige una opción"
                            />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default NuevoPqr;
