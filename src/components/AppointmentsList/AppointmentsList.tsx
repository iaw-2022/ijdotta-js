import axios from 'axios'
import { useEffect, useState } from 'react';
import { Button } from '@mui/material';

const url = "https://clinicapp-ijdotta-api.herokuapp.com/api/";

function AppointmentsList(): JSX.Element {

    const [appointments, setAppointments] = useState({})

    async function handleClick() {
        const axios_response = await axios.get(url + "appointments");
        const app = axios_response.data
        setAppointments(app)
        console.log(`local appointments: ${app}`)
        console.log(`state appointments: ${appointments}`)
    }

    return (
        <div>
            Logging axios
            <Button onClick={handleClick}>Click me!</Button>
        </div>
    )
}

export default AppointmentsList;