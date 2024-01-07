import express from "express";
import patientService from "../services/patientService";

const patientsRouter = express.Router();

patientsRouter.get("/", (_req, res) => {
  res.json(patientService.getPatients());
});

export default patientsRouter;
