import { useState } from "react";
import { useNavigate } from "react-router-dom";

const RecuperarContrasenaFrm = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  return (
    <div className="w-[850px] h-[1060px] flex justify-end items-center pr-[112px]">
      <form
        className="h-[45%] w-[62%] rounded-lg border-2 flex flex-col justify-start items-center space-y-4 p-4 login-container opacity-80"
        onSubmit={(e) => e.preventDefault()}
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
            <label htmlFor="email" className="text-white mb-2 pl-4">
              CORREO ELECTRÓNICO
            </label>
            <input
              type="email"
              id="email"
              className="w-[90%] h-12 border-none rounded-[2rem] p-2 bg-white bg-opacity-30 backdrop-blur placeholder-white focus:outline-none pl-4"
              placeholder="Ingresa tu correo"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
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
            className="bg-orange-500 w-48 h-10 rounded-xl text-white hover:bg-orange-600 transition-colors"
          >
            Enviar enlace
          </button>
        </div>

        <div className="pt-2">
          <button
            type="button"
            onClick={() => navigate("/login")}
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
