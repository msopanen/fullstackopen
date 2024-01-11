import { HealthCheckEntry } from "../../types";
import DiagnosisList from "./DiagnosisList";

import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
import HealtRatingIcon from "./HealthRatingIcon";

interface HealthCheckEntryProps {
    entry: HealthCheckEntry;
}

const style = { border: "solid", padding: ".125rem", margin: ".125rem" };

const HealthCheck = (props: HealthCheckEntryProps) => {
    const { entry } = props;
    
    return (
        <div key={entry.id} style={style}>
            <span>{entry.date} <MedicalInformationIcon /></span>
            <div>{entry.description}</div>
            <DiagnosisList codes={entry.diagnosisCodes} />
            <HealtRatingIcon rating={entry.healthCheckRating} />
            <div>diagnose by {entry.specialist}</div>
        </div>
    );
};

export default HealthCheck;