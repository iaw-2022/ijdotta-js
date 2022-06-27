import {
    TextField,
    Card,
    Typography,
    Button,
    CircularProgress,
    Alert,
    Box,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { ChangeEvent, useState } from "react";
import "./PatientLookUp.css";
import model from "../../model/model";

interface Props {
    submitPatientId: (id: number) => void;
    handleNextClick: () => void;
    patientFound: boolean;
    setPatientFound: (bool: boolean) => void
}

const ID_LABEL = "DNI";

function PatientLookUp({patientFound, setPatientFound, ...props}: Props): JSX.Element {
    const [idTextField, setIdTextField] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [hasClickedSearch, setHasClickedSearch] = useState(false);

    const updateIdTextField = ({ target }: ChangeEvent<HTMLInputElement>) => {
        if (/^\d+$/.test(target.value) || target.value === "")
            setIdTextField(target.value);
    };

    const onSearchClick = async () => {
        setIsLoading(true);
        setHasClickedSearch(true);

        const patientId = Number(idTextField);
        props.submitPatientId(patientId)
        const findPatientResult = await model.checkPatientExists(patientId);
        setPatientFound(findPatientResult);


        setIsLoading(false);
    };

    return (
        <Card sx={{margin: "auto"}}>
            <Box display={"flex"} flexDirection="column" padding={"40px"} alignItems="stretch" maxWidth="480px" gap={"20px"}>
                {hasClickedSearch && !isLoading && patientFound && (
                    <Alert severity="success">Patient found.</Alert>
                )}
                {hasClickedSearch && !isLoading && !patientFound && (
                    <Alert severity="error">
                        Patient not found. Create one next.
                    </Alert>
                )}
                <Typography>Enter the {ID_LABEL} to get started:</Typography>
                <Box display={"flex"}>
                    <TextField
                        required
                        label={ID_LABEL}
                        onChange={updateIdTextField}
                        value={idTextField}
                        fullWidth
                    />
                    <Button onClick={onSearchClick}>
                        {!isLoading ? <SearchIcon /> : <CircularProgress />}
                    </Button>
                </Box>
                <Button
                    variant="contained"
                    disabled={isLoading || !hasClickedSearch}
                    onClick={props.handleNextClick}
                >
                    Continue
                </Button>
            </Box>
        </Card>
    );
}

export default PatientLookUp;
