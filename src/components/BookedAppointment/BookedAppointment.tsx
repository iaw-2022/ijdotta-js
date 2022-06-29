import { Appointment } from "../../types/appointments";
import {
    Box,
    Paper,
    Typography,
    Button,
    CircularProgress,
} from "@mui/material";
import dateTimeFormatter from "../../utils/DateTimeFormatter";
import model from "../../model/model";
import CancelIcon from "@mui/icons-material/Cancel";
import { useState } from "react";
import ConfirmCancelDialog from "./ConfirmCancelDialog";
import { useAuth0 } from "@auth0/auth0-react";
interface Props {
    appointment: Appointment;
}

function BookedAppointment({ appointment }: Props): JSX.Element {
    const { id, date, initial_time, doctor_id } = appointment;

    const { getAccessTokenSilently } = useAuth0();

    const [open, setOpen] = useState(false);
    const [isCancelling, setIsCancelling] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleCancel = async () => {
        setIsCancelling(true);
        const accessToken = await getAccessTokenSilently();
        await model.cancelAppointment(id, accessToken);
        setIsCancelling(false);
    };

    return (
        <Paper elevation={5}>
            <ConfirmCancelDialog
                open={open}
                handleClose={handleClose}
                handleCancel={handleCancel}
                isCancelling={isCancelling}
            />
            <Box display="flex" flexDirection="row" borderColor={"green"}>
                <Box
                    display={"flex"}
                    flexDirection="row"
                    flexWrap={"wrap"}
                    columnGap={"50px"}
                    width={"70%"}
                    padding="10px"
                >
                    <Typography>
                        {dateTimeFormatter.formatDate(date)}
                    </Typography>
                    <Typography>
                        {dateTimeFormatter.formatTime(initial_time)}
                    </Typography>
                    <Typography>{doctor_id}</Typography>
                </Box>
                <Box
                    display={"flex"}
                    alignItems={"center"}
                    justifyContent="flex-end"
                >
                    <Button
                        variant="contained"
                        color="error"
                        disabled={!model.canCancel(appointment)}
                        onClick={handleClickOpen}
                    >
                        {isCancelling ? <CircularProgress /> : <CancelIcon />}
                    </Button>
                </Box>
            </Box>
        </Paper>
    );
}

export default BookedAppointment;
