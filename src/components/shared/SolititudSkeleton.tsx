import { motion } from "framer-motion";

export const SolicitudSkeleton = () => {
  const skeletonClass = "bg-gray-200 rounded";

  return (
    <motion.div
      initial={{ opacity: 0.3 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
      className="w-full max-w-4xl mx-auto space-y-6"
    >
      {/* Encabezado superior */}
      <div className="flex flex-col md:flex-row justify-between items-center px-4 gap-4">
        <div className="space-y-2">
          <div className="w-60 h-6 bg-gray-200 rounded-full" />
          <div className="w-48 h-4 bg-gray-300 rounded" />
        </div>
        <div className="w-60 h-10 bg-gray-300 rounded" />
      </div>

      {/* Tarjeta de solicitud */}
      <div className="border border-gray-300 rounded-lg p-4 space-y-3 bg-white shadow">
        {/* Línea 1 */}
        <div className="flex flex-wrap gap-4">
          <div className={`h-4 w-48 ${skeletonClass}`} />
          <div className={`h-4 w-64 ${skeletonClass}`} />
        </div>

        {/* Línea 2 */}
        <div className={`h-4 w-4/5 ${skeletonClass}`} />

        {/* Línea 3 */}
        <div className="flex flex-wrap gap-4">
          <div className={`h-4 w-48 ${skeletonClass}`} />
          <div className={`h-4 w-64 ${skeletonClass}`} />
        </div>

        {/* Mensaje original */}
        <div className={`h-[48px] w-full ${skeletonClass}`} />
      </div>

      {/* Tarjeta de respuesta */}
      <div className="border border-gray-300 rounded-lg p-4 space-y-4 bg-white shadow">
        <div className={`h-4 w-28 ${skeletonClass}`} />
        <div className={`h-[120px] w-full ${skeletonClass}`} />

        {/* Adjuntos simulados */}
        

        {/* Botón Enviar */}
        <div className="flex justify-end">
          <div className="h-10 w-24 bg-gray-300 rounded-lg" />
        </div>
      </div>
    </motion.div>
  );
};
