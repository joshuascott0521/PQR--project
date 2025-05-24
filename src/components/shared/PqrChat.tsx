const PqrChat = () => {
  return (
    <>
      <div className="max-w-[1150px] w-full  mx-auto bg-white rounded-lg p-6 shadow-sm mb-5">
        <div className="flex justify-between items-start mb-3">
          <div className="flex items-center space-x-3">
            <div>
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-200 text-green-700">
                <i className="fas fa-user"></i>
              </div>
            </div>
            <div>
              <p className="font-semibold text-sm leading-tight text-gray-900">
                Juancho de la Espriella (Cliente)
              </p>
              <p className="text-xs text-gray-700 leading-tight">
                20/11/2024 : 8:55 AM
              </p>
            </div>
          </div>
          <div>
            <span className="inline-block bg-gray-300 text-gray-800 text-xs font-normal rounded-full px-4 py-1">
              Registrado
            </span>
          </div>
        </div>
        <div className="bg-green-50 rounded-md p-4 text-gray-900 text-sm font-normal whitespace-pre-line ml-9">
          Hola, Ya realice el pago de mi impuesto, solicito se me envió
          devolución del dinero embargado. Gracias. Atentamente; Andreina Arteta
          <div className="mt-4 flex space-x-3">
            <button
              className="flex items-center space-x-2 bg-white border border-gray-300 rounded-md px-3 py-1 text-xs text-gray-700 hover:bg-gray-50"
              type="button"
            >
              <i className="far fa-file-pdf text-gray-600 text-sm leading-none"></i>
              <span className="leading-none">Soporte del pago.pdf</span>
            </button>
            <button
              className="flex items-center space-x-2 bg-white border border-gray-300 rounded-md px-3 py-1 text-xs text-gray-700 hover:bg-gray-50"
              type="button"
            >
              <i className="far fa-file-pdf text-gray-600 text-sm leading-none"></i>
              <span className="leading-none">Documento de Id...pdf</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PqrChat;
