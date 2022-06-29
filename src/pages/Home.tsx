import { useAuth0 } from "@auth0/auth0-react";
import { Container, Card, Button, Typography, Grid, Alert } from "@mui/material";
import { Link } from "react-router-dom";
import LoginButton from "../components/LoginButton/LoginButton";
import styled from "@emotion/styled";
import LogoutButton from "../components/LogoutButton/LogoutButton";
import { useState } from "react";

const StyledLink = styled(Link)`
    color: White;
    text-decoration: None;
    width: 100%;
    height: 100%;
`;

interface Props {
    links: Record<string, string>[];
    protectedLinks: Record<string, string>[];
}

function Home({ links, protectedLinks }: Props): JSX.Element {
    const { isAuthenticated, user } = useAuth0();

    const [hasClickedLogin, setHasClickedLogin] = useState(false);

    const handleLogin = () => {
        setHasClickedLogin(true)
    }

    return (
        <Container sx={{ padding: "20px" }}>
            <Card sx={{ padding: "20px" }}>
                <Typography variant="h3">
                    Welcome{isAuthenticated && ", " + user?.name}
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
                                    <Button
                                        variant="contained"
                                        fullWidth
                                    >
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
                        {isAuthenticated && user?.email_verified ? (
                            protectedLinks.map(({ label, link }) => {
                                return (
                                    <StyledLink key={link} to={link}>
                                        <Button
                                            variant="contained"
                                            fullWidth
                                        >
                                            {label}
                                        </Button>
                                    </StyledLink>
                                );
                            })
                        ) : isAuthenticated ? (
                            <Alert severity="warning"><Typography>Remember to verify your email.</Typography></Alert>
                            ) : 
                            <LoginButton />
                        }
                        <LogoutButton />
                    </Grid>
                </Grid>
            </Card>
        </Container>
    );
}

export default Home;
