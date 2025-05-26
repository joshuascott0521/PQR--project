import { useEffect, useState } from "react";
import { FloatingLabel } from "./FloatingLabel";
import type { ArchivoSubido, CreatePqr, departamento, Municipio, tipoCliente, TipoPqr } from "../../interfaces/pqrInterfaces";
import { PqrServices, RegionServices, TipoClienteServices, TipoPqrServices } from "../../services/pqrServices";
import { FloatingSelect } from "./FloatingSelect";
import { File, X, Paperclip } from "lucide-react";
import RequisitosAdjuntos from "./RequisitosAdjuntos";

export default function StepForm() {
  const [step, setStep] = useState(0);
  const [tipoCliente, setTipoCliente] = useState<tipoCliente[]>([])
  const [listaDepartamentos, setListaDepartamentos] = useState<departamento[]>([]);
  const [listaMunicipios, setListaMunicipios] = useState<Municipio[]>([])
  const [tipoPQRListado, setTipoPQRListado] = useState<TipoPqr[]>([])
  const [archivos, setArchivos] = useState<File[]>([]);
  const [inputKey, setInputKey] = useState(0);
  const [autorizado, setAutorizado] = useState(false);
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


        setTipoCliente(tipoClienteRes.data);
        setListaDepartamentos(departamentosRes.data);
        setTipoPQRListado(tipoPqrRes.data);


        setFormData({
          documentoCliente: "",
          nombreCliente: "",
          tipoClienteId: "",
          email: "",
          celular: "",
          direccion: "",
          departamentoCod: 0,
          municipioCod: 0,
          fecha: new Date().toISOString(),
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




  const getLocalDate = () => {
    const tzoffset = new Date().getTimezoneOffset() * 60000; // offset en ms
    return new Date(Date.now() - tzoffset).toISOString().split("T")[0];
  };


  const handleArchivos = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nuevos = e.target.files ? Array.from(e.target.files) : [];

    // Límite de cantidad de archivos
    if (archivos.length + nuevos.length > 5) {
      alert("Solo puedes subir hasta 5 archivos.");
      return;
    }

    // Límite de tamaño (x MB = x * 1024 * 1024 bytes)
    const size = 5;
    const maxSizeBytes = size * 1024 * 1024;
    const archivosValidos = nuevos.filter((file) => {
      if (file.size > maxSizeBytes) {
        alert(`El archivo "${file.name}" excede el límite de ${size} MB.`);
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

  const validateStep = () => {
    if (step === 0) {
      if (!formData.documentoCliente.trim()) {
        alert("Por favor ingresa el documento del cliente.");
        return false;
      }
      if (!formData.nombreCliente.trim()) {
        alert("Por favor ingresa el nombre completo del cliente.");
        return false;
      }
      if (!formData.tipoClienteId) {
        alert("Por favor selecciona el tipo de cliente.");
        return false;
      }
      if (!formData.email.trim()) {
        alert("Por favor ingresa el correo electrónico.");
        return false;
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        alert("El correo electrónico no es válido.");
        return false;
      }
      if (!formData.celular.trim()) {
        alert("Por favor ingresa el número de celular.");
        return false;
      }
      if (!formData.direccion.trim()) {
        alert("Por favor ingresa la dirección.");
        return false;
      }
      if (formData.departamentoCod === 0) {
        alert("Selecciona un departamento.");
        return false;
      }
      if (formData.municipioCod === 0) {
        alert("Selecciona un municipio.");
        return false;
      }
    }

    if (step === 1) {
      if (!formData.tipoPQRId) {
        alert("Por favor selecciona el tipo de petición.");
        return false;
      }
      if (!formData.asunto.trim()) {
        alert("Por favor escribe un asunto para la solicitud.");
        return false;
      }
      if (!formData.descripcion.trim()) {
        alert("Por favor describe brevemente la solicitud.");
        return false;
      }
    }

    if (step === 2) {
      if (!autorizado) {
        alert("Debes autorizar el tratamiento de datos para continuar.");
        return false;
      }
    }

    return true;
  };

  const handleNext = () => {
    if (validateStep()) setStep((prev) => prev + 1);
    else alert("Please complete all required fields.");
  };

  const handleBack = () => setStep((prev) => prev - 1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // ✅ Validar antes de continuar
    if (!validateStep()) {
      alert("Complete el formulario antes de enviarlo.");
      return;
    }

    try {
      let archivosSubidos: ArchivoSubido[] = [];

      if (archivos.length > 0) {
        const uploadRes = await PqrServices.uploadFiles(archivos);
        if (!uploadRes.success) {
          console.error("Error al subir archivos:", uploadRes.error);
          return;
        }
        archivosSubidos = uploadRes.data;
      }

      const res = await PqrServices.createPqrPortal({
        ...formData,
        usuarioId: null,
        adjuntos: archivosSubidos,
        radicado: "",
        origen: "Portal web"
      });

      if (res.success) {
        alert("PQR Registrado Exitosamente");
        console.log("Respuesta PQR ✅✅✅✅", res.data);

        // Reiniciar formulario
        setFormData({
          documentoCliente: "",
          nombreCliente: "",
          tipoClienteId: "",
          email: "",
          celular: "",
          direccion: "",
          departamentoCod: 0,
          municipioCod: 0,
          fecha: new Date().toISOString(),
          tipoPQRId: "",
          origen: "",
          asunto: "",
          descripcion: "",
          adjuntos: [],
          usuarioId: null, // ✅ reinicia como null
        });

        setArchivos([]);
        setAutorizado(false);
        setStep(0);
      }
    } catch (error) {
      console.error("Error inesperado al guardar:", error);
    }
  };



  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="w-[520px]">
        <div className="bg-white/70  rounded-2xl shadow-lg w-full  p-10 border border-gray-100">
          {/* Step Indicators */}
          <div className="relative flex justify-between mb-6">
            <div className="absolute top-4 left-0 right-0 h-0.5 bg-gray-300 z-0" />
            {["Paso 1", "Paso 2", "Paso 3"].map((label, index) => (
              <div key={index} className="flex-1 flex flex-col items-center relative z-10">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm border-2 transition-all duration-300 ${index < step
                    ? "bg-blue-500 text-white border-blue-500"
                    : index === step
                      ? "bg-white text-blue-500 border-blue-500"
                      : "bg-gray-200 text-gray-500 border-gray-300"
                    }`}
                >
                  {index + 1}
                </div>
                <span className="mt-2 text-sm font-medium text-black">{label}</span>
              </div>
            ))}
          </div>

          {/* Form Steps */}
          <form onSubmit={handleSubmit} className="space-y-4 text-black text-sm">
            {step === 0 && (
              <div>
                <h2 className="text-lg font-semibold mb-2 text-center">Datos del Solicitante</h2>
                <div className="border-b border-gray-500 mb-2" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FloatingLabel
                    id="documento"
                    label="Documento"
                    value={formData.documentoCliente}
                    onChange={(e) => setFormData((prev) => ({ ...prev, documentoCliente: e.target.value }))}
                  />
                  <FloatingLabel
                    id="nombresYApellidos"
                    label="Nombres y Apellidos"
                    value={formData.nombreCliente}
                    onChange={(e) => setFormData((prev) => ({ ...prev, nombreCliente: e.target.value }))}
                  />
                  <FloatingSelect
                    label="Tipo Cliente"
                    value={formData.tipoClienteId}
                    onChange={(value) => setFormData(prev => ({ ...prev, tipoClienteId: value }))}
                    options={tipoCliente.map(tc => ({ value: tc.id, label: tc.nombre }))}
                    placeholder="Elige una opción"
                  />
                  <FloatingLabel
                    id="email"
                    label="Email"
                    value={formData.email}
                    onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                  />
                  <FloatingLabel
                    id="celular"
                    label="Celular"
                    value={formData.celular}
                    onChange={(e) => setFormData((prev) => ({ ...prev, celular: e.target.value }))}
                  />
                  <FloatingLabel
                    id="direccion"
                    label="Dirección"
                    value={formData.direccion}
                    onChange={(e) => setFormData((prev) => ({ ...prev, direccion: e.target.value }))}
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
                    className="w-full"
                  />
                </div>
                <div className="mt-6 flex justify-end">
                  <button
                    type="button"
                    onClick={handleNext}
                    className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition-colors"
                  >
                    Siguiente
                  </button>
                </div>
              </div>
            )}

            {step === 1 && (
              <div>
                <h2 className="text-lg font-semibold mb-2 text-center">Datos del PQR</h2>
                <div className="border-b border-gray-500 mb-2" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <FloatingLabel
                    id="fecha"
                    label="Fecha Solicitud"
                    type="date"
                    value={getLocalDate()}
                    readOnly
                  />
                  <FloatingSelect
                    label="Tipo Petición"
                    value={formData.tipoPQRId}
                    onChange={(value) => setFormData(prev => ({ ...prev, tipoPQRId: value }))}
                    options={tipoPQRListado.map(tc => ({ value: tc.id, label: tc.nombre }))}
                    placeholder="Elige una opción"
                  />
                  <div className="md:col-span-2">
                    <FloatingLabel
                      id="asunto"
                      label="Asunto"
                      value={formData.asunto}
                      onChange={(e) => setFormData((prev) => ({ ...prev, asunto: e.target.value }))}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <div className="w-full">
                      <textarea
                        id="descripcion"
                        name="descripcion"
                        value={formData.descripcion}
                        onChange={(e) => setFormData((prev) => ({ ...prev, descripcion: e.target.value }))}
                        rows={4}
                        placeholder="Descripción"
                        className="w-full border border-gray-300 rounded-lg px-3 py-3 text-sm resize-none overflow-y-auto focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex justify-between">
                  <button
                    onClick={handleBack}
                    type="button"
                    className="bg-gray-200 text-gray-700 px-6 py-2 rounded-full hover:bg-gray-300 transition-colors"
                  >
                    Atrás
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition-colors"
                  >
                    Siguiente
                  </button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div>
                <h2 className="text-lg font-semibold mb-1 text-center">Soportes de la Solicitud</h2>
                <div className="border-b border-gray-500 mb-2" />
                <RequisitosAdjuntos />
                <div className="flex flex-col gap-2">
                  {/* Botón de subir archivos */}
                  <label
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-full cursor-pointer w-fit
    ${archivos.length >= 5
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : "bg-emerald-400 text-white hover:bg-emerald-500"}
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


                  {/* Contenedor con adjuntos envueltos sin scroll */}
                  <div className="flex flex-wrap gap-2">
                    {archivos.map((archivo, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-1 bg-gray-100 border border-gray-300 rounded-full px-3 py-1 w-[180px] flex-shrink-0"
                      >
                        <File className="w-4 h-4 text-gray-700" />
                        <p className="text-xs text-gray-800 truncate flex-1">{archivo.name}</p>
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
                </div>

                <div className="flex items-center space-x-2 mt-2">
                  <input
                    type="checkbox"
                    id="autorizacion"
                    className="w-5 h-5 accent-black rounded border border-gray-400"
                    checked={autorizado}
                    onChange={(e) => setAutorizado(e.target.checked)}
                  />
                  <label htmlFor="autorizacion" className="text-gray-800 text-sm">
                    Autorizo tratamiento de datos y notificaciones electrónicas.
                  </label>
                </div>

                <div className="mt-6 mb-1 flex justify-between">
                  <button
                    onClick={handleBack}
                    type="button"
                    className="bg-gray-200 text-gray-700 px-6 py-2 rounded-full hover:bg-gray-300 transition-colors"
                  >
                    Atrás
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition-colors"
                  >
                    Enviar PQR
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
