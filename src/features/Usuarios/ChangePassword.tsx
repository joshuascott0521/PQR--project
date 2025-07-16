import { RotateCcwKey } from "lucide-react"
import type { Password } from "../../interfaces/pqrInterfaces";
import { useState } from "react";
import { FloatingLabel } from "../../components/shared/FloatingLabel";
import { useNavigate } from "react-router-dom";
import { UsersServices } from "../../services/pqrServices";
import { showToast } from "../../utils/toastUtils";

export const ChangePassword = () => {

    const navigate = useNavigate();
    const userDataString = localStorage.getItem("userData");
    const userData = userDataString ? JSON.parse(userDataString) : null;
    const usuarioId = userData?.id;

    const [formData, setFormData] = useState<Password>({
        id: usuarioId,
        passwordAntigua: "",
        passwordNueva: "",
        passwordConfirmacion: ""
    });

    const [errores, setErrores] = useState({
        passwordAntigua: false,
        passwordNueva: false,
        passwordConfirmacion: false,
    });


    const handleCancel = () => {
        navigate("/dashboard/statistic");
    }

    const validarFormulario = (): boolean => {
        const campos = ["passwordAntigua", "passwordNueva", "passwordConfirmacion"] as const;

        const nuevoErrores = {
            passwordAntigua: false,
            passwordNueva: false,
            passwordConfirmacion: false,
        };

        let esValido = true;

        campos.forEach((campo) => {
            const valor = formData[campo];

            const tieneError =
                !valor ||                // Vacío
                /\s/.test(valor) ||      // Contiene espacios
                valor.length < 8;        // Menos de 8 caracteres

            if (tieneError) {
                nuevoErrores[campo] = true;
                esValido = false;
            }
        });

        // Validar coincidencia
        if (formData.passwordNueva !== formData.passwordConfirmacion) {
            nuevoErrores.passwordNueva = true;
            nuevoErrores.passwordConfirmacion = true;
            esValido = false;
        }

        setErrores(nuevoErrores);

        if (!esValido) {
            showToast("Corrige los campos marcados en rojo", "error");
        }

        return esValido;
    };



    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!validarFormulario()) return;

        try {
            const response = await UsersServices.changePass(formData);
            if (response.success) {
                showToast("¡Contraseña actualizada exitosamente!", "success");
                navigate("/dashboard/statistic");
            } else {
                console.error("Error al actualizar Contraseña:", response.error);
                showToast("Error al actualizar contraseña");
            }
        } catch (error) {
            console.error("Error inesperado al actualizar contraseña:", error);
            showToast("Ocurrió un error inesperado", "error");
        }
    };


    return (
        <div className="h-full flex flex-col">
            <div className="flex flex-row mb-[15px] items-center gap-[15px]">
                <RotateCcwKey size={35} />
                <div className="flex font-bold text-[33px]">
                    <p>Cambiar Contraseña</p>
                </div>
            </div>
            <div className="flex flex-col overflow-y-auto bg-gray-100 px-6 py-4 rounded-lg space-y-4">
                <form
                    className="flex flex-col space-y-2 bg-white p-6 rounded-lg shadow-md w-full"
                    onSubmit={handleSubmit}
                >
                    <h2 className="text-xl font-semibold mb-4 border-b-2 border-gray-300">Datos del Funcionario</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pb-3">
                        <FloatingLabel
                            id="contraseñaActual"
                            label="Contraseña Actual"
                            type="password"
                            className={`w-full ${errores.passwordAntigua ? "border border-red-500" : ""}`}
                            value={formData.passwordAntigua}
                            onChange={(e) =>
                                setFormData((prev) => ({ ...prev, passwordAntigua: e.target.value }))
                            }
                        />
                        <div className="block"></div>
                        <FloatingLabel
                            id="contraseñaNueva"
                            label="Contraseña Nueva"
                            type="password"
                            className={`w-full ${errores.passwordNueva ? "border border-red-500" : ""}`}
                            value={formData.passwordNueva}
                            onChange={(e) =>
                                setFormData((prev) => ({ ...prev, passwordNueva: e.target.value }))
                            }
                        />
                        <FloatingLabel
                            id="contraseñaNuevaConfirmacion"
                            label="Confirmar Contraseña"
                            type="password"
                            className={`w-full ${errores.passwordConfirmacion ? "border border-red-500" : ""}`}
                            value={formData.passwordConfirmacion}
                            onChange={(e) =>
                                setFormData((prev) => ({ ...prev, passwordConfirmacion: e.target.value }))
                            }
                        />
                    </div>
                    <div className="flex justify-end gap-4 mt-auto pt-6 border-gray-200">
                        <button
                            type="button"
                            onClick={handleCancel}
                            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 font-semibold text-sm hover:bg-gray-100 transition"
                        >
                            Cancelar
                        </button>

                        <button
                            type="submit"
                            className="px-6 py-2 bg-green-600 text-white rounded-lg font-semibold text-sm hover:bg-green-700 transition"
                        >
                            Guardar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}