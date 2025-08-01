import { useEffect, useRef, useState } from 'react';
import { FilePlus, Plus, X } from 'lucide-react';
import type { Templates, Dependencia, ParametersProps, TipoPqr } from '../../../interfaces/pqrInterfaces';
import { DependenciaServices, TemplatesServices, TipoPqrServices } from '../../../services/pqrServices';
import { FloatingSelect } from '../../../components/shared/FloatingSelect';
import { FloatingLabel } from '../../../components/shared/FloatingLabel';
import { EliminarEmojis } from '../../../utils/EliminarEmojis';
import { showToast } from '../../../utils/toastUtils';
import { useNavigate, useParams } from 'react-router-dom';



const TemplateForm = ({ Editing }: ParametersProps) => {
  const { code } = useParams();

  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [previewHtml, setPreviewHtml] = useState<string>("");
  const [selectedHtmlFile, setSelectedHtmlFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [newTag, setNewTag] = useState('');
  const [dependencia, setDependencia] = useState<Dependencia[]>([]);
  const [tipoPQR, setTipoPQR] = useState<TipoPqr[]>([]);
  const [formData, setFormData] = useState<Templates>({
    Id: '',
    TipoPQRId: '',
    NombreTipoPQR: null,
    PalabrasClave: [],
    Normatividad: '',
    Observaciones: '',
    DependenciaId: null,
    NombreDependencia: null,
    HtmlFile: null,
    PlantillaRespuestaHTML: null,
  });
  const navigate = useNavigate();

  const addTag = () => {
    const trimmedTag = newTag.trim();
    if (trimmedTag && !tags.includes(trimmedTag)) {
      setTags([...tags, trimmedTag]);
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };


  useEffect(() => {
    const fetchAllData = async () => {
      try {
        // Paso 1: Cargar dependencias y tipos PQR
        const [resDependencias, resTipoPQR] = await Promise.all([
          DependenciaServices.getAll(),
          TipoPqrServices.getAll()
        ]);

        if (!resDependencias.success) throw new Error(resDependencias.error);
        if (!resTipoPQR.success) throw new Error(resTipoPQR.error);

        setDependencia(resDependencias.data);
        setTipoPQR(resTipoPQR.data);

        // Paso 2: Si edición, traer la plantilla
        if (Editing && code) {
          const response = await TemplatesServices.getByCode(code);
          if (!response.success) throw new Error(response.error);

          const plantilla = response.data;

          // ✅ Mapea los tags ANTES de setFormData
          if (Array.isArray(plantilla.PalabrasClave) && plantilla.PalabrasClave.length > 0) {
            setTags([...plantilla.PalabrasClave]);
          } else {
            console.warn("No llegaron palabras claves desde el backend");
          }

          const tipo = resTipoPQR.data.find(tp => tp.nombre === plantilla.NombreTipoPQR);
          const dependenciaObj = resDependencias.data.find(dep => dep.nombre === plantilla.NombreDependencia);

          setFormData({
            ...plantilla,
            TipoPQRId: tipo?.id ?? '',
            DependenciaId: dependenciaObj?.id ?? null
          });

          if (plantilla.PlantillaRespuestaHTML) {
            setPreviewHtml(plantilla.PlantillaRespuestaHTML);
          }
        }



      } catch (err) {
        console.error("Error al cargar datos iniciales:", err);
      }
    };

    fetchAllData();
  }, [code, Editing]);


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
      setPreviewHtml(htmlContent); // 🔥 para mostrar vista previa en vivo
    };
    reader.readAsText(file);
  };

  const handleCancel = () => {
    navigate("/dashboard/admin/parametros/templates");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const palabrasObjeto = tags.map((tag) => ({ Palabra: tag }));

      // Construir parámetros en query string
      const queryParams = new URLSearchParams();
      queryParams.append("TipoPQRId", formData.TipoPQRId);
      queryParams.append("Normatividad", formData.Normatividad);
      queryParams.append("Observaciones", formData.Observaciones);
      if (Editing && code) {
        queryParams.append("Id", code);
      }
      if (formData.DependenciaId !== null) {
        queryParams.append("DependenciaId", formData.DependenciaId.toString());
      }


      // Agrega cada palabra por separado como array[]
      palabrasObjeto.forEach((item) => {
        queryParams.append("PalabrasClave", item.Palabra);
      });

      // Preparar el FormData solo con el archivo
      const formDataToSend = new FormData();
      if (selectedHtmlFile) {
        formDataToSend.append("HtmlFile", selectedHtmlFile);
      }



      let response;



      if (Editing) {
        const formDataToUpdate = new FormData();

        formDataToUpdate.append("Id", formData.Id); // o code, según lo que uses
        formDataToUpdate.append("TipoPQRId", formData.TipoPQRId);
        formDataToUpdate.append("Normatividad", formData.Normatividad);
        formDataToUpdate.append("Observaciones", formData.Observaciones);
        if (formData.DependenciaId !== null) {
          formDataToUpdate.append("DependenciaId", formData.DependenciaId.toString());
        }

        tags.forEach((tag) => {
          formDataToUpdate.append("PalabrasClave", tag);
        });

        if (selectedHtmlFile) {
          const fieldName = Editing ? "PlantillaRespuestaHTML" : "HtmlFile";
          formDataToUpdate.append(fieldName, selectedHtmlFile);
        }

        response = await TemplatesServices.updateTemplate(formDataToUpdate);
      } else {
        response = await TemplatesServices.createTemplate(queryParams, formDataToSend);
      }

      if (!response.success) throw new Error(response.error);
      showToast(
        Editing ? "Parámetro Actualizado Correctamente" : "Parámetro Creado Correctamente",
        "success"
      );
      navigate("/dashboard/admin/parametros");
    } catch (error: any) {
      console.error("Error en formulario de parámetro:", error);
      showToast("Error al guardar el parámetro", "error");
    }
  };


  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <form onSubmit={handleSubmit}>
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
                  <Plus className="w-5 h-5 text-white" />
                </div>
                <div className="flex font-bold text-[33px]">
                  {Editing ? <p>Editar Plantilla</p> : <p>Crear Plantilla</p>}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6">
              {/* Formulario */}
              <div className="space-y-6">
                {/* Dependencia */}
                <FloatingSelect
                  label="Dependencia"
                  value={formData.DependenciaId?.toString() || ""}
                  onChange={(value) =>
                    setFormData((prev) => ({
                      ...prev,
                      DependenciaId: value ? parseInt(value, 10) : null,
                    }))
                  }
                  options={dependencia.map((d) => ({
                    value: d.id.toString(),
                    label: d.nombre,
                  }))}
                  placeholder="Elige una opción"
                />


                {/* Tipo de PQR */}
                <FloatingSelect
                  label="Tipo PQR"
                  value={formData.TipoPQRId || ""}
                  onChange={(value) =>
                    setFormData((prev) => ({
                      ...prev,
                      TipoPQRId: value,
                    }))
                  }
                  options={tipoPQR.map((tc) => ({
                    value: tc.id,
                    label: tc.nombre,
                  }))}
                  placeholder="Elige una opción"
                />


                {/* Palabras claves */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Palabras claves (añada la palabra y presione Enter)*
                  </label>

                  <div className="flex flex-wrap gap-2 mb-3">
                    {tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1 px-3 py-1 bg-green-500 text-white text-sm rounded-full"
                      >
                        {tag}
                        <button
                          onClick={() => removeTag(tag)}
                          className="ml-1 hover:bg-green-600 rounded-full p-0.5"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>

                  <FloatingLabel
                    id="palabrasClaves"
                    label="Agregar palabra clave"
                    value={newTag}
                    className={`w-full ${tags.length > 0 ? "" : "mb-3"}`}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addTag();
                      }
                    }}
                  />
                </div>

                {/* Observaciones */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Observaciones
                  </label>
                  <textarea
                    id="observaciones"
                    name="observaciones"
                    value={formData.Observaciones}
                    onChange={(e) => {
                      const sinEmojis = EliminarEmojis(e.target.value);
                      setFormData((prev) => ({
                        ...prev,
                        Observaciones: sinEmojis,
                      }));
                    }}
                    rows={4}
                    placeholder="Para que servirá la plantilla."
                    className="w-full border rounded-lg px-3 py-3 text-sm resize-none overflow-y-auto focus:outline-none focus:ring-2 border-gray-300 focus:ring-green-400 "
                  />
                </div>

                {/* Normatividad */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Normatividad
                  </label>
                  <textarea
                    id="normatividad"
                    name="normatividad"
                    value={formData.Normatividad}
                    onChange={(e) => {
                      const sinEmojis = EliminarEmojis(e.target.value);
                      setFormData((prev) => ({
                        ...prev,
                        Normatividad: sinEmojis,
                      }));
                    }}
                    rows={4}
                    placeholder="Detalle la normatividad relacionada..."
                    className="w-full border rounded-lg px-3 py-3 text-sm resize-none overflow-y-auto focus:outline-none focus:ring-2 border-gray-300 focus:ring-green-400 "
                  />
                </div>

                {/* Subir archivos */}
                <div>
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
                </div>
              </div>

              {/* Vista previa */}
              <div className="bg-gray-50 h-fit rounded-lg p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Vista previa de la Respuesta HTML:
                </h2>
                <iframe
                  ref={iframeRef}
                  title="Vista previa HTML"
                  className="w-full border rounded"
                  style={{
                    minHeight: "600px",
                    border: "none",
                    display: "block",
                  }}
                  srcDoc={`<style>
                  html, body {
                    margin: 0;
                    padding: 0;
                  }
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

            {/* Botones de acción */}
            <div className="flex items-center justify-end gap-3 p-6">
              <button
                className="px-6 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
                onClick={handleCancel}
                type='button'
              >
                Cancelar
              </button>
              <button
                className="px-6 py-2 text-white bg-green-500 rounded-lg hover:bg-green-600 transition-colors"
                type='submit'
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default TemplateForm;

