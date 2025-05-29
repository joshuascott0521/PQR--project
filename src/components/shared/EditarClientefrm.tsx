import React, { useEffect, useState } from "react";
import { FloatingLabel } from "./FloatingLabel";
import type { Cliente, departamento, Municipio, tipoCliente } from "../../interfaces/pqrInterfaces";
import { useParams } from "react-router-dom";
import { ClientesServices, RegionServices, TipoClienteServices, TipoPqrServices } from "../../services/pqrServices";
import { FloatingSelect } from "./FloatingSelect";
import { mostrarAlertaExito } from "../../libs/alerts";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";



const ClienteForm = () => {
    const navigate = useNavigate();
    const [errores, setErrores] = useState<{ [key: string]: boolean }>({});

    const [loading, setLoading] = useState(true);

    const { id } = useParams();
    const [tipoCliente, setTipoCliente] = useState<tipoCliente[]>([])
    const [listaDepartamentos, setListaDepartamentos] = useState<departamento[]>([]);
    const [listaMunicipios, setListaMunicipios] = useState<Municipio[]>([])

    const [formData, setFormData] = useState<Cliente>({
        id: "",
        documento: "",
        nombre: "",
        email: "",
        celular: "",
        direccion: "",
        departamentoCod: 0,
        municipioCod: 0,
        tipoClienteId: "",
    });

    useEffect(() => {
        const fetchData = async () => {
            try {

                const clientRes = await ClientesServices.getById(id!);
                if (!clientRes.success) throw new Error(clientRes.error);

                const tipoClienteRes = await TipoClienteServices.getall();
                if (!tipoClienteRes.success) throw new Error(tipoClienteRes.error);

                const departamentosRes = await RegionServices.getDepart();
                if (!departamentosRes.success) throw new Error(departamentosRes.error);

                const tipoPqrRes = await TipoPqrServices.getAll();
                if (!tipoPqrRes.success) throw new Error(tipoPqrRes.error);

                if (clientRes.data.departamentoCod) {
                    const municipioRes = await RegionServices.getMun(clientRes.data.departamentoCod);
                    if (municipioRes.success) {
                        setListaMunicipios(municipioRes.data);
                    }
                }
                setTipoCliente(tipoClienteRes.data);
                setListaDepartamentos(departamentosRes.data);
                setFormData(clientRes.data)
            } catch (error) {
                console.error("Error al cargar datos iniciales:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [])

    const validateForm = () => {
        if (!formData.documento.trim()) {
            toast.error("Por favor ingresa el documento del cliente.");
            setErrores({ documento: true });
            return false;
        }

        if (!formData.nombre.trim()) {
            toast.error("Por favor ingresa el nombre completo del cliente.");
            setErrores({ nombre: true });
            return false;
        }

        if (!formData.tipoClienteId) {
            toast.error("Por favor selecciona el tipo de cliente.");
            setErrores({ tipoClienteId: true });
            return false;
        }

        if (!formData.email.trim()) {
            toast.error("Por favor ingresa el correo electrónico.");
            setErrores({ email: true });
            return false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            toast.error("El correo electrónico no es válido.");
            setErrores({ email: true });
            return false;
        }

        if (!formData.celular.trim()) {
            toast.error("Por favor ingresa el número de celular.");
            setErrores({ celular: true });
            return false;
        }

        if (!formData.direccion.trim()) {
            toast.error("Por favor ingresa la dirección.");
            setErrores({ direccion: true });
            return false;
        }

        if (formData.departamentoCod === 0) {
            toast.error("Selecciona un departamento.");
            setErrores({ departamentoCod: true });
            return false;
        }

        if (formData.municipioCod === 0) {
            toast.error("Selecciona un municipio.");
            setErrores({ municipioCod: true });
            return false;
        }

        setErrores({});
        return true;
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!validateForm()) return;
        try {
            const response = await ClientesServices.update(formData);
            if (response.success) {
                mostrarAlertaExito("¡Cliente actualizado exitosamente!");

                navigate("/dashboard/admin/cliente");
            } else {
                console.error("Error al registrar el PQR:", response.error);
            }
        } catch (error) {
            console.error("Error inesperado al guardar:", error);
        }
    };

    return (
        <div className="flex relative w-full">
            {loading && (
                <div className="absolute inset-0 z-10 flex items-center justify-center bg-white bg-opacity-75 rounded-lg min-h-[335px]">

                    <div className="flex flex-col items-center gap-2">
                        <div className="w-10 h-10 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
                        <p className="text-gray-600 text-md mt-2">Cargando cliente...</p>
                    </div>
                </div>
            )}

            {!loading && (
                <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-md w-full">
                    <h2 className="text-xl font-semibold mb-4">Datos del Cliente</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        <FloatingLabel
                            id="documento"
                            label="Documento"
                            value={formData.documento}
                            className={`w-full ${errores.documentoCliente ? "border-red-500" : ""}`}
                            onChange={(e) => setFormData((prev) => ({ ...prev, documento: e.target.value }))}
                        />
                        <FloatingLabel
                            id="nombreYApellido"
                            label="Nombre y Apellidos"
                            value={formData.nombre}
                            className={`w-full ${errores.nombre ? "border-red-500" : ""}`}
                            onChange={(e) => setFormData((prev) => ({ ...prev, nombre: e.target.value }))}
                        />
                        <FloatingLabel
                            id="email"
                            label="Email"
                            value={formData.email}
                            onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                            className={`w-full ${errores.email ? "border-red-500" : ""}`}
                        />
                        <FloatingLabel
                            id="celular"
                            label="Celular"
                            value={formData.celular}
                            onChange={(e) => setFormData((prev) => ({ ...prev, celular: e.target.value }))}
                            className={`w-full ${errores.celular ? "border-red-500" : ""}`}
                        />
                        <FloatingLabel
                            id="direccion"
                            label="Dirección"
                            value={formData.direccion}
                            onChange={(e) => setFormData((prev) => ({ ...prev, direccion: e.target.value }))}
                            className={`w-full ${errores.direccion ? "border-red-500" : ""}`}
                        />
                        <FloatingSelect
                            label="Tipo Cliente"
                            value={formData.tipoClienteId}
                            onChange={(value) => setFormData(prev => ({ ...prev, tipoClienteId: value }))}
                            options={tipoCliente.map(tc => ({ value: tc.id, label: tc.nombre }))}
                            placeholder="Elige una opción"
                            className={`w-lg ${errores.tipoClienteId ? "border-red-500" : ""}`}
                        />
                        <FloatingSelect
                            label="Departamento"
                            value={
                                formData.departamentoCod === 0 ? "" : formData.departamentoCod.toString()
                            }
                            placeholder="Seleccionar Departamento"
                            onChange={async (value) => {
                                const cod = Number(value);
                                const dep = listaDepartamentos.find((d) => d.cod === cod);
                                if (dep) {
                                    setFormData((prev) => ({
                                        ...prev,
                                        departamentoCod: dep.cod,
                                        municipioCod: 0,
                                    }));
                                    try {
                                        const municipioRes = await RegionServices.getMun(dep.cod);
                                        if (municipioRes.success) {
                                            setListaMunicipios(municipioRes.data);
                                        } else {
                                            setListaMunicipios([]);
                                        }
                                    } catch {
                                        setListaMunicipios([]);
                                    }
                                }
                            }}
                            options={listaDepartamentos.map(dep => ({
                                value: dep.cod?.toString() || "",
                                label: dep.nombre || ""
                            }))}
                            className={`w-lg ${errores.departamentoCod ? "border-red-500" : ""}`}
                        />
                        <FloatingSelect
                            label="Municipio"
                            placeholder="Seleccionar Municipio"
                            value={
                                formData.municipioCod === 0 ? "" : formData.municipioCod.toString()
                            }

                            options={listaMunicipios.map((mun) => ({
                                value: mun.cod.toString(),
                                label: mun.nombre,
                            }))}
                            onChange={(value) => {
                                const cod = parseInt(value, 10);
                                const mun = listaMunicipios.find((m) => m.cod === cod);
                                if (mun) {
                                    setFormData((prev) => ({
                                        ...prev,
                                        municipioCod: mun.cod,
                                    }));
                                }
                            }}
                            className={`w-full ${errores.municipioCod ? "border-red-500" : ""}`}
                        />
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition"
                        >
                            Guardar Cliente
                        </button>
                    </div>


                </form>
            )}
        </div>
        
    );
};

export default ClienteForm;
