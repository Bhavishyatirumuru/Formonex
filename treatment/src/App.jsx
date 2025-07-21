import React, { useState } from "react";
import AddPatientForm from "./components/AddPatientForm";
import PatientList from "./components/PatientList";
import TreatmentDashboard from "./components/TreatmentDashboard";
import "./App.css";

function App() {
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [refreshFlag, setRefreshFlag] = useState(false);
  const refreshPatients = () => setRefreshFlag(flag=>!flag);

  return (
    <div className="app-container" style={{display:"flex",minHeight:"100vh",background:"#f5f8fd"}}>
      <div className="left-pane" style={{width:320, background:"#234567", color:"#fff", padding:"2em 1em", boxSizing:"border-box"}}>
        <AddPatientForm onPatientAdded={refreshPatients}/>
        <PatientList selectedId={selectedPatient} onSelectPatient={setSelectedPatient} refreshFlag={refreshFlag}/>
      </div>
      <div style={{flex:1,padding:"2em"}}><TreatmentDashboard patientId={selectedPatient}/></div>
    </div>
  );
}
export default App;