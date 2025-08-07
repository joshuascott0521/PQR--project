import { Upload, UserRoundPen } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { UsersServices } from "../../services/pqrServices";
import type { Usuario } from "../../interfaces/pqrInterfaces";
import { FloatingLabel } from "../../components/shared/FloatingLabel";
import { useNavigate } from "react-router-dom";
import { showToast } from "../../utils/toastUtils";
import { PerfilSkeleton } from "../../components/shared/PerfilSkeleton";
import { mostrarAlertaExito } from "../../libs/alerts";

export const VistaPerfil = () => {
  const navigate = useNavigate();

  const userDataString = localStorage.getItem("userData");
  const userData = userDataString ? JSON.parse(userDataString) : null;
  const usuarioId = userData?.id;
  const inputRef = useRef<HTMLInputElement>(null);
  const [imagenFirma, setImagenFirma] = useState<string | null>(null);

  const [formData, setFormData] = useState<Usuario>({
    id: "",
    documento: "",
    nombre: "",
    tipoUsuNombre: "",
    role: "",
    email: "",
    celular: "",
    estado: "",
    dependenciaNombre: "",
    firma: "",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fecthData = async () => {
      try {
        const funcionarioRes = await UsersServices.getById(usuarioId);
        if (!funcionarioRes.success) throw new Error(funcionarioRes.error);
        setFormData(funcionarioRes.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false); // 👈 Esto asegura que se quite el skeleton
      }
    };
    fecthData();
  }, []);

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleArchivo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const archivo = e.target.files?.[0];

    if (!archivo) return;

    const maxSizeMB = 3;
    const maxSizeBytes = maxSizeMB * 1024 * 1024;

    if (archivo.size > maxSizeBytes) {
      showToast("La firma supera los 3 MB. Por favor usa una imagen más liviana.");
      return;
    }

    if (!archivo.type.startsWith("image/png")) {
      showToast("Solamente se permiten archivos PNG");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const firmaBase64 = reader.result as string;
      setImagenFirma(firmaBase64);
      setFormData((prev) => ({ ...prev, firma: firmaBase64 }));
    };
    reader.readAsDataURL(archivo);
  };


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      let firmaFile: File | undefined;

      if (imagenFirma) {
        const response = await fetch(imagenFirma);
        const blob = await response.blob();
        firmaFile = new File([blob], "firma.png", { type: "image/png" });
      }

      // Alias para que coincida con lo que espera el backend
      const funcionarioPayload = {
        Id: formData.id,
        Documento: formData.documento,
        Nombre: formData.nombre,
        Email: formData.email,
        Celular: formData.celular,
      };

      const response = await UsersServices.updatePerfil(funcionarioPayload, firmaFile);

      if (!response.success) {
        throw new Error(response.error);
      }

      mostrarAlertaExito("Perfil actualizado correctamente");
      navigate("/dashboard/statistic");
    } catch (error) {
      console.error("Error inesperado al guardar:", error);
      showToast("Ocurrió un error al actualizar el perfil.");
    }
  };



  useEffect(() => {
    console.log("Firma en formData actualizada:", formData);
  }, [formData.firma]);


  const handleCancel = () => {
    navigate("/dashboard/statistic");
  };
  //   if (loading) return <PerfilSkeleton />;

  return (
    <div className="h-full flex flex-col">
      <div className="flex flex-row mb-[15px] items-center gap-[15px]">
        <UserRoundPen size={35} />
        <div className="flex font-bold text-[33px]">
          <p>Editar Perfil</p>
        </div>
      </div>
      <div className="flex-1 flex-col overflow-y-auto bg-gray-100 px-6 py-4 rounded-lg space-y-4">
        {loading ? (
          <PerfilSkeleton />
        ) : (
          <form
            className="flex flex-col space-y-2 bg-white px-6 py-2.5 rounded-lg shadow-md w-full"
            onSubmit={handleSubmit}
          >
            <h2 className="text-xl font-semibold mb-4 border-b-2 border-gray-300">
              Datos del Funcionario
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pb-3">
              <FloatingLabel
                id="documento"
                label="Documento"
                className="w-full"
                value={formData.documento}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    documento: e.target.value,
                  }))
                }
              />
              <FloatingLabel
                id="nombre"
                label="Nombre"
                className="w-full"
                value={formData.nombre}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, nombre: e.target.value }))
                }
              />
              <FloatingLabel
                id="tipoFuncionario"
                label="Tipo Funcionario"
                className="w-full"
                value={formData.tipoUsuNombre}
                disabled
              />
              <FloatingLabel
                id="dependencia"
                label="Dependencia"
                className="w-full"
                value={formData.dependenciaNombre}
                disabled
              />
              <FloatingLabel
                id="celular"
                label="Celular"
                className="w-full"
                value={formData.celular}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, celular: e.target.value }))
                }
              />
              <FloatingLabel
                id="email"
                label="Email"
                className="w-full"
                value={formData.email}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, email: e.target.value }))
                }
              />
              <FloatingLabel
                id="estado"
                label="Estado"
                className="w-full"
                value={formData.estado}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, estado: e.target.value }))
                }
                disabled
              />
            </div>
            <hr className="border-t border-gray-300" />
            <h2 className="text-lg font-semibold text-gray-600 mb-4 ">
              Firma Mecánica
            </h2>
            <div className="flex justify-between items-start gap-4">
              <div className="w-1/2 text-xs text-gray-600">
                <p className="mb-1">
                  Sube la firma del funcionario. La imagen debe cumplir con los
                  siguiente requisitos:
                </p>
                <ul className="list-disc list-inside">
                  <li>Formato: PNG con fondo transparente.</li>
                  <li>Tamaño máximo: 3 Mb.</li>
                </ul>
                <button
                  type="button"
                  className="mt-4 px-4 py-2 text-sm border rounded-md flex items-center gap-2"
                  onClick={handleClick}
                >
                  <Upload className="w-4 h-4" />
                  Cargar Firma
                </button>
                <input
                  type="file"
                  ref={inputRef}
                  className="hidden"
                  accept="image/png"
                  onChange={handleArchivo}
                />
              </div>
              <div className="w-full md:w-1/2">
                <p className="text-sm text-gray-600 mb-1">Vista Previa:</p>
                <div className="border-2 border-dashed border-blue-400 p-2 w-full max-w-sm h-32 rounded-lg bg-blue-50 flex items-center justify-center overflow-hidden">
                  {imagenFirma || formData.firma ? (
                    <img
                      src={
                        (imagenFirma ?? (formData.firma?.startsWith("data:") ? formData.firma : `data:image/png;base64,${formData.firma}`))
                      }
                      alt="Firma previa"
                      className="max-h-36 max-w-full object-contain"
                    />

                  ) : (
                    <span className="text-gray-400 text-sm">
                      Aún no se ha subido firma
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-4 mt-auto pt-2 border-gray-200">
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
                Actualizar
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
