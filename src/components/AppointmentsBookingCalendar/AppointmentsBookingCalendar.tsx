import { ChangeEvent, useEffect, useState } from "react";
import Filters from "../AppointmentFilters/Filters";
import model from "../../model/model";
import { Doctor } from "../../types/doctors";
import { Appointment } from "../../types/appointments";
import {
    TextField,
    Button,
    MenuItem,
    Card,
    Box,
} from "@mui/material";
import dateTimeFormatter from '../../utils/DateTimeFormatter'

interface Props {
    handleNextClick: () => void;
    setAppointment: (appointment: Appointment) => void
}

const NONE_APPOINTMENT: Appointment = {
    id: 0,
    doctor_id: 0,
    date: new Date(),
    initial_time: new Date(),
    end_time: new Date(),
};

const getSelectLabel = ({ id, date, initial_time, doctor_id }: Appointment) => {
    const safeDate = new Date(date);
    const safeTime = new Date(initial_time);
    return id === 0
        ? `Select an appointment`
        : `${dateTimeFormatter.formatDate(safeDate)}, ${dateTimeFormatter.formatTime(safeTime)}, ${doctor_id}.`;
}

function AppointmentsBookingCalendar({ handleNextClick, setAppointment }: Props): JSX.Element {
    const [isLoading, setIsLoading] = useState(false);

    const [doctor, setDoctor] = useState<Doctor>();
    const [from, setFrom] = useState(new Date());
    const [to, setTo] = useState(new Date());
    const [appointments, setAppointments] = useState<Array<Appointment>>([
        NONE_APPOINTMENT,
    ]);

    const [selectedAppointment, setSelectedAppointment] =
        useState<Appointment>(NONE_APPOINTMENT);

    useEffect(() => {
        setIsLoading(true);
        model.getAppointments(doctor, from, to).then((appointments) => {
            console.log(appointments)
            setAppointments([...appointments, NONE_APPOINTMENT]);
            setIsLoading(false);
        });
    }, [doctor, from, to]);

    const handleAppointmentSelect = ({
        target,
    }: ChangeEvent<HTMLInputElement>) => {
        const targetId = Number(target.value);
        setSelectedAppointment(
            appointments.find(({ id }) => id - targetId === 0) || NONE_APPOINTMENT
        );
    };

    const filtersProps = {
        setDoctor,
        setFrom,
        setTo,
        setIsLoading,
        isLoading,
    };

    const handleContinueClick = () => {
        setAppointment(selectedAppointment)
        handleNextClick()
    }

    return (
        <Card>
            <Box
                margin={"40px"}
                display="flex"
                flexDirection={"column"}
                justifyContent="space-between"
                alignItems={"stretch"}
            >
                <Box pb="20px">
                    <Filters {...filtersProps}></Filters>
                </Box>
                <Box pb="20px">
                    <TextField
                        select
                        id="appointment"
                        name="appointment"
                        label="Select an appointment"
                        value={selectedAppointment.id}
                        onChange={handleAppointmentSelect}
                        fullWidth
                    >
                        {appointments.map((appointment) => (
                            <MenuItem
                                key={appointment.id}
                                value={appointment.id}
                            >
                                {getSelectLabel(appointment)}
                            </MenuItem>
                        ))}
                    </TextField>
                </Box>
                <Button
                    variant="contained"
                    onClick={handleContinueClick}
                    disabled={isLoading || selectedAppointment === NONE_APPOINTMENT}
                >
                    {"Continue"}
                </Button>
            </Box>
        </Card>
    );
}

export default AppointmentsBookingCalendar;
