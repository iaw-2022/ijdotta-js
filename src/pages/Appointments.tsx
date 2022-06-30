import {
    Card,
    Box,
    Container,
    Typography,
    CircularProgress,
} from "@mui/material";
import { useEffect, useState } from "react";
import model from "../model/model";
import { Appointment } from "../types/appointments";
import { Patient } from "../types/patient";
import BookedAppointment from "../components/BookedAppointment/BookedAppointment";
import { useAuth0 } from "@auth0/auth0-react";
import HomeButton from "../components/HomeButton/HomeButton";

interface Props {
    patient: Patient;
}

function Appointments({ patient }: Props): JSX.Element {
    const [appointments, setAppointments] = useState<Array<Appointment>>([]);
    const [isLoading, setIsLoading] = useState(true);
    const { getAccessTokenSilently } = useAuth0();

    useEffect(() => {
        const getAppointments = async () => {
            const accessToken = await getAccessTokenSilently();
            const appointments = await model.getPatientAppointments(
                patient.id,
                accessToken
            );
            setAppointments(appointments);
            setIsLoading(false);
        };

        setIsLoading(true);
        getAppointments();
    }, [getAccessTokenSilently, patient.id]);

    const notifyDeletedAppointment = (id: number) => {
        setAppointments((appointments) => {
            return appointments?.filter((appointment) => appointment.id !== id)
        })
    }

    return (
        <Container sx={{ mt: "20px" }}>
            <Card sx={{ padding: "20px" }}>
                <Typography variant="h4">Booked appointments</Typography>
                <Box
                    display="flex"
                    flexDirection="column"
                    alignItems={"center"}
                    padding="20px"
                    rowGap={"10px"}
                >
                    {isLoading ? (
                        <CircularProgress />
                    ) : (
                        appointments?.map((appointment) => (
                            <Box
                                key={appointment.id}
                                maxWidth={"90%"}
                                minWidth={"50%"}
                            >
                                <BookedAppointment patientId={patient.id} appointment={appointment} notifyDeletedAppointment={notifyDeletedAppointment} />
                            </Box>
                        ))
                    )}
                </Box>
                <HomeButton />
            </Card>
        </Container>
    );
}

export default Appointments;
