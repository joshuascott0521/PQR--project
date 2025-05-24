import { IoMdPersonAdd } from "react-icons/io";
import { FloatingLabel } from "../../components/shared/FloatingLabel";
import { FaSearch } from "react-icons/fa";
import { FloatingSelect } from "../../components/shared/FloatingSelect";
import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { FcList } from "react-icons/fc";

const NuevoPqr = () => {
    const [rol, setRol] = useState("");
    const [departamento, setDepartamento] = useState("");
    const [municipio, setMunicipio] = useState("");
    const [tipoPeticion, setTipoPeticion] = useState("");
    const [origen, setOrigen] = useState("");


    const opciones = [
        { value: "admin", label: "Administrador" },
        { value: "user", label: "Usuario" },
        { value: "guest", label: "Invitado" },
    ];

    const departamentos = [
        { value: "antioquia", label: "Antioquia" },
        { value: "cundinamarca", label: "Cundinamarca" },
        { value: "valle", label: "Valle del Cauca" },
    ];

    const municipiosPorDepartamento: Record<string, { value: string; label: string }[]> = {
        antioquia: [
            { value: "medellin", label: "Medellín" },
            { value: "envigado", label: "Envigado" },
            { value: "bello", label: "Bello" },
        ],
        cundinamarca: [
            { value: "bogota", label: "Bogotá" },
            { value: "soacha", label: "Soacha" },
            { value: "chia", label: "Chía" },
        ],
        valle: [
            { value: "cali", label: "Cali" },
            { value: "palmira", label: "Palmira" },
            { value: "tulua", label: "Tuluá" },
        ],
    };

    const tiposDePeticion = [
        { value: "informacion", label: "Petición de información" },
        { value: "reclamo", label: "Reclamo" },
        { value: "queja", label: "Queja" },
        { value: "sugerencia", label: "Sugerencia" },
        { value: "felicitacion", label: "Felicitación" },
    ];

    const origenes = [
        { value: "web", label: "Portal Web" },
        { value: "presencial", label: "Atención presencial" },
        { value: "telefono", label: "Llamada telefónica" },
        { value: "correo", label: "Correo electrónico" },
        { value: "redes", label: "Redes sociales" },
    ];



    useEffect(() => {
        setMunicipio("");
    }, [departamento]);

    return (
        <div className="h-full flex flex-col">
            {/* Título con icono */}
            <div className="flex mb-4 items-center gap-3">
                <IoMdPersonAdd className="text-[32px]" />
                <h1 className="font-semibold text-2xl">Registrar un nuevo PQR</h1>
            </div>

            {/* Formulario */}
            <div className="bg-white rounded-lg w-full h-[600px] overflow-y-auto p-6 shadow-md">

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
                            <FloatingLabel id="email" label="Email" className="w-lg" />
                            <FloatingLabel id="celular" label="Celular" className="w-lg" />
                            <FloatingLabel id="direccion" label="Dirección" className="w-lg" />
                            <FloatingSelect
                                label="Departamento"
                                value={departamento}
                                onChange={setDepartamento}
                                options={departamentos}
                            />

                            {departamento && (
                                <FloatingSelect
                                    label="Municipio"
                                    value={municipio}
                                    onChange={setMunicipio}
                                    options={municipiosPorDepartamento[departamento] || []}
                                    disabled={!departamento}
                                />
                            )}

                        </div>
                        <h2 className="text-xl font-semibold my-2">Datos del PQR</h2>
                        <div className="border-b-2 border-gray-300 mb-4" />
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            <FloatingLabel id="noRadicado" label="No. Radicado" className="w-lg" />
                            <FloatingLabel id="fecha" label="Fecha" className="w-lg" type="date" />
                            <FloatingSelect
                                label="Tipo de Petición"
                                value={tipoPeticion}
                                onChange={setTipoPeticion}
                                options={tiposDePeticion}
                            />
                            <FloatingSelect
                                label="Origen"
                                value={origen}
                                onChange={setOrigen}
                                options={origenes}
                            />
                        </div>
                        <div className="w-full h-10 flex justify-between mt-2">
                            <div className="w-44">
                                <div className="flex justify-end h-full">
                                    <div className="h-full w-10 flex justify-center items-center rounded-full">
                                        <CiSearch className="size-20" />
                                    </div>
                                </div>
                            </div>
                            <input
                                type="text"
                                className="w-3/4 border-2 border-gray-300 rounded-lg"
                                name="asunto"
                                
                            />
                            <div className="w-44">
                                <div className="h-full">
                                    <div className="h-full w-10 bg-blue-400 rounded-full flex justify-center items-center">
                                        <FcList className="bg-white size-5" />
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </form>
            </div>
        </div>
    );
};

export default NuevoPqr;
