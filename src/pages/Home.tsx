import { Container, Card } from "@mui/material";
import { Link } from "react-router-dom";

function Home(): JSX.Element {
    return (
        <Container>
            <Card>
                <nav>
                    <Link to={'/booking'}>Book appointment</Link>
                    <Link to={'/profile'}>See personal info</Link>
                    <Link to={'/appointments'}>See my appointments</Link>
                    <Link to={'/treatments'}>See my treatments</Link>
                </nav>
            </Card>
        </Container>
    );
}

export default Home;
