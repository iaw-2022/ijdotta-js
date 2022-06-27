import { Container } from "@mui/material";
import PatientLookUp from "../components/PatientLookUp/PatientLookUp";
import CreatePatientForm from "../components/CreatePatientForm/CreatePatientForm";
import AppointmentsBookingCalendar from "../components/AppointmentsBookingCalendar/AppointmentsBookingCalendar";
import AppointmentsBookingCheckout from "../components/AppointmentBookingCheckout/AppointmentBookingCheckout";
import { useState } from "react";
import { Appointment } from "../types/appointments";

const NONE_APPOINTMENT: Appointment = {
    id: 0,
    doctor_id: 0,
    date: new Date(),
    initial_time: new Date(),
    end_time: new Date(),
};

function Booking(): JSX.Element {
    const [patientId, setPatientId] = useState<number>(NaN);
    const [appointment, setAppointment] =
        useState<Appointment>(NONE_APPOINTMENT);
    const [step, setStep] = useState(0);

    const handleNextClick = () => {
        step === 0 && !isNaN(patientId)
            ? setStep((prevStep) => prevStep + 2)
            : setStep((prevStep) => prevStep + 1);
    };

    const patientLookUpProps = {
        handleNextClick,
        submitPatientId: (id: number) => {
            setPatientId(id);
        },
    };

    const createPatientFormProps = {
        patientId,
        handleNextClick,
    };

    const appointmentBookingCalendarProps = {
        handleNextClick,
        setAppointment,
    };

    const appointmentBookingCheckoutProps = {
        patientId,
        appointment: appointment,
        handleNextClick,
    };

    return (
        <Container sx={{}}>
            {step === 0 && <PatientLookUp {...patientLookUpProps} />}
            {step === 1 && <CreatePatientForm {...createPatientFormProps} />}
            {step === 2 && (
                <AppointmentsBookingCalendar
                    {...appointmentBookingCalendarProps}
                />
            )}
            {step === 3 && (
                <AppointmentsBookingCheckout
                    {...appointmentBookingCheckoutProps}
                />
            )}
        </Container>
    );
}

export default Booking;
