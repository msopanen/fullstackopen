import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Alert, Typography } from "@mui/material";
import Stack from '@mui/material/Stack';
import axios from 'axios';
import { EntryFromValues, Patient } from "../../types";

import patientService from "../../services/patients";
import GenderIcon from "./GenderIcon";
import EntryDetails from "./EntryDetails";
import AddHealthCheckEntry from "./AddHealthCheckEntryForm";

const PatientInfo = () => {
    
    const [patient, setPatient] = useState<Patient>();
    const [error, setError] = useState<string>();
  

    const { id } = useParams();

    useEffect(() => {
        const timeout = setTimeout(() => setError(""), 5000);
        return () => {
            clearTimeout(timeout);
        };
    }, [error]);

    useEffect(() => {
        const fetchPatient = async (id: string) => {
            const data = await patientService.getPatient(id);
            setPatient(data);
        };

        if(id) {
            fetchPatient(id);
        }
    }, [id]);

    const handleSubmit = async (object: EntryFromValues) => {
        const postPatientEntry = async (id: string, object: EntryFromValues) => {
            try {
                const updatedPatient = await patientService.createEntry(id, object);
                setPatient(updatedPatient);
            } catch (error: unknown) {
                setError(axios.isAxiosError(error) ? 
                    `${error.response?.data}` : "Unknown error");
            }
        };
        
        if(id) {
            postPatientEntry(id, object);
        }
    };

    return (<>{patient && (
        <div>
            <Stack direction="row" alignItems="center" gap={1}>
                <Typography variant="h5">
                    {patient.name}
                </Typography>    
                <GenderIcon gender={patient.gender} />
            </Stack>
            <div>ssn: {patient.ssn}</div>
            <div>occupation: {patient.occupation}</div>
            {error && <Alert severity="error">{error}</Alert>}

            <AddHealthCheckEntry onSubmit={handleSubmit} />

            <Typography variant="h6" component="div" sx={{ marginTop: "0.5rem", marginBottom: "0.5rem" }}>
                    entries
            </Typography>
            <div>{patient.entries.map(entry => 
                <EntryDetails key={entry.id} entry={entry} />)}
            </div>
        </div>
    )}</>);
};

export default PatientInfo;
