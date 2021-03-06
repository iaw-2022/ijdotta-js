import {
    Card,
    Box,
    Container,
    Typography,
    CircularProgress,
} from "@mui/material";
import { useEffect, useState } from "react";
import model from "../model/model";
import { Patient } from "../types/patient";
import { TreatmentsPerDate } from "../types/treatments";
import TreatmentsGroup from "../components/TreatmentsGroup/TreatmentsGroup";
import { useAuth0 } from "@auth0/auth0-react";
import HomeButton from "../components/HomeButton/HomeButton";

interface Props {
    patient: Patient;
}

function Treatments({ patient }: Props): JSX.Element {
    const [treatmentsPerDate, setTreatmentsPerDate] =
        useState<Array<TreatmentsPerDate>>();
    const [isLoading, setIsLoading] = useState(true);
    const { getAccessTokenSilently } = useAuth0();

    useEffect(() => {
        const getTreatments = async () => {
            const accessToken = await getAccessTokenSilently();
            const treatments = await model.getPatientTreatments(
                patient.id,
                accessToken
            );
            setTreatmentsPerDate(treatments);
            setIsLoading(false);
        };
        setIsLoading(true);
        getTreatments();
    }, [getAccessTokenSilently, patient.id]);

    return (
        <Container sx={{ mt: "20px" }}>
            <Card sx={{ padding: "20px" }}>
                <Typography variant="h4">
                    Historial of assigned treatments
                </Typography>
                <Box
                    display="flex"
                    flexDirection="column"
                    alignItems={"center"}
                    padding="20px"
                    rowGap={"10px"}
                >
                    {isLoading ? (
                        <CircularProgress />
                    ) : (treatmentsPerDate?.length || 0) > 0 ? (
                        treatmentsPerDate?.map((treatmentsGroup) => (
                            <Box maxWidth={"100%"} minWidth={"70%"}>
                                <TreatmentsGroup
                                    key={new Date(
                                        treatmentsGroup.date
                                    ).toISOString()}
                                    treatmentsPerDate={treatmentsGroup}
                                />
                            </Box>
                        ))
                    ) : (
                        <Typography variant="caption">
                            You have no assigned treatments yet.
                        </Typography>
                    )}
                </Box>
                <HomeButton />
            </Card>
        </Container>
    );
}

export default Treatments;
