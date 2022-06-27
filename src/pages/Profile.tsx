import { Container, Card, Box, Typography, Grid } from "@mui/material";
import { Patient } from "../types/patient";

interface Props {
    patient: Patient;
}

const getGridItems = (label: string, value: string | number) => {
    return (
        <>
            <Grid item xs={12} sm={6}>
                <Typography variant="overline">{label}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
                <Typography>{value}</Typography>
            </Grid>
        </>
    );
};

function Profile({ patient }: Props): JSX.Element {
    const { name, lastname, email, healthInsuranceCompany, healthInsuranceId } =
        patient;
    return (
        <Container sx={{}}>
            <Card sx={{margin: "20px"}}>
                <Grid container spacing={1} padding={"20px"}>
                    {getGridItems("Name", name)}
                    {getGridItems("Lastname", lastname)}
                    {getGridItems(
                        "Health Inurance Company",
                        healthInsuranceCompany || "Not provided"
                    )}
                    {getGridItems(
                        "Health Insurance ID",
                        healthInsuranceId || "Not provided"
                    )}
                    {getGridItems("Email", email)}
                </Grid>
            </Card>
        </Container>
    );
}

export default Profile;
