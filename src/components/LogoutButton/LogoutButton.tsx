import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@mui/material";
import CONFIG from "../../config";

function LogoutButton() {
    const { isAuthenticated, logout } = useAuth0();

    return (
        isAuthenticated ? (
            <Button
                onClick={() => {
                    logout({ returnTo: CONFIG.AUTH0.LOGOUT.REDIRECT_TO });
                }}
            >
                Log out
            </Button>
        ) : <div></div>
    );
}

export default LogoutButton;
