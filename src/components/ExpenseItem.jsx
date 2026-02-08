function ExpenseItem({ expense, onDelete }) {
  return (
    <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg shadow-sm mb-2">
      <div>
        <p className="font-semibold">{expense.description}</p>
        <p className="text-sm text-gray-500 dark:text-gray-300">
          {expense.description} • {expense.date}
        </p>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-green-600 font-bold">${expense.amount}</span>
        <button onClick={() => onDelete(expense.id)} className="text-red-500 hover:text-red-700">
          X
        </button>
      </div>
    </div>
  );
}

export default ExpenseItem;
