import { Appointment } from "../../types/appointments";
import { Box, Paper, Typography, Button } from "@mui/material";
import dateTimeFormatter from "../../utils/DateTimeFormatter";
import model from "../../model/model";
import CancelIcon from "@mui/icons-material/Cancel";
import { useState } from "react";
import ConfirmCancelDialog from './ConfirmCancelDialog'
interface Props {
    appointment: Appointment;
}

function BookedAppointment({ appointment }: Props): JSX.Element {
    const { id, date, initial_time, doctor_id } = appointment;

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleCancel = () => {};

    return (
        <Paper elevation={5}>
            <ConfirmCancelDialog open={open} handleClose={handleClose} handleCancel={handleCancel} />
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
                        <CancelIcon />
                    </Button>
                </Box>
            </Box>
        </Paper>
    );
}

export default BookedAppointment;
