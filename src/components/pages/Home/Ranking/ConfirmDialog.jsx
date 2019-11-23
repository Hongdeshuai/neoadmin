import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import {defaultFont} from "../../../../App/styles";

const styles = {
    operationButton : {
        defaultFont,
        height: 25,
        width: 40,
        fontSize: 11,
    },
    title: {
        '& h2': {
          fontSize:20
        }
    },
    content: {
        fontSize:15
    },
    button: {
        fontSize:13
    }
};

class ConfirmDialog extends React.Component {
    state = {
        open: false,
    };

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    handleOk = () => {
        const { email, onDelete } = this.props;
        onDelete(email);
        this.setState({ open: false });
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                <Button variant="outlined" className={classes.operationButton} disableRipple disableFocusRipple onClick={this.handleClickOpen}>
                    DELETE
                </Button>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="dialog-title"
                    aria-describedby="dialog-description">
                    <DialogTitle id="dialog-title" className={classes.title}>{"Confirm"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="dialog-description" className={classes.content}>
                            Are you sure to delete this user?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary" className={classes.button}>
                            No
                        </Button>
                        <Button onClick={this.handleOk} color="primary" autoFocus className={classes.button}>
                            Yes
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

// export default ConfirmDialog;
  
ConfirmDialog.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ConfirmDialog);