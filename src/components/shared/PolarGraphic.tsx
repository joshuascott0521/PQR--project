import { PolarArea } from "react-chartjs-2";
import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
  Title,
} from "chart.js";

// Registrar componentes necesarios
ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend, Title);

// Datos ficticios (puedes reemplazar con dinámicos)
const data = {
  labels: ["Petición", "Queja", "Reclamo", "Sugerencia", "Felicitación"],
  datasets: [
    {
      label: "PQR por tipo",
      data: [45, 20, 15, 10, 5],
      backgroundColor: [
        "#B3261E", // rojo institucional
        "#004F9E", // azul corporativo
        "#5C2D91", // morado formal
        "#FFB100", // amarillo sobrio
        "#00A389", // verde profesional
      ],
      borderWidth: 1,
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    title: {
      display: true,
      text: "Distribución de tipos de PQR",
      font: {
        size: 18,
      },
    },
    legend: {
      position: "bottom" as const,
      labels: {
        usePointStyle: true,
        pointStyle: "circle",
        padding: 15,
        color: "#111",
      },
    },
  },
};

const PolarGraphic = () => {
  return <PolarArea data={data} options={options} />;
};

export default PolarGraphic;
