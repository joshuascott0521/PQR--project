import React, { useEffect, useState } from "react";
// import { Bell, Send, User, CreditCard, Phone, UserCheck } from 'lucide-react';

import { Send } from "lucide-react";
import { NotificacionesService } from "../../services/pqrServices";
// import type { MedioNotificacion } from "../../interfaces/pqrInterfaces";
import { FloatingSelectLP } from "./FloatingSelectLP";
import type { Cliente } from "../../interfaces/pqrInterfaces";
interface NotificationFormData {
  pqrId: string;
  item: number;
  medio: string;
  destinatario: string;
  destinatarioDocumento: string;
  destinatarioNombre: string;
  destinatarioCalidad: string;
}

interface NotificationFormProps {
  onSubmit: (data: NotificationFormData) => void;
  onClose: () => void;
  cliente: Cliente;
  pqrId: string;
  item: number;
}

const NotificationForm: React.FC<NotificationFormProps> = ({
  onSubmit,
  onClose,
  cliente,
  pqrId,
  item,
}) => {
  const [formData, setFormData] = useState<NotificationFormData>({
    item: item,
    pqrId: pqrId,
    medio: "",
    destinatario: "",
    destinatarioDocumento: cliente?.documento || "",
    destinatarioNombre: cliente?.nombre || "",
    destinatarioCalidad: "",
  });

  const [tipoOptions, setTipoOptions] = useState<
    { label: string; value: string }[]
  >([]);
  const [calidadOptions, setCalidadOptions] = useState<
    { value: string; label: string }[]
  >([]);

  useEffect(() => {
    const fetchTipos = async () => {
      try {
        const res = await NotificacionesService.getMediosNotificacion();
        if (res.success && Array.isArray(res.data)) {
          const opciones = res.data.map((item: any) => ({
            value: item.medio,
            label: item.medio.toUpperCase(),
          }));
          setTipoOptions(opciones);
        }
      } catch (error) {
        console.error("Error al obtener medios de notificación:", error);
      }
    };

    fetchTipos();
  }, []);
  useEffect(() => {
    console.log("xddddddddddddddd", pqrId, item);

    const fetchCalidadOptions = async () => {
      const response = await NotificacionesService.getCalidadNotificacion();
      if (response.success && response.data) {
        const options = response.data.allowedValues.map((val) => ({
          value: val,
          label: val,
        }));
        setCalidadOptions(options);
      }
    };
    fetchCalidadOptions();
  }, []);

  const [errors, setErrors] = useState<Partial<NotificationFormData>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<NotificationFormData> = {};

    if (!formData.destinatario.trim()) {
      newErrors.destinatario = "El destinatario es requerido";
    }
    //  else if (!/^\d{10}$/.test(formData.celular)) {
    //   newErrors.celular = "El celular debe tener 10 dígitos";
    // }

    if (!formData.destinatarioDocumento.trim()) {
      newErrors.destinatarioDocumento =
        "El documento de identidad es requerido";
    }

    if (!formData.destinatarioNombre.trim()) {
      newErrors.destinatarioNombre = "El nombre es requerido";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const handleInputChange = (
    field: keyof NotificationFormData,
    value: string
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };
  useEffect(() => {
    if (!formData.medio) return;

    const tipoLower = formData.medio.trim().toLowerCase();

    if (tipoLower.includes("correo") || tipoLower.includes("email")) {
      setFormData((prev) => ({
        ...prev,
        destinatario: cliente?.email || "",
      }));
    } else if (
      tipoLower.includes("sms") ||
      tipoLower.includes("celular") ||
      tipoLower.includes("móvil") ||
      tipoLower.includes("telefono")
    ) {
      setFormData((prev) => ({
        ...prev,
        destinatario: cliente?.celular || "",
      }));
    }
  }, [formData.medio, cliente]);

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Form Fields in Horizontal Layout */}
        <div className="flex grid-cols-1 md:grid-cols-5 gap-4   ">
          {/* Tipo */}
          <div className="space-y-2 max-w-32">
            <label className="text-sm text-gray-700 flex items-center gap-2 whitespace-nowrap font-medium">
              Tipo de medio:
            </label>
            <FloatingSelectLP
              value={formData.medio}
              onChange={(value) => handleInputChange("medio", value)}
              options={tipoOptions}
            />
          </div>

          {/* Celular */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Celular/Correo
            </label>
            <input
              type="text"
              value={formData.destinatario}
              onChange={(e) =>
                handleInputChange("destinatario", e.target.value)
              }
              placeholder=""
              className={` h-8 w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-sm ${
                errors.destinatario
                  ? "border-red-500 bg-red-50"
                  : "border-gray-300"
              }`}
            />
            {errors.destinatario && (
              <p className="text-xs text-red-600">{errors.destinatario}</p>
            )}
          </div>

          {/* Documento de Identidad */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Documento Identidad
            </label>
            <input
              type="text"
              value={formData.destinatarioDocumento}
              onChange={(e) =>
                handleInputChange("destinatarioDocumento", e.target.value)
              }
              placeholder="1048213956"
              className={` h-8 w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-sm ${
                errors.destinatarioDocumento
                  ? "border-red-500 bg-red-50"
                  : "border-gray-300"
              }`}
            />
            {errors.destinatarioDocumento && (
              <p className="text-xs text-red-600">
                {errors.destinatarioDocumento}
              </p>
            )}
          </div>

          {/* Nombre */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Nombre
            </label>
            <input
              type="text"
              value={formData.destinatarioNombre}
              onChange={(e) =>
                handleInputChange("destinatarioNombre", e.target.value)
              }
              placeholder=""
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-sm h-8 ${
                errors.destinatarioNombre
                  ? "border-red-500 bg-red-50"
                  : "border-gray-300"
              }`}
            />
            {errors.destinatarioNombre && (
              <p className="text-xs text-red-600">
                {errors.destinatarioNombre}
              </p>
            )}
          </div>

          {/* Calidad */}
          <div className="space-y-2 w-60 max-w-60">
            <label className="text-sm text-gray-700 flex items-center gap-2 whitespace-nowrap font-medium">
              Calidad:
            </label>
            <FloatingSelectLP
              className="w-20"
              value={formData.destinatarioCalidad}
              onChange={(value) =>
                handleInputChange("destinatarioCalidad", value)
              }
              options={calidadOptions}
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors font-medium text-sm "
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl flex items-center gap-2 text-sm"
          >
            <Send className="w-4 h-4" />
            Enviar
          </button>
        </div>
      </form>
    </div>
  );
};

export default NotificationForm;
