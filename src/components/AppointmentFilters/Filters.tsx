import { FormikHelpers, useFormik } from "formik";
import {
    Grid,
    Button,
    TextField,
    MenuItem,
    CircularProgress,
} from "@mui/material";
import model from "../../model/model";
import { useState, useEffect } from "react";
import { Doctor } from "../../types/doctors";

interface Props {
    setDoctor: (doctor: Doctor) => void;
    setFrom: (from: Date) => void;
    setTo: (to: Date) => void;
    isLoading: boolean;
    setIsLoading: (state: boolean) => void;
}

interface Values {
    doctor: number;
    from: any;
    to: any;
}

const ANY_DOCTOR: Doctor = {
    id: 0,
    name: "Any doctor",
    lastname: "",
};

function Filters({ setTo, setFrom, setDoctor, isLoading, setIsLoading }: Props): JSX.Element {
    const [doctors, setDoctors] = useState<Array<Doctor>>([ANY_DOCTOR]);

    useEffect(() => {
        getDoctors();
    }, []);

    const getDoctors = async () => {
        setIsLoading(true)
        const doctors = await model.getDoctors();
        setDoctors([ANY_DOCTOR, ...doctors]);
        setIsLoading(false)
    };

    const initialValues = {
        doctor: ANY_DOCTOR.id,
        from: new Date(),
        to: new Date(),
    };

    const onSubmit = (
        values: Values,
        { setSubmitting }: FormikHelpers<Values>
    ) => {
        const doctor = doctors.find((doc) => doc.id === values.doctor);
        if (doctor) setDoctor(doctor);
        values.from && setFrom(values.from);
        values.to && setTo(values.to);
        setSubmitting(false);
    };

    const formik = useFormik({
        initialValues,
        onSubmit,
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={2} justifyContent="flex-end">
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <TextField
                        id="doctor"
                        name="doctor"
                        label="Doctor"
                        value={formik.values.doctor}
                        onChange={formik.handleChange}
                        select
                        fullWidth
                    >
                        {doctors.map((option) => (
                            <MenuItem key={option.id} value={option.id}>
                                {`${option.name} ${option.lastname}`}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <TextField
                        id="from"
                        name="from"
                        type="date"
                        label="From"
                        value={formik.values.from}
                        onChange={formik.handleChange}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <TextField
                        id="to"
                        name="to"
                        type="date"
                        label="To"
                        value={formik.values.to}
                        onChange={formik.handleChange}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <Button variant="outlined" type="submit" fullWidth>
                        {isLoading ? <CircularProgress /> : "Apply filters"}
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
}

export default Filters;
