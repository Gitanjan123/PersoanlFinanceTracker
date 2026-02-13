import { useEffect, useState } from "react";
import API from "../api/axios";

const Dashboard = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await API.get("/transactions");
        setTransactions(res.data);
      } catch (error) {
        console.log(error.response?.data?.message || error.message);
      }
    };

    fetchTransactions();
  }, []);

  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((acc, t) => acc + Number(t.amount), 0);

  const expense = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, t) => acc + Number(t.amount), 0);

  const balance = income - expense;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">Dashboard</h2>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <p className="text-gray-500">Income</p>
          <h3 className="text-2xl font-bold text-green-600">
            ₹{income}
          </h3>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <p className="text-gray-500">Expense</p>
          <h3 className="text-2xl font-bold text-red-600">
            ₹{expense}
          </h3>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <p className="text-gray-500">Balance</p>
          <h3 className="text-2xl font-bold text-indigo-600">
            ₹{balance}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
