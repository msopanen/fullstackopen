import { HospitalEntry } from "../../types";
import DiagnosisList from "./DiagnosisList";

import LocalHospitalIcon from '@mui/icons-material/LocalHospital';

interface HospitalEntryProps {
    entry: HospitalEntry;
}

const Hospital = (props: HospitalEntryProps) => {
    const { entry } = props;
    
    return (
        <div key={entry.id} style={{ border: "solid", margin: ".125rem" }}>
            <span>{entry.date} <LocalHospitalIcon /></span>
            <div>{entry.description}</div>
            <DiagnosisList codes={entry.diagnosisCodes} />
            <div>diagnose by {entry.specialist}</div>
        </div>
    );
};

export default Hospital;