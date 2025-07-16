import { FilePlus, Settings } from "lucide-react";
import { FloatingLabel } from "../../components/shared/FloatingLabel";
import { useEffect, useRef, useState } from "react";
import { ParametersServices } from "../../services/pqrServices";
import { FloatingSelect } from "../../components/shared/FloatingSelect";

import { useNavigate, useParams } from "react-router-dom";
import type { Parameters } from "../../interfaces/pqrInterfaces";
import { showToast } from "../../utils/toastUtils";

interface ParametersProps {
    Editing?: boolean;
}

const ParametrosFrm = ({ Editing }: ParametersProps) => {

    const { code } = useParams();
    const [paraTypes, setParaTypes] = useState<string[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);
    //const [htmlContent, setHtmlContent] = useState<string>("");
    const [selectedHtmlFile, setSelectedHtmlFile] = useState<File | null>(null);
    const [previewHtml, setPreviewHtml] = useState<string>("");
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState<Parameters>({
        codigo: "",
        tipoParametro: "",
        descripcion: "",
        valorString: null,
        valorInt: null,
        valorDecimal: null,
        valorDate: null,
        valorBool: null,
        valorImgUrl: null,
        valorHtml: null,
    });

    const navigate = useNavigate();

    useEffect(() => {
        const fecthData = async () => {
            try {
                const typesParameter = await ParametersServices.getTypesParameter();
                if (!typesParameter.success) throw new Error(typesParameter.error);

                setParaTypes(typesParameter.data); // Esto siempre lo haces

                if (Editing && code) {
                    const responseParameter = await ParametersServices.getParameterByCode(code);
                    if (!responseParameter.success) throw new Error(responseParameter.error);

                    setFormData(responseParameter.data);

                    if (responseParameter.data.valorHtml) {
                        // Solo usar si no se ha cargado un nuevo archivo
                        setPreviewHtml(responseParameter.data.valorHtml);
                    }
                }
                else {
                    // Si estás creando, asegúrate de limpiar el formData (opcional, por claridad)
                    setFormData({
                        codigo: "",
                        tipoParametro: "",
                        descripcion: "",
                        valorString: null,
                        valorInt: null,
                        valorDecimal: null,
                        valorDate: null,
                        valorBool: null,
                        valorImgUrl: null,
                        valorHtml: null,
                    });
                }
            } catch (error) {
                console.error("Error al cargar datos iniciales:", error);
            } finally {
                setLoading(false);
            }
        };

        fecthData();
    }, [Editing, code]);


    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        if (!file.name.endsWith(".html")) {
            showToast("Por favor selecciona un archivo HTML válido.", "error");
            return;
        }

        setSelectedHtmlFile(file);

        const reader = new FileReader();
        reader.onload = (e) => {
            const htmlContent = e.target?.result as string;
            //setHtmlContent(htmlContent);
            setPreviewHtml(htmlContent); // 🔥 para mostrar vista previa en vivo
        };
        reader.readAsText(file);
    };



    const handleCancel = () => {
        navigate("/dashboard/admin/parametros");
    }




    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const formDataToSend = new FormData();
            if (formData.tipoParametro === "Html" && !selectedHtmlFile && !Editing) {
                showToast("Debes subir un archivo HTML para este tipo de parámetro", "error");
                return;
            }

            // Siempre agregamos estos campos básicos
            formDataToSend.append("Codigo", formData.codigo);
            formDataToSend.append("Descripcion", formData.descripcion);
            formDataToSend.append("TipoParametro", formData.tipoParametro);

            if (formData.valorString !== null)
                formDataToSend.append("ValorString", formData.valorString);
            if (formData.valorInt !== null)
                formDataToSend.append("ValorInt", formData.valorInt.toString());
            if (formData.valorDecimal !== null)
                formDataToSend.append("ValorDecimal", formData.valorDecimal.toString());
            if (formData.valorDate !== null)
                formDataToSend.append("ValorDate", formData.valorDate);
            if (formData.valorBool !== null)
                formDataToSend.append("ValorBool", formData.valorBool.toString());
            if (formData.valorImgUrl !== null)
                formDataToSend.append("ValorImgUrl", formData.valorImgUrl);

            if (selectedHtmlFile) {
                formDataToSend.append("HtmlFile", selectedHtmlFile);
            }

            let response;

            if (Editing) {
                response = await ParametersServices.updateParameter(formDataToSend);
            } else {
                response = await ParametersServices.createParameter(formDataToSend);
            }

            if (!response.success) throw new Error(response.error);

            showToast(
                Editing ? "Parámetro Actualizado Correctamente" : "Parámetro Creado Correctamente",
                "success"
            );
            navigate("/dashboard/admin/parametros");
        } catch (error) {
            console.error("Error en formulario de parámetro:", error);
            showToast("Error al guardar el parámetro", "error");
        }
    };




    return (
        <div className="h-full flex flex-col">
            <div className="flex mb-[15px] items-center gap-x-5">
                <Settings size={40} />
                <div className="flex font-bold text-[33px]">
                    {Editing ? <p>Editar Parámetro</p> : <p>Crear Parámetro</p>}
                </div>
            </div>
            <div className="flex-1 flex-col overflow-y-auto bg-gray-100 px-6 py-4 rounded-lg space-y-4">
                <form
                    className="flex flex-col space-y-2 bg-white p-6 rounded-lg shadow-md w-full"
                    onSubmit={handleSubmit}
                >
                    {loading && (
                        <div className="absolute inset-0 z-10 flex items-center justify-center bg-white bg-opacity-95 rounded-lg">
                            <div className="flex flex-col items-center gap-2">
                                <div className="w-10 h-10 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
                                <p className="text-gray-600 text-md mt-2">Cargando parámetro...</p>
                            </div>
                        </div>
                    )}
                    <h2 className="text-xl font-semibold mb-4 border-b-2 border-gray-300">Datos del Parámetro</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        <FloatingLabel
                            id="documento"
                            label="Código"
                            className="w-full"
                            value={formData.codigo}
                            onChange={(e) =>
                                setFormData((prev) => ({ ...prev, codigo: e.target.value }))
                            }
                        />
                        <FloatingSelect
                            label="Tipo"
                            value={formData.tipoParametro || ""}
                            options={paraTypes.map((type) => ({
                                value: type,
                                label: type,
                            }))}
                            placeholder="Seleccionar tipo de parámetro"
                            className="w-lg"
                            onChange={(value: string) => {
                                setFormData((prev) => ({
                                    ...prev,
                                    tipoParametro: value,
                                }));
                            }}
                        />
                    </div>
                    <div className="">
                        <FloatingLabel
                            id="documento"
                            label="Descripción"
                            className="w-full"
                            value={formData.descripcion}
                            onChange={(e) =>
                                setFormData((prev) => ({ ...prev, descripcion: e.target.value }))
                            }
                        />
                    </div>

                    {/* Renderizado condicional */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {formData.tipoParametro === "Date" && (
                            <FloatingLabel
                                id="fecha"
                                label="Fecha"
                                type="date"
                                className="w-full"
                                value={formData.valorDate || ""}
                                onChange={(e) =>
                                    setFormData((prev) => ({ ...prev, valorDate: e.target.value }))
                                }
                            />

                        )}

                        {formData.tipoParametro === "String" && (
                            <FloatingLabel
                                id="texto"
                                label="Texto"
                                type="text"
                                className="w-full"
                                value={formData.valorString || ""}
                                onChange={(e) =>
                                    setFormData((prev) => ({ ...prev, valorString: e.target.value }))
                                }
                            />
                        )}


                        {formData.tipoParametro === "Int" && (
                            <FloatingLabel
                                id="numero"
                                label="Número"
                                type="number"
                                value={formData.valorInt || ""}
                                onChange={(e) =>
                                    setFormData((prev) => ({
                                        ...prev,
                                        valorInt: e.target.value === "" ? null : Number(e.target.value),
                                    }))
                                }
                            />

                        )}

                        {formData.tipoParametro === "Bool" && (
                            <div>
                                <p className="text-gray-500 font-semibold pb-2">Inactivo/Activo</p>
                                <div className="pl-6">
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            className="sr-only peer"
                                            checked={formData.valorBool === true} // aquí conectas el valor
                                            onChange={(e) =>
                                                setFormData((prev) => ({
                                                    ...prev,
                                                    valorBool: e.target.checked,
                                                }))
                                            }
                                        />
                                        <div
                                            className="group peer bg-white rounded-full duration-300 w-12 h-6 ring-2 ring-gray-400 after:duration-300 after:bg-gray-400 peer-checked:after:bg-green-600 peer-checked:ring-green-600 after:rounded-full after:absolute after:h-5 after:w-5 after:top-0.5 after:left-0.5 after:flex after:justify-center after:items-center peer-checked:after:translate-x-6 peer-hover:after:scale-95"
                                        ></div>
                                    </label>
                                </div>
                            </div>
                        )}


                        {formData.tipoParametro === "Decimal" && (
                            <FloatingLabel
                                type="number"
                                step="any"
                                className="border rounded px-2 py-1"
                                id={"decimal"}
                                label={"Decimal"}
                                value={formData.valorInt || ""}
                                onChange={(e) =>
                                    setFormData((prev) => ({
                                        ...prev,
                                        valorDecimal: e.target.value === "" ? null : Number(e.target.value),
                                    }))
                                }
                            />

                        )}
                        {formData.tipoParametro === "ImgUrl" && (
                            <FloatingLabel
                                type="url"
                                className="border rounded px-2 py-1"
                                id={"imgUrl"}
                                label={"ValorImgUrl"}
                                value={formData.valorImgUrl || ""}
                                onChange={(e) =>
                                    setFormData((prev) => ({ ...prev, valorImgUrl: e.target.value }))
                                }
                            />
                        )}
                        {formData.tipoParametro === "Html" && (
                            <div className="flex flex-col space-y-4">
                                <p className="text-gray-500 font-semibold">Plantilla HTML</p>

                                {/* Input de archivo oculto */}
                                <input
                                    type="file"
                                    accept=".html"
                                    ref={fileInputRef}
                                    onChange={handleFileChange}
                                    style={{ display: 'none' }}
                                />


                                {/* Botón de subir */}
                                <button
                                    type="button"
                                    onClick={() => fileInputRef.current?.click()}
                                    className="flex items-center justify-center px-4 py-2 bg-green-600 text-white text-xs leading-4 font-bold text-center cursor-pointer select-none rounded-lg gap-3 shadow-md transition-all duration-500 ease-in-out hover:shadow-lg hover:shadow-green-200 active:opacity-85 active:shadow-none focus:outline-none focus:opacity-85 focus:shadow-none w-max"
                                >
                                    <FilePlus className="w-4 h-4" />
                                    Subir
                                </button>

                                <div className="border border-gray-300 rounded-lg p-4 bg-white">
                                    <p className="text-gray-500 font-semibold mb-2">Vista previa:</p>
                                    <iframe
                                        title="Vista previa HTML"
                                        className="w-full min-h-[300px] border rounded"
                                        srcDoc={`<style>
                                            a {
                                                pointer-events: none !important;
                                                cursor: default !important;
                                                text-decoration: none !important;
                                                color: inherit !important;
                                            }
                                        </style>${previewHtml}`}
                                    />

                                </div>

                            </div>
                        )}


                    </div>
                    <div className="flex justify-end gap-4 mt-auto pt-6 border-gray-200">
                        <button
                            type="button"
                            onClick={handleCancel}
                            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 font-semibold text-sm hover:bg-gray-100 transition"
                        >
                            Cancelar
                        </button>

                        <button
                            type="submit"
                            className="px-6 py-2 bg-green-600 text-white rounded-lg font-semibold text-sm hover:bg-green-700 transition"
                        >
                            {Editing ? 'Actualizar' : 'Guardar'}
                        </button>
                    </div>


                </form>
            </div>
        </div>
    );
};


export default ParametrosFrm;
