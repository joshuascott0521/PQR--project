import { useState } from "react";
import type { DetallePqr } from "../../interfaces/pqrInterfaces";
import { ArchivoServices } from "../../services/pqrServices";
import { NotificacionServices } from "../../services/pqrServices";
import { showToast } from "../../utils/toastUtils";
import { useNavigate } from "react-router-dom";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import type { NotificacionDetalle } from "../../interfaces/pqrInterfaces";

const PqrChat = ({
  detalles,
  detallePqrId,
}: {
  detalles: DetallePqr["detalle"];
  detallePqrId: string;
}) => {
  const navigate = useNavigate();
  const [expandedItem, setExpandedItem] = useState<number | null>(null);
  const [notificaciones, setNotificaciones] = useState<
    Record<number, NotificacionDetalle[]>
  >({});
  const [loadingItems, setLoadingItems] = useState<number[]>([]);

  const getDetalle = (id: any, tipoTercero: any) => {
    if (tipoTercero === "Cliente") {
      navigate(`/dashboard/cliente/detalle/${id}`);
    } else if (tipoTercero === "Funcionario") {
      navigate(`/dashboard/funcionarios/resumen/${id}`);
    } else {
      showToast("Tipo de tercero no reconocido: " + tipoTercero);
    }
  };

  const toggleItem = async (item?: number) => {
    if (!item && item !== 0) return;
    if (expandedItem === item) {
      setExpandedItem(null);
      return;
    }

    setExpandedItem(item);

    // Solo consultar si aún no se ha hecho
    if (!(item in notificaciones)) {
      try {
        setLoadingItems((prev) => [...prev, item]);
        const result = await NotificacionServices.getByDetalle(
          detallePqrId,
          item
        );
        if (result.success) {
          if (result.data.length === 0) {
            showToast("Este ítem no ha sido notificado todavía.");
          }
          setNotificaciones((prev) => ({
            ...prev,
            [item]: result.data, // Guardar aunque esté vacío
          }));
        } else {
          showToast(result.error || "Error al cargar notificaciones");
          setNotificaciones((prev) => ({
            ...prev,
            [item]: [],
          }));
        }
      } finally {
        setLoadingItems((prev) => prev.filter((i) => i !== item));
      }
    }
  };

  return (
    <>
      {detalles?.map((detalle, index) => (
        <div
          key={index}
          className="w-full mx-auto bg-white rounded-lg p-6 shadow-sm mb-5"
        >
          <div className="flex justify-between items-start mb-3">
            <div className="flex items-center space-x-3">
              <div>
                <div
                  onClick={() =>
                    getDetalle(
                      detalle?.tercero?.id,
                      detalle.tercero.tipoTercero
                    )
                  }
                  className="flex items-center justify-center w-8 h-8 rounded-full bg-green-200 text-green-700 cursor-pointer"
                >
                  <i className="fas fa-user"></i>
                </div>
              </div>
              <div>
                <p
                  className="font-semibold text-sm leading-tight text-blue-400 cursor-pointer underline"
                  onClick={() =>
                    getDetalle(
                      detalle?.tercero?.id,
                      detalle.tercero.tipoTercero
                    )
                  }
                >
                  {`${detalle.tercero.nombre} (${detalle.tercero.tipoTercero})`}
                </p>
                <p className="text-xs text-gray-700 leading-tight">
                  {detalle.fechaCreacion?.slice(0, 10)}
                </p>
              </div>
            </div>
            <div>
              <span
                className="inline-block text-white rounded-full px-3 py-[2px] font-semibold text-xs"
                style={{ backgroundColor: detalle.codigoColorEstado }}
              >
                {detalle.estado}
              </span>
            </div>
          </div>

          <div
            className="rounded-md p-4 text-gray-900 text-sm font-normal whitespace-pre-line ml-9 opacity-80"
            style={{
              backgroundColor:
                detalle.tercero.tipoTercero === "Cliente"
                  ? "#e2ffed"
                  : detalle.tercero.tipoTercero === "Funcionario"
                  ? "#fff1dc"
                  : "gray",
            }}
          >
            {detalle.descripcion}

            {detalle.terceroAsignado && (
              <div className="flex max-w-96 mt-2 gap-3">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-yellow-400 text-yellow-700 bg-opacity-50">
                  <i className="fas fa-user"></i>
                </div>
                <div>
                  {detalle.terceroAsignado.accion && (
                    <p className="text-xs text-gray-700 leading-tight">
                      {detalle.terceroAsignado.accion}
                    </p>
                  )}
                  <p className="font-semibold text-sm leading-tight text-gray-900">
                    {`${detalle.terceroAsignado.nombre} (${detalle.terceroAsignado.tipoTercero})`}
                  </p>
                </div>
              </div>
            )}

            <div className="flex justify-start items-center space-x-3 mt-4">
              {detalle.notificable && (
                <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 text-sm rounded-2xl font-semibold flex items-center">
                  <i className="fas fa-bell mr-2"></i> NOTIFICAR
                </button>
              )}

              {detalle.notificado ? (
                <button
                  className="bg-green-600 text-white px-4 py-1 text-sm rounded-2xl font-semibold flex items-center hover:bg-green-700 transition-all"
                  onClick={() => toggleItem(detalle.item)}
                >
                  <i className="fas fa-check-circle mr-2"></i> NOTIFICADO
                  <span className="ml-2 transition-transform duration-300">
                    {expandedItem === detalle.item ? (
                      <FaChevronUp className="text-xs" />
                    ) : (
                      <FaChevronDown className="text-xs" />
                    )}
                  </span>
                </button>
              ) : (
                <button
                  className="bg-red-600 text-white px-4 py-1 text-sm rounded-2xl font-semibold flex items-center hover:bg-red-700 transition-all"
                  onClick={() => toggleItem(detalle.item)}
                >
                  <i className="fas fa-times-circle mr-2"></i> SIN NOTIFICAR
                  <span className="ml-2 transition-transform duration-300">
                    {expandedItem === detalle.item ? (
                      <FaChevronUp className="text-xs" />
                    ) : (
                      <FaChevronDown className="text-xs" />
                    )}
                  </span>
                </button>
              )}
            </div>

            {/* Tabla de notificaciones */}
            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                expandedItem === detalle.item
                  ? "max-h-[1000px] opacity-100 mt-4"
                  : "max-h-0 opacity-0"
              }`}
            >
              <div className="border border-gray-200 rounded-md">
                <table className="min-w-full text-sm text-left text-gray-700 bg-white">
                  <thead className="bg-white text-gray-600 uppercase text-xs font-semibold">
                    <tr>
                      <th className="px-4 py-2">ID ENVÍO</th>
                      <th className="px-4 py-2">TIPO</th>
                      <th className="px-4 py-2">CORREO/CELULAR</th>
                      <th className="px-4 py-2">NOMBRE</th>
                      <th className="px-4 py-2">ESTADO</th>
                      <th className="px-4 py-2">FECHA</th>
                      <th className="px-4 py-2">VER</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loadingItems.includes(detalle.item!) ? (
                      <tr>
                        <td colSpan={7} className="text-center py-4">
                          Cargando notificaciones...
                        </td>
                      </tr>
                    ) : notificaciones[detalle.item!] &&
                      notificaciones[detalle.item!].length > 0 ? (
                      notificaciones[detalle.item!].map((noti) => (
                        <tr key={noti.idEnvio} className="border-t-2">
                          <td className="px-4 py-2">{noti.idEnvio}</td>
                          <td className="px-4 py-2">{noti.tipo}</td>
                          <td className="px-4 py-2">{noti.destinatario}</td>
                          <td className="px-4 py-2">{noti.nombre}</td>
                          <td className="px-4 py-2">{noti.estado}</td>
                          <td className="px-4 py-2">
                            {noti.fecha?.slice(0, 10)}
                          </td>
                          <td className="px-4 py-2">
                            <i className="fas fa-search text-blue-500 cursor-pointer"></i>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan={7}
                          className="text-center py-4 text-gray-500"
                        >
                          No hay notificaciones registradas para este ítem.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Adjuntos */}
            {detalle.adjuntos?.length > 0 && (
              <div className="mt-4 flex space-x-3">
                {detalle.adjuntos.map((archivo) => (
                  <button
                    className="flex items-center space-x-2 bg-white border border-gray-300 rounded-md px-3 py-1 text-xs text-gray-700 hover:bg-gray-50"
                    type="button"
                    key={archivo.item}
                    onClick={async () => {
                      const result = await ArchivoServices.descargar(
                        archivo.urlArchivo,
                        archivo.nombre
                      );
                      if (!result.success) {
                        showToast("Error al descargar el archivo");
                      }
                    }}
                  >
                    <i className="far fa-file-pdf text-gray-600 text-sm leading-none"></i>
                    <span className="leading-none">{archivo.nombre}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      ))}
    </>
  );
};

export default PqrChat;
