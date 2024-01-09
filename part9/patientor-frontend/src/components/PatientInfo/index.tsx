import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Typography } from "@mui/material";
import Stack from '@mui/material/Stack';

import { Patient } from "../../types";

import patientService from "../../services/patients";
import GenderIcon from "./GenderIcon";
import EntryDetails from "./EntryDetails";

const PatientInfo = () => {
    
    const [patient, setPatient] = useState<Patient>();

    const { id } = useParams();

    useEffect(() => {
        const fetchPatient = async (id: string) => {
            const data = await patientService.getPatient(id);
            setPatient(data);
        };

        if(id) {
            fetchPatient(id);
        }
    }, [id]);

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
