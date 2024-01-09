import {
  Diagnosis,
  Gender,
  HealthCheckRating,
  NewPatient,
  NewBaseEntry,
  NewPatientEntry,
  Discharge,
  SickLeave,
} from "../types";

// New Patient
// -----------------------------------
export const toNewPatient = (obj: unknown): NewPatient => {
  if (!obj || typeof obj !== "object") {
    throw new Error("Incorrect or missing data");
  }
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
      entries: [],
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

// New Patient Entry
// -----------------------------------
export const toNewPatientEntry = (obj: unknown): NewPatientEntry => {
  if (!obj || typeof obj !== "object") {
    throw new Error("Incorrect or missing data");
  }

  if (
    "type" in obj &&
    "date" in obj &&
    "description" in obj &&
    "specialist" in obj
  ) {
    const baseEntry: NewBaseEntry = {
      date: parseDate(obj.date),
      description: parseString(obj.description, "description"),
      specialist: parseString(obj.specialist, "specialist"),
      ...("diagnosisCodes" in obj && {
        diagnosisCodes: parseDiagnosisCodes(obj.diagnosisCodes),
      }),
    };

    switch (obj.type) {
      case "HealthCheck": {
        if ("healthCheckRating" in obj) {
          return {
            type: "HealthCheck",
            healthCheckRating: parseHealthCheckRating(obj.healthCheckRating),
            ...baseEntry,
          };
        }
        break;
      }
      case "Hospital": {
        if ("discharge" in obj) {
          return {
            type: "Hospital",
            discharge: parseDischarge(obj.discharge),
            ...baseEntry,
          };
        }
        break;
      }
      case "OccupationalHealthcare": {
        if ("employerName" in obj) {
          return {
            type: "OccupationalHealthcare",
            employerName: parseString(obj.employerName, "employerName"),
            ...("sickLeave" in obj && {
              sickLeave: parseSickLeave(obj.sickLeave),
            }),
            ...baseEntry,
          };
        }
        break;
      }
    }
  }

  throw new Error("Incorrect data: some patient entry fields are missing");
};

const parseString = (str: unknown, key: string): string => {
  if (!str || !isString(str)) {
    throw new Error("Incorrect or missing key: " + key);
  }
  return str;
};

const parseDiagnosisCodes = (codes: unknown): Array<Diagnosis["code"]> => {
  return codes as Array<Diagnosis["code"]>;
};

const isNumber = (num: unknown): num is number => {
  return typeof num === "number" || num instanceof Number;
};

const isHealthCheckRating = (rating: number): rating is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(rating);
};

const parseHealthCheckRating = (rating: unknown): number => {
  if (
    rating === undefined ||
    !isNumber(rating) ||
    !isHealthCheckRating(rating)
  ) {
    throw new Error("Incorrect or missing rating: " + rating);
  }
  return rating;
};

const parseDischarge = (discharge: unknown): Discharge => {
  if (!discharge || typeof discharge !== "object") {
    throw new Error("Incorrect or missing data");
  }

  if ("date" in discharge && "criteria" in discharge) {
    return {
      date: parseDate(discharge.date),
      criteria: parseString(discharge.criteria, "criteria"),
    };
  }
  throw new Error("Incorrect or missing discharge");
};

const parseSickLeave = (leave: unknown): SickLeave => {
  if (!leave || typeof leave !== "object") {
    throw new Error("Incorrect or missing data");
  }

  if ("startDate" in leave && "endDate" in leave) {
    return {
      startDate: parseDate(leave.startDate),
      endDate: parseDate(leave.endDate),
    };
  }
  throw new Error("Incorrect or missing sickeLeave");
};
