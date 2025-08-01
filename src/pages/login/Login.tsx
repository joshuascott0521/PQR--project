import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { getShouldAnimate, setShouldAnimate } from "../../utils/animationStore";
const Login = () => {
  const location = useLocation();
  const [animate, setAnimate] = useState(false);
  useEffect(() => {
    const animateFlag = getShouldAnimate();
    setAnimate(animateFlag);
    setShouldAnimate(false); // Evita que se repita en refresh
  }, [location.pathname]);

  return (
    <>
      <div className="w-screen h-screen bg-neutral-800 flex justify-center items-center bg-image  overflow-hidden">
        <div className="w-[40%] h-[100%] flex  items-center pl-10">
          <div className="w-[90%] h-[70%]">
            <div className="">
              <img
                src="/public/PqrLogo.png"
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

        <AnimatePresence mode="wait">
          {animate ? (
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.4 }}
            >
              <Outlet />
            </motion.div>
          ) : (
            <div key={location.pathname}>
              <Outlet />
            </div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default Login;
