import { IoMdPersonAdd } from "react-icons/io";
import { FloatingLabel } from "../../components/shared/FloatingLabel";
import { FaSearch } from "react-icons/fa";
import { FloatingSelect } from "../../components/shared/FloatingSelect";
import { useEffect, useState } from "react";
import { List, File, X, Paperclip } from "lucide-react";
import { useNavigate } from "react-router-dom";

const NuevoPqr = () => {
  const [rol, setRol] = useState("");
  const [departamento, setDepartamento] = useState("");
  const [municipio, setMunicipio] = useState("");
  const [tipoPeticion, setTipoPeticion] = useState("");
  const [origen, setOrigen] = useState("");
  const [archivos, setArchivos] = useState<File[]>([]);
  const [inputKey, setInputKey] = useState(0);
  const navigate = useNavigate();
  const hoy = new Date().toISOString().split("T")[0];

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

  const municipiosPorDepartamento: Record<
    string,
    { value: string; label: string }[]
  > = {
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
              <FloatingLabel
                id="nombresYApellidos"
                label="Nombres y Apellidos"
                className="w-lg"
              />
              <FloatingSelect
                label="Tipo Cliente"
                value={rol}
                onChange={setRol}
                options={opciones}
                placeholder="Elige una opción"
              />
              <FloatingLabel id="email" label="Email" className="w-lg" />
              <FloatingLabel id="celular" label="Celular" className="w-lg" />
              <FloatingLabel
                id="direccion"
                label="Dirección"
                className="w-lg"
              />
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
              <FloatingLabel
                id="noRadicado"
                label="No. Radicado"
                className="w-lg"
              />
              <FloatingLabel
                id="fecha"
                label="Fecha"
                type="date"
                max={hoy}
                className="w-lg"
              />

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
            <div className="w-full flex items-center gap-3 mt-2">
              {/* Ícono izquierdo */}
              <div className="w-10 h-10 bg-black rounded-full flex justify-center items-center">
                <FaSearch className="text-white text-lg" />
              </div>

              {/* Campo de texto central (flex-grow para tomar el espacio restante) */}
              <div className="flex-grow">
                <FloatingLabel id="asunto" label="Asunto" />
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
                type="button"
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
