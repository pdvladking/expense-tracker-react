import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

function ExpenseTimeSummary({ expenses }) {
  const getWeek = (dateStr) => {
    const date = new Date(dateStr);
    const oneJan = new Date(date.getFullYear(), 0, 1);
    const numberOfDays = Math.floor((date - oneJan) / (24 * 60 * 60 * 1000));
    return Math.ceil((date.getDay() + 1 + numberOfDays) / 7);
  };

  const weeklyTotals = expenses.reduce((acc, exp) => {
    if (!exp.date) return acc;
    const week = `Week ${getWeek(exp.date)}`;
    acc[week] = (acc[week] || 0) + Number(exp.amount);
    return acc;
  }, {});

  const monthlyTotals = expenses.reduce((acc, exp) => {
    if (!exp.date) return acc;
    const month = new Date(exp.date).toLocaleString("default", { month: "short" });
    acc[month] = (acc[month] || 0) + Number(exp.amount);
    return acc;
  }, {});

  const weeklyData = {
    labels: Object.keys(weeklyTotals),
    datasets: [{ label: "Weekly Expenses", data: Object.values(weeklyTotals), backgroundColor: "#3b82f6" }],
  };

  const monthlyData = {
    labels: Object.keys(monthlyTotals),
    datasets: [{ label: "Monthly Expenses", data: Object.values(monthlyTotals), backgroundColor: "#10b981" }],
  };

  return (
    <div className="mb-6">
      <h2 className="text-xl font-bold mb-4">Time Summaries</h2>
      <div className="mb-6">
        <h3 className="font-semibold mb-2">Weekly</h3>
        <Bar data={weeklyData} />
      </div>
      <div>
        <h3 className="font-semibold mb-2">Monthly</h3>
        <Bar data={monthlyData} />
      </div>
    </div>
  );
}

export default ExpenseTimeSummary;