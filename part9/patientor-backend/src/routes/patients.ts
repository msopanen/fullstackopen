import express from "express";
import patientService from "../services/patientService";

const patientsRouter = express.Router();

patientsRouter.get("/", (_req, res) => {
  res.json(patientService.getPatients());
});

patientsRouter.post("/", (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { name, dateOfBirth, ssn, gender, occupation } = req.body;
  res.json(
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    patientService.addPatient({ name, dateOfBirth, ssn, gender, occupation }),
  );
});

export default patientsRouter;
