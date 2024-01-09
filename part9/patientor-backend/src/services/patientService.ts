import { v1 as uuid } from "uuid";
import data from "../../data/patients";
import {
  NonSensitivePatient,
  NewPatient,
  Patient,
  NewPatientEntry,
} from "../types";

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
  const newPatient = {
    ...patient,
    id: uuid(),
    entries: [],
  };
  data.push(newPatient);
  return newPatient;
};

const addPatientEntry = (
  patientId: string,
  entry: NewPatientEntry,
): Patient | undefined => {
  const patient = data.find((r) => r.id === patientId);

  if (patient) {
    const newEntry = {
      ...entry,
      id: uuid(),
    };
    patient.entries.push(newEntry);
  }

  return patient;
};

export default {
  getPatients,
  getPatient,
  addPatient,
  addPatientEntry,
};
