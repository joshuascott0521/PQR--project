const PqrChat = () => {
  return (
    <>
      <div className="max-w-4xl mx-auto border border-transparent rounded-md">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-200 text-green-700">
              <i className="fas fa-user"></i>
            </div>
            <p className="font-semibold text-black text-sm leading-tight flex items-center space-x-2">
              <span>Juancho de la Espriella (Cliente)</span>
              <span className="ml-1">20/11/2024</span>
            </p>
          </div>
          <div className="px-4 py-1 rounded-full bg-gray-400 text-gray-900 text-sm font-normal">
            Registrado
          </div>
        </div>
        <p className="font-extrabold text-xs uppercase text-black mb-2">
          INGRESO
        </p>
        <div className="bg-green-50 rounded-md p-4">
          <div
            contentEditable="true"
            className="text-sm text-black mb-4 leading-relaxed outline-none min-h-[4.5rem] break-words"
            aria-label="Editable message content"
            spellCheck="true"
          >
            Hola, Ya realice el pago de mi impuesto, solicito se me envió
            devolución del dinero embargado. Gracias.
          </div>

          <div className="flex space-x-2">
            <button
              className="flex items-center space-x-2 bg-white border border-gray-200 rounded-md px-3 py-1 text-xs text-gray-700 hover:bg-gray-50"
              type="button"
            >
              <i className="far fa-file-alt text-gray-500"></i>
              <span>Soporte del pago.pdf</span>
            </button>
            <button
              className="flex items-center space-x-2 bg-white border border-gray-200 rounded-md px-3 py-1 text-xs text-gray-700 hover:bg-gray-50"
              type="button"
            >
              <i className="far fa-file-alt text-gray-500"></i>
              <span>Documento de Id...pdf</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PqrChat;
