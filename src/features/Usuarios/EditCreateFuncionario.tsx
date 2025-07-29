
import { ShieldUser } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import type { Dependencia, UserType, Usuario } from '../../interfaces/pqrInterfaces';
import { DependenciaServices, UsersServices } from '../../services/pqrServices';
import { FloatingLabel } from '../../components/shared/FloatingLabel';
import { FloatingSelect } from '../../components/shared/FloatingSelect';
import { showToast } from '../../utils/toastUtils';

interface FuncionariosProps {
    Editing?: boolean;
}

const FuncionarioCreateEdit = ({ Editing }: FuncionariosProps) => {
    const { code } = useParams();
    const [loading, setLoading] = useState(true);
    const [tipoFuncionario, setTipoFuncionario] = useState<UserType[]>([])
    const [dependencia, setDependencia] = useState<Dependencia[]>([])
    const [formData, setFormData] = useState<Usuario>({
        id: "",
        documento: "",
        nombre: "",
        tipoUsuId: "",
        tipoUsuNombre: "",
        role: "",
        email: "",
        celular: "",
        estado: "",
        dependenciaId: null,
    });

    const navigate = useNavigate();

    useEffect(() => {
        const fetchFuncionarios = async () => {
            try {
                const responseUserType = await UsersServices.getUserType();
                if (!responseUserType.success) throw new Error(responseUserType.error);
                const responseDependencias = await DependenciaServices.getAll();
                if (!responseDependencias.success) throw new Error(responseDependencias.error);

                setTipoFuncionario(responseUserType.data);
                setDependencia(responseDependencias.data);

                if (Editing && code) {
                    const responseFuncionario = await UsersServices.getById(code!);
                    if (!responseFuncionario.success) throw new Error(responseFuncionario.error);
                    setFormData(responseFuncionario.data)
                }
            } catch (err) {
                console.error("Error al cargar datos iniciales:", err);
            } finally {
                setLoading(false);
            }
        }
        fetchFuncionarios();
    }, []);

    const handleCancel = () => {
        console.log("DependenciaId actual:", formData.dependenciaId);
        navigate("/dashboard/admin/funcionarios");
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            if (Editing) {
                const payload = {
                    id: code!,
                    documento: formData.documento,
                    nombre: formData.nombre,
                    tipoUsuId: formData.tipoUsuId,
                    email: formData.email,
                    celular: formData.celular,
                    dependenciaid: formData.dependenciaId,
                }

                const responseUpdateFuncionario = await UsersServices.update(payload);
                if (!responseUpdateFuncionario.success) throw new Error(responseUpdateFuncionario.error);
                showToast("Funcionario Actualizado Correctamente", "success")
                navigate("/dashboard/admin/funcionarios")
            } else {
                const responseCreate = await UsersServices.create(formData)
                if (!responseCreate.success) throw new Error(responseCreate.error);
                showToast("Funcionario Creado Correctamente", "success")
                navigate("/dashboard/admin/funcionarios")
            }
        } catch (error) {
            console.error("Error al actualizar o crear funcionario");
        }
    }

    return (
        <div className="h-full flex flex-col">
            <div className="flex mb-[15px] items-center gap-x-5">
                {Editing
                    ?
                    <div className="flex-shrink-0">
                        <img src="/Icon_Funcionario.svg" alt="Icono de funcionario" style={{ width: "50px" }} />
                    </div>
                    :
                    <ShieldUser size={35} />
                }
                <div className="flex font-bold text-[33px]">
                    {Editing ? <p>Editar Funcionario</p> : <p>Crear Funcionario</p>}
                </div>
            </div>
            <div className="flex-1 flex-col overflow-y-auto bg-gray-100 px-6 py-4 rounded-lg space-y-4">
                <form
                    className="flex flex-col space-y-2 bg-white p-6 rounded-lg shadow-md w-full"
                    onSubmit={handleSubmit}
                >
                    {loading && (
                        <div className="absolute inset-0 z-10 flex items-center justify-center bg-white bg-opacity-95 rounded-lg">
                            <div className="flex flex-col items-center gap-2">
                                <div className="w-10 h-10 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
                                <p className="text-gray-600 text-md mt-2">Cargando Datos...</p>
                            </div>
                        </div>
                    )}
                    <h2 className="text-xl font-semibold mb-4 border-b-2 border-gray-300">Datos del Funcionario</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        <FloatingLabel
                            id="documento"
                            label="Documento"
                            className="w-full"
                            value={formData.documento}
                            onChange={(e) =>
                                setFormData((prev) => ({ ...prev, documento: e.target.value }))
                            }
                        />
                        <FloatingLabel
                            id="nombre"
                            label="Nombre"
                            className="w-full"
                            value={formData.nombre}
                            onChange={(e) =>
                                setFormData((prev) => ({ ...prev, nombre: e.target.value }))
                            }
                        />
                        <FloatingSelect
                            label="Tipo Funcionario"
                            value={formData.tipoUsuId ?? ''}
                            onChange={(value) => {
                                setFormData((prev) => ({
                                    ...prev,
                                    tipoUsuId: value
                                }))
                            }}
                            options={tipoFuncionario.map((tc) => ({
                                value: tc.id,
                                label: tc.nombre,
                            }))}
                            placeholder="Elige una opción"
                            className="w-lg"
                        />

                        <FloatingSelect
                            label="Dependencia"
                            value={formData.dependenciaId != null ? formData.dependenciaId.toString() : ""}
                            onChange={(value) =>
                                setFormData((prev) => ({
                                    ...prev,
                                    dependenciaId: value ? parseInt(value, 10) : null,
                                }))
                            }
                            options={dependencia.map((d) => ({
                                value: d.id.toString(),
                                label: d.nombre,
                            }))}
                            placeholder="Elige una opción"
                        />



                        <FloatingLabel
                            id="email"
                            label="Email"
                            className="w-full"
                            value={formData.email}
                            onChange={(e) =>
                                setFormData((prev) => ({ ...prev, email: e.target.value }))
                            }
                        />
                        <FloatingLabel
                            id="celular"
                            label="Celular"
                            className="w-full"
                            value={formData.celular}
                            onChange={(e) =>
                                setFormData((prev) => ({ ...prev, celular: e.target.value }))
                            }
                        />
                        {!Editing &&
                            <FloatingLabel
                                id="password"
                                label="Contraseña"
                                className="w-full"
                                value={formData.password}
                                type='password'
                                onChange={(e) =>
                                    setFormData((prev) => ({ ...prev, password: e.target.value }))
                                }
                            />
                        }
                        {!Editing &&
                            <FloatingLabel
                                id="verifyPassword"
                                label="Confirmar Contraseña"
                                className="w-full"
                                value={formData.verifyPassword}
                                type='password'
                                onChange={(e) =>
                                    setFormData((prev) => ({ ...prev, verifyPassword: e.target.value }))
                                }
                            />
                        }
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
                            {Editing ? 'Actualizar' : 'Guardar'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default FuncionarioCreateEdit;