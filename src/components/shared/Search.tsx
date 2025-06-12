import { CiSearch } from "react-icons/ci";
import { IoClose } from "react-icons/io5";
import { useRef, useState } from "react";



const SearchParameters = () => {
    const [query, setQuery] = useState("");
    const containerRef = useRef<HTMLDivElement>(null);

    const clearSearch = () => {
        setQuery("");
    };
    return (
        <div className="bg-white rounded-full relative w-[600px] " ref={containerRef}>
            <div className="flex items-center h-9 border-2 border-gray-200 rounded-full focus-within:border-green-400 px-2">
                <CiSearch className="text-black text-2xl" />
                <input
                    type="search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full h-full pl-2 text-gray-700 bg-transparent outline-none [appearance:textfield] [&::-webkit-search-cancel-button]:appearance-none"
                    placeholder="Buscar parámetro"
                />

                <button
                    onClick={clearSearch}
                    className="text-blue-700 hover:text-red-600 ml-2"
                    aria-label="Limpiar búsqueda"
                >
                    <IoClose className="text-xl" />
                </button>
            </div>


            {/*<div className="absolute top-full left-0 mt-2 w-full z-50 bg-white rounded-lg shadow-lg border border-gray-300">
          
        </div>*/}


        </div>
    );
};

export default SearchParameters;