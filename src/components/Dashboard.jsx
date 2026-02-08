import ExpenseSummary from './ExpenseSummary';
import ExpenseTimeSummary from './ExpenseTimeSummary';

function Dashboard({ expenses }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
        <ExpenseSummary expenses={expenses} />
      </div>
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
        <ExpenseTimeSummary expenses={expenses} />
      </div>
    </div>
  );
}

export default Dashboard;
