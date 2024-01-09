import { Button, ButtonGroup, TextField, Typography } from "@mui/material";
import { useState } from "react";

import { HealthCheckRating, EntryFromValues } from "../../types";

const style = { border: "solid", padding: ".5rem", margin: ".125rem" };
const txtFieldStyle = { marginTop: "1rem"};

interface AddHealthCheckEntryProps {
  onSubmit: (object: EntryFromValues) => void;
}

const AddHealthCheckEntry = (props: AddHealthCheckEntryProps) => {
    
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");
    const [specialist, setSpecialist] = useState("");
    const [healthCheckRating, setHealthCheckRating] = useState(HealthCheckRating.Healthy);
    const [diagnosisCodes, setDiagnosisCodes] = useState("");

    const handleSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        
        const object: EntryFromValues = {
          type: "HealthCheck",
          description,
          date,
          specialist,
          healthCheckRating,
          diagnosisCodes: diagnosisCodes.split(",")
        };
        
        props.onSubmit(object);
    };

    const handleReset = (e: React.SyntheticEvent) => {
      e.preventDefault();
      setDescription("");
      setDate("");
      setSpecialist("");
      setHealthCheckRating(0);
      setDiagnosisCodes("");
    };

    return <div style={style}>
        <Typography variant="h6" sx={{ margin: ".5rem"}}>
          New HealthCheck entry
        </Typography> 
        <form onSubmit={handleSubmit} onReset={handleReset}>
          <TextField
            label="Description"
            fullWidth 
            value={description}
            onChange={({ target }) => setDescription(target.value)}
            sx={txtFieldStyle}
          />
          <TextField
            label="Date"
            fullWidth 
            value={date}
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
            label="Healthcheck rating"
            fullWidth 
            value={healthCheckRating}
            onChange={({ target }) => setHealthCheckRating(Number(target.value))}
            sx={txtFieldStyle}
          /> 
          <TextField
            label="Diagnose codes"
            fullWidth 
            value={diagnosisCodes}
            onChange={({ target }) => setDiagnosisCodes(target.value)}
            sx={txtFieldStyle}
          /> 
          <ButtonGroup variant="contained" sx={{ marginTop: "1.5rem" }}>
            <Button type="reset" sx={{ width: "100px", background: "red" }}>Cancel</Button>
            <Button type="submit" sx={{ width: "100px" }}>Add</Button>
          </ButtonGroup>
        </form>
    </div>;
};

export default AddHealthCheckEntry;