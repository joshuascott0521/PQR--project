import React, { useEffect, useState } from "react";
// import { Bell, Send, User, CreditCard, Phone, UserCheck } from 'lucide-react';

import { Send } from "lucide-react";
import { NotificacionesService } from "../../services/pqrServices";
import type { MedioNotificacion } from "../../interfaces/pqrInterfaces";
import { FloatingSelectLP } from "./FloatingSelectLP";
interface NotificationFormData {
  tipo: string;
  celular: string;
  documentoIdentidad: string;
  nombre: string;
  calidad: string;
}

interface NotificationFormProps {
  onSubmit: (data: NotificationFormData) => void;
  onClose: () => void;
}

const NotificationForm: React.FC<NotificationFormProps> = ({
  onSubmit,
  onClose,
}) => {
  const [formData, setFormData] = useState<NotificationFormData>({
    tipo: "SMS",
    celular: "",
    documentoIdentidad: "",
    nombre: "",
    calidad: "CLIENTE",
  });
  const [tipoOptions, setTipoOptions] = useState<
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

  const [errors, setErrors] = useState<Partial<NotificationFormData>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<NotificationFormData> = {};

    if (!formData.celular.trim()) {
      newErrors.celular = "El celular es requerido";
    } else if (!/^\d{10}$/.test(formData.celular)) {
      newErrors.celular = "El celular debe tener 10 dígitos";
    }

    if (!formData.documentoIdentidad.trim()) {
      newErrors.documentoIdentidad = "El documento de identidad es requerido";
    }

    if (!formData.nombre.trim()) {
      newErrors.nombre = "El nombre es requerido";
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

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Form Fields in Horizontal Layout */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {/* Tipo */}
          <div className="space-y-2">
            <label className="text-sm text-gray-700 flex items-center gap-2 whitespace-nowrap">
              Tipo de medio:
            </label>
            <FloatingSelectLP
              value={formData.tipo}
              onChange={(value) => handleInputChange("tipo", value)}
              options={tipoOptions}
            />
          </div>

          {/* Celular */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Celular/Correo
            </label>
            <input
              type="tel"
              value={formData.celular}
              onChange={(e) => handleInputChange("celular", e.target.value)}
              placeholder=""
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-sm ${
                errors.celular ? "border-red-500 bg-red-50" : "border-gray-300"
              }`}
            />
            {errors.celular && (
              <p className="text-xs text-red-600">{errors.celular}</p>
            )}
          </div>

          {/* Documento de Identidad */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Documento Identidad
            </label>
            <input
              type="text"
              value={formData.documentoIdentidad}
              onChange={(e) =>
                handleInputChange("documentoIdentidad", e.target.value)
              }
              placeholder="1048213956"
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-sm ${
                errors.documentoIdentidad
                  ? "border-red-500 bg-red-50"
                  : "border-gray-300"
              }`}
            />
            {errors.documentoIdentidad && (
              <p className="text-xs text-red-600">
                {errors.documentoIdentidad}
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
              value={formData.nombre}
              onChange={(e) => handleInputChange("nombre", e.target.value)}
              placeholder="RONALD MORENO GONZALEZ"
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-sm ${
                errors.nombre ? "border-red-500 bg-red-50" : "border-gray-300"
              }`}
            />
            {errors.nombre && (
              <p className="text-xs text-red-600">{errors.nombre}</p>
            )}
          </div>

          {/* Calidad */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Calidad
            </label>
            <select
              value={formData.calidad}
              onChange={(e) => handleInputChange("calidad", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors bg-white text-sm"
            >
              <option value="CLIENTE">CLIENTE</option>
              <option value="PROSPECTO">PROSPECTO</option>
              <option value="LEAD">LEAD</option>
              <option value="EMPLEADO">EMPLEADO</option>
            </select>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors font-medium text-sm"
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
