import axios from "axios";
const BASE = "http://localhost:5000/api";

export const fetchPatients = (search="") =>
  axios.get(`${BASE}/patients`, { params: { search } });

export const addPatient = (data) =>
  axios.post(`${BASE}/patients`, data);

export const fetchTreatments = (patientId) =>
  axios.get(`${BASE}/treatments/patient/${patientId}`);

export const addTreatment = (data) =>
  axios.post(`${BASE}/treatments`, data);