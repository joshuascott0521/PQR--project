import StepForm from "../components/shared/StepForm"; // importa tu formulario multistep
import "../Login.css";

export default function Portal() {
  return (
    <div className="w-screen h-screen bg-neutral-800 flex justify-center items-center bg-image overflow-hidden">
      {/* Sección izquierda: Formulario */}
      <div className="w-[60%] h-full flex items-center justify-center px-10">
        <div className="w-full max-w-2xl">
          <StepForm />
        </div>
      </div>

      {/* Sección derecha: Branding */}
      <div className="w-[40%] h-full flex items-center pr-10">
        <div className="w-full h-[80%]">
          <div>
            <img src="/public/PqrLogo.png" className="w-[160px] h-auto" />
          </div>
          <div className="mb-4 -mt-5">
            <h1 className="text-5xl text-white/80 font-bold line-clamp-2 text-left">
              Portal Ciudadano - PQRS <br />
            </h1>
          </div>
          <div className="mb-2">
            <p className="text-lg text-white text-left">
              Bienvenido al Portal Ciudadano de PQRS, donde puede registrar sus Peticiones, Quejas, Reclamos y Sugerencias de manera sencilla.
            </p>
            <p className="text-lg pt-2 text-white text-left font-bold">
              ¡Su opinión es valiosa para nosotros!
            </p>
          </div>
          <div className="w-16 h-[5px] bg-white mb-10 mt-4"></div>
          <div className="mb-14">
            <p className="text-white line-clamp-2 text-left">
              ©Creapptech S.A.S - Somos una empresa líder en soluciones
              integrales basadas en tecnología e innovación.
            </p>
          </div>
          <div className="mb-5 flex ml-10">
            <input
              type="button"
              value="Conócenos"
              onClick={() =>
                window.open("https://www.creapptech.com/", "_blank")
              }
              className="bg-emeraldBright rounded-3xl w-36 h-8 text-white text-lg font-bold cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
