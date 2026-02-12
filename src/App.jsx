import { useEffect, useState } from 'react';
import Dashboard from './components/Dashboard';
import ExpenseInput from './components/ExpenseInput';
import ExpenseList from './components/ExpenseList';
import Layout from './components/Layout';

export default function App() {
  // Initialize state directly from localStorage
  const [darkMode, setDarkMode] = useState(localStorage.getItem('darkMode') === 'true');
  const [expenses, setExpenses] = useState(() => {
    const savedExpenses = localStorage.getItem('expenses');
    return savedExpenses ? JSON.parse(savedExpenses) : [];
  });

  // Sync darkMode changes back to localStorage
  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  // Sync expenses changes back to localStorage
  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }, [expenses]);

  const addExpense = (expense) => {
    setExpenses([...expenses, { id: Date.now(), ...expense }]);
  };

  const deleteExpense = (id) => {
    setExpenses(expenses.filter((exp) => exp.id !== id));
  };

  const clearExpenses = () => {
    if (window.confirm('Are you sure you wnat to clear all expenses?')) {
      setExpenses([]);
      localStorage.removeItem('expenses');
    }
  };

  const loadDemoData = () => {
    const demoExpenses = [
      { id: 1, description: 'Groceries', amount: 50, category: 'Food', date: '2026-02-01' },
      { id: 2, description: 'Bus Ticket', amount: 10, category: 'Transport', date: '2026-02-02' },
      { id: 3, description: 'Gym Membership', amount: 30, category: 'Health', date: '2026-01-28' },
      {
        id: 4,
        description: 'Electricity Bill',
        amount: 70,
        category: 'Utilities',
        date: '2026-01-25',
      },
      { id: 5, description: 'Dinner Out', amount: 40, category: 'Food', date: '2026-01-20' },
      {
        id: 6,
        description: 'Movie Ticket',
        amount: 15,
        category: 'Entertainment',
        date: '2026-01-18',
      },
    ];
    setExpenses(demoExpenses);
    localStorage.setItem('expenses', JSON.stringify(demoExpenses));
  };

  return (
    <div className={darkMode ? 'dark' : ''}>
      <Layout>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Expense Tracker</h1>
          <div className="flex gap-2">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-700 dark:text-white"
            >
              {darkMode ? 'Light Mode' : 'Dark Mode'}
            </button>
            <button
              onClick={clearExpenses}
              className="px-3 py-1 rounded bg-red-600 text-white hover:bg-red-700"
            >
              Load Demo Data
            </button>
          </div>
        </div>

        <ExpenseInput onAdd={addExpense} />
        <Dashboard expenses={expenses} />
        <ExpenseList expenses={expenses} onDelete={deleteExpense} />
      </Layout>
    </div>
  );
}
