import { CiSearch } from "react-icons/ci";
// import { useState } from "react";
// import usePqr from "../../hooks/usePqr";

const Serch = () => {
  //   const [searchItem, setSearchItem] = useState<string>("");
  //   const { setSearching, setPqrsFiltered, setCurrentSearchTerm} = usePqr();
  //   const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(null);

  //   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //     const value = e.target.value;
  //     setSearchItem(value);
  //     setSearching(true);

  //     if (typingTimeout) clearTimeout(typingTimeout);

  //     const newTimeout = setTimeout(async () => {
  //       if (value.trim() === "") {
  //         setSearching(false);
  //         setPqrsFiltered([]);
  //         setCurrentSearchTerm("")
  //       } else {
  //         setCurrentSearchTerm(value);
  //       }
  //     }, 900);

  //     setTypingTimeout(newTimeout);
  //   };

  return (
    <div className="flex items-center w-full h-[3rem] border-2 border-gray-300 rounded-lg focus-within:border-green-400">
      <CiSearch className="text-green-400 ml-2 text-2xl" />
      <input
        type="search"
        value=""
        className="w-full h-full pl-2 text-gray-700 bg-transparent outline-none"
        placeholder="Busca por cedula, consecutivo o nombre"
        // onChange="tdtdt"
      />
    </div>
  );
};

export default Serch;
