import { useState } from "react";
import ExpenseItem from "./ExpenseItem";

function ExpenseList({ expenses, onDelete }) {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const filteredExpenses = expenses.filter((exp) => {
    const matchesSearch = exp.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter === "all" || exp.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div>
      {/* Filter Bar */}
      <div className="flex flex-col gap-3 mb-4">
        <input
          type="text"
          placeholder="Search by description..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded px-3 py-2 dark:bg-gray-700 dark:text-white"
        />
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="border rounded px-3 py-2 dark:bg-gray-700 dark:text-white"
        >
          <option value="all">All Categories</option>
          {[...new Set(expenses.map((exp) => exp.category))].map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {/* Expense List */}
      {filteredExpenses.length === 0 ? (
        <p className="text-center text-gray-500">No matching expenses.</p>
      ) : (
        filteredExpenses.map((exp) => (
          <ExpenseItem key={exp.id} expense={exp} onDelete={onDelete} />
        ))
      )}
    </div>
  );
}
export default ExpenseList;