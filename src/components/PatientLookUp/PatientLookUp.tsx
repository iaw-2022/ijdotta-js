import {
    TextField,
    Card,
    CardContent,
    Typography,
    Button,
    CircularProgress,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { ChangeEvent, useState } from "react";
import "./PatientLookUp.css";
import model from "../../model/model";

interface Props {
    submitPatientId: (id: number) => void;
    handleNextClick: () => void;
}

const ID_LABEL = "DNI";

function PatientLookUp(props: Props): JSX.Element {
    const [idTextField, setIdTextField] = useState<string>("");
    const [patientFound, setPatientFound] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [hasClickedSearch, setHasClickedSearch] = useState(false);

    const updateIdTextField = (event: ChangeEvent<HTMLInputElement>) => {
        setIdTextField(event.target.value);
    };

    const onSearchClick = async () => {
        setIsLoading(true);
        setHasClickedSearch(true);

        const patientId = Number(idTextField);
        props.submitPatientId(patientId);
        const findPatientResult = await model.checkPatientExists(patientId);
        setPatientFound(findPatientResult);

        setIsLoading(false);
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
                        {!isLoading ? <SearchIcon /> : <CircularProgress />}
                    </Button>
                </CardContent>
                <CardContent className="main-content">
                    <Typography>
                        {patientFound
                            ? "Patient found! Continue to book an appointment."
                            : "Patient was not found. Continue to load personal information."}
                    </Typography>
                </CardContent>
                <CardContent className="flex-end">
                    <Button
                        variant="contained"
                        disabled={isLoading || !hasClickedSearch}
                        onClick={props.handleNextClick}
                    >
                        Continue
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}

export default PatientLookUp;
