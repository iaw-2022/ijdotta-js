import { Paper, Box, Typography } from '@mui/material';
import { Treatment } from '../../types/treatments';
import HealingIcon from '@mui/icons-material/Healing';

interface Props {
    treatment: Treatment
}

function TreatmentCard({treatment}: Props): JSX.Element {
    const {title, description} = treatment

    return (
        <Paper>
            <Box display={"flex"} flexDirection="column" padding={"5px"}>
                <Typography><HealingIcon/>{title}</Typography>
                <Typography>{description}</Typography>
            </Box>
        </Paper>
    );
}

export default TreatmentCard;