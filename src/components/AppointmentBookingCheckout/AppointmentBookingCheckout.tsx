import { Appointment } from "../../types/appointments";
import model from "../../model/model";
import { useState } from "react";
import {
    Button,
    CircularProgress,
    Card,
    Box,
    Paper,
    Typography,
    Grid,
} from "@mui/material";
import dateTimeFormater from "../../utils/DateTimeFormatter";

interface Props {
    handleNextClick: () => void;
    patientId: number;
    appointment: Appointment;
}

const getInfoRow = (label: string, value: string | number) => {
    return (
        <>
            <Grid item xs={6}>
                <Typography>{label}</Typography>
            </Grid>
            <Grid item xs={6}>
                <Typography>{value}</Typography>
            </Grid>
        </>
    );
};

const renderAppointmentInfo = (
    patientId: number,
    { date, initial_time, doctor_id }: Appointment
) => {
    return (
        <>
            {getInfoRow("Patient ID:", patientId)}
            {getInfoRow("Date: ", dateTimeFormater.formatDate(date))}
            {getInfoRow("Time: ", dateTimeFormater.formatTime(initial_time))}
            {getInfoRow("Doctor: ", doctor_id)}
        </>
    );
};

function AppointmentsBookingCheckout({
    patientId,
    appointment,
    handleNextClick,
}: Props): JSX.Element {
    const [isLoading, setIsLoading] = useState(false);
    const [hasConfirmed, setHasConfirmed] = useState(false);

    const onConfirmClick = async () => {
        setIsLoading(true);
        await model.bookAppointment(patientId, appointment.id);
        setIsLoading(false);
        setHasConfirmed(true);
    };

    const onCancelClick = () => {
        setHasConfirmed(true);
    };

    return (
        <Card>
            <Box
                display={"flex"}
                flexDirection="column"
                alignItems={"baseline"}
                padding="20px"
            >
                <Typography>Checkout</Typography>
                <Box display={"inline-block"} alignSelf="center" pb="20px">
                    <Paper elevation={5}>
                        <Box padding={"20px"}>
                            <Typography>
                                This is the reservation information:
                            </Typography>
                            <Grid container spacing={2}>
                                {renderAppointmentInfo(patientId, appointment)}
                                <Grid item xs={6}>
                                    <Button
                                        variant="outlined"
                                        color="success"
                                        fullWidth
                                        onClick={onConfirmClick}
                                        disabled={isLoading || hasConfirmed}
                                    >
                                        {isLoading ? (
                                            <CircularProgress />
                                        ) : (
                                            "Confirm"
                                        )}
                                    </Button>
                                </Grid>
                                <Grid item xs={6}>
                                    <Button
                                        variant="outlined"
                                        color="error"
                                        fullWidth
                                        onClick={onCancelClick}
                                        disabled={hasConfirmed}
                                    >
                                        Cancel
                                    </Button>
                                </Grid>
                            </Grid>
                        </Box>
                    </Paper>
                </Box>
                <Button
                    variant="contained"
                    disabled={isLoading || !hasConfirmed}
                    onClick={handleNextClick}
                >
                    Finish
                </Button>
            </Box>
        </Card>
    );
}

export default AppointmentsBookingCheckout;
