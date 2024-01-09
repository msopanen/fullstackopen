import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import TransgenderIcon from '@mui/icons-material/Transgender';
import { Gender } from '../../types';

export interface GenderIconProps {
    gender: Gender;
}

const GenderIcon = (props: GenderIconProps) => {
    const { gender } = props;
    switch(gender) {
        case "female":
            return <FemaleIcon />;
        case "male":
            return <MaleIcon />;
        case "other":
            return <TransgenderIcon />;
        default:
            return null;    
    }
}; 

export default GenderIcon;