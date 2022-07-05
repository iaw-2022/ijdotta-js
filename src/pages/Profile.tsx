import { Container, Card, Typography, Grid } from "@mui/material";
import HomeButton from "../components/HomeButton/HomeButton";
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
    const { id, name, lastname, email, healthInsuranceCompany, healthInsuranceId } : Patient =
        patient;

    return (
        <Container sx={{}}>
            <Card sx={{padding: "20px", margin: "20px"}}>
                <Grid container spacing={1} padding={"20px"}>
                    {getGridItems("ID", id)}
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
                <HomeButton />
            </Card>
        </Container>
    );
}

export default Profile;
