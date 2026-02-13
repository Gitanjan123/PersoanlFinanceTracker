import { useState, useEffect } from "react";
import API from "../api/axios";

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [form, setForm] = useState({
    amount: "",
    type: "income",
    category: "",
    description: "",
    date: ""
  });

  const [editId, setEditId] = useState(null);

  const fetchTransactions = async () => {
    try {
      const res = await API.get("/transactions");
      const sorted = res.data.sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );

      setTransactions(sorted);
    } catch (error) {
      console.log(error.response?.data?.message);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editId) {
        await API.put(`/transactions/${editId}`, form);
        setEditId(null);
      } else {
        await API.post("/transactions", form);
      }

      setForm({
        amount: "",
        type: "income",
        category: "",
        description: "",
        date: ""
      });

      fetchTransactions();
    } catch (error) {
      console.log(error.response?.data?.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/transactions/${id}`);
      fetchTransactions();
    } catch (error) {
      console.log(error.response?.data?.message);
    }
  };

  const handleEdit = (transaction) => {
    setForm(transaction);
    setEditId(transaction._id);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Transactions</h1>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow mb-6">
        <div className="grid md:grid-cols-2 gap-4">

          <input type="number" name="amount" value={form.amount} onChange={handleChange} placeholder="Amount" className="border p-2 rounded" required />

          <select name="type" value={form.type} onChange={handleChange} className="border p-2 rounded">
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>

          <input type="text" name="category" value={form.category} onChange={handleChange} placeholder="Category" className="border p-2 rounded" required />

          <input type="text" name="description" value={form.description} onChange={handleChange} placeholder="Description" className="border p-2 rounded" />

          <input type="date" name="date" value={form.date} onChange={handleChange} className="border p-2 rounded md:col-span-2" />
        </div>

        <button className="mt-4 bg-indigo-600 text-white px-6 py-2 rounded">
          {editId ? "Update Transaction" : "Add Transaction"}
        </button>
      </form>

      <div className="space-y-3">
        {transactions.map((t) => (
          <div key={t._id} className="flex justify-between bg-gray-100 p-4 rounded">
            <div>
              <p className="font-semibold">{t.category}</p>
              <p className="text-sm text-gray-500">{t.description}</p>
              <p className="text-xs text-gray-400">{new Date(t.date).toDateString()}</p>
            </div>

            <div className="text-right">
              <p className={t.type === "income" ? "text-green-600 font-bold" : "text-red-600 font-bold"}>
                ₹{t.amount}
              </p>

              <div className="space-x-2 mt-2">
                <button onClick={() => handleEdit(t)} className="text-blue-600 text-sm">
                  Edit
                </button>
                <button onClick={() => handleDelete(t._id)} className="text-red-600 text-sm">
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Transactions;
