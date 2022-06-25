import { Doctor } from "../types/doctors";
import { Patient } from "../types/patient";
import { Appointment } from "../types/appointments";

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
        return [
            {
                id: 123123,
                name: "Julius",
                lastname: "Hibbert",
            },
            {
                id: 969696,
                name: "Pedro",
                lastname: "Picapiedra",
            },

            {
                id: 125467,
                name: "Nick",
                lastname: "Riviera",
            },
        ];
    }

    async getAppointments(
        doctor: Doctor | undefined = undefined,
        from: Date | undefined = undefined,
        to: Date | undefined = undefined
    ): Promise<Array<Appointment>> {
        await delay(2000)
        return [
            {
                id: 1,
                doctor_id: 123123,
                date: new Date(),
                initial_time: new Date(),
                end_time: new Date(),
            },
        ];
    }

    async bookAppointment(patientId: number, appointmentId: number): Promise<Boolean> {
        await delay(2000)
        return true
    }
}

export default new ModelImpl();
