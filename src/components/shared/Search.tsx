import { CiSearch } from "react-icons/ci";
import { IoClose } from "react-icons/io5";
import { useRef } from "react";
interface SearchParametersProps {
    query: string;
    setQuery: (value: string) => void;
}

const SearchParameters = ({ query, setQuery }: SearchParametersProps) => {
    const containerRef = useRef<HTMLDivElement>(null);

    const clearSearch = () => setQuery("");

    return (
        <div className="bg-white rounded-full relative w-full" ref={containerRef}>
            <div className="flex items-center h-9 border-2 border-gray-200 rounded-full focus-within:border-green-400 px-2">
                <CiSearch className="text-gray-400 stroke-1 text-2xl" />
                <input
                    type="search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full h-full pl-2 text-gray-700 bg-transparent outline-none appearance-none 
             [&::-webkit-search-cancel-button]:appearance-none"
                />

                {query && (
                    <button
                        onClick={clearSearch}
                        className="text-gray-500 hover:text-red-600 ml-2"
                        aria-label="Limpiar búsqueda"
                    >
                        <IoClose className="text-xl" />
                    </button>
                )}
            </div>
        </div>
    );
};

export default SearchParameters;

