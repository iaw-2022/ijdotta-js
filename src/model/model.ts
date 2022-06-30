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
    getPatientAppointments: (
        patientId: number,
        accessToken: string
    ) => Promise<Array<Appointment>>;
    cancelAppointment: (
        patientId: number,
        appointmentId: number,
        accessToken: string
    ) => Promise<boolean>;
}

class ModelImpl implements Model {
    private doctors: Array<Doctor> | undefined;
    private doctorsMap: Record<number, Doctor>;

    constructor() {
        const setDoctors = async () => {
            this.doctors = await ClinicAPI.getDoctors();
            this.doctors.forEach((doctor) => {
                this.doctorsMap[doctor.id] = doctor;
            });
        };

        this.doctorsMap = {};
        setDoctors();
    }

    getDoctor(id: number): Doctor {
        return this.doctorsMap[id];
    }

    async checkPatientExists(id: number): Promise<boolean> {
        try {
            return await ClinicAPI.checkPatientExists(id);
        } catch (error) {
            return false;
        }
    }

    async createPatient(patient: Patient): Promise<boolean> {
        try {
            return await ClinicAPI.createPatient(patient);
        } catch (error) {
            return false;
        }
    }

    async getDoctors(): Promise<Array<Doctor>> {
        try {
            if (this.doctors === undefined)
                this.doctors = await ClinicAPI.getDoctors();
            return this.doctors;
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
        patientId: number,
        accessToken: string
    ): Promise<Array<Appointment>> {
        try {
            return ClinicAPI.getPatientAppointments(patientId, accessToken);
        } catch (error) {
            return [];
        }
    }

    canCancel(appointment: Appointment): boolean {
        return dayjs().isBefore(appointment.date, "day");
    }

    async getPatientTreatments(
        patientId: number,
        accessToken: string
    ): Promise<Array<TreatmentsPerDate>> {
        try {
            return ClinicAPI.getPatientTreatments(patientId, accessToken);
        } catch (error) {
            return [];
        }
    }

    async cancelAppointment(
        patientId: number,
        appointmentId: number,
        accessToken: string
    ): Promise<boolean> {
        try {
            return await ClinicAPI.cancelAppointment(
                patientId,
                appointmentId,
                accessToken
            );
        } catch (error) {
            return false;
        }
    }

    async getPatientProfile(
        patientId: number,
        accessToken: string
    ): Promise<Patient> {
        try {
            return await ClinicAPI.getPatientProfile(patientId, accessToken);
        } catch (error) {
            return {
                id: 0,
                name: "Unknown",
                lastname: "Unknown",
                email: "Unknown",
            };
        }
    }

    async getPatientIdGivenEmail(email: string): Promise<number> {
        try {
            return ClinicAPI.getPatientIdGivenEmail(email);
        } catch (error) {
            return 0;
        }
    }
}

export default new ModelImpl();
