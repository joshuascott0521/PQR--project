import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";

export default function LoadingScreen() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-green-100 to-white"
    >
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.4 }}
        className="bg-white p-6 rounded-2xl shadow-lg flex flex-col items-center"
      >
        <Loader2 className="animate-spin h-12 w-12 text-green-500 mb-4" />
        <h2 className="text-lg font-semibold text-gray-800 mb-1">Cargando</h2>
        <p className="text-sm text-gray-500">Verificando sesión...</p>
      </motion.div>
    </motion.div>
  );
}
