import { useState } from 'react';

function AddPatientForm({ onAdd }) {
  const [form, setForm] = useState({ name: '', age: '', gender: '', contact: '' });

  const handleSubmit = e => {
    e.preventDefault();
    onAdd(form);
    setForm({ name: '', age: '', gender: '', contact: '' });
  }

  return (
    <form onSubmit={handleSubmit} className="form-section">
      <input placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
      <input placeholder="Age" value={form.age} type="number" onChange={e => setForm({ ...form, age: e.target.value })} />
      <select value={form.gender} onChange={e => setForm({ ...form, gender: e.target.value })}>
        <option value="">Select Gender</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
      </select>
      <input placeholder="Contact" value={form.contact} onChange={e => setForm({ ...form, contact: e.target.value })} />
      <button type="submit">Add Patient</button>
    </form>
  );
}

export default AddPatientForm;