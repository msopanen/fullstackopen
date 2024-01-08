import { v1 as uuid } from "uuid";
import data from "../../data/patients";
import { NonSensitivePatient, NewPatient, Patient } from "../types";

const getPatients = (): NonSensitivePatient[] => {
  return data.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const getPatient = (id: string): NonSensitivePatient | undefined => {
  return data.find((r) => r.id === id);
};

const addPatient = (patient: NewPatient): Patient => {
  const id: string = uuid();
  const newPatient = {
    ...patient,
    id,
    entries: [],
  };
  data.push(newPatient);
  return newPatient;
};

export default {
  getPatients,
  getPatient,
  addPatient,
};
