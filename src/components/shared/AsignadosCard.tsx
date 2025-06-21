import React, { useEffect } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { getHoverBorderClass } from "../../utils/getHover";

interface Estado {
  valor: number;
  colorClass: string;
}

interface AsignadosCardProps {
  titulo: string;
  total: number;
  estados: Estado[];
  fondo: string;
}

const AsignadosCard: React.FC<AsignadosCardProps> = ({ titulo, total, estados, fondo }) => {
  const borderHover = getHoverBorderClass(fondo);

  // Motion value para animar número
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  useEffect(() => {
    const controls = animate(count, total, {
      duration: 0.8,
      ease: "easeOut",
    });

    return controls.stop;
  }, [total]);

  return (
    <div
      className={`
        card-glow-hover rounded-2xl shadow-lg p-4
        max-w-xs w-[220px] text-black
        flex flex-col gap-2 justify-around
        ${borderHover}
        cursor-default
      `}
    >
      <h2 className="text-lg font-semibold text-center">{titulo}</h2>

      <div className="flex items-center gap-3 justify-center">
        <motion.span className="text-3xl font-bold text-black">
          {rounded}
        </motion.span>

        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ repeat: 1, duration: 0.4 }}
        >
          <div className="flex gap-2">
            {estados.map((estado, index) => (
              <div
                key={index}
                className={`
                  ${estado.colorClass}
                  w-7 h-7 rounded-full flex items-center justify-center text-white
                  font-semibold text-sm shadow-md border border-white/40
                `}
              >
                {estado.valor}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AsignadosCard;
