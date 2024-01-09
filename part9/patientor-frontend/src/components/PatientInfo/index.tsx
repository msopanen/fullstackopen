import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Typography } from "@mui/material";
import Stack from '@mui/material/Stack';

import { Patient } from "../../types";

import patientService from "../../services/patients";
import GenderIcon from "./GenderIcon";

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
        </div>
    )}</>);
};

export default PatientInfo;
