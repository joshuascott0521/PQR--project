import { IoMdPersonAdd } from "react-icons/io";
import { FloatingLabel } from "../../components/shared/FloatingLabel";
import { FaSearch } from "react-icons/fa";
import { FloatingSelect } from "../../components/shared/FloatingSelect";
import { useEffect, useState } from "react";
import { File, X, Paperclip } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type {
  CreatePqr,
  Municipio,
  departamento,
  tipoCliente,
  TipoPqr,
  ArchivoSubido,
} from "../../interfaces/pqrInterfaces";
import {
  ClientesServices,
  Origen,
  PqrServices,
  RegionServices,
  TipoClienteServices,
  TipoPqrServices,
} from "../../services/pqrServices";
import {
  mostrarAlertaConfirmacion,
  mostrarAlertaExito,
} from "../../libs/alerts";
import ClienteSkeleton from "../../components/shared/Spinner";
import { showToast } from "../../utils/toastUtils";
import toast from "react-hot-toast";
import { EliminarEmojis } from "../../utils/EliminarEmojis";

const NuevoPqr = () => {
  const [archivos, setArchivos] = useState<File[]>([]);
  const [inputKey, setInputKey] = useState(0);
  const navigate = useNavigate();
  const hoy = new Date().toISOString().split("T")[0];

  const [cargandoCliente, setCargandoCliente] = useState(false);

  const [tipoCliente, setTipoCliente] = useState<tipoCliente[]>([]);
  const [listaDepartamentos, setListaDepartamentos] = useState<departamento[]>(
    []
  );
  const [listaMunicipios, setListaMunicipios] = useState<Municipio[]>([]);
  const [tipoPQRListado, setTipoPQRListado] = useState<TipoPqr[]>([]);
  const [origen, setOrigen] = useState<string[]>([]);
  const [errores, setErrores] = useState<{ [key: string]: boolean }>({});

  const [formData, setFormData] = useState<CreatePqr>({
    documentoCliente: "",
    nombreCliente: "",
    tipoClienteId: "",
    email: "",
    celular: "",
    direccion: "",
    departamentoCod: 0,
    municipioCod: 0,
    radicado: "",
    fecha: new Date().toISOString(),
    tipoPQRId: "",
    origen: "",
    asunto: "",
    descripcion: "",
    adjuntos: [],
    usuarioId: "",
  });

  // Consumos de endpoints
  useEffect(() => {
    const loadData = async () => {
      try {
        const rawUser = localStorage.getItem("userData");
        const user = rawUser ? JSON.parse(rawUser) : null;

        const tipoClienteRes = await TipoClienteServices.getall();
        if (!tipoClienteRes.success) throw new Error(tipoClienteRes.error);

        const departamentosRes = await RegionServices.getDepart();
        if (!departamentosRes.success) throw new Error(departamentosRes.error);

        const tipoPqrRes = await TipoPqrServices.getAll();
        if (!tipoPqrRes.success) throw new Error(tipoPqrRes.error);

        const origenRes = await Origen.getAll();
        if (!origenRes.success) throw new Error(origenRes.error);

        setTipoCliente(tipoClienteRes.data);
        setListaDepartamentos(departamentosRes.data);
        setTipoPQRListado(tipoPqrRes.data);
        setOrigen(origenRes.data);

        setFormData({
          documentoCliente: "",
          nombreCliente: "",
          tipoClienteId: "",
          email: "",
          celular: "",
          direccion: "",
          departamentoCod: 0,
          municipioCod: 0,
          radicado: "",
          fecha: getLocalDate(),
          tipoPQRId: "",
          origen: "",
          asunto: "",
          descripcion: "",
          adjuntos: [],
          usuarioId: user?.id || "",
        });
      } catch (error) {
        console.error("Error al cargar datos iniciales:", error);
      }
    };

    loadData();
  }, []);

  const handleArchivos = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nuevos = e.target.files ? Array.from(e.target.files) : [];

    // Límite de cantidad de archivos
    if (archivos.length + nuevos.length > 5) {
      showToast("Solo puedes subir hasta 5 archivos.");
      return;
    }

    // Límite de tamaño (x MB = x * 1024 * 1024 bytes)
    const size = 5;
    const maxSizeBytes = size * 1024 * 1024;
    const archivosValidos = nuevos.filter((file) => {
      if (file.size > maxSizeBytes) {
        toast.error(
          `El archivo "${file.name}" excede el límite de ${size} MB.`
        );
        return false;
      }
      return true;
    });

    setArchivos((prev) => [...prev, ...archivosValidos]);
    setInputKey((prev) => prev + 1); // fuerza rerender del input
  };

  const eliminarArchivo = (index: number) => {
    const copia = [...archivos];
    copia.splice(index, 1);
    setArchivos(copia);
  };

  const handleClose = () => {
    navigate("/dashboard");
  };

  const validateForm = (): boolean => {
    const erroresDetectados: { [key: string]: boolean } = {};
    let hayError = false;

    const mensajesError: string[] = [];

    const validarCampo = (
      campo: string,
      condicion: boolean,
      mensaje: string
    ) => {
      if (condicion) {
        erroresDetectados[campo] = true;
        mensajesError.push(mensaje);
        hayError = true;
      }
    };

    const { documentoCliente, email, celular, radicado, asunto, descripcion } =
      formData;

    validarCampo(
      "documentoCliente",
      !documentoCliente.trim(),
      "Por favor ingresa el documento del cliente."
    );

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    validarCampo(
      "email",
      !email.trim(),
      "Por favor ingresa el correo electrónico."
    );
    validarCampo(
      "email",
      Boolean(email.trim() && !emailRegex.test(email)),
      "El correo electrónico no es válido."
    );

    validarCampo(
      "celular",
      !/^\d{10}$/.test(celular),
      "El número de celular debe tener exactamente 10 dígitos."
    );

    validarCampo(
      "radicado",
      radicado != null && radicado.trim() === "",
      "Por favor ingresa el número de radicado."
    );

    validarCampo(
      "asunto",
      !asunto.trim(),
      "Por favor escribe un asunto para la solicitud."
    );

    validarCampo(
      "descripcion",
      !descripcion.trim(),
      "Por favor describe brevemente la solicitud."
    );

    if (archivos.length === 0) {
      mensajesError.push("Debes subir al menos un archivo de soporte.");
      hayError = true;
    }

    const camposObligatorios: [string, any][] = [
      ["nombreCliente", formData.nombreCliente],
      ["tipoClienteId", formData.tipoClienteId],
      ["direccion", formData.direccion],
      ["departamentoCod", formData.departamentoCod],
      ["municipioCod", formData.municipioCod],
      ["fecha", formData.fecha],
      ["tipoPQRId", formData.tipoPQRId],
      ["origen", formData.origen],
    ];

    const faltantesGenericos = camposObligatorios.some(([campo, valor]) => {
      const invalido = !valor || valor === "" || valor === 0;
      if (invalido) erroresDetectados[campo] = true;
      return invalido;
    });

    if (faltantesGenericos) {
      hayError = true;
      mensajesError.push("Por favor complete todos los campos.");
    }

    // Mostrar solo un toast
    if (mensajesError.length === 1) {
      showToast(mensajesError[0]);
    } else if (mensajesError.length > 1) {
      showToast("Por favor complete los campos obligatorios.");
    }

    setErrores(erroresDetectados);
    return !hayError;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;

    const confirmado = await mostrarAlertaConfirmacion(
      "¿Deseas enviar el PQR?",
      "Una vez enviado, no podrás editarlo. Será procesado por la entidad correspondiente."
    );
    if (!confirmado) return;

    try {
      const rawUser = localStorage.getItem("userData");
      const user = rawUser ? JSON.parse(rawUser) : null;

      if (!user || !user.id) {
        console.error("No se encontró ID de usuario");
        toast.error(
          "No se pudo identificar al usuario. Por favor vuelve a iniciar sesión."
        );
        return;
      }
      let archivosSubidos: ArchivoSubido[] = [];

      if (archivos.length > 0) {
        const uploadRes = await PqrServices.uploadFiles(archivos);
        if (!uploadRes.success) {
          console.error("Error al subir archivos:", uploadRes.error);
          return;
        }
        archivosSubidos = uploadRes.data;
      }
      const res = await PqrServices.createPqr({
        ...formData,
        usuarioId: user.id,
        adjuntos: archivosSubidos,
      });

      if (res.success) {
        mostrarAlertaExito("¡PQR registrado exitosamente!");
        console.log("Respuesta PQR ✅✅✅✅", res.data);
        navigate("/dashboard");
      } else {
        console.error("Error al registrar el PQR:", res.error);
      }
    } catch (error) {
      console.error("Error inesperado al guardar:", error);
    }
  };

  const handleBuscarCliente = async () => {
    if (!formData.documentoCliente.trim()) {
      showToast("Debes ingresar un documento para buscar.");
      return;
    }

    setCargandoCliente(true); // <-- activar skeleton

    try {
      const res = await ClientesServices.getByDoc(formData.documentoCliente);
      if (!res.success || !res.data) {
        showToast("No se encontró ningún cliente con ese documento.");
        return;
      }

      const cliente = res.data;
      setFormData((prev) => ({
        ...prev,
        nombreCliente: cliente.nombre,
        tipoClienteId: cliente.tipoClienteId,
        email: cliente.email,
        celular: cliente.celular,
        direccion: cliente.direccion,
        departamentoCod: cliente.departamentoCod,
        municipioCod: cliente.municipioCod,
      }));

      if (cliente.departamentoCod) {
        const municipioRes = await RegionServices.getMun(
          cliente.departamentoCod
        );
        if (municipioRes.success) {
          setListaMunicipios(municipioRes.data);
        }
      }

      showToast("Cliente encontrado y datos cargados.", "success");
    } catch (error) {
      console.error("Error al buscar cliente:", error);
      showToast("Hubo un error al buscar el cliente.");
    } finally {
      setCargandoCliente(false); // <-- desactivar skeleton
    }
  };

  const getLocalDate = () => {
    const tzoffset = new Date().getTimezoneOffset() * 60000; // offset en ms
    return new Date(Date.now() - tzoffset).toISOString().split("T")[0];
  };

  return (
    <div className="h-full flex flex-col">
      {/* Título con icono */}
      <div className="flex mb-4 items-center gap-3">
        <IoMdPersonAdd className="text-[32px]" />
        <h1 className="font-semibold text-2xl">Registrar un nuevo PQR</h1>
      </div>

      {/* Formulario */}
      <div className="bg-white rounded-lg w-full h-[600px] overflow-y-auto p-6 shadow-md">
        <form onSubmit={handleSubmit}>
          {/* Sección de Datos del Cliente */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Datos del cliente</h2>
            <div className="border-b-2 border-gray-300 mb-4" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {cargandoCliente ? (
                <ClienteSkeleton />
              ) : (
                <>
                  {/* Input con botón interno */}
                  <div className="relative w-full md:w-lg">
                    <FloatingLabel
                      id="documentoCliente"
                      label="Documento Cliente"
                      className={`pr-12 ${errores.documentoCliente ? "border-red-500" : ""
                        }`}
                      value={formData.documentoCliente}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          documentoCliente: e.target.value,
                        }))
                      }
                    />
                    {/* Boton en el campo documento */}
                    <button
                      type="button"
                      title="Buscar cliente"
                      onClick={handleBuscarCliente}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black p-2 rounded-full hover:bg-gray-800 transition-colors"
                    >
                      <FaSearch className="text-white text-lg" />
                    </button>
                  </div>

                  <FloatingLabel
                    id="nombresYApellidos"
                    label="Nombres y Apellidos"
                    className={`w-lg ${errores.nombreCliente ? "border-red-500" : ""
                      }`}
                    value={formData.nombreCliente}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        nombreCliente: e.target.value,
                      }))
                    }
                  />

                  <FloatingSelect
                    label="Tipo Cliente"
                    value={formData.tipoClienteId}
                    onChange={(value) =>
                      setFormData((prev) => ({ ...prev, tipoClienteId: value }))
                    }
                    options={tipoCliente.map((tc) => ({
                      value: tc.id,
                      label: tc.nombre,
                    }))}
                    placeholder="Elige una opción"
                    className={`w-lg ${errores.tipoClienteId ? "border-red-500" : ""
                      }`}
                  />

                  <FloatingLabel
                    id="email"
                    label="Email"
                    className={`w-lg ${errores.email ? "border-red-500" : ""}`}
                    value={formData.email}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        email: e.target.value,
                      }))
                    }
                  />

                  <FloatingLabel
                    id="celular"
                    label="Celular"
                    className={`w-lg ${errores.celular ? "border-red-500" : ""
                      }`}
                    value={formData.celular}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        celular: e.target.value,
                      }))
                    }
                  />

                  <FloatingLabel
                    id="direccion"
                    label="Dirección"
                    className={`w-lg ${errores.direccion ? "border-red-500" : ""
                      }`}
                    value={formData.direccion}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        direccion: e.target.value,
                      }))
                    }
                  />

                  <FloatingSelect
                    label="Departamento"
                    value={
                      formData.departamentoCod === 0
                        ? ""
                        : formData.departamentoCod.toString()
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
                          const municipioRes = await RegionServices.getMun(
                            dep.cod
                          );
                          setListaMunicipios(
                            municipioRes.success ? municipioRes.data : []
                          );
                        } catch {
                          setListaMunicipios([]);
                        }
                      }
                    }}
                    options={listaDepartamentos.map((dep) => ({
                      value: dep.cod?.toString() || "",
                      label: dep.nombre || "",
                    }))}
                    className={`w-lg ${errores.departamentoCod ? "border-red-500" : ""
                      }`}
                  />

                  <FloatingSelect
                    label="Municipio"
                    placeholder="Seleccionar Municipio"
                    value={
                      formData.municipioCod === 0
                        ? ""
                        : formData.municipioCod.toString()
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
                    className={`w-full ${errores.municipioCod ? "border-red-500" : ""
                      }`}
                  />
                </>
              )}
            </div>

            <h2 className="text-xl font-semibold my-2">Datos del PQR</h2>
            <div className="border-b-2 border-gray-300 mb-4" />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <FloatingLabel
                id="noRadicado"
                label="No. Radicado"
                className={`w-lg ${errores.radicado ? "border-red-500" : ""}`}
                value={formData.radicado ?? ""}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, radicado: e.target.value }))
                }
              />
              <FloatingLabel
                id="fecha"
                label="Fecha"
                type="date"
                max={hoy}
                className={`w-lg ${errores.fecha ? "border-red-500" : ""}`}
                value={formData.fecha}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, fecha: e.target.value }))
                }
              />

              <FloatingSelect
                label="Tipo Petición"
                value={formData.tipoPQRId}
                onChange={(value) =>
                  setFormData((prev) => ({ ...prev, tipoPQRId: value }))
                }
                options={tipoPQRListado.map((tc) => ({
                  value: tc.id,
                  label: tc.nombre,
                }))}
                placeholder="Elige una opción"
                className={`w-lg ${errores.tipoPQRId ? "border-red-500" : ""}`}
              />

              <FloatingSelect
                label="Origen"
                value={formData.origen}
                onChange={(value) =>
                  setFormData((prev) => ({ ...prev, origen: value }))
                }
                options={origen.map((origen) => ({
                  value: origen,
                  label: origen,
                }))}
                placeholder="Seleccionar Origen"
                className={`w-lg ${errores.origen ? "border-red-500" : ""}`}
              />
            </div>
            <div className="w-full flex items-center gap-3 mt-2">
              {/* Ícono izquierdo
              <div className="w-10 h-10 bg-black rounded-full flex justify-center items-center">
                <FaSearch className="text-white text-lg" />
              </div> */}
              {/* Campo de texto central (flex-grow para tomar el espacio restante) */}
              <div className="flex-grow">
                <FloatingLabel
                  id="asunto"
                  label="Asunto"
                  value={formData.asunto}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, asunto: e.target.value }))
                  }
                  className={`${errores.asunto ? "border-red-500" : ""}`}
                />
              </div>
              {/* Ícono derecho */}
              {/* <div className="w-10 h-10 bg-blue-500 rounded-full flex justify-center items-center">
                <List className="w-5 h-5 stroke-white stroke-2" />
              </div> */}
            </div>
            <div className="mt-2">
              <textarea
                id="descripcion"
                name="descripcion"
                value={formData.descripcion}
                onChange={(e) => {
                  const sinEmojis = EliminarEmojis(e.target.value);
                  setFormData((prev) => ({
                    ...prev,
                    descripcion: sinEmojis,
                  }));
                }}
                rows={4}
                placeholder="Descripción"
                className={`w-full border rounded-lg px-3 py-3 text-sm resize-none overflow-y-auto focus:outline-none focus:ring-2 ${errores.descripcion
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-green-400 "
                  }`}
              />
            </div>
            <div className="space-y-3 mt-4">
              {/* Lista de archivos */}
              <div className="flex flex-wrap gap-2">
                {archivos.map((archivo, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 bg-gray-100 border border-gray-300 rounded-full px-3 py-1 max-w-xs"
                  >
                    <File className="w-4 h-4 text-gray-700" />
                    <p className="text-sm text-gray-800 truncate flex-1">
                      {archivo.name}
                    </p>
                    <button
                      type="button"
                      onClick={() => eliminarArchivo(index)}
                      className="text-gray-500 hover:text-red-500 transition-colors"
                      aria-label="Eliminar archivo"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Botón de subir archivos */}
              <label
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full cursor-pointer w-fit
                     ${archivos.length >= 5
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-emerald-400 text-white hover:bg-emerald-500"
                  }
                    `}
              >
                <Paperclip className="w-4 h-4" />
                {archivos.length >= 5 ? "Límite alcanzado" : "Subir archivos"}
                <input
                  key={inputKey}
                  type="file"
                  multiple
                  className="hidden"
                  onChange={handleArchivos}
                  disabled={archivos.length >= 5}
                />
              </label>
            </div>
            <div className="mt-2 flex justify-end gap-2">
              <button
                type="button"
                onClick={handleClose}
                className="bg-gray-400 hover:bg-gray-500 w-[80px] h-[30px] rounded-md transition-colors"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="bg-green-500 hover:bg-green-600 hover:text-white w-[80px] h-[30px] rounded-md transition-colors"
              >
                Guardar
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NuevoPqr;
