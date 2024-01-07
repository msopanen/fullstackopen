import { v1 as uuid } from "uuid";
import data from "../../data/patients";
import { NonSensitivePatient, NewPatient } from "../types";

export const getPatients = (): NonSensitivePatient[] => {
  return data.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = (newPatient: NewPatient) => {
  const id: string = uuid();
  data.push({ ...newPatient, id });
  return newPatient;
};

export default {
  getPatients,
  addPatient,
};
