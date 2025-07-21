import React, { useState } from 'react';
import { addTreatment } from '../api/api';

function AddTreatmentForm({ patientId, onTreatmentAdded }) {
  const [date, setDate] = useState('');
  const [procedures, setProcedures] = useState([{ name: '', cost: '' }]);
  const [roomNo, setRoomNo] = useState('');
  const [bedNo, setBedNo] = useState('');
  const [daysStayed, setDaysStayed] = useState('');
  const [perDayCost, setPerDayCost] = useState('');
  const [comments, setComments] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleProcedureChange = (index, field, value) => {
    const newProcedures = [...procedures];
    newProcedures[index][field] = value;
    setProcedures(newProcedures);
  };
  const addProcedure = () => setProcedures([...procedures, { name: '', cost: '' }]);
  const removeProcedure = (index) => setProcedures(procedures.filter((_, i) => i !== index));

  const handleSubmit = async (e) => {
    e.preventDefault(); setLoading(true); setError(null);
    const filteredProcedures = procedures.filter(p=>p.name&&p.cost);
    const payload = {
      patientId,
      date,
      procedures: filteredProcedures.map(p=>({name:p.name, cost:parseFloat(p.cost)})),
      roomStay: daysStayed && perDayCost ? {
        roomNo, bedNo, daysStayed: parseInt(daysStayed,10), perDayCost:parseFloat(perDayCost),
      } : undefined,
      comments,
    };
    try {
      await addTreatment(payload);
      if (onTreatmentAdded) onTreatmentAdded();
      // Reset
      setDate(''); setProcedures([{ name: '', cost: '' }]);
      setRoomNo(''); setBedNo(''); setDaysStayed(''); setPerDayCost(''); setComments('');
    } catch(e) { setError("Failed to add treatment."); }
    setLoading(false);
  };

  if (!patientId) return null;

  return (
    <form onSubmit={handleSubmit} style={{background:"#fff",padding:"1em",borderRadius:6,marginTop:"1.5em"}}>
      <h3>Add Treatment</h3>
      <label>Date: <input type="date" value={date} required onChange={e=>setDate(e.target.value)}/></label>
      <div><b>Procedures</b>
        {procedures.map((p, idx) => (
          <div key={idx} style={{display:'flex',gap:'1em',marginBottom:'.5em'}}>
            <input type="text" placeholder="Name" value={p.name}
              onChange={e=>handleProcedureChange(idx,'name',e.target.value)} required/>
            <input type="number" placeholder="Cost" value={p.cost}
              onChange={e=>handleProcedureChange(idx,'cost',e.target.value)} required min="0" />
            {procedures.length > 1 && <button type="button" onClick={()=>removeProcedure(idx)}>X</button>}
          </div>
        ))}
        <button type="button" onClick={addProcedure}>Add Procedure</button>
      </div>
      <div style={{marginTop:'1em'}}><b>Room Stay (optional)</b>
        <input placeholder="Room #" value={roomNo} onChange={e=>setRoomNo(e.target.value)} />
        <input placeholder="Bed #" value={bedNo} onChange={e=>setBedNo(e.target.value)} />
        <input placeholder="Days Stayed" type="number" value={daysStayed} onChange={e=>setDaysStayed(e.target.value)} />
        <input placeholder="Per Day Cost" type="number" value={perDayCost} onChange={e=>setPerDayCost(e.target.value)} />
      </div>
      <div>
        <textarea placeholder="Comments" value={comments}
          onChange={e=>setComments(e.target.value)} />
      </div>
      {error && <div style={{color:'red'}}>{error}</div>}
      <button type="submit" disabled={loading} style={{marginTop:".5em"}}>
        {loading ? "Adding..." : "Add Treatment & Generate Bill"}
      </button>
    </form>
  );
}
export default AddTreatmentForm;