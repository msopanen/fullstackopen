import { OccupationalHealthcareEntry } from "../../types";
import DiagnosisList from "./DiagnosisList";

import MedicationIcon from '@mui/icons-material/Medication';

interface OccupationalHeathcareProps {
    entry: OccupationalHealthcareEntry;
}

const style = { border: "solid", padding: ".125rem", margin: ".125rem" };

const OccupationalHeathcare = (props: OccupationalHeathcareProps) => {
    const { entry } = props;
    
    return (
        <div key={entry.id} style={style}>
            <span>{entry.date} <MedicationIcon /></span>
            <div>{entry.description}</div>
            <DiagnosisList codes={entry.diagnosisCodes} />
            <div>diagnose by {entry.specialist}</div>
        </div>
    );
};

export default OccupationalHeathcare;