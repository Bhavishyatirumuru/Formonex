// import { useEffect, useState } from 'react';
// import AddPatientForm from './AddPatientForm';
// import PatientList from './PatientList';

// function Dashboard({ onLogout }) {
//   const [patients, setPatients] = useState([]);
//   const [message, setMessage] = useState('');
//   const [error, setError] = useState('');

//   // Fetch patients from API
//   const fetchPatients = async () => {
//     try {
//       const res = await fetch('http://localhost:5000/api/patients');
//       const data = await res.json();
//       setPatients(data.patients);
//     } catch {
//       setError('Cannot fetch patient list');
//     }
//   };

//   useEffect(() => { fetchPatients(); }, []);

//   const handleAdd = async (patient) => {
//     setMessage('');
//     setError('');
//     try {
//       const res = await fetch('http://localhost:5000/api/patients', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(patient)
//       });
//       if (res.ok) {
//         setMessage('Patient added!');
//         fetchPatients();
//       } else {
//         setError('All fields required');
//       }
//     } catch {
//       setError('Failed to add patient');
//     }

//   };

//   const handleDelete = async(id) =>{
//     try{
//       const res = await axios.delete('http://localhost:5000/api/patients/${id}');
//       if(res.status === 200) {

//             setPatients(patients.filter(patient => patient._id !== id));
//           }
//           else{
//       alert('Failed to delete patient');
//     }
//     catch {
//       alert('Failed to Delete Patient');
//     }
//     };


//   return (
//     <div className="dashboard">
//       <div className="dashboard-header">
//         <h2>Welcome, Admin</h2>
//         <button className="logout-btn" onClick={onLogout}>Logout</button>
//       </div>
//       <AddPatientForm onAdd={handleAdd} />
//       {message && <div className="success-message">{message}</div>}
//       {error && <div className="error-message">{error}</div>}
//       <PatientList patients={patients} onDelete = {handleDelete} />
//     </div>
//   );
// }

// export default Dashboard;

import { useEffect, useState } from 'react';
import axios from 'axios';
import AddPatientForm from './AddPatientForm';
import PatientList from './PatientList';

function Dashboard({ onLogout }) {
  const [patients, setPatients] = useState([]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // Fetch patients from backend
  const fetchPatients = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/patients');
      setPatients(res.data.patients);
      setError('');
    } catch {
      setError('Cannot fetch patient list.');
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  // Handler for adding a patient
  const handleAdd = async (patient) => {
    setMessage('');
    setError('');
    try {
      const res = await axios.post('http://localhost:5000/api/patients', patient);
      if (res.status === 201) {
        setMessage('Patient added!');
        fetchPatients(); // Refresh list
      } else {
        setError('Failed to add patient');
      }
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message)
        setError(err.response.data.message);
      else
        setError('Failed to add patient.');
    }
  };

  // Handler for deleting a patient
  const handleDelete = async (id) => {
    setMessage('');
    setError('');
    try {
      const res = await axios.delete(`http://localhost:5000/api/patients/${id}`);
      if (res.status === 200) {
        setPatients(patients.filter((p) => p._id !== id)); // Update UI immediately
        setMessage('Patient deleted!');
      } else {
        setError('Failed to delete patient');
      }
    } catch (err) {
      setError('Failed to delete patient');
    }
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2>Welcome, Admin</h2>
        <button className="logout-btn" onClick={onLogout}>Logout</button>
      </div>

      <AddPatientForm onAdd={handleAdd} />

      {message && <div className="success-message">{message}</div>}
      {error && <div className="error-message">{error}</div>}

      <PatientList patients={patients} onDelete={handleDelete} />
    </div>
  );
}

export default Dashboard;