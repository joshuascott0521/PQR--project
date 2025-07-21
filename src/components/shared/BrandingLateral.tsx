export default function BrandingLateral() {
  return (
    <div className="w-full h-full flex flex-col justify-center px-10">
      <div>
        <img src="/PqrLogo.png" className="w-[160px] h-auto" alt="Logo PQR" />
      </div>

      <div className="mb-4 mt-2">
        <h1 className="text-5xl text-white/80 font-bold leading-tight text-left">
          Portal Ciudadano - PQRS
        </h1>
      </div>

      <div className="mb-2">
        <p className="text-lg text-white text-left">
          Bienvenido al Portal Ciudadano de PQRS, donde puede registrar sus Peticiones, Quejas, Reclamos y Sugerencias de manera sencilla.
        </p>
        <p className="text-lg pt-2 text-white text-left font-bold">
          ¡Su opinión es valiosa para nosotros!
        </p>
      </div>

      <div className="w-16 h-[5px] bg-white my-6"></div>

      <div className="mb-10">
        <p className="text-white text-left">
          ©Creapptech S.A.S - Somos una empresa líder en soluciones integrales basadas en tecnología e innovación.
        </p>
      </div>

      <div>
        <button
          onClick={() => window.open("https://www.creapptech.com/", "_blank")}
          className="bg-emeraldBright rounded-3xl w-36 h-10 text-white text-lg font-bold"
        >
          Conócenos
        </button>
      </div>
    </div>
  );
}
