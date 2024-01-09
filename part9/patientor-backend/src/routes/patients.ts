import express from "express";
import patientService from "../services/patientService";
import { toNewPatient, toNewPatientEntry } from "../utils";

const patientsRouter = express.Router();

patientsRouter.get("/", (_req, res) => {
  res.json(patientService.getPatients());
});

patientsRouter.post("/", (req, res) => {
  try {
    const newPatient = toNewPatient(req.body);
    res.json(patientService.addPatient(newPatient));
  } catch (error: unknown) {
    res
      .status(400)
      .send(error instanceof Error ? `${error.message}` : "Unknown error");
  }
});

patientsRouter.post("/:id/entries", (req, res) => {
  try {
    const entry = toNewPatientEntry(req.body);
    console.log({ entry });
    const patient = patientService.addPatientEntry(req.params.id, entry);
    if (patient) {
      res.json(patient);
    } else {
      res.sendStatus(404);
    }
  } catch (error: unknown) {
    res
      .status(400)
      .send(error instanceof Error ? `${error.message}` : "Unknown error");
  }
});

patientsRouter.get("/:id", (req, res) => {
  const patient = patientService.getPatient(req.params.id);
  if (patient) {
    res.json(patient);
  } else {
    res.sendStatus(404);
  }
});

export default patientsRouter;
