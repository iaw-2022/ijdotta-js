import axios, { AxiosError, AxiosRequestConfig } from "axios";
import CONFIG from "../../config";
import { Appointment } from "../../types/appointments";
import { Doctor } from "../../types/doctors";
import { Patient } from "../../types/patient";
import { TreatmentsPerDate } from "../../types/treatments";

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

const getAuthHeaders = (accessToken: string) => {
    return {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    };
};

class ClinicService {
    async checkPatientExists(id: number): Promise<boolean> {
        try {
            const url = `/patients/${id}/exists`;
            const response = await APIClient.get(url);
            const { exists }: { exists: boolean } = response.data;
            return exists;
        } catch (error: any) {
            throw buildError(error);
        }
    }

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
        console.log("has reached ClinicAPI.createPatient");

        try {
            const response = await APIClient.post(url, patient);
            return response.data;
        } catch (error: any) {
            throw buildError(error);
        }
    }

    async cancelAppointment(
        appointment_id: number,
        accessToken: string
    ): Promise<boolean> {
        const url = `/appointments/${appointment_id}`;
        const config: AxiosRequestConfig = {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        };

        try {
            await APIClient.delete(url, config);
            return true;
        } catch (error: any) {
            throw buildError(error);
        }
    }

    async getPatientAppointments(
        patient_id: number,
        accessToken: string
    ): Promise<Array<Appointment>> {
        const url = `/patients/${patient_id}/appointments`;
        const config: AxiosRequestConfig = {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        };

        try {
            const response = await APIClient.get(url, config);
            console.log(response.data);
            return response.data;
        } catch (error: any) {
            throw buildError(error);
        }
    }

    async getPatientTreatments(
        patient_id: number,
        accessToken: string
    ): Promise<Array<TreatmentsPerDate>> {
        const url = `/patients/${patient_id}/treatments`;
        const config: AxiosRequestConfig = {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        };

        try {
            const response = await APIClient.get(url, config);
            return response.data;
        } catch (error: any) {
            throw buildError(error);
        }
    }

    async getPatientProfile(
        patient_id: number,
        accessToken: string
    ): Promise<Patient> {
        const url = `/patients/${patient_id}`;
        const config: AxiosRequestConfig = {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        };

        try {
            const response = await APIClient.get(url, config);
            const data = response.data;
            const patient: Patient = {
                healthInsuranceCompany: data.health_insurance_company,
                healthInsuranceId: data.health_insurance_id,
                ...data,
            };
            return patient;
        } catch (error: any) {
            throw buildError(error);
        }
    }

    async getPatientIdGivenEmail(email: string): Promise<number> {
        try {
            const url = `/patients/${email}/id`;
            const response = await APIClient.get(url);
            const { id }: { id: number } = response.data;
            return id;
        } catch (error: any) {
            throw buildError(error);
        }
    }
}

export default new ClinicService();
