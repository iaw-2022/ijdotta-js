import { Patient } from '../types/patient'

interface Model {
    checkPatientExists: (id: number) => Promise<boolean>
    createPatient: (patient: Patient) => Promise<Boolean>
}

let bool = false;

const delay = (ms: number) => { return new Promise(resolve => setTimeout(resolve, ms)) }

class ModelImpl implements Model {

    async checkPatientExists(id: number): Promise<boolean> {
        bool = !bool;
        await delay(5000)
        return bool;
    }
    
    async createPatient(patient: Patient): Promise<boolean> {
        return true;
    }
}

export default new ModelImpl();
