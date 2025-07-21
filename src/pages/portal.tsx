import BrandingLateral from "../components/shared/BrandingLateral";
import StepForm from "../components/shared/StepForm"; // importa tu formulario multistep
import "../Login.css";

export default function Portal() {
  return (
    <div className="w-full h-screen relative overflow-hidden">
      {/* 🌄 Fondo para TODAS las vistas */}
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ backgroundImage: "url('/Login44.jpg')" }}
      />

      {/* Vista móvil */}
      <div className="block md:hidden relative w-full h-full z-10 p-4 overflow-y-auto">
        <div className="mt-3 p-1 rounded-xl">
          <img src="/Static-new.png" />
        </div>
        <h1 className="text-3xl text-white font-semibold text-center mt-1.5 mb-2">
          Portal Ciudadano - PQRS
        </h1>
        <div className="rounded-lg px-4 py-3 bg-white/90">
          <StepForm />
        </div>
      </div>

      {/* Vista escritorio */}
      <div className="hidden md:flex w-full h-full relative z-10">
        <div className="w-1/2 h-full px-10 py-10 flex items-center justify-center bg-transparent">
          <StepForm />
        </div>
        <div className="w-1/2 h-full flex items-center justify-center bg-transparent">
          <BrandingLateral />
        </div>
      </div>
    </div>
  );
}

