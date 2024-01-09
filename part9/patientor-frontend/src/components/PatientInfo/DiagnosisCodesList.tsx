interface DiagnoseCodesListProps {
    codes?: string[];
}

const DiagnosisCodesList = (props: DiagnoseCodesListProps) => {
    const { codes = [] } = props;
    return (<ul>{codes.map((code) => 
        <li key={code}>{code}</li>)}
    </ul>);
};

export default DiagnosisCodesList;