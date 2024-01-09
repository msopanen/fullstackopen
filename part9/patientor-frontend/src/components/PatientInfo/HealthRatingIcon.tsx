import { HealthCheckRating } from '../../types';


import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';

export interface HealthRatingIconProps {
    rating: HealthCheckRating;
}

const HealtRatingIcon = (props: HealthRatingIconProps) => {
    const { rating } = props;
    switch(rating) {
        case 0:
            return <SentimentSatisfiedAltIcon />;
        case 1:
            return <SentimentSatisfiedIcon />;
        case 2:
            return <SentimentDissatisfiedIcon />;
        case 3:
            return <SentimentVeryDissatisfiedIcon />;
        default:
            throw new Error("unrecognized rating");    
    }
}; 

export default HealtRatingIcon;