import "../../Login.css";
import ForgetPasswordFrm from "../../features/Usuarios/ForgetPasswordFrm";

const ForgetPassword = () => {
  return (
    <>
      <div className="w-screen h-screen bg-neutral-800 flex justify-center items-center bg-image  overflow-hidden">
        <div className="w-[40%] h-[100%] flex  items-center pl-10">
          <div className="w-[90%] h-[80%]">
            <div className="">
              <img src="/public/PqrLogo.png" className="w-[160px] h-auto" />
            </div>
            <div className="mb-4 -mt-5">
              <h1 className="text-5xl text-white/80 font-bold line-clamp-2 text-left">
                Gestiona en <br /> minutos tus PQR
              </h1>
            </div>
            <div className="mb-2">
              <p className="text-2xl text-white text-left">
                Nunca dejes que tus peticiones se conviertan en tutelas y más
                dolores de cabeza.
              </p>
            </div>
            <div className="w-16 h-[5px] bg-white mb-10 mt-4"></div>
            <div className="mb-14">
              <p className="text-white line-clamp-2 text-left">
                ©CreAppTech - Somos una empresa líder en soluciones integrales
                basadas en tecnología e innovación.
              </p>
            </div>
            <div className="mb-5 flex ml-10">
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
        <ForgetPasswordFrm />
      </div>
    </>
  );
};

export default ForgetPassword;
