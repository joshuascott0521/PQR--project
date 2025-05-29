interface ResumenItemProps {
  titulo: string;
  cantidad: number;
  bgColor: string;
  onClick?: () => void;
}

const ResumenItem: React.FC<ResumenItemProps> = ({ titulo, cantidad, bgColor, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`cursor-pointer rounded-full px-4 py-1 flex items-center justify-between ${bgColor} hover:scale-105 transition`}
    >
      <span className="text-xs font-semibold  text-black">{titulo}</span>
      <span className="ml-2 text-lg font-bold text-black">{cantidad}</span>
    </div>
  );
};

export default ResumenItem;
