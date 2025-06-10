import { CiSearch } from "react-icons/ci";
import { IoClose } from "react-icons/io5";
import { useEffect, useRef, useState } from "react";
import { PqrServices } from "../../services/pqrServices";
import type { Pqr } from "../../interfaces/pqrInterfaces";
import ResultadoBusqueda from "./ResultadoBusqueda";

const Search = () => {
  const [query, setQuery] = useState("");
  const [pqrs, setPqrs] = useState<Pqr[]>([]);
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const buscar = async () => {
      if (!query.trim()) {
        setPqrs([]);
        setShowDropdown(false);
        return;
      }

      setLoading(true);
      try {
        const res = await PqrServices.getByFilter({ value: query, page: 1, size: 10 });
        if (res.success && Array.isArray(res.data)) {
          setPqrs(res.data);
        } else {
          setPqrs([]);
        }
        setShowDropdown(true);

      } catch (err) {
        console.error("Error en búsqueda:", err);
      } finally {
        setLoading(false);
      }
    };

    const delayDebounce = setTimeout(buscar, 300);
    return () => clearTimeout(delayDebounce);
  }, [query]);

  // Cierra el dropdown si se hace clic fuera
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const clearSearch = () => {
    setQuery("");
    setPqrs([]);
    setShowDropdown(false);
  };

  return (
    <div className="relative w-full mx-auto" ref={containerRef}>
      <div className="flex items-center h-[3rem] border-2 border-gray-300 rounded-lg focus-within:border-green-400 px-2">
        <CiSearch className="text-green-400 text-2xl" />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full h-full pl-2 text-gray-700 bg-transparent outline-none [appearance:textfield] [&::-webkit-search-cancel-button]:appearance-none"
          placeholder="Busca por cédula, consecutivo o nombre"
        />
        {query && (
          <button
            onClick={clearSearch}
            className="text-blue-700 hover:text-red-600 ml-2"
            aria-label="Limpiar búsqueda"
          >
            <IoClose className="text-xl" />
          </button>
        )}
      </div>

      {showDropdown && (
        <div className="absolute top-full left-0 mt-2 w-full z-50 bg-white rounded-lg shadow-lg border border-gray-300">
          <ResultadoBusqueda resultados={pqrs} loading={loading} onCardClick={clearSearch} />
        </div>
      )}

    </div>
  );
};

export default Search;
