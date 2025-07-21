import BrandingLateral from "../components/shared/BrandingLateral";
import StepForm from "../components/shared/StepForm"; // importa tu formulario multistep
import "../Login.css";

export default function Portal() {
  return (
    /*
    <div className="w-screen h-screen bg-neutral-800 flex justify-center items-center bg-image overflow-hidden">
      
      <div className="w-[60%] h-full flex items-center justify-center px-10">
        <div className="w-full max-w-2xl">
          <StepForm />
        </div>
      </div>

      
      <div className="w-[40%] h-full flex items-center pr-10">
        <BrandingLateral />
      </div>
    </div>
     */
    <div className="w-full h-full min-h-screen">
      {/* Vista movil */}
      <div className="block md:hidden relative w-full h-screen">
        {/* Imagen de fondo recortada */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/Login44.jpg')" }}
        >
          <div className="absolute inset-0 bg-black/40" />
        </div>

        {/* Formulario encima */}
        <div className="relative z-10 h-full overflow-y-auto p-4">
          <div className="bg-gray-50 rounded-lg shadow-lg p-4">
            
            <StepForm />
          </div>
        </div>
      </div>
      {/* vista ordenador */}
      <div className="hidden md:flex w-full h-screen">
        <div className="w-1/2 h-full overflow-y-auto px-10 py-10 bg-gray-50">
          <StepForm />
        </div>
        <div className="w-1/2 h-full fixed right-0 top-0 backdrop-blur-sm bg-image px-6 pr-10 py-10 flex items-center justify-center z-10">
          <BrandingLateral />
        </div>
      </div>
    </div>
  );
}
