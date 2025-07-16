import SolicitudFrm from "../components/shared/SolicitudFrm";
import "../Login.css";

export default function Solicitud() {
  return (
    <div className="w-full h-full min-h-screen">
      {/* VISTA MÓVIL: Fondo con formulario encima */}
      <div className="block md:hidden relative w-full h-screen">
        {/* Imagen de fondo recortada */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/public/Login44.png')" }}
        >
          <div className="absolute inset-0 bg-black/40" />
        </div>

        {/* Formulario encima */}
        <div className="relative z-10 h-full overflow-y-auto p-4">
          <div className="bg-gray-50 rounded-lg shadow-lg p-4">
            <SolicitudFrm />
          </div>
        </div>
      </div>

      {/* VISTA ESCRITORIO: Diseño dos columnas */}
      <div className="hidden md:flex w-full h-screen">
        {/* Columna izquierda: Formulario */}
        <div className="w-1/2 h-full overflow-y-auto px-10 py-10 bg-gray-50">
          <SolicitudFrm />
        </div>

        {/* Columna derecha: Branding */}
        <div className="w-1/2 h-full fixed right-0 top-0 backdrop-blur-sm bg-image px-6 pr-10 py-10 flex items-center justify-center z-10">
          <div className="w-full max-w-md flex flex-col h-full">
            <div>
              <img
                src="/public/PqrLogo.png"
                alt="Logo"
                className="w-40 h-auto mx-auto"
              />
            </div>
            <div className="text-white text-center">
              <h1 className="text-4xl lg:text-5xl font-bold leading-tight mb-4">
                Gestiona en <br /> minutos tus PQR
              </h1>
              <p className="text-lg lg:text-2xl mb-4">
                Nunca dejes que tus peticiones se conviertan en tutelas.
              </p>
              <div className="w-16 h-[5px] bg-white mx-auto my-4"></div>
              <p className="text-sm mb-6 px-2">
                © Creapptech S.A.S - Soluciones integrales basadas en tecnología.
              </p>
              <input
                type="button"
                value="Conócenos"
                onClick={() =>
                  window.open("https://www.creapptech.com/", "_blank")
                }
                className="bg-emeraldBright rounded-3xl w-36 h-8 text-white text-lg font-bold"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
