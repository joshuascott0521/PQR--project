import React, { useState } from 'react';
import { Search, AlertCircle } from 'lucide-react';

interface SearchFormProps {
  onSearch: (query: string, type: 'pqr' | 'documento') => void;
  loading: boolean;
  error: string | null;
}

export const BusquedaCiudadana: React.FC<SearchFormProps> = ({ onSearch, loading, error }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState<'pqr' | 'documento'>('pqr');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery.trim(), searchType);
    }
  };

  return (
    <div className="bg-white/70 rounded-xl shadow-lg p-7 mb-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Consulta de PQR
        </h1>
        <p className="text-gray-600">
          Consulte el estado de sus Peticiones, Quejas y Reclamos
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tipo de búsqueda
            </label>
            <select
              value={searchType}
              onChange={(e) => setSearchType(e.target.value as 'pqr' | 'documento')}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            >
              <option value="pqr">Número de PQR</option>
              <option value="documento">Documento de identidad</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {searchType === 'pqr' ? 'Número de PQR' : 'Documento de identidad'}
            </label>
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={searchType === 'pqr' ? 'Ej: PQR-2024-001234' : 'Ej: 1234567890'}
                className="w-full px-4 py-3 pl-11 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                disabled={loading}
              />
              <Search className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
            </div>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center space-x-3">
            <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
            <p className="text-red-700">{error}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={loading || !searchQuery.trim()}
          className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          {loading ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              <span>Consultando...</span>
            </div>
          ) : (
            'Consultar PQR'
          )}
        </button>
      </form>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h3 className="font-medium text-blue-900 mb-2">Datos de ejemplo para prueba:</h3>
        <div className="text-sm text-blue-700 space-y-1">
          <p><strong>Número PQR:</strong> PQR-2024-001234</p>
          <p><strong>Documento:</strong> 1234567890</p>
        </div>
      </div>
    </div>
  );
};