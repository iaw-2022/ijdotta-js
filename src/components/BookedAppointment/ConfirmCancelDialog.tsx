import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { CircularProgress } from "@mui/material";

interface Props {
    open: boolean;
    handleClose: () => void;
    handleCancel: () => void;
    isCancelling: boolean;
}

export default function ConfirmCancelDialog({
    open,
    handleClose,
    handleCancel,
    isCancelling,
}: Props) {
    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Cancel appointment"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to cancel this appointment? This
                        action cannot be undone.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Do not cancel</Button>
                    {isCancelling ? (
                        <CircularProgress />
                    ) : (
                        <Button color="error" onClick={handleCancel} autoFocus>
                            I am sure
                        </Button>
                    )}
                </DialogActions>
            </Dialog>
        </div>
    );
}
