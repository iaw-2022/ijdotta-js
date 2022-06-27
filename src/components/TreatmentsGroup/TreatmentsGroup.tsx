import { TreatmentsPerDate } from "../../types/treatments";
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
    Box,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import dateTimeFormatter from "../../utils/DateTimeFormatter";
import TreatmentCard from "./TreatmentCard";

interface Props {
    treatmentsPerDate: TreatmentsPerDate;
}

function TreatmentsGroup({ treatmentsPerDate }: Props): JSX.Element {
    const { date, treatments } = treatmentsPerDate;

    return (
        <Accordion>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <Typography>{dateTimeFormatter.formatDate(date)}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Box display={"flex"} flexDirection="column" rowGap={"10px"}>
                    {treatments.map((treatment) => (
                        <TreatmentCard treatment={treatment} />
                    ))}
                </Box>
            </AccordionDetails>
        </Accordion>
    );
}

export default TreatmentsGroup;
