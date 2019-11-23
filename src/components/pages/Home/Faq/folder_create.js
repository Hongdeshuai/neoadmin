import React, { Component } from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import { Grid } from "@material-ui/core";
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import CircularProgress from '@material-ui/core/CircularProgress';

import { styles } from './styles';
import Apis from '../../../../utils/Apis'
import TextField from '@material-ui/core/TextField';

class FolderCreateModal extends Component {
    state = {
        detail: null,
        to: '',
        email: '',
        password: '',
        confirm_password: '',
        showPassword: false,
        showConfirmPassword: false
    };

    componentDidMount() {
        this.setState({
            to: ''
        })
        
    }
    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };



    createFolder = async() => {
        this.setState({requesting:true})
        await Apis.createFaqFolder(this.state.to)
        this.setState({requesting:false})
        this.props.onCreate()
    }
    render() {
        const { classes } = this.props;
        const { open } = this.props;
        const { requesting } = this.state;
        return (
            <div>
                <Dialog
                    fullWidth={true}
                    maxWidth={'md'}
                    size="lg"
                    open={true}
                    onClose={this.onClose}
                    aria-labelledby="signup-dialog-title"
                    aria-describedby="signup-dialog-description">
                    <DialogTitle id="signup-dialog-title"
                        className={classes.title}>
                        {"To Create FAQ Folder"}
                    </DialogTitle>

                    <DialogContent>

                        <Grid
                            container
                            direction="row"
                            justify="center"
                            alignItems='center'
                            className={classes.main_container}>

                            <Grid container
                                direction="column">
                                <FormControl
                                    className={classes.formControl}>
                                    <InputLabel shrink htmlFor="ibName" className={classes.inputlabel}>
                                        Folder Name
                                        </InputLabel>
                                    <OutlinedInput
                                        id="ibName"
                                        placeholder="Name of Folder to Create here"
                                        classes={{
                                            root: classes.inputbaseRoot,
                                            input: classes.inputbaseInput,
                                        }}
                                        value={this.state.to}
                                        onChange={this.handleChange('to')}
                                        fullWidth
                                    />
                                </FormControl>
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions>

                        <div className={classes.wrapper}>
                            <Grid item container direction="row" justify="center" alignItems="stretch">
                                <Button color="primary" variant="contained" className={classes.btnNewAccount}
                                    onClick={this.createFolder}>
                                    Create Folder
                                </Button>
                                <Button color="primary" variant="contained" className={classes.btnCancel}
                                    onClick={this.props.onClose}>
                                    Cancel
                                </Button>
                            </Grid>

                            {requesting && <CircularProgress size={24} className={classes.buttonProgress} />}
                        </div>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

FolderCreateModal.propTypes = {
    classes: PropTypes.object.isRequired,
};

// const RegisterlWrapped = withStyles(styles)(Register);


export default withStyles(styles)(FolderCreateModal);
