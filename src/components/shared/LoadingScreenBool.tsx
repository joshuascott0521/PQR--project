// components/shared/LoadingScreen.tsx
import { Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreenBool({ active }: { active: boolean }) {
  return (
    <AnimatePresence>
      {active && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-green-100 to-white"
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
            transition={{ duration: 0.4 }}
            className="bg-white p-6 rounded-2xl shadow-lg flex flex-col items-center"
          >
            <Loader2 className="animate-spin h-12 w-12 text-green-500 mb-4" />
            <h2 className="text-lg font-semibold text-gray-800 mb-1">
              Cargando
            </h2>
            <p className="text-sm text-gray-500">Insertando datos del PQR...</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
