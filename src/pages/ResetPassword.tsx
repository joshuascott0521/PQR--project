import { useForm } from "react-hook-form";
import { AuthServices } from "../services/pqrServices";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { showToast } from "../utils/toastUtils";
import "../Login.css";
import { useState } from "react";

interface FormValues {
  nuevaPassword: string;
  confirmacionPassword: string;
}

const ResetPassword = () => {
  const [isLeaving, setIsLeaving] = useState(false);
  const navigate = useNavigate();
  // const [searchParams] = useSearchParams();
  const { token } = useParams();

  const {
    register,
    handleSubmit,
    // getValues,
    reset,
    formState: { isSubmitting },
  } = useForm<FormValues>();

  const onSubmit = async (data: FormValues) => {
    const { nuevaPassword, confirmacionPassword } = data;

    if (!nuevaPassword || !confirmacionPassword) {
      showToast("Todos los campos son obligatorios", "error");
      return;
    }

    if (nuevaPassword.length < 8) {
      showToast("La contraseña debe tener mínimo 8 caracteres", "error");
      return;
    }

    if (nuevaPassword !== confirmacionPassword) {
      showToast("Las contraseñas no coinciden", "error");
      return;
    }

    if (!token) {
      showToast("Token inválido o expirado", "error");
      return;
    }
    try {
      const result = await AuthServices.resetPassword({
        token,
        nuevaPassword,
        confirmacionPassword,
      });

      if (result.data) {
        showToast(result.data.mensaje, "success");
        setIsLeaving(true);

        setTimeout(() => {
          navigate("/login");
          reset();
        }, 600); // mismo tiempo que la animación CSS
      } else {
        showToast(
          result.error || "No se pudo enviar el correo de recuperación"
        );
      }
    } catch (error) {
      showToast("Error inesperado al intentar recuperar la contraseña ");
    }

    // showToast("Revisa tu correo para continuar con la restauración", "success");
    reset();
  };

  return (
    <div className="w-screen h-screen bg-neutral-800 flex justify-center items-center bg-image overflow-hidden">
      <div className="w-[40%] h-[100%] flex  items-center pl-10">
        <div className="w-[90%] h-[80%]">
          <div className="">
            <img
              src="/PqrLogo.png"
              alt="logo pqr"
              className="w-[160px] h-auto"
            />
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

      <div className="w-[850px] h-[1060px] flex justify-end items-center pr-[112px]">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={`h-[45%] w-[62%] rounded-lg border-2 flex flex-col justify-start items-center space-y-4 p-4 login-container opacity-80 transition-all duration-500 ${
            isLeaving ? "opacity-0 translate-y-10" : "opacity-100"
          }`}
        >
          <img
            src="/Logo-static.png"
            alt="Logo alcaldia"
            className="w-full max-w-[500px] h-20 object-contain mb-4"
          />

          <h2 className="text-2xl font-bold text-white">
            Restaurar Contraseña
          </h2>

          <div className="w-full flex flex-col items-start pl-10">
            <label htmlFor="nuevaPassword" className="text-white mb-2 pl-4">
              NUEVA CONTRASEÑA
            </label>
            <input
              type="password"
              id="nuevaPassword"
              {...register("nuevaPassword")}
              className="w-[90%] h-12 border-none rounded-[2rem] p-2 bg-white bg-opacity-30 backdrop-blur placeholder-white focus:outline-none pl-4"
              placeholder="Nueva contraseña"
            />
          </div>

          <div className="w-full flex flex-col items-start pl-10">
            <label
              htmlFor="confirmacionPassword"
              className="text-white mb-2 pl-4"
            >
              CONFIRMAR CONTRASEÑA
            </label>
            <input
              type="password"
              id="confirmacionPassword"
              {...register("confirmacionPassword")}
              className="w-[90%] h-12 border-none rounded-[2rem] p-2 bg-white bg-opacity-30 backdrop-blur placeholder-white focus:outline-none pl-4"
              placeholder="Confirmar contraseña"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-orange-500 w-48 h-10 rounded-xl text-white hover:bg-orange-600 transition-colors mt-6"
          >
            {isSubmitting ? "Enviando..." : "Restaurar contraseña"}
          </button>

          <button
            type="button"
            onClick={() => navigate("/login")}
            className="text-white cursor-pointer hover:underline pt-2"
          >
            Volver al inicio de sesión
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
