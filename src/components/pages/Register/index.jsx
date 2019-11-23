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
import Apis from '../../../utils/Apis'

class Register extends Component {
    state = {
        name:'',
        email: '',
        password: '',
        confirm_password: '',
        showPassword: false,
        showConfirmPassword: false
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.registered === 1) {
            this.props.onClose();
            return; 
        }
        if (nextProps.registered === -1 && nextProps.error.body !== undefined) {
            this.props.onAlertMessage("error", nextProps.error.body.message);
            return;
        }
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    handleClickShowPassword = () => {
        this.setState(state => ({ showPassword: !state.showPassword }));
    };


    handleClickShowConfirmPassword = () => {
        this.setState(state => ({ showConfirmPassword: !state.showConfirmPassword }));
    }
    
    onClose = () => {
        this.props.onClose();
    }

    onCreateNew = () => {
        const { email, password, confirm_password, requesting,name} = this.state;
        if (requesting) {
            return;
        }

        if (email === '') {
            this.props.onAlertMessage("error", "Please input email to create new account!");
            return;
        }
        if (name === '') {
            this.props.onAlertMessage("error", "Please input name to create new account!");
            return;
        }
        if (password === '') {
            this.props.onAlertMessage("error", "Please input password!");
            return;
        }
        if (confirm_password === '') {
            this.props.onAlertMessage("error", "Please input confirm password!");
            return;
        }
        if (password !== confirm_password) {
            this.props.onAlertMessage("error", "Don't match two password!");
            return;
        }

        this.setState({requesting: true});
        Apis.register({email, password, name})
        .then(res => {
            this.setState({requesting: false});
            this.props.onAlertMessage("success", res.data.message);
            this.props.onAlertMessage("info", "Please contact with admin to approve account.");
            this.props.onClose();
        })
        .catch(err => {
            this.setState({requesting: false});
            this.props.onAlertMessage("error", err.response.data.message);
        })
    }

    render() {
        const { classes } = this.props;
        const { open } = this.props;
        const { requesting } = this.state;
        return (
            <div>
                <Dialog
                    fullWidth={true}
                    maxWidth = {'md'}
                    size = "lg"
                    open={open}
                    onClose={this.onClose}
                    aria-labelledby="signup-dialog-title"
                    aria-describedby="signup-dialog-description">
                    <DialogTitle id="signup-dialog-title"
                        className={classes.title}>
                        {"Create New Account?"}
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
                                        Name
                                    </InputLabel>
                                    <OutlinedInput
                                        id="ibName"
                                        placeholder="Your Name Please"
                                        classes={{
                                            root: classes.inputbaseRoot,
                                            input: classes.inputbaseInput,
                                        }}
                                        value={this.state.name}
                                        onChange={this.handleChange('name')}
                                        fullWidth
                                    />
                                </FormControl>
                                <FormControl 
                                    className={classes.formControl}>
                                    <InputLabel shrink htmlFor="ibEmail" className={classes.inputlabel}>
                                        Email
                                    </InputLabel>
                                    <OutlinedInput
                                        id="ibEmail"
                                        placeholder="you@example.com"
                                        classes={{
                                            root: classes.inputbaseRoot,
                                            input: classes.inputbaseInput,
                                        }}
                                        value={this.state.email}
                                        onChange={this.handleChange('email')}
                                        fullWidth
                                    />
                                </FormControl>
                                <FormControl 
                                    className={classes.formControl}>
                                    <InputLabel shrink htmlFor="ibPassword" className={classes.inputlabel}>
                                        Password
                                    </InputLabel>
                                    <OutlinedInput
                                        id="ibPassword"
                                        variant="outlined"
                                        placeholder="Password"
                                        classes={{
                                            root: classes.inputbaseRoot,
                                            input: classes.inputbaseInput,
                                        }}
                                        value={this.state.password}
                                        onChange={this.handleChange('password')}
                                        type={this.state.showPassword ? 'text' : 'password'}    
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="Toggle password visibility"
                                                    onClick={this.handleClickShowPassword}
                                                    >
                                                    {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                    />
                                </FormControl>
                                <FormControl 
                                    className={classes.formControl}>
                                    <InputLabel shrink htmlFor="ibConfirmPassword" className={classes.inputlabel}>
                                        Confirm Password
                                    </InputLabel>
                                    <OutlinedInput
                                        id="ibConfirmPassword"
                                        variant="outlined"
                                        placeholder="Confirm Password"
                                        classes={{
                                            root: classes.inputbaseRoot,
                                            input: classes.inputbaseInput,
                                        }}
                                        value={this.state.confirm_password}
                                        onChange={this.handleChange('confirm_password')}
                                        type={this.state.showConfirmPassword ? 'text' : 'password'}    
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="Toggle password visibility"
                                                    onClick={this.handleClickShowConfirmPassword}
                                                    >
                                                    {this.state.showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                    />
                                </FormControl>
                                
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <div className={classes.wrapper}>
                            <Grid item container direction="column" justify="center" alignItems="stretch">
                                <Button color="primary" variant="contained" className={classes.btnNewAccount} 
                                    onClick={this.onCreateNew}>
                                    Create Account
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

Register.propTypes = {
    classes: PropTypes.object.isRequired,
};

// const RegisterlWrapped = withStyles(styles)(Register);


export default withStyles(styles)(Register);
