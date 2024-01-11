import { HospitalEntry } from "../../types";
import DiagnosisList from "./DiagnosisList";

import LocalHospitalIcon from '@mui/icons-material/LocalHospital';

interface HospitalEntryProps {
    entry: HospitalEntry;
}

const style = { border: "solid", padding: ".125rem", margin: ".125rem" };

const Hospital = (props: HospitalEntryProps) => {
    const { entry } = props;
    
    return (
        <div key={entry.id} style={style}>
            <span>{entry.date} <LocalHospitalIcon /></span>
            <div>{entry.description}</div>
            
            <div>discharge date {entry.discharge.date} dischage criteria {entry.discharge.criteria}</div>
            <DiagnosisList codes={entry.diagnosisCodes} />
            <div>diagnose by {entry.specialist}</div>
        </div>
    );
};

export default Hospital;