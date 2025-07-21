import React, { useState, useEffect } from "react";
import { fetchTreatments } from "../api/api";
import TreatmentCard from "./TreatmentCard";
import AddTreatmentForm from "./AddTreatmentForm";

function TreatmentDashboard({ patientId }) {
  const [treatments, setTreatments] = useState([]);
  const reload = () => {
    if (patientId) fetchTreatments(patientId).then(res=>setTreatments(res.data));
  };
  useEffect(()=>{ reload(); }, [patientId]);
  if(!patientId) return <div className="treatment-dashboard"><p>Select a patient to view treatments.</p></div>;
  return (
    <div className="treatment-dashboard">
      <h2>Treatment & Procedure History</h2>
      {treatments.length===0 ? <p>No treatments found.</p> :
        treatments.map(t => <TreatmentCard key={t._id} treatment={t} />)}
      <AddTreatmentForm patientId={patientId} onTreatmentAdded={reload} />
    </div>
  );
}
export default TreatmentDashboard;