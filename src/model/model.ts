import { Doctor } from "../types/doctors";
import { Patient } from "../types/patient";
import { Appointment } from "../types/appointments";
import ClinicAPI from './services/ClinicAPI'

interface Model {
    checkPatientExists: (id: number) => Promise<boolean>;
    createPatient: (patient: Patient) => Promise<Boolean>;
    getDoctors: () => Promise<Array<Doctor>>;
    getAppointments: (
        doctor: Doctor | undefined,
        from: Date | undefined,
        to: Date | undefined
    ) => Promise<Array<Appointment>>;
    bookAppointment: (patientId: number, appointmentId: number) => Promise<Boolean>;

}

let bool = false;

const delay = (ms: number) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
};

class ModelImpl implements Model {
    async checkPatientExists(id: number): Promise<boolean> {
        bool = !bool;
        await delay(5000);
        return bool;
    }

    async createPatient(patient: Patient): Promise<boolean> {
        return true;
    }

    async getDoctors(): Promise<Array<Doctor>> {
        try {
            return await ClinicAPI.getDoctors();
        } catch (error) {
            console.error(error)
            return []
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

    async bookAppointment(patientId: number, appointmentId: number): Promise<boolean> {
        try {
            await ClinicAPI.bookAppointment(patientId, appointmentId);
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    }
}

export default new ModelImpl();
