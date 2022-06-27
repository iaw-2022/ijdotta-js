import { Card, Button, Box, Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import model from "../model/model";
import { Appointment } from "../types/appointments";
import { Patient } from "../types/patient";
import BookedAppointment from "../components/BookedAppointment/BookedAppointment";

interface Props {
    patient: Patient;
}

function Appointments({ patient }: Props): JSX.Element {
    const [appointments, setAppointments] = useState<Array<Appointment>>();

    useEffect(() => {
        model
            .getPatientAppointments(patient.id)
            .then((appointments) => setAppointments(appointments))
            .catch();
    }, [patient.id]);

    return (
        <Container sx={{mt: "20px"}}>
            <Card sx={{}}>
                <Typography>Booked appointments</Typography>
                <Box
                    display="flex"
                    flexDirection="column"
                    alignItems={"center"}
                    padding="20px"
                    rowGap={"10px"}
                >
                    {appointments?.map((appointment) => (
                        <Box maxWidth={"90%"} minWidth={"50%"}>
                            <BookedAppointment appointment={appointment} />
                        </Box>
                    
                    ))}
                </Box>
            </Card>
        </Container>
    );
}

export default Appointments;
