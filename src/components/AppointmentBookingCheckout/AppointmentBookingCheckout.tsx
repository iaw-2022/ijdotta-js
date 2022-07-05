import { Appointment } from "../../types/appointments";
import model from "../../model/model";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Button,
    CircularProgress,
    Card,
    Box,
    Paper,
    Typography,
    Grid,
    Alert,
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
                <Typography variant="overline">{label}</Typography>
            </Grid>
            <Grid item xs={6}>
                <Typography>{value}</Typography>
            </Grid>
        </>
    );
};

const renderAppointmentInfo = (
    patientId: number,
    { date, initial_time, doctor_id }: Appointment,
) => {

    const {name, lastname} = model.getDoctor(doctor_id) || {name: "Unknown", lastname: ""};

    return (
        <>
            {getInfoRow("Patient ID:", patientId)}
            {getInfoRow("Date: ", dateTimeFormater.formatDate(date))}
            {getInfoRow("Time: ", dateTimeFormater.formatTime(initial_time))}
            {getInfoRow("Doctor: ", `${name} ${lastname}`)}
        </>
    );
};

function AppointmentsBookingCheckout({
    patientId,
    appointment,
}: Props): JSX.Element {
    const [isLoading, setIsLoading] = useState(false);
    const [hasConfirmed, setHasConfirmed] = useState(false);
    const [hasCancelled, setHasCancelled] = useState(false);
    const [success, setSuccess] = useState(false);

    const onConfirmClick = async () => {
        setIsLoading(true);
        const result = await model.bookAppointment(patientId, appointment.id);
        setSuccess(result);
        setIsLoading(false);
        setHasConfirmed(true);
    };

    const onCancelClick = () => {
        setHasCancelled(true);
    };

    const navigate = useNavigate();
    const onFinishClick = () => {
        navigate('/', {replace: true})
    }

    return (
        <Card>
            <Box
                display={"flex"}
                flexDirection="column"
                alignItems={"baseline"}
                padding="20px"
            >
                <Typography variant="h5">Checkout</Typography>
                <Box display={"inline-block"} alignSelf="center" my="20px">
                    <Paper elevation={5}>
                        {hasConfirmed && success && (
                            <Alert severity="success">
                                Appointment successfully booked.
                            </Alert>
                        )}
                        {hasConfirmed && !success && (
                            <Alert severity="error">
                                An error has occured. Try again later.
                            </Alert>
                        )}
                        {hasCancelled && (
                            <Alert severity="warning">
                                Appointment was not booked.
                            </Alert>
                        )}

                        <Box padding={"20px"} display="flex" flexDirection={"column"} rowGap={"20px"}>
                            <Typography variant="h6">
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
                                        disabled={isLoading || hasConfirmed || hasCancelled}
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
                                        disabled={hasConfirmed || hasCancelled}
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
                    disabled={isLoading || !(hasConfirmed || hasCancelled)}
                    onClick={onFinishClick}
                >
                    Finish
                </Button>
            </Box>
        </Card>
    );
}

export default AppointmentsBookingCheckout;
