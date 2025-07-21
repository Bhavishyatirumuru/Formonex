import React from "react";
function TreatmentCard({ treatment }) {
  const {date, procedures = [], roomStay, totalAmount, comments} = treatment;
  const tDate = date ? new Date(date).toLocaleDateString() : "";
  const roomDesc = roomStay && roomStay.daysStayed ?
    `Stayed ${roomStay.daysStayed} days (Room ${roomStay.roomNo}, Bed ${roomStay.bedNo}) @₹${roomStay.perDayCost}/day`
    : "";
  const totalProc = procedures.reduce((sum, p) => sum + (p.cost || 0), 0);
  const toRs = x => "₹" + (x||0);
  return (
    <div className="treatment-card" style={{background:"#fafcff",marginBottom:"1em",padding:"1em",borderRadius:5,border:"1px solid #e1e4ee"}}>
      <div><b>Date:</b> {tDate}</div>
      <div><b>Procedures:</b>
        <ul>{procedures.map((p, idx) => (
          <li key={idx}>{p.name} <span style={{color:"#207d32"}}>{toRs(p.cost)}</span></li>
        ))}</ul>
      </div>
      {roomDesc && <div><b>Inpatient:</b> {roomDesc}</div>}
      {comments && <div><b>Notes:</b> {comments}</div>}
      <div><b>Procedures Total:</b> {toRs(totalProc)}</div>
      {roomDesc && <div><b>Room Stay:</b> {toRs(roomStay.daysStayed*roomStay.perDayCost)}</div>}
      <div><b>TOTAL:</b> {toRs(totalAmount)}</div>
    </div>
  );
}
export default TreatmentCard;