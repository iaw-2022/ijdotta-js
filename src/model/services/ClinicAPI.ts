import axios, { AxiosError } from "axios";
import CONFIG from "../../config";
import { Appointment } from "../../types/appointments";
import { Doctor } from "../../types/doctors";
import { Patient } from "../../types/patient";

const APIClient = axios.create({
    baseURL: CONFIG.SERVICES.CLINIC_API.BASE_URL,
});

const END_POINTS = {
    DOCTORS: "/doctors",
};

interface ClinicAPIError {
    errorCode: string;
    error: string;
}

const buildError = (error: AxiosError) => {
    const data = error.response?.data as ClinicAPIError;
    return new Error(data.error);
};

class ClinicService {
    async getDoctors(): Promise<Array<Doctor>> {
        try {
            const response = await APIClient.get(END_POINTS.DOCTORS);
            return response.data;
        } catch (error) {
            return [];
        }
    }

    async getAppointments(
        doctor_id: number | undefined,
        from: Date | undefined,
        to: Date | undefined
    ): Promise<Array<Appointment>> {
        const url = `/appointments`;

        const params: any = { free: true };
        doctor_id && (params.doctor_id = doctor_id);
        from && (params.from = from);
        to && (params.to = to);

        console.log("params: ");
        console.log(params);

        try {
            const response = await APIClient.get(url, { params });
            console.log(response.data);
            return response.data;
        } catch (error: any) {
            throw buildError(error);
        }
    }

    async bookAppointment(
        patient_id: number,
        id: number
    ): Promise<Appointment> {
        const url = `/appointments/${id}`;

        const data = {
            patient_id: patient_id,
        };

        try {
            const response = await APIClient.put(url, data);
            return response.data;
        } catch (error: any) {
            throw buildError(error);
        }
    }

    async createPatient(patient: Patient): Promise<boolean> {
        const url = `/patients`;
        console.log('has reached ClinicAPI.createPatient')

        try {
            const response = await APIClient.post(url, patient);
            return response.data;
        } catch (error: any) {
            throw buildError(error);
        }
    }
}

export default new ClinicService();
