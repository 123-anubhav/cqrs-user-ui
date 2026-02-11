import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [activeTab, setActiveTab] = useState("create");

  const [formData, setFormData] = useState({
    name: "",
    phNo: ""
  });

  const [users, setUsers] = useState([]);

  // 🔹 Handle form input
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // 🔹 Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:7878/add-record", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    });

    if (response.ok) {
      alert("User Added Successfully");
      setFormData({ name: "", phNo: "" });
      fetchUsers(); // refresh list
    } else {
      alert("Error while adding user");
    }
  };

  // 🔹 Fetch users
  const fetchUsers = async () => {
    const response = await fetch("http://localhost:7979/records");
    const data = await response.json();
    setUsers(data);
  };

  useEffect(() => {
    if (activeTab === "view") {
      fetchUsers();
    }
  }, [activeTab]);

  return (
    <div className="container">
      <h2>User Management</h2>

      {/* Tabs */}
      <div className="tabs">
        <button
          className={activeTab === "create" ? "active" : ""}
          onClick={() => setActiveTab("create")}
        >
          Create User
        </button>

        <button
          className={activeTab === "view" ? "active" : ""}
          onClick={() => setActiveTab("view")}
        >
          View Users
        </button>
      </div>

      {/* TAB 1: CREATE */}
      {activeTab === "create" && (
        <form className="form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Enter Name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="phNo"
            placeholder="Enter Phone Number"
            value={formData.phNo}
            onChange={handleChange}
            required
          />

          <button type="submit">Save</button>
        </form>
      )}

      {/* TAB 2: VIEW */}
      {activeTab === "view" && (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Phone</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id}>
                <td>{u.id}</td>
                <td>{u.name}</td>
                <td>{u.phNo}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default App;
