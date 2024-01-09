import { Entry } from "../../types";
import { assertNever } from "../../utils";
import HealthCheck from "./HealthCheck";
import Hospital from "./Hospital";
import OccupationalHeathcare from "./OccupationalHeathcare";

interface EntryDetailsProps {
    entry: Entry;
}

const EntryDetails = (props: EntryDetailsProps) => {
    const { entry } = props;
    
    switch(entry.type) {
        case "HealthCheck":
            return <HealthCheck entry={entry} />;
        case "Hospital": 
            return <Hospital entry={entry} />;
        case "OccupationalHealthcare":
            return <OccupationalHeathcare entry={entry} />;
        default:
            assertNever(entry);
    }
};

export default EntryDetails;