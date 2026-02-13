import { useState } from "react";
import API from "../api/axios";

const Budget = () => {
  const [form, setForm] = useState({
    category: "",
    amount: "",
    month: ""
  });

  const [progress, setProgress] = useState([]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSetBudget = async (e) => {
    e.preventDefault();
    try {
      await API.post("/budget", form);
      alert("Budget Set Successfully!");
    } catch (error) {
      alert(error.response?.data?.message);
    }
  };

  const handleGetProgress = async () => {
    try {
      const res = await API.get(`/budget/${form.month}`);
      setProgress(res.data);
    } catch (error) {
      alert(error.response?.data?.message);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Budget Management</h2>

      <form onSubmit={handleSetBudget} className="bg-white p-6 rounded shadow mb-6">
        <div className="grid md:grid-cols-3 gap-4">

          <input
            type="text"
            name="category"
            placeholder="Category"
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />

          <input
            type="number"
            name="amount"
            placeholder="Budget Amount"
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />

          <input
            type="text"
            name="month"
            placeholder="Month (e.g. 2026-02)"
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />
        </div>

        <button className="mt-4 bg-indigo-600 text-white px-6 py-2 rounded">
          Set Budget
        </button>
      </form>

      <button
        onClick={handleGetProgress}
        className="mb-4 bg-green-600 text-white px-6 py-2 rounded"
      >
        Check Progress
      </button>

      <div className="space-y-4">
        {progress.map((item, index) => (
          <div key={index} className="bg-gray-100 p-4 rounded">
            <p><strong>{item.category}</strong></p>
            <p>Budget: ₹{item.budget}</p>
            <p>Spent: ₹{item.spent}</p>
            <p>Remaining: ₹{item.remaining}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Budget;
