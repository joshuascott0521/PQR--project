
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Registro de componentes
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false
    },
    title: {
      display: true,
      text: 'PQR por mes',
      font: {
        size: 18
      }
    }
  },
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        stepSize: 10
      }
    }
  }
};

const labels = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

const data = {
  labels,
  datasets: [
    {
      label: "PQR recibidas",
      data: [30, 40, 20, 20, 23, 32, 10, 12, 18, 32, 41, 45],
      borderColor: "#F97316",
      backgroundColor: "#F97316",
      tension: 0.4,
    },
    {
      label: "PQR resueltas",
      data: [20, 37, 25, 10, 19, 25, 0, 8, 3, 24, 30, 32],
      borderColor: "#6D28D9", // verde
      backgroundColor: "#6D28D9",
      tension: 0.4,
    }
  ]
};

const LinearGraphic = () => {
  return <Line options={options} data={data} />;
};

export default LinearGraphic;
