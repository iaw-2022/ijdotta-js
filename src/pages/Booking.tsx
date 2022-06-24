import {Container} from '@mui/material'
import PatientLookUp from '../components/PatientLookUp/PatientLookUp';
import CreatePatientForm from '../components/CreatePatientForm/CreatePatientForm';
import SomeForm from '../components/CreatePatientForm/SomeForm';
import { useState } from 'react';
import model from '../model/model';
import BookAppointmentStepper from '../components/BookAppointmentStepper/BookAppointmentStepper'

function Booking(): JSX.Element {

  const [patientId, setPatientId] = useState<number>(NaN);
  const [step, setStep] = useState(0);
  
  const handleNextClick = () => {
    setStep((prevStep) => prevStep + 1)
  }

  const patientLookUpProps = {
    handleNextClick,
    submitPatientId: (id: number) => {
      setPatientId(id)
    }
  }

  const createPatientFormProps = {
    patientId,
    handleNextClick,
  }

  return (
    <Container sx={{}}>
      {step === 0 && <PatientLookUp {...patientLookUpProps}/>}
      {step === 1 && <CreatePatientForm {...createPatientFormProps} />}
      {/* <SomeForm></SomeForm> */}
    </Container>
  );
}

export default Booking;
