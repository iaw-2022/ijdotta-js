import { useAuth0 } from '@auth0/auth0-react';
import {Button} from '@mui/material'
import LoginIcon from '@mui/icons-material/Login';

function LoginButton() {
  const {
    isAuthenticated,
    loginWithRedirect,
  } = useAuth0();

  return !isAuthenticated ? (
    <Button onClick={loginWithRedirect} variant="contained">
      <LoginIcon sx={{mr: "5px"}}/>
      Log in</Button>
  ) : (<div></div>);
}

export default LoginButton;