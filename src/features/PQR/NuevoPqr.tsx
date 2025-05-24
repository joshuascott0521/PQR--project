import { IoMdPersonAdd } from "react-icons/io";
import { FloatingLabel } from "../../components/shared/FloatingLabel";
import { FaSearch } from "react-icons/fa";
import { FloatingSelect } from "../../components/shared/FloatingSelect";
import { useEffect, useState } from "react";
import { List, File, X, Paperclip } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { CreatePqr, Municipio, departamento, tipoCliente, TipoPqr, ArchivoSubido } from "../../interfaces/pqrInterfaces";
import { Origen, PqrServices, RegionServices, TipoClienteServices, TipoPqrServices } from "../../services/pqrServices";
const NuevoPqr = () => {
  const [archivos, setArchivos] = useState<File[]>([]);
  const [inputKey, setInputKey] = useState(0);
  const navigate = useNavigate();
  const hoy = new Date().toISOString().split("T")[0];

  const [tipoCliente, setTipoCliente] = useState<tipoCliente[]>([])
  const [listaDepartamentos, setListaDepartamentos] = useState<departamento[]>([]);
  const [listaMunicipios, setListaMunicipios] = useState<Municipio[]>([])
  const [tipoPQRListado, setTipoPQRListado] = useState<TipoPqr[]>([])
  const [origen, setOrigen] = useState<string[]>([])

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
        console.log("Usuario???🔴🔴🔴🔴🔴", user)

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
        setOrigen(origenRes.data)





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




  const handleArchivos = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nuevos = e.target.files ? Array.from(e.target.files) : [];
    setArchivos((prev) => [...prev, ...nuevos]);
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {

      const rawUser = localStorage.getItem("userData");
      const user = rawUser ? JSON.parse(rawUser) : null;

      if (!user || !user.id) {
        console.error("No se encontró ID de usuario");
        alert("No se pudo identificar al usuario. Por favor vuelve a iniciar sesión.");
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
        alert("PQR Registrado Exitosamente");
        console.log("Respuesta PQR ✅✅✅✅", res.data)
        navigate("/dashboard");
      } else {
        console.error("Error al registrar el PQR:", res.error);
      }
    } catch (error) {
      console.error("Error inesperado al guardar:", error);
    }
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
              {/* Input con botón interno */}
              <div className="relative w-full md:w-lg">
                <FloatingLabel
                  id="documentoCliente"
                  label="Documento Cliente"
                  className="pr-12"
                  value={formData.documentoCliente}
                  onChange={(e) => setFormData((prev) => ({ ...prev, documentoCliente: e.target.value }))}
                />
                {/* Boton en el campo documento */}
                <button
                  type="button"
                  title="Buscar cliente"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black p-2 rounded-full hover:bg-gray-800 transition-colors"
                >
                  <FaSearch className="text-white text-lg" />
                </button>
              </div>
              <FloatingLabel
                id="nombresYApellidos"
                label="Nombres y Apellidos"
                className="w-lg"
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
                className="w-lg"
                value={formData.email}
                onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
              />
              <FloatingLabel
                id="celular"
                label="Celular"
                className="w-lg"
                value={formData.celular}
                onChange={(e) => setFormData((prev) => ({ ...prev, celular: e.target.value }))}
              />
              <FloatingLabel
                id="direccion"
                label="Dirección"
                className="w-lg"
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
            <h2 className="text-xl font-semibold my-2">Datos del PQR</h2>
            <div className="border-b-2 border-gray-300 mb-4" />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <FloatingLabel
                id="noRadicado"
                label="No. Radicado"
                className="w-lg"
                value={formData.radicado}
                onChange={(e) => setFormData((prev) => ({ ...prev, radicado: e.target.value }))}
              />
              <FloatingLabel
                id="fecha"
                label="Fecha"
                type="date"
                max={hoy}
                className="w-lg"
                value={formData.fecha}
                onChange={(e) => setFormData((prev) => ({ ...prev, fecha: e.target.value }))}
              />

              <FloatingSelect
                label="Tipo Petición"
                value={formData.tipoPQRId}
                onChange={(value) => setFormData(prev => ({ ...prev, tipoPQRId: value }))}
                options={tipoPQRListado.map(tc => ({ value: tc.id, label: tc.nombre }))}
                placeholder="Elige una opción"
              />

              <FloatingSelect
                label="Origen"
                value={formData.origen}
                onChange={(value) => setFormData((prev) => ({ ...prev, origen: value }))}
                options={origen.map(origen => ({
                  value: origen,
                  label: origen
                }))}
                placeholder="Seleccionar Origen"
              />
            </div>
            <div className="w-full flex items-center gap-3 mt-2">
              {/* Ícono izquierdo */}
              <div className="w-10 h-10 bg-black rounded-full flex justify-center items-center">
                <FaSearch className="text-white text-lg" />
              </div>

              {/* Campo de texto central (flex-grow para tomar el espacio restante) */}
              <div className="flex-grow">
                <FloatingLabel
                  id="asunto"
                  label="Asunto"
                  value={formData.asunto}
                  onChange={(e) => setFormData((prev) => ({ ...prev, asunto: e.target.value }))}
                />
              </div>

              {/* Ícono derecho */}
              <div className="w-10 h-10 bg-blue-500 rounded-full flex justify-center items-center">
                <List className="w-5 h-5 stroke-white stroke-2" />
              </div>
            </div>
            <div className="mt-2">
              <div className="relative w-full">
                <textarea
                  id="descripcion"
                  name="descripcion"
                  value={formData.descripcion}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, descripcion: e.target.value }))
                  }
                  rows={3}
                  placeholder=" "
                  className="peer w-full border border-gray-300 rounded-lg p-2 pt-5 text-sm resize-none overflow-y-auto max-h-24 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <label
                  htmlFor="descripcion"
                  className="absolute left-2 top-2 text-xs text-gray-500 transition-all
      peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400
      peer-focus:top-2 peer-focus:text-xs peer-focus:text-blue-500"
                >
                  Descripción
                </label>
              </div>
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
              <label className="inline-flex items-center gap-2 bg-emerald-400 text-white px-4 py-2 rounded-full cursor-pointer hover:bg-emerald-500">
                <Paperclip className="w-4 h-4" />
                Subir archivos
                <input
                  key={inputKey}
                  type="file"
                  multiple
                  className="hidden"
                  onChange={handleArchivos}
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