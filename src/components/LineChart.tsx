import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

const lineChartOptions = {
  responsive: true,
  scales: {
    y: {
      min: 0,
    },
  },
  plugins: {
    legend: {
      position: 'bottom' as const,
    },
  },
};

interface LineChartProps {
  chartData: {
    labels: (string | null | undefined)[];
    datasets: {
      label: string;
      data: (number | undefined)[];
      backgroundColor: string;
      borderColor?: string;
    }[];
  };
}

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const LineChart = ({ chartData }: LineChartProps): JSX.Element => (
  <div className="my-5">
    <Line options={lineChartOptions} data={chartData} />
  </div>
);

export default LineChart;
