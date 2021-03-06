import {
    Grid,
    Button,
    Card,
    TextField,
    CircularProgress,
    Alert,
    Box
} from "@mui/material";
import { useState } from "react";
import { Patient } from "../../types/patient";
import model from "../../model/model";
import { FormikHelpers, useFormik } from "formik";
import * as yup from "yup";

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
    setPatientId: (id: number) => void;
    setPatientExists: (exists: boolean) => void;
}

interface Values {
    id: number;
    name: string;
    lastname: string;
    email: string;
    healthInsuranceCompany: string;
    healthInsuranceId: string;
}

yup.setLocale({
    number: {
        integer: "Must be a number",
    },
});

const validationSchema = yup.object({
    id: yup.number().required().positive(),
    name: yup.string().required(),
    lastname: yup.string().required(),
    email: yup.string().email().required(),
});

function CreatePatientForm({
    patientId,
    setPatientId,
    handleNextClick,
    setPatientExists
}: Props): JSX.Element {
    const [isLoading, setIsLoading] = useState(false);
    const [success, setSuccess] = useState(true);
    const [hasSubmitted, setHasSubmitted] = useState(false);

    const initialValues: Values = {
        id: isNaN(patientId) ? 0 : patientId,
        name: "",
        lastname: "",
        email: "",
        healthInsuranceCompany: "",
        healthInsuranceId: "",
    };

    const handleSubmit = async (patient: Patient) => {
        setHasSubmitted(true);
        if (await model.createPatient(patient)) {
            setPatientId(patient.id);
            setPatientExists(true)
            setSuccess(true);

            handleNextClick();
        } else {
            setSuccess(false);
        }
        setIsLoading(false);
    };

    const onSubmit = async (
        values: Values,
        { setSubmitting }: FormikHelpers<Values>
    ) => {
        setIsLoading(true);
        await handleSubmit(values);
        setSubmitting(false);
    };

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit,
    });

    return (
        <Card sx={{ padding: "40px" }}>
            <Box mb={"10px"}>
                {hasSubmitted && success && (
                    <Alert>Patient successfully created.</Alert>
                )}
                {hasSubmitted && !success && (
                    <Alert severity="error">
                        An error occured while creating the patient. Please try
                        again later.
                    </Alert>
                )}
            </Box>

            <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={4}>
                    {GridItem(
                        <TextField
                            id="id"
                            required
                            label="ID"
                            value={formik.values.id}
                            onChange={formik.handleChange}
                            error={
                                formik.touched.id && Boolean(formik.errors.id)
                            }
                            helperText={formik.touched.id && formik.errors.id}
                            fullWidth
                        />
                    )}
                    {GridItem(
                        <TextField
                            id="name"
                            required
                            label="Name"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            error={
                                formik.touched.name &&
                                Boolean(formik.errors.name)
                            }
                            helperText={
                                formik.touched.name && formik.errors.name
                            }
                            fullWidth
                        />
                    )}
                    {GridItem(
                        <TextField
                            id="lastname"
                            required
                            label="Lastname"
                            value={formik.values.lastname}
                            onChange={formik.handleChange}
                            error={
                                formik.touched.lastname &&
                                Boolean(formik.errors.lastname)
                            }
                            helperText={
                                formik.touched.lastname &&
                                formik.errors.lastname
                            }
                            fullWidth
                        />
                    )}
                    {GridItem(
                        <TextField
                            id="email"
                            required
                            label="Email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            error={
                                formik.touched.email &&
                                Boolean(formik.errors.email)
                            }
                            helperText={
                                formik.touched.email && formik.errors.email
                            }
                            fullWidth
                        />
                    )}
                    {GridItem(
                        <TextField
                            id="healthInsuranceCompany"
                            label="Health Insurance Company"
                            value={formik.values.healthInsuranceCompany}
                            onChange={formik.handleChange}
                            error={
                                formik.touched.healthInsuranceCompany &&
                                Boolean(formik.errors.healthInsuranceCompany)
                            }
                            helperText={
                                formik.touched.healthInsuranceCompany &&
                                formik.errors.healthInsuranceCompany
                            }
                            fullWidth
                        />
                    )}
                    {GridItem(
                        <TextField
                            id="healthInsuranceId"
                            label="Health Insurance ID"
                            value={formik.values.healthInsuranceId}
                            onChange={formik.handleChange}
                            error={
                                formik.touched.healthInsuranceId &&
                                Boolean(formik.errors.healthInsuranceId)
                            }
                            helperText={
                                formik.touched.healthInsuranceId &&
                                formik.errors.healthInsuranceId
                            }
                            fullWidth
                        />
                    )}
                    {GridItem(
                        <Button fullWidth variant="contained" type="submit">
                            {isLoading ? <CircularProgress /> : "Submit"}
                        </Button>
                    )}
                </Grid>
            </form>
        </Card>
    );
}

export default CreatePatientForm;
