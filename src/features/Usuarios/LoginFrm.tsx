import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
const LoginForm = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Todos los campos son obligatorios");
      return;
    }

    try {
      await login(email, password);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Error desconocido al iniciar sesión");
      }
    }
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
              src="/public/Logo-static.png"
              alt="Logo"
              className="bg-a-baranoa w-full h-auto object-cover"
            />
          </div>
        </div>
        <div className="w-full flex flex-col items-center space-y-4">
          <div className="w-full flex flex-col  items-start pl-10">
            <label htmlFor="email" className=" text-white mb-2 pl-4 ">
              CORREO
            </label>
            <input
              type="email"
              id="email"
              className="w-[90%] h-12 border-none rounded-[2rem] p-2 bg-white bg-opacity-30 backdrop-blur placeholder-white text-white focus:outline-none pl-4"
              placeholder="Ingresa tu correo"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="w-full flex flex-col  items-start pl-10">
            <label htmlFor="password" className=" text-white mb-2 pl-4">
              PASSWORD
            </label>
            <input
              type="password"
              id="password"
              className="w-[90%] h-12 border-none rounded-[2rem] p-2 bg-white bg-opacity-30 backdrop-blur placeholder-white text-white focus:outline-none pl-4"
              placeholder="Ingresa tu contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
          </div>
        </div>
        <div className="w-[100%] h-20 flex justify-evenly items-center">
          <div>
            <input type="checkbox" id="remember" />
            <label htmlFor="remember" className="text-white ml-2">
              RECORDARME
            </label>
          </div>
          <div>
            <p className="text-white cursor-pointer hover:underline">
              OLVIDE MI CONTRASEÑA?
            </p>
          </div>
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <div>
          <button
            type="submit"
            className="bg-orange-500 w-48 h-10 rounded-xl text-white hover:cursor-pointer"
          >
            Ingresar
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
