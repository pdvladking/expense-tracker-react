import { useState } from "react";

function ExpenseInput({ onAdd }) {
  const [form, setForm] = useState({ description: "", amount: "", category: "", date: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.description || !form.amount) return;
    onAdd(form);
    setForm({ description: "", amount: "", category: "", date: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 mb-6">
      <input name="description" value={form.description} onChange={handleChange} placeholder="Expense description" className="border rounded px-3 py-2 dark:bg-gray-700 dark:text-white" />
      <input name="amount" type="number" value={form.amount} onChange={handleChange} placeholder="Amount" className="border rounded px-3 py-2 dark:bg-gray-700 dark:text-white" />
      <input name="category" value={form.category} onChange={handleChange} placeholder="Category" className="border rounded px-3 py-2 dark:bg-gray-700 dark:text-white" />
      <input name="date" type="date" value={form.date} onChange={handleChange} className="border rounded px-3 py-2 dark:bg-gray-700 dark:text-white" />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Add Expense</button>
    </form>
  );
}
export default ExpenseInput;