import { useForm } from "react-hook-form";
import { AuthServices } from "../../services/pqrServices";
import { useNavigate } from "react-router-dom";
import { showToast } from "../../utils/toastUtils";
import { setShouldAnimate } from "../../utils/animationStore";

interface FormValues {
  email: string;
}

const RecuperarContrasenaFrm = () => {
  const navigate = useNavigate();
  const ForgetPassword = () => {
    setShouldAnimate(true);
    navigate("/login");
  };
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>();

  const onSubmit = async ({ email }: FormValues) => {
    if (!email || !email.includes("@")) {
      showToast("Ingresa un correo válido");
      return;
    }

    try {
      const result = await AuthServices.forgotPassword(email);

      if (result.success) {
        showToast(
          "Revisa tu correo para continuar con la restauración",
          "success"
        );
        navigate("/login");
        reset();
      } else {
        showToast(
          result.error || "No se pudo enviar el correo de recuperación"
        );
      }
    } catch (error) {
      showToast("Error inesperado al intentar recuperar la contraseña");
    }
  };

  return (
    <div className="w-[850px] h-[1060px] flex justify-end items-center pr-[112px]">
      <form
        className="h-[45%] w-[62%] rounded-lg border-2 flex flex-col justify-start items-center space-y-4 p-4 login-container opacity-80"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex justify-start w-full h-1/6 p-[11px] mb-4">
          <div className="w-full max-w-[500px] overflow-hidden">
            <img
              src="/public/Logo-static.png"
              alt="Logo"
              className="bg-a-baranoa w-full h-full object-cover"
            />
          </div>
        </div>

        <h2 className="text-2xl font-bold text-white">Recuperar Contraseña</h2>
        <div className="w-full flex flex-col items-center space-y-4">
          <div className="w-full flex flex-col items-start pl-10">
            <label htmlFor="correo" className="text-white mb-2 pl-4">
              CORREO ELECTRÓNICO
            </label>
            <input
              type="email"
              id="correo"
              {...register("email", {
                required: "Este campo es obligatorio",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Correo inválido",
                },
              })}
              className="w-[90%] h-12 border-none rounded-[2rem] p-2 bg-white bg-opacity-30 backdrop-blur placeholder-white focus:outline-none pl-4"
              placeholder="Ingresa tu correo"
              required
            />
            {errors.email && (
              <p className="text-sm text-red-500 pl-4 pt-1">
                {errors.email.message}
              </p>
            )}
          </div>
        </div>

        <div className="w-full px-10">
          <p className="text-white text-sm mt-4">
            Te enviaremos un enlace para restablecer tu contraseña.
          </p>
        </div>

        <div className="pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-orange-500 w-48 h-10 rounded-xl text-white hover:bg-orange-600 transition-colors"
          >
            {isSubmitting ? "Enviando..." : "Recuperar"}
          </button>
        </div>

        <div className="pt-2">
          <button
            type="button"
            onClick={ForgetPassword}
            className="text-white cursor-pointer hover:underline"
          >
            Volver al inicio de sesión
          </button>
        </div>
      </form>
    </div>
  );
};

export default RecuperarContrasenaFrm;
