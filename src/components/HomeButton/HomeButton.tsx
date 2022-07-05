import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

function HomeButton(): JSX.Element {
    const navigate = useNavigate();

    const onFinish = () => {
        navigate("/", { replace: true });
    };

    return (
        <Button variant="contained" onClick={onFinish}>
            Finish
        </Button>
    );
}

export default HomeButton;
