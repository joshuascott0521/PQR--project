import React, { useState } from 'react';
import { Plus, ChevronDown, Upload, X } from 'lucide-react';
import type { ParametersProps } from '../../../interfaces/pqrInterfaces';

interface Tag {
  id: string;
  text: string;
}

const TemplateForm = ({ Editing }: ParametersProps) => {
  const [dependencia, setDependencia] = useState('Secretaría de Hacienda');
  const [tipoPQR, setTipoPQR] = useState('Petición general');
  const [tags, setTags] = useState<Tag[]>([
    { id: '1', text: 'prescripción' },
    { id: '2', text: 'Petición de competencia' }
  ]);
  const [observaciones, setObservaciones] = useState('Plantilla para negar prescripción y con...');
  const [normatividad, setNormatividad] = useState(`ARTÍCULO 14. CARÁCTER REAL DEL IMPUESTO PREDIAL UNIFICADO. El Impuesto Predial Unificado es un gravamen real que recae sobre los bienes raíces ubicados dentro del Municipio de Baranoa, podrá hacerse efectivo con el respectivo predio independientemente de quien sea su propietario, de tal suerte que el...`);
  const [newTag, setNewTag] = useState('');

  const addTag = () => {
    if (newTag.trim() && !tags.some(tag => tag.text.toLowerCase() === newTag.toLowerCase())) {
      setTags([...tags, { id: Date.now().toString(), text: newTag.trim() }]);
      setNewTag('');
    }
  };

  const removeTag = (id: string) => {
    setTags(tags.filter(tag => tag.id !== id));
  };

  const handleTagKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
                <Plus className="w-5 h-5 text-white" />
              </div>
              <div className="flex font-bold text-[33px]">
                    {Editing ? <p>Editar Plantilla</p> : <p>Crear Plantilla</p>}
                </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6">
            {/* Formulario */}
            <div className="space-y-6">
              {/* Dependencia */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Dependencia*
                </label>
                <div className="relative">
                  <select
                    value={dependencia}
                    onChange={(e) => setDependencia(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
                  >
                    <option>Secretaría de Hacienda</option>
                    <option>Secretaría de Gobierno</option>
                    <option>Secretaría de Planeación</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Tipo de PQR */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tipo de PQR*
                </label>
                <div className="relative">
                  <select
                    value={tipoPQR}
                    onChange={(e) => setTipoPQR(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
                  >
                    <option>Petición general</option>
                    <option>Queja</option>
                    <option>Reclamo</option>
                    <option>Sugerencia</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Palabras claves */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Palabras claves (añada la palabra y presione Enter)*
                </label>
                <div className="flex flex-wrap gap-2 mb-3">
                  {tags.map((tag) => (
                    <span
                      key={tag.id}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-green-500 text-white text-sm rounded-full"
                    >
                      {tag.text}
                      <button
                        onClick={() => removeTag(tag.id)}
                        className="ml-1 hover:bg-green-600 rounded-full p-0.5"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
                <input
                  type="text"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyPress={handleTagKeyPress}
                  placeholder="Agregar palabra clave..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Observaciones */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Observación (para que sepa la plantilla)*
                </label>
                <textarea
                  value={observaciones}
                  onChange={(e) => setObservaciones(e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                />
              </div>

              {/* Normatividad */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Normatividad
                </label>
                <textarea
                  value={normatividad}
                  onChange={(e) => setNormatividad(e.target.value)}
                  rows={8}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none text-sm"
                />
              </div>

              {/* Subir archivos */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cargar plantilla de respuesta HTML:
                </label>
                <button className="inline-flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
                  <Upload className="w-4 h-4" />
                  Subir archivos
                </button>
              </div>
            </div>

            {/* Vista previa */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Vista previa de la Respuesta HTML:
              </h2>
              <div className="bg-white border border-gray-200 rounded-md p-4 text-sm text-gray-700 leading-relaxed  overflow-y-auto">
                <p className="mb-3">
                  Baranoa, [#FechaRespuesta#]<br />
                  Señor(a):<br />
                  [#NombreCompletoSolicitante#]<br />
                  [#DireccionSolicitante#]<br />
                  [#CorreoElectronicoSolicitante#]<br />
                  Baranoa – Atlántico
                </p>
                
                <p className="font-semibold mb-3">
                  Asunto: Respuesta a solicitud del PQR con Radicado No. [#NumeroConsecutivo#]
                </p>
                
                <p className="mb-3">
                  Por medio del presente, nos permitimos dar respuesta a su petición, indicándole en 
                  forma anticipada que este Despacho NO ACCEDE a la misma, atendiendo las 
                  siguientes razones:
                </p>
                
                <p className="font-semibold mb-2">
                  ASPECTOS GENERALES Y ACLARACIONES RESPECTO AL FENÓMENO DE LA PRESCRIPCIÓN 
                  DE LA ACCIÓN DE COBRO EN MATERIA TRIBUTARIA TERRITORIAL
                </p>
                
                <p className="mb-3">
                  Nos permitimos indicarle que el artículo 59 de la Ley 788 de 2002, precisa siguiente, 
                  respecto al procedimiento tributario territorial:
                </p>
                
                <p className="text-sm">
                  (...) "ARTÍCULO 59. PROCEDIMIENTO TRIBUTARIO TERRITORIAL. Los Departamentos y 
                  municipios aplicarán los procedimientos establecidos en el Estatuto Tributario 
                  Nacional, para la administración, determinación, discusión, cobro, devoluciones, 
                  régimen sancionatorio incluida su imposición, a los impuestos por ellos administrados.
                </p>
              </div>
            </div>
          </div>

          {/* Botones de acción */}
          <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
            <button className="px-6 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors">
              Cancelar
            </button>
            <button className="px-6 py-2 text-white bg-green-500 rounded-lg hover:bg-green-600 transition-colors">
              Guardar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplateForm;