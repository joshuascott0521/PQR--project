import { motion } from "framer-motion";

interface CardSkeletonProps {
  size?: "small" | "medium" | "big";
}

export const CardSkeleton = ({ size = "medium" }: CardSkeletonProps) => {
  const sizeConfig = {
    small: {
      height: "h-[80px]",
      circle: "w-[50px] h-[50px]",
      rows: 1,
    },
    medium: {
      height: "h-[121px]",
      circle: "w-[74px] h-[74px]",
      rows: 3,
    },
    big: {
      height: "h-[180px]",
      circle: "w-[90px] h-[90px]",
      rows: 4,
    },
  };

  const config = sizeConfig[size];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className={`flex gap-4 p-4 shadow rounded-xl bg-white animate-pulse max-w-7xl items-center ${config.height}`}
    >
      {/* Círculo gris */}
      <div className={`${config.circle} rounded-full bg-gray-200`} />

      {/* Contenido de texto */}
      <div className="flex-1 space-y-2 h-full flex flex-col justify-center">
        {Array.from({ length: config.rows }).map((_, i) => (
          <div className="flex gap-4 justify-around" key={i}>
            <div className="w-1/4 h-4 bg-gray-200 rounded" />
            <div className="w-1/4 h-4 bg-gray-200 rounded" />
            <div className="w-1/4 h-4 bg-gray-200 rounded" />
          </div>
        ))}
      </div>
    </motion.div>
  );
};
