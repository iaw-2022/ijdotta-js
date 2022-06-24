import {
    Grid,
    FormControl,
    InputLabel,
    Input,
    FormHelperText,
    Button,
    Card,
} from "@mui/material";

const NAME_TEXT_FIELD_LABEL = "Name";
const LASTNAME_TEXT_FIELD_LABEL = "Lastname";
const EMAIL_TEXT_FIELD_LABEL = "Email";
const HEALTH_INSURANCE_COMPANY_LABEL = "Health Insurance Company";
const HEALTH_INSURANCE_ID_LABEL = "Health Insurance ID";

function CreatePatientForm(): JSX.Element {
    return (
        <>
            <Card>
                <Grid
                    container
                    direction={"column"}
                    justifyContent="space-around"
                    margin={10}
                    spacing={2}
                >
                    <Grid container item>
                        <Grid item md={6}>
                            <FormControl>
                                <InputLabel htmlFor="name">
                                    {NAME_TEXT_FIELD_LABEL}
                                </InputLabel>
                                <Input
                                    id="name"
                                    aria-describedby="name-helper"
                                />
                                <FormHelperText id="name-helper">
                                    Enter your name
                                </FormHelperText>
                            </FormControl>
                        </Grid>
                        <Grid item md={6}>
                            <FormControl>
                                <InputLabel htmlFor="lastname">
                                    {LASTNAME_TEXT_FIELD_LABEL}
                                </InputLabel>
                                <Input
                                    id="lastname"
                                    aria-describedby="lastname-helper"
                                />
                                <FormHelperText id="lastname-helper">
                                    Enter your lastname
                                </FormHelperText>
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Grid item md={12}>
                        <FormControl>
                            <InputLabel htmlFor="email">
                                {EMAIL_TEXT_FIELD_LABEL}
                            </InputLabel>
                            <Input id="email" aria-describedby="email-helper" />
                            <FormHelperText id="email-helper">
                                Enter your email
                            </FormHelperText>
                        </FormControl>
                    </Grid>
                    <Grid item md={12}>
                        <FormControl>
                            <InputLabel htmlFor="health_insurance_company">
                                {HEALTH_INSURANCE_COMPANY_LABEL}
                            </InputLabel>
                            <Input
                                id="health_insurance_company"
                                aria-describedby="health_insurance_company-helper"
                            />
                            <FormHelperText id="health_insurance_company-helper">
                                Enter your health insurance company
                            </FormHelperText>
                        </FormControl>
                    </Grid>
                    <Grid item md={12}>
                        <FormControl>
                            <InputLabel htmlFor="health_insurance_id">
                                {HEALTH_INSURANCE_ID_LABEL}
                            </InputLabel>
                            <Input
                                id="health_insurance_id"
                                aria-describedby="health_insurance_id-helper"
                            />
                            <FormHelperText id="health_insurance_id-helper">
                                Enter your health insurance ID
                            </FormHelperText>
                        </FormControl>
                    </Grid>
                    <Grid item md={12}>
                        <Button variant="contained" color="primary">
                            Submit
                        </Button>
                    </Grid>
                </Grid>
            </Card>
        </>
    );
}

export default CreatePatientForm;
