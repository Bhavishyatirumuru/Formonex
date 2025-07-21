// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import './BillingPage.css';

// const API_URL = "http://localhost:5000/api/bills";

// export default function BillingPage() {
//   const [form, setForm] = useState({
//     name: "", age: "", gender: "", patientId: "",
//     treatment: "", amount: ""
//   });
//   const [bills, setBills] = useState([]);
//   const [message, setMessage] = useState("");
//   const [searchPatientId, setSearchPatientId] = useState('');
//   const [patientBills, setPatientBills] = useState([]);
//   const [historyMessage, setHistoryMessage] = useState('');

//   // Fetch previous bills
//   useEffect(() => {
//     axios.get(API_URL)
//       .then(res => setBills(res.data))
//       .catch(() => setMessage("Could not load bills"));
//   }, []);

//   const handleChange = e => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handlePatientSearch = async () => {
//   if (!searchPatientId) {
//     setHistoryMessage("Please enter a Patient ID.");
//     setPatientBills([]);
//     return;
//   }
//   try {
//     const res = await axios.get(`${API_URL}/patient/${searchPatientId}`);
//     setPatientBills(res.data);
//     setHistoryMessage(res.data.length === 0 ? "No previous bills found." : "");
//   } catch (err) {
//     setHistoryMessage("Error fetching patient history.");
//     setPatientBills([]);
//   }
// };
  
//   const handleSubmit = async e => {
//     e.preventDefault();
//     setMessage("");
//     try {
//       const { name, treatment, amount } = form;
//       if (!name || !treatment || !amount) {
//         setMessage("Name, Treatment, and Amount are required.");
//         return;
//       }
//       // Convert amount to a number
//       const postData = { ...form, amount: Number(form.amount) };
//       const res = await axios.post(API_URL, postData);
//       setBills([res.data.bill, ...bills]);
//       setForm({
//         name: "", age: "", gender: "", patientId: "",
//         treatment: "", amount: ""
//       });
//       setMessage("Bill added successfully!");
//     } catch (err) {
//       setMessage("Failed to add bill: " + (err.response?.data?.error || err.message));
//     }
//   };

//   return (
//     <div className="billing-container">
//       <h2>Patient Billing</h2>
//       {message && <div style={{ color: message.startsWith("Failed") ? "red" : "green" }}>{message}</div>}
//       <form onSubmit={handleSubmit} className="billing-form">
//         <input placeholder="Patient Name" name="name" value={form.name} onChange={handleChange} required />
//         <input placeholder="Age" name="age" value={form.age} onChange={handleChange} type="number" />
//         <input placeholder="Gender" name="gender" value={form.gender} onChange={handleChange} />
//         <input placeholder="Patient ID" name="patientId" value={form.patientId} onChange={handleChange} />
//         <input placeholder="Treatment" name="treatment" value={form.treatment} onChange={handleChange} required />
//         <input placeholder="Amount" name="amount" value={form.amount} onChange={handleChange} type="number" required />
//         <button type="submit">Submit Bill</button>
//       </form>
//       <h3>Previous Bills</h3>
//       <table border="1" cellPadding="5" style={{ width: '100%', marginTop: '1rem' }}>
//         <thead>
//           <tr>
//             <th>Date</th>
//             <th>Name</th>
//             <th>Patient ID</th>
//             <th>Treatment</th>
//             <th>Amount</th>
//           </tr>
//         </thead>
//         <tbody>
//           {bills.length === 0 && (
//             <tr>
//               <td colSpan={5} style={{ textAlign: "center" }}>No bills found.</td>
//             </tr>
//           )}
//           {bills.map(bill => (
//             <tr key={bill._id}>
//               <td>{bill.date ? new Date(bill.date).toLocaleString() : "-"}</td>
//               <td>{bill.name}</td>
//               <td>{bill.patientId || "-"}</td>
//               <td>{bill.treatment}</td>
//               <td>{bill.amount}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   )
// }

import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000/api/bills";

export default function BillingPage() {
  // Main bill form state
  const [form, setForm] = useState({
    name: "",
    age: "",
    gender: "",
    patientId: "",
    treatment: "",
    amount: "",
  });

  // For new bills, all bills, and messages
  const [bills, setBills] = useState([]);
  const [message, setMessage] = useState("");

  // Patient history search state
  const [searchPatientId, setSearchPatientId] = useState("");
  const [patientBills, setPatientBills] = useState([]);
  const [historyMessage, setHistoryMessage] = useState("");

  // Load all bills for the dashboard (optional, can skip if only history is needed)
  useEffect(() => {
    axios
      .get(API_URL)
      .then((res) => setBills(res.data))
      .catch(() => setMessage("Could not load bills"));
  }, []);

  // Update form fields
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle new bill submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    const { name, treatment, amount, patientId } = form;
    if (!name || !treatment || !amount || !patientId) {
      setMessage("Name, Patient ID, Treatment, and Amount are required.");
      return;
    }
    try {
      const postData = { ...form, amount: Number(form.amount) };
      const res = await axios.post(API_URL, postData);
      setBills([res.data.bill, ...bills]);
      setForm({
        name: "",
        age: "",
        gender: "",
        patientId: "",
        treatment: "",
        amount: "",
      });
      setMessage("Bill added successfully!");

      // Optionally refresh patient bills if their history is being shown
      if (searchPatientId && patientId === searchPatientId) {
        handlePatientSearch(searchPatientId);
      }
    } catch (err) {
      setMessage(
        "Failed to add bill: " + (err.response?.data?.error || err.message)
      );
    }
  };

  // Handle searching bill/treatment history by patient ID
  const handlePatientSearch = async (customId) => {
    const idToSearch = customId || searchPatientId;
    if (!idToSearch) {
      setHistoryMessage("Please enter a Patient ID.");
      setPatientBills([]);
      return;
    }
    try {
      const res = await axios.get(`${API_URL}/patient/${idToSearch}`);
      setPatientBills(res.data);
      setHistoryMessage(res.data.length === 0 ? "No previous bills found." : "");
    } catch (err) {
      setHistoryMessage("Error fetching patient history.");
      setPatientBills([]);
    }
  };

  // Compute total pricing for displayed patient bills
  const totalPrice = patientBills.reduce(
    (sum, bill) => sum + Number(bill.amount || 0),
    0
  );

  return (
    <div className="billing-container">
      <h2>Patient Billing</h2>

      {/* Search section for patient history */}
      <div className="search-section">
        <input
          placeholder="Enter Patient ID to view history"
          value={searchPatientId}
          onChange={(e) => setSearchPatientId(e.target.value)}
        />
        <button type="button" onClick={() => handlePatientSearch()}>
          Search
        </button>
      </div>
      {historyMessage && (
        <div style={{ color: "red", marginBottom: 12 }}>{historyMessage}</div>
      )}

      {/* Show treatment/procedure history and total pricing */}
      {patientBills.length > 0 && (
        <div>
          <h3>
            Treatment History for Patient: <span style={{ color: "#1976d2" }}>{searchPatientId}</span>
          </h3>
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Treatment</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {patientBills.map((bill) => (
                <tr key={bill._id}>
                  <td>
                    {bill.date
                      ? new Date(bill.date).toLocaleString()
                      : "-"}
                  </td>
                  <td>{bill.treatment}</td>
                  <td>{bill.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ marginTop: 8 }}>
            <b>
              Total Pricing:&nbsp;₹
              {totalPrice}
            </b>
          </div>
        </div>
      )}

      {/* Main billing form */}
      <form onSubmit={handleSubmit} className="billing-form" style={{ marginTop: 28 }}>
        <input
          placeholder="Patient Name"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          placeholder="Age"
          name="age"
          value={form.age}
          onChange={handleChange}
          type="number"
        />
        <input
          placeholder="Gender"
          name="gender"
          value={form.gender}
          onChange={handleChange}
        />
        <input
          placeholder="Patient ID"
          name="patientId"
          value={form.patientId}
          onChange={handleChange}
          required
        />
        <input
          placeholder="Treatment"
          name="treatment"
          value={form.treatment}
          onChange={handleChange}
          required
        />
        <input
          placeholder="Amount"
          name="amount"
          value={form.amount}
          onChange={handleChange}
          type="number"
          required
        />
        <button type="submit">Submit Bill</button>
      </form>
      {message && (
        <div style={{ color: message.startsWith("Failed") ? "red" : "green", marginTop: 10 }}>
          {message}
        </div>
      )}
    </div>
  );
}