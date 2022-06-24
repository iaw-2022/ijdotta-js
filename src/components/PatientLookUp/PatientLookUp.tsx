import {
    TextField,
    Card,
    CardContent,
    Typography,
    Button,
    Box,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { ChangeEvent, useState } from "react";
import "./PatientLookUp.css";

interface Props {
    submitPatientId: (id: bigint) => void;
    patientFound: boolean;
    handleContinueClick: () => void;
}

const ID_LABEL = "DNI";

function PatientLookUp(props: Props): JSX.Element {
    const [idTextField, setIdTextField] = useState<string>("");

    const updateIdTextField = (event: ChangeEvent<HTMLInputElement>) => {
        setIdTextField(event.target.value);
    };

    const onSearchClick = () => {
        props.submitPatientId(BigInt(idTextField));
    };

    return (
        <div>
            <Card className="auto-width">
                <CardContent className="main-content">
                    <Typography>
                        Enter the {ID_LABEL} to get started:
                    </Typography>
                </CardContent>
                <CardContent className="main-content">
                    <TextField
                        required
                        label={ID_LABEL}
                        onChange={updateIdTextField}
                        value={idTextField}
                    />
                    <Button onClick={onSearchClick}>
                        <SearchIcon />
                    </Button>
                </CardContent>
                <CardContent className="main-content">
                    <Typography>
                        {props.patientFound
                            ? "Patient found! Continue to book an appointment."
                            : "Patient was not found. Continue to load personal information."}
                    </Typography>
                </CardContent>
                <CardContent className="flex-end">
                    <Button variant="contained" onClick={props.handleContinueClick}>
                        Continue
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}

export default PatientLookUp;
