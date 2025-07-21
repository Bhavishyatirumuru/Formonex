import React, {useState, useEffect} from "react";
import {fetchPatients} from "../api/api";

function PatientList({selectedId, onSelectPatient, refreshFlag}) {
  const [search, setSearch] = useState("");
  const [patients, setPatients] = useState([]);

  useEffect(()=>{
    fetchPatients(search).then(res=>setPatients(res.data));
  }, [search, refreshFlag]);

  return (
    <div>
      <h2>Patients</h2>
      <input type="text" placeholder="Search patient"
        value={search} onChange={e=>setSearch(e.target.value)}
        style={{ padding: '0.5em', width: '100%', marginBottom: '1em', borderRadius: '4px', border: '1px solid #ccc' }}
      />
      <ul style={{listStyle:'none',padding:0,margin:0}}>
        {patients.map(p=> (
          <li key={p._id} onClick={()=>onSelectPatient(p._id)}
              style={{
                cursor:'pointer',
                background:selectedId===p._id?'#b4e1fa':'transparent',
                padding:'.5em',
                borderBottom:'1px solid #efefef'
              }}>
            {p.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
export default PatientList;