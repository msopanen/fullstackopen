import { useEffect, useState } from "react";
import diagnosisService from "../../services/diagnosis";
import { Diagnosis } from "../../types";

interface DiagnoseCodesListProps {
    codes?: string[];
}

const DiagnosisList = (props: DiagnoseCodesListProps) => {
    const { codes = [] } = props;

    const [diagnosis, setDiagnosis] = useState<Diagnosis[]>([]);

    useEffect(() => {
        const fetchDianosis = async (codes: string[]) => {
            const diagnosis = await diagnosisService.getAll();
            setDiagnosis(diagnosis.filter(d => codes.includes(d.code)));
        };

        if(codes.length > 0) {
            fetchDianosis(codes);
        }
    }, [codes]);

    return (<ul>{diagnosis.map((d) => 
        <li key={d.code}>{d.code} {d.name} '{d.latin}'</li>)}
    </ul>);
};

export default DiagnosisList;