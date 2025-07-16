import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend, Title);

const data = {
  labels: ["Portal Web", "Fisico", "Correo Electronico"],
  datasets: [
    {
      label: "Cantidad",
      data: [120, 220, 170],
      backgroundColor: [
        "#B3261E", 
        "#004F9E",
        "#FFB100", 
        
      ],
      borderWidth: 0,
      cutout: "70%", // para hacerlo rosquilla
    },
  ],
};

const options = {
  responsive: true,
  maintainAspectRatio: true,
  aspectRatio: 2, // ancho / alto
  plugins: {
    legend: {
      position: "bottom" as const,
      labels: {
        color: "#111",
        padding: 20,
        usePointStyle: true,
        pointStyle: "circle",
      },
    },
    title: {
      display: true,
      text: "Entradas de PQR",
      font: {
        size: 20,
      },
      color: "#111",
      padding: {
        bottom: 20,
      },
    },
    tooltip: {
      callbacks: {
        label: (context: any) => {
          const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0);
          const currentValue = context.parsed;
          const percentage = ((currentValue / total) * 100).toFixed(1);
          return `${context.label}: ${percentage}%`;
        },
      },
    },
  },
};

const DonutGraphic = () => {
  return <Doughnut data={data} options={options} />;
};

export default DonutGraphic;
