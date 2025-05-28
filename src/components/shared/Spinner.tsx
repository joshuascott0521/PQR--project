// components/Spinner.tsx
const Spinner = () => (
  <div className="flex flex-col items-center justify-center py-10">
    <div className="w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full animate-spin" />
    <p className="mt-4 text-sm text-gray-500 animate-pulse">Cargando cliente...</p>
  </div>
);

export default Spinner;
