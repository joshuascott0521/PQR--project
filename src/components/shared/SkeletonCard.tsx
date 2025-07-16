// components/shared/SkeletonCard.tsx
import { motion } from "framer-motion";

const SkeletonCard = () => {
  return (
    <motion.div
      className={`
        card-glow-hover rounded-2xl shadow-lg p-4
        max-w-xs w-[220px] text-black
        flex flex-col gap-2 justify-around
        bg-white
      `}
      initial={{ opacity: 0.4 }}
      animate={{ opacity: [0.4, 0.8, 0.4] }}
      transition={{ duration: 1.2, repeat: Infinity }}
    >
      {/* Simulación del título */}
      <div className="h-5 w-3/4 mx-auto bg-gray-300 rounded-xl mb-1" />

      <div className="flex items-center gap-3 justify-center">
        {/* Simulación del número total */}
        <div className="h-8 w-10 bg-gray-300 rounded-md" />

        {/* Simulación de los estados (círculos) */}
        <div className="flex gap-2">
          <div className="w-7 h-7 bg-red-200 rounded-full shadow border border-white/40" />
          <div className="w-7 h-7 bg-yellow-100 rounded-full shadow border border-white/40" />
          <div className="w-7 h-7 bg-green-200 rounded-full shadow border border-white/40" />
        </div>
      </div>
    </motion.div>
  );
};

export default SkeletonCard;
