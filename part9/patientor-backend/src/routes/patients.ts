import express from "express";
import patientService from "../services/patientService";
import toNewPatient from "../utils";

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

export default patientsRouter;
