import { useState } from "react";
import { Pie, Line } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement);

function ExpenseSummary({ expenses }) {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [dateRange, setDateRange] = useState({ start: "", end: "" });

  // Filter expenses
  const filteredExpenses = expenses.filter((exp) => {
    const inCategory = selectedCategory === "all" || exp.category === selectedCategory;
    const inDateRange =
      (!dateRange.start || new Date(exp.date) >= new Date(dateRange.start)) &&
      (!dateRange.end || new Date(exp.date) <= new Date(dateRange.end));
    return inCategory && inDateRange;
  });

  const total = filteredExpenses.reduce((sum, exp) => sum + Number(exp.amount), 0);

  // Group by category
  const categoryTotals = filteredExpenses.reduce((acc, exp) => {
    acc[exp.category] = (acc[exp.category] || 0) + Number(exp.amount);
    return acc;
  }, {});

  // Group by date
  const dateTotals = filteredExpenses.reduce((acc, exp) => {
    acc[exp.date] = (acc[exp.date] || 0) + Number(exp.amount);
    return acc;
  }, {});
    const pieData = {
    labels: Object.keys(categoryTotals),
    datasets: [{ data: Object.values(categoryTotals), backgroundColor: ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#6366f1"] }],
  };

  const lineData = {
    labels: Object.keys(dateTotals),
    datasets: [{ label: "Expenses Over Time", data: Object.values(dateTotals), borderColor: "#3b82f6", backgroundColor: "#93c5fd", fill: true }],
  };

  // CSV Export
  const exportCSV = () => {
    const headers = ["Description", "Amount", "Category", "Date"];
    const rows = filteredExpenses.map((exp) => [exp.description, exp.amount, exp.category, exp.date]);
    const csvContent = "data:text/csv;charset=utf-8," + [headers, ...rows].map((row) => row.join(",")).join("\n");
    const link = document.createElement("a");
    link.href = encodeURI(csvContent);
    link.download = "expenses.csv";
    link.click();
  };

  return (
    <div className="mb-6">
      <h2 className="text-xl font-bold mb-2">Summary</h2>
      <p className="text-gray-700 dark:text-gray-300 mb-4">Total: ${total}</p>

      {/* Filters */}
      <div className="flex flex-col gap-3 mb-6">
        <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} className="border rounded px-3 py-2 dark:bg-gray-700 dark:text-white">
          <option value="all">All Categories</option>
          {[...new Set(expenses.map((exp) => exp.category))].map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        <div className="flex gap-2">
          <input type="date" value={dateRange.start} onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })} className="border rounded px-3 py-2 flex-1 dark:bg-gray-700 dark:text-white" />
          <input type="date" value={dateRange.end} onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })} className="border rounded px-3 py-2 flex-1 dark:bg-gray-700 dark:text-white" />
        </div>
      </div>

      <button onClick={exportCSV} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 mb-6">Export CSV</button>

      {/* Charts */}
      <div className="mb-6">
        <h3 className="font-semibold mb-2">By Category</h3>
        <Pie data={pieData} />
      </div>

      <div>
        <h3 className="font-semibold mb-2">Over Time</h3>
        <Line data={lineData} />
      </div>
    </div>
  );
}

export default ExpenseSummary;