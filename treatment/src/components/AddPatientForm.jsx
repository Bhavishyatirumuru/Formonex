import React, {useState} from "react";
import { addPatient } from "../api/api";

function AddPatientForm({onPatientAdded}) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [clinicId, setClinicId] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); setLoading(true);
    try {
      await addPatient({ name, phone, clinicId });
      setName(""); setPhone(""); setClinicId("");
      if(onPatientAdded) onPatientAdded();
    } catch (err) {
      setError("Failed to add patient. Please try again.");
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} style={{background:"#fff",padding:"1em",borderRadius:6}}>
      <h3>Add Patient</h3>
      <input placeholder="Name" value={name}
        onChange={e=>setName(e.target.value)} required
        style={{marginBottom:".5em",width:"100%"}} />
      <input placeholder="Phone" value={phone}
        onChange={e=>setPhone(e.target.value)} required
        style={{marginBottom:".5em",width:"100%"}} />
      <input placeholder="Clinic ID" value={clinicId}
        onChange={e=>setClinicId(e.target.value)} required
        style={{marginBottom:".5em",width:"100%"}} />
      {error && <div style={{color:"red"}}>{error}</div>}
      <button type="submit" disabled={loading} style={{marginTop:".5em"}}>
        {loading ? "Adding..." : "Add Patient"}
      </button>
    </form>
  );
}
export default AddPatientForm;