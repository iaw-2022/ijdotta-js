import { Card, Box, Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import model from "../model/model";
import { Patient } from "../types/patient";
import { TreatmentsPerDate } from "../types/treatments";
import TreatmentsGroup from '../components/TreatmentsGroup/TreatmentsGroup'

interface Props {
    patient: Patient;
}

function Treatments({ patient }: Props): JSX.Element {

    const [treatmentsPerDate, setTreatmentsPerDate] = useState<Array<TreatmentsPerDate>>();

    useEffect(() => {
        model.getPatientTreatments(patient.id)
            .then((treatmentsPerDate) => setTreatmentsPerDate(treatmentsPerDate))
            .catch()
    }, [])

    return (
        <Container sx={{mt: "20px"}}>
            <Card sx={{}}>
                <Typography>Historial of assigned treatments</Typography>
                <Box
                    display="flex"
                    flexDirection="column"
                    alignItems={"center"}
                    padding="20px"
                    rowGap={"10px"}
                >
                    {treatmentsPerDate?.map((treatmentsGroup) => (
                        <Box maxWidth={"100%"} minWidth={"70%"}>
                            <TreatmentsGroup treatmentsPerDate={treatmentsGroup} />
                        </Box>
                    
                    ))}
                </Box>
            </Card>
        </Container>
    );
}

export default Treatments;
