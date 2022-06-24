import {Container} from '@mui/material'
import PatientLookUp from '../components/PatientLookUp/PatientLookUp';
import CreatePatientForm from '../components/CreatePatientForm/CreatePatientForm';
import { useState } from 'react';
import model from '../model/model';
import BookAppointmentStepper from '../components/BookAppointmentStepper/BookAppointmentStepper'

function Booking(): JSX.Element {

    const [clicked, setClick] = useState(false);
    const [patientFound, setPatientFound] = useState(false);
  
    const onClickToggle = async (id: bigint) => {
      setClick(!clicked)
      const pFound = await model.checkPatientExists(id)
      setPatientFound(pFound)
    }
  
    const handleContinueClick = () => {
      
    }

    return (
        <Container>
          <BookAppointmentStepper></BookAppointmentStepper>
      <PatientLookUp submitPatientId={onClickToggle} patientFound={patientFound} handleContinueClick={handleContinueClick}/>
      <CreatePatientForm></CreatePatientForm>
      <p>Button has been clicked: {clicked? "true" : "false"}</p>
      <p>{`Patient was ${patientFound? "" : "not"} found`}</p>
    </Container>
    );
}

export default Booking;
