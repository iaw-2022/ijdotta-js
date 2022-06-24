interface Model {
    checkPatientExists: (id: bigint) => Promise<boolean>
}

let bool = false;

class ModelImpl implements Model {

    async checkPatientExists(id: bigint): Promise<boolean> {
        bool = !bool;
        return bool;
    }
    

}

export default new ModelImpl();
