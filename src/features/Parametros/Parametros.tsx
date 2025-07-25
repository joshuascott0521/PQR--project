import { Settings, Calendar, FileText, ScrollText, Cloud, FileTerminal } from 'lucide-react';
import type { ParameterCard } from '../../interfaces/pqrInterfaces';
import { ParameterCard as Card } from '../../components/shared/ParameterCard';
import { useNavigate } from 'react-router-dom';

function Parametros() {

  const parameterCards: ParameterCard[] = [
    {
      id: 'general',
      title: 'Parámetros Generales',
      description: 'Configuraciones globales del sistema y la aplicación.',
      icon: <Settings className="w-8 h-8" />,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      id: 'events',
      title: 'Eventos',
      description: 'Gestión de notificaciones y eventos automáticos del sistema.',
      icon: <Calendar className="w-8 h-8" />,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      id: 'templates',
      title: 'Plantillas',
      description: 'Administra las plantillas de respuesta.',
      icon: <FileText className="w-8 h-8" />,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      id: 'prompts',
      title: 'Prompts',
      description: 'Administra los prompts de IA.',
      icon: <FileTerminal  className="w-8 h-8" />,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      id: 'logs',
      title: 'Logs',
      description: 'Registro de auditoría y seguimiento de actividades de usuarios.',
      icon: <ScrollText className="w-8 h-8" />,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50'
    },
    {
      id: 'webservices',
      title: 'Webservices',
      description: 'Configuración de integraciones y servicios externos.',
      icon: <Cloud className="w-8 h-8" />,
      color: 'text-red-600',
      bgColor: 'bg-red-50'
    }
  ];

  const navigate = useNavigate();

  const handleClick = (id: string) => {
    navigate(`/dashboard/admin/parametros/${id}`)
  }


  return (
    <div className="bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Parámetros</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {parameterCards.map((card) => (
            <Card key={card.id} {...card} onClick={() => handleClick(card.id)} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Parametros;
