import { OccupationalHealthcareEntry } from "../../types";
import DiagnosisList from "./DiagnosisList";

import MedicationIcon from '@mui/icons-material/Medication';

interface OccupationalHeathcareProps {
    entry: OccupationalHealthcareEntry;
}

const OccupationalHeathcare = (props: OccupationalHeathcareProps) => {
    const { entry } = props;
    
    return (
        <div key={entry.id} style={{ border: "solid", margin: ".125rem" }}>
            <span>{entry.date} <MedicationIcon /></span>
            <div>{entry.description}</div>
            <DiagnosisList codes={entry.diagnosisCodes} />
            <div>diagnose by {entry.specialist}</div>
        </div>
    );
};

export default OccupationalHeathcare;