import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { showToast } from "../../utils/toastUtils";
import { useNavigate } from "react-router-dom";
import { setShouldAnimate } from "../../utils/animationStore";
import { WrapperVisibilidadPassword } from "../../components/shared/WrapperVisibilidadPassword";

const LoginForm = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [disabled, setDisabled] = useState(false); // Controla el delay de 2s

  const navigate = useNavigate();
  const ForgetPassword = () => {
    setShouldAnimate(true);
    navigate("/login/Recuperar-contraseña");
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setDisabled(true);

    if (!email || !password) {
      showToast("Todos los campos son obligatorios.");
      return;
    }

    if (password.length < 8) {
      showToast("La contraseña debe tener al menos 8 caracteres.");
      return;
    }

    if (!validateEmail(email)) {
      showToast("El correo electrónico no es válido.");
      return;
    }

    try {
      setIsLoading(true);
      await login(email, password);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
        showToast("Usuario y/o contraseña incorrectos.");
      } else {
        setError("Error desconocido al iniciar sesión");
      }
    } finally {
      setIsLoading(false);
    }
  };
  setTimeout(() => {
    setDisabled(false);
  }, 500);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <div className="w-[850px] h-[1060px] flex justify-end items-center pr-[112px]">
      <form
        className="h-[45%] w-[62%] rounded-lg border-2 flex flex-col justify-start items-center space-y-4 p-4 login-container opacity-80"
        onSubmit={handleSubmit}
      >
        <div className="flex justify-start w-full h-1/6 p-2 mb-4">
          <div className="w-full max-w-[500px] overflow-hidden">
            <img
              src="/Logo-static.png"
              alt="Logo alcaldia"
              className="bg-a-baranoa w-full h-auto object-cover"
            />
          </div>
        </div>

        <div className="w-full flex flex-col items-center space-y-4">
          <div className="w-full flex flex-col items-start pl-10">
            <label htmlFor="email" className="text-white mb-2 pl-4">
              CORREO
            </label>
            <input
              type="text"
              id="email"
              className="w-[90%] h-12 border-none rounded-[2rem] p-2 bg-white bg-opacity-30 backdrop-blur placeholder-white focus:outline-none pl-4"
              placeholder="Ingresa tu correo"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="w-full flex flex-col items-start pl-10">
            <label htmlFor="password" className="text-white mb-2 pl-4">
              PASSWORD
            </label>
            <WrapperVisibilidadPassword
              as="input"
              id="password"
              placeholder="Ingresa tu contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              wrapperClassName="w-[90%]"
              inputClassName="h-12 border-none rounded-[2rem] p-2 bg-white bg-opacity-30 backdrop-blur placeholder-white focus:outline-none pl-4"
            />
          </div>
        </div>

        <div className="w-[100%] h-20 flex justify-center items-center text-[18px]">
          <p
            className="text-white cursor-pointer hover:underline"
            onClick={ForgetPassword}
          >
            ¿Olvidaste tu contraseña?
          </p>
        </div>

        <div>
          <button
            type="submit"
            disabled={isLoading || disabled}
            className={`bg-orange-500 w-48 h-10 rounded-xl text-white flex items-center justify-center gap-2 transition-opacity  hover:bg-orange-600
            ${
              isLoading || disabled
                ? "cursor-not-allowed opacity-50"
                : "cursor-pointer"
            }`}
          >
            {isLoading || disabled ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Cargando...
              </>
            ) : (
              "Ingresar"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
