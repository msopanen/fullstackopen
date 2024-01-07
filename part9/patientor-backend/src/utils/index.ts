import { Gender, NewPatient } from "../types";

const toNewPatient = (obj: unknown): NewPatient => {
  if (!obj || typeof obj !== "object") {
    throw new Error("Incorrect or missing data");
  }
  console.log({ obj });
  if (
    "name" in obj &&
    "ssn" in obj &&
    "dateOfBirth" in obj &&
    "gender" in obj &&
    "occupation" in obj
  ) {
    const newPatient: NewPatient = {
      name: parseName(obj.name),
      ssn: parseSsn(obj.ssn),
      dateOfBirth: parseDate(obj.dateOfBirth),
      gender: parseGender(obj.gender),
      occupation: parseOccupation(obj.occupation),
    };

    return newPatient;
  }
  throw new Error("Incorrect data: some patient fields are missing");
};

const isString = (str: unknown): str is string => {
  return typeof str === "string" || str instanceof String;
};

const isDate = (d: string): boolean => {
  return Boolean(Date.parse(d));
};

const parseDate = (d: unknown): string => {
  if (!d || !isString(d) || !isDate(d)) {
    throw new Error("Incorrect or missing date: " + d);
  }
  return d;
};

const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error("Incorrect or missing name: " + name);
  }
  return name;
};

const parseSsn = (ssn: unknown): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error("Incorrect or missing ssn: " + ssn);
  }
  return ssn;
};

const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error("Incorrect or missing occupation: " + occupation);
  }
  return occupation;
};

const isGender = (p: string): p is Gender => {
  return Object.values(Gender)
    .map((v) => v.toString())
    .includes(p);
};

const parseGender = (gender: unknown): string => {
  if (!gender || !isString(gender) || !isGender(gender)) {
    throw new Error("Incorrect or missing gender: " + gender);
  }
  return gender;
};

export default toNewPatient;
