import { useAuth0 } from "@auth0/auth0-react";
import {
    Container,
    Card,
    Button,
    Typography,
    Grid,
    Alert,
    CircularProgress,
} from "@mui/material";
import { Link } from "react-router-dom";
import LoginButton from "../components/LoginButton/LoginButton";
import styled from "@emotion/styled";
import LogoutButton from "../components/LogoutButton/LogoutButton";
import { Patient } from "../types/patient";

const StyledLink = styled(Link)`
    color: White;
    text-decoration: None;
    width: 100%;
    height: 100%;
    display: contents;
`;

interface Props {
    links: Record<string, string>[];
    protectedLinks: Record<string, string>[];
    patientExists: boolean;
    patient: Patient;
    isLoadingPatient: boolean;
}

function Home({
    links,
    protectedLinks,
    patientExists,
    patient,
    isLoadingPatient,
}: Props): JSX.Element {
    const { isAuthenticated, user } = useAuth0();

    return (
        <Container sx={{ padding: "20px" }}>
            <Card sx={{ padding: "20px" }}>
                <Typography variant="h3">
                    Welcome
                    {isAuthenticated && patientExists && `, ${patient.name}`}
                </Typography>
                <Grid container padding="20px" spacing={2}>
                    <Grid
                        item
                        xs={12}
                        md={6}
                        display="flex"
                        flexDirection={"column"}
                        alignItems="stretch"
                        rowGap="20px"
                        width={"50%"}
                        padding="2%"
                    >
                        <Typography variant="h6">
                            You can book an appointment
                        </Typography>
                        {links.map(({ label, link }) => {
                            return (
                                <StyledLink key={link} to={link}>
                                    <Button variant="contained" fullWidth>
                                        {label}
                                    </Button>
                                </StyledLink>
                            );
                        })}
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        md={6}
                        display="flex"
                        rowGap="20px"
                        flexDirection={"column"}
                        width={"50%"}
                        padding="2%"
                    >
                        <Typography variant="h6">
                            {isAuthenticated
                                ? "Or manage personal data"
                                : "Or log in to manage personal data"}
                        </Typography>
                        {isLoadingPatient ? (
                            <CircularProgress />
                        ) : isAuthenticated &&
                          user?.email_verified &&
                          patientExists ? (
                            protectedLinks.map(({ label, link }) => {
                                return (
                                    <StyledLink key={link} to={link}>
                                        <Button variant="contained" fullWidth>
                                            {label}
                                        </Button>
                                    </StyledLink>
                                );
                            })
                        ) : isAuthenticated && !user?.email_verified ? (
                            <Alert severity="warning">
                                <Typography>
                                    Remember to verify your email.
                                </Typography>
                            </Alert>
                        ) : isAuthenticated && !patientExists ? (
                            <Alert severity="warning">
                                <Typography>
                                    First you need to book an appointment to get
                                    yor patient profile created.
                                </Typography>
                            </Alert>
                        ) : (
                            <LoginButton />
                        )}
                        <LogoutButton />
                    </Grid>
                </Grid>
            </Card>
        </Container>
    );
}

export default Home;
