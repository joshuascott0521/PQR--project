import React, { useEffect, useState } from "react";
// import { Bell, Send, User, CreditCard, Phone, UserCheck } from 'lucide-react';

import { Send } from "lucide-react";
import { NotificacionesService } from "../../services/pqrServices";
// import type { MedioNotificacion } from "../../interfaces/pqrInterfaces";
import { FloatingSelectLP } from "./FloatingSelectLP";
import type { Cliente } from "../../interfaces/pqrInterfaces";
import { showToast } from "../../utils/toastUtils";
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
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    // console.log("xddddddddddddddd", pqrId, item);

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
    const {
      medio,
      destinatario,
      destinatarioDocumento,
      destinatarioNombre,
      destinatarioCalidad,
    } = formData;

    const tipoLower = medio.trim().toLowerCase();

    const newErrors: Partial<NotificationFormData> = {};

    if (!medio.trim()) newErrors.medio = "El tipo de medio es obligatorio";
    if (!destinatario.trim()) {
      newErrors.destinatario = "El destinatario es requerido";
    } else {
      if (
        tipoLower.includes("sms") ||
        tipoLower.includes("celular") ||
        tipoLower.includes("móvil") ||
        tipoLower.includes("teléfono")
      ) {
        const onlyNumbers = destinatario.replace(/\D/g, "");
        if (onlyNumbers.length < 10) {
          newErrors.destinatario = "El número debe tener al menos 10 dígitos";
        }
      } else if (tipoLower.includes("correo") || tipoLower.includes("email")) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(destinatario)) {
          newErrors.destinatario = "Correo electrónico inválido";
        }
      }
    }

    if (!destinatarioDocumento.trim()) {
      newErrors.destinatarioDocumento =
        "El documento de identidad es obligatorio";
    }

    if (!destinatarioNombre.trim()) {
      newErrors.destinatarioNombre = "El nombre es obligatorio";
    }

    if (!destinatarioCalidad.trim()) {
      newErrors.destinatarioCalidad =
        "La calidad del destinatario es obligatoria";
    }

    setErrors(newErrors);

    const keys = Object.keys(newErrors);

    if (keys.length === 0) return true;

    // Si solo hay un campo con error, muestra ese
    if (keys.length === 1) {
      const msg = (newErrors as any)[keys[0]];
      showToast(msg);
    } else {
      showToast("Todos los campos son obligatorios");
    }

    return false;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    onSubmit(formData);
  };

  const handleInputChange = (
    field: keyof NotificationFormData,
    value: string
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  // 💡 Agrega esto JUSTO aquí abajo:
  const handleDestinatarioInput = (value: string) => {
    const tipo = formData.medio.toLowerCase();
    const esSMS =
      tipo.includes("sms") ||
      tipo.includes("celular") ||
      tipo.includes("móvil") ||
      tipo.includes("telefono");

    if (esSMS) {
      const soloNumeros = value.replace(/\D/g, ""); // Quita todo lo que no sea número
      handleInputChange("destinatario", soloNumeros);
    } else {
      handleInputChange("destinatario", value);
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
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-sm h-8 ${
                errors.medio ? "border-red-500 bg-red-50" : "border-gray-300"
              }`}
              value={formData.medio}
              onChange={(value) => handleInputChange("medio", value)}
              options={tipoOptions}
            />
            {/* {errors.medio && (
              <p className="text-xs text-red-600">{errors.medio}</p>
            )} */}
          </div>

          {/* destinatario */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Celular/Correo
            </label>
            <input
              type="text"
              value={formData.destinatario}
              onChange={(e) => {
                const valor = e.target.value;

                if (
                  formData.medio.toLowerCase().includes("sms") ||
                  formData.medio.toLowerCase().includes("celular") ||
                  formData.medio.toLowerCase().includes("móvil") ||
                  formData.medio.toLowerCase().includes("telefono")
                ) {
                  // Solo permitir números y que empiece por 3
                  if (/^3\d*$/.test(valor) || valor === "") {
                    handleInputChange("destinatario", valor);
                  }
                } else {
                  // Si es email u otro medio, permitir cualquier texto
                  handleInputChange("destinatario", valor);
                }
              }}
              placeholder=""
              className={` h-8 w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-sm ${
                errors.destinatario
                  ? "border-red-500 bg-red-50"
                  : "border-gray-300"
              }`}
            />

            {/* {errors.destinatario && (
              <p className="text-xs text-red-600">{errors.destinatario}</p>
            )} */}
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
              className={` h-8 w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-sm ${
                errors.destinatarioDocumento
                  ? "border-red-500 bg-red-50"
                  : "border-gray-300"
              }`}
            />
            {/* {errors.destinatarioDocumento && (
              <p className="text-xs text-red-600">
                {errors.destinatarioDocumento}
              </p>
            )} */}
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
            {/* {errors.destinatarioNombre && (
              <p className="text-xs text-red-600">
                {errors.destinatarioNombre}
              </p>
            )} */}
          </div>

          {/* Calidad */}
          <div className="space-y-2 w-60 max-w-60">
            <label className="text-sm text-gray-700 flex items-center gap-2 whitespace-nowrap font-medium">
              Calidad:
            </label>
            <FloatingSelectLP
              className={`w-full ${
                errors.destinatarioCalidad
                  ? "border border-red-500 bg-red-50"
                  : ""
              }`}
              value={formData.destinatarioCalidad}
              onChange={(value) =>
                handleInputChange("destinatarioCalidad", value)
              }
              options={calidadOptions}
            />
            {/* {errors.destinatarioCalidad && (
              <p className="text-xs text-red-600">
                {errors.destinatarioCalidad}
              </p>
            )} */}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            className="px-6 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancelar
          </button>

          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl flex items-center gap-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <span className="animate-pulse">Enviando...</span>
            ) : (
              <>
                <Send className="w-4 h-4" />
                Enviar
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default NotificationForm;
