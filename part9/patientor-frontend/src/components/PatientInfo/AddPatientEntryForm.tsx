import { Button, ButtonGroup, TextField, Typography } from "@mui/material";
import { useState } from "react";

import { HealthCheckRating, EntryFromValues } from "../../types";

const style = { border: "solid", padding: ".5rem", margin: ".125rem" };
const txtFieldStyle = { marginTop: "1rem"};

interface AddPatientEntryFormProps {
  onSubmit: (object: EntryFromValues) => void;
}

const AddPatientEntryForm = (props: AddPatientEntryFormProps) => {
    
    const [type, setType] = useState<"Hospital" | "HealthCheck" | "OccupationalHealthcare">("HealthCheck");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");
    const [dischargeDate, setDischargeDate] = useState("");
    const [dischargeCriteria, setDischargeCriteria] = useState("");
    const [specialist, setSpecialist] = useState("");
    const [diagnosisCodes, setDiagnosisCodes] = useState("");
    const [healthCheckRating, setHealthCheckRating] = useState(HealthCheckRating.Healthy);
    const [employerName, setEmployerName] = useState("");
    const [sickLeaveStartDate, setSickLeaveStartDate] = useState("");
    const [sickLeaveEndDate, setSickLeaveEndDate] = useState("");

    const handleSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault();
                
        const createEntryObj = (type: "Hospital" | "HealthCheck" | "OccupationalHealthcare"): EntryFromValues => {
          
          const addDiagnosisCodes = diagnosisCodes.length > 0;
          const addSickLeave = sickLeaveStartDate.length > 0 
            && sickLeaveEndDate.length > 0;

          const baseEntry = {
            description,
            date,
            specialist,
            ...(addDiagnosisCodes && { 
              diagnosisCodes: diagnosisCodes.split(",")
            } )
          };

          switch(type) {
            case "HealthCheck": {
              return {
                type: "HealthCheck",
                healthCheckRating,
                ...baseEntry,
              };
            }
            case "Hospital": {
              return {
                type: "Hospital",
                discharge: {
                  date: dischargeDate,
                  criteria: dischargeCriteria,
                },
                ...baseEntry,
              };
            }
            case "OccupationalHealthcare": {
              return {
                type: "OccupationalHealthcare",
                employerName,
                ...(addSickLeave && { sickLeave: {
                  startDate: sickLeaveStartDate,
                  endDate: sickLeaveEndDate
                }}),
                ...baseEntry,
              };
            }
          }
        };

        const object = createEntryObj(type);

        props.onSubmit(object);
        resetForm();
    };

    const resetForm = () => {
      setType("HealthCheck");
      setDescription("");
      setDate("");
      setSpecialist("");
      setDiagnosisCodes("");
      setDischargeDate("");
      setDischargeCriteria("");
      setHealthCheckRating(HealthCheckRating.Healthy);
      setEmployerName("");
      setSickLeaveStartDate("");
      setSickLeaveEndDate("");
    };

    const handleReset = (e: React.SyntheticEvent) => {
      e.preventDefault();
      resetForm();
    };

    return <div style={style}>
        <Typography variant="h6" sx={{ margin: ".5rem"}}>
          Add new patient entry
        </Typography> 
        
        <ButtonGroup variant="text">
            <Button onClick={() => setType("HealthCheck")}>Health check</Button>
            <Button onClick={() => setType("Hospital")}>Hospital</Button>
            <Button onClick={() => setType("OccupationalHealthcare")}>Occupational healthcare</Button>
        </ButtonGroup>

        <form onSubmit={handleSubmit} onReset={handleReset}>
          <TextField
            label="Description"
            fullWidth 
            value={description}
            onChange={({ target }) => setDescription(target.value)}
            sx={txtFieldStyle}
          />
          <TextField
            fullWidth
            label="Date"
            InputLabelProps={{ shrink: true }} 
            value={date}
            type="date"
            onChange={({ target }) => setDate(target.value)}
            sx={txtFieldStyle}
          /> 
          <TextField
            label="Specialist"
            fullWidth 
            value={specialist}
            onChange={({ target }) => setSpecialist(target.value)}
            sx={txtFieldStyle}
          />    
          <TextField
            label="Diagnose codes"
            fullWidth 
            value={diagnosisCodes}
            onChange={({ target }) => setDiagnosisCodes(target.value)}
            sx={txtFieldStyle}
          />
          {type === "HealthCheck" && <TextField
            label="Healthcheck rating"
            fullWidth 
            value={healthCheckRating}
            onChange={({ target }) => setHealthCheckRating(Number(target.value))}
            sx={txtFieldStyle}
          /> } 
          {type === "Hospital" && (
            <>
              <TextField
                label="Discharge date"
                InputLabelProps={{ shrink: true }}
                type="date"
                fullWidth 
                value={dischargeDate}
                onChange={({ target }) => setDischargeDate(target.value)}
                sx={txtFieldStyle}
              />
              <TextField
                label="Discharge criteria"
                fullWidth 
                value={dischargeCriteria}
                onChange={({ target }) => setDischargeCriteria(target.value)}
                sx={txtFieldStyle}
              />
            </>
          )} 
          {type === "OccupationalHealthcare" && (
            <>
              <TextField
                label="Employer name"
                fullWidth 
                value={employerName}
                onChange={({ target }) => setEmployerName(target.value)}
                sx={txtFieldStyle}
              />
              <TextField
                label="Sick leave start date"
                InputLabelProps={{ shrink: true }}
                type="date"
                fullWidth 
                value={sickLeaveStartDate}
                onChange={({ target }) => setSickLeaveStartDate(target.value)}
                sx={txtFieldStyle}
              />
              <TextField
                label="Sick leave end date"
                InputLabelProps={{ shrink: true }}
                type="date"
                fullWidth 
                value={sickLeaveEndDate}
                onChange={({ target }) => setSickLeaveEndDate(target.value)}
                sx={txtFieldStyle}
              />
            </>
          )} 
          <ButtonGroup variant="contained" sx={{ marginTop: "1.5rem" }}>
            <Button type="reset" sx={{ width: "100px", background: "red" }}>Cancel</Button>
            <Button type="submit" sx={{ width: "100px" }}>Add</Button>
          </ButtonGroup>
        </form>
    </div>;
};

export default AddPatientEntryForm;