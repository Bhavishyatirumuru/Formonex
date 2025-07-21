function PatientList({ patients, onDelete }) {
  if (!patients.length)
    return <p style={{ textAlign: "center", color: "#aaa" }}>No patients found</p>;
  return (
    <table className="patient-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Age</th>
          <th>Gender</th>
          <th>Contact</th>
          <th>Remove</th>
        </tr>
      </thead>
      <tbody>
        {patients.map(p => (
          <tr key={p._id}>
            <td>{p.name}</td>
            <td>{p.age}</td>
            <td>{p.gender}</td>
            <td>{p.contact}</td>
            <td>
              <button style = {{background: "#f44336", color: "#fff", border: "none", borderRadius: "4px", padding: "5px 12px", cursor: "pointer"}}
              onClick = {() => onDelete(p._id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
export default PatientList;