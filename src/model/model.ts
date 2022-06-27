import { Doctor } from "../types/doctors";
import { Patient } from "../types/patient";
import { Appointment } from "../types/appointments";
import ClinicAPI from "./services/ClinicAPI";
import dayjs from "dayjs";
import { TreatmentsPerDate } from "../types/treatments";

interface Model {
    checkPatientExists: (id: number) => Promise<boolean>;
    createPatient: (patient: Patient) => Promise<Boolean>;
    getDoctors: () => Promise<Array<Doctor>>;
    getAppointments: (
        doctor: Doctor | undefined,
        from: Date | undefined,
        to: Date | undefined
    ) => Promise<Array<Appointment>>;
    bookAppointment: (
        patientId: number,
        appointmentId: number
    ) => Promise<Boolean>;
    getPatientAppointments: (patientId: number) => Promise<Array<Appointment>>;
}

let bool = false;

const delay = (ms: number) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
};

class ModelImpl implements Model {
    async checkPatientExists(id: number): Promise<boolean> {
        bool = !bool;
        await delay(500);
        return bool;
    }

    async createPatient(patient: Patient): Promise<boolean> {
        try {
            return await ClinicAPI.createPatient(patient)
        } catch (error) {
            return false;
        }
    }

    async getDoctors(): Promise<Array<Doctor>> {
        try {
            return await ClinicAPI.getDoctors();
        } catch (error) {
            console.error(error);
            return [];
        }
    }

    async getAppointments(
        doctor: Doctor | undefined = undefined,
        from: Date | undefined = undefined,
        to: Date | undefined = undefined
    ): Promise<Array<Appointment>> {
        try {
            return await ClinicAPI.getAppointments(doctor?.id, from, to);
        } catch (error: any) {
            console.error(error);
            return [];
        }
    }

    async bookAppointment(
        patientId: number,
        appointmentId: number
    ): Promise<boolean> {
        try {
            await ClinicAPI.bookAppointment(patientId, appointmentId);
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    }

    async getPatientAppointments(
        patientId: number
    ): Promise<Array<Appointment>> {
        await delay(2000);
        return [
            {
                id: 1,
                doctor_id: 123123,
                date: new Date(),
                initial_time: new Date(),
                end_time: new Date(),
            },
            {
                id: 23,
                doctor_id: 123123,
                date: dayjs().subtract(7, 'day').toDate(),
                initial_time: new Date(),
                end_time: new Date(),
            },
            {
                id: 55,
                doctor_id: 123123,
                date: dayjs().add(7, 'day').toDate(),
                initial_time: new Date(),
                end_time: new Date(),
            },
        ].sort((b1, a1) => a1.date.getMilliseconds() - b1.date.getMilliseconds());
    }

    canCancel(appointment: Appointment): boolean {
        return dayjs().isBefore(appointment.date, "day");
    }

    async getPatientTreatments(patientId: number): Promise<Array<TreatmentsPerDate>> {
        return [
            {
                date: new Date(),
                treatments: [
                    {title: "This is a treatment", description: "You should sleep"},
                    {title: "This is a treatment", description: "You should sleep"},
                    {title: "This is a treatment", description: "You should sleep"},
                    {title: "This is a treatment", description: "You should sleep"},
                    {title: "This is a treatment", description: "You should sleep"},
                ]
            },
            {
                date: dayjs().subtract(25, 'days').toDate(),
                treatments: [
                    {title: "This is a treatment", description: "You should sleep"},
                    {title: "This is a treatment", description: "You should sleep"},
                    {title: "This is a treatment", description: "You should sleep"},
                ]
            },
            {
                date: dayjs().subtract(3, 'months').toDate(),
                treatments: [
                    {title: "This is a treatment", description: "You should sleep"},
                    {title: "This is a treatment", description: "You should sleep"},
                    {title: "This is a treatment", description: "You should sleep"},
                ]
            },
        ];
    }
}

export default new ModelImpl();
