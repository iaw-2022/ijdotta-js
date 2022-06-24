import { Grid, Button, Card, TextField } from "@mui/material";
import { ChangeEvent, FormEventHandler, useState } from "react";
import { Patient } from "../../types/patient";
import model from "../../model/model";

const GridItem = (content: JSX.Element) => {
    return (
        <Grid item xs={12} md={6} lg={4}>
            {content}
        </Grid>
    );
};

interface Props {
    patientId: number;
    handleNextClick: () => void;
}

const handleChangeWrapper = (
    stateSetter: React.Dispatch<React.SetStateAction<string>>
) => {
    return ({ target }: ChangeEvent<HTMLInputElement>) => {
        stateSetter(target.value);
    };
};

function CreatePatientForm({ patientId, handleNextClick }: Props): JSX.Element {
    const [isLoading, setIsLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [id, setId] = useState(patientId);
    const [name, setName] = useState("");
    const [lastname, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [healthInsuranceCompany, setHealthInsuranceCompany] = useState("");
    const [healthInsuranceId, setHealthInsuranceId] = useState("");

    const handleIdChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
        setId(Number(target.value));
    };

    const handleSubmitClick = async () => {
        setIsLoading(true);

        const patient: Patient = {
            id,
            name,
            lastname,
            email,
            healthInsuranceCompany,
            healthInsuranceId,
        };

        const success = await model.createPatient(patient);
        setIsLoading(false);
        if (success) handleNextClick();
    };

    return (
        <Card sx={{ padding: "40px" }}>
            <form>
                <Grid container spacing={4}>
                    {GridItem(
                        <TextField
                            id="id"
                            required
                            label="Id"
                            value={id}
                            onChange={handleIdChange}
                            helperText="Your ID"
                            fullWidth
                        />
                    )}
                    {GridItem(
                        <TextField
                            id="name"
                            required
                            label="Name"
                            value={name}
                            onChange={handleChangeWrapper(setName)}
                            helperText="Enter your name"
                            fullWidth
                        />
                    )}
                    {GridItem(
                        <TextField
                            id="lastname"
                            required
                            label="Lastname"
                            value={lastname}
                            onChange={handleChangeWrapper(setLastName)}
                            helperText="Enter your lastname"
                            fullWidth
                        />
                    )}
                    {GridItem(
                        <TextField
                            id="email"
                            required
                            type={"email"}
                            label="Email"
                            value={email}
                            onChange={handleChangeWrapper(setEmail)}
                            helperText="Enter your lastname"
                            fullWidth
                        />
                    )}
                    {GridItem(
                        <TextField
                            id="healthInsuranceCompany"
                            label="Health Insurance Company"
                            value={healthInsuranceCompany}
                            onChange={handleChangeWrapper(
                                setHealthInsuranceCompany
                            )}
                            helperText="Enter ..."
                            fullWidth
                        />
                    )}
                    {GridItem(
                        <TextField
                            id="healthInsuranceId"
                            label="Health Insurance ID"
                            value={healthInsuranceId}
                            onChange={handleChangeWrapper(setHealthInsuranceId)}
                            helperText="Enter your ... ID"
                            fullWidth
                        />
                    )}
                    {GridItem(
                        <Button type="submit" onClick={handleSubmitClick}>
                            Submit
                        </Button>
                    )}
                </Grid>
            </form>
        </Card>
    );
}

export default CreatePatientForm;
