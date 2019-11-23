import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

// core components
import Grid from "@material-ui/core/Grid";
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import { withSnackbar } from 'notistack';

import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';


import GridItem from "../../../views/GridItem";
import GridContainer from "../../../views/GridContainer";
import Card from "../../../views/Card";
import CardHeader from "../../../views/CardHeader";
import CardBody from "../../../views/CardBody";

import { styles } from './styles';
import Apis from '../../../../utils/Apis'

class UserProfile extends Component {

    state = {
        password: '',
        new_password: '',
        confirm_password: '',
        showPassword: false,
        showNewPassword: false,
        showConfirmPassword: false,
        business:1
    };


    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };
    
    handleChangePassword = prop => event => {
        this.setState({ [prop]: event.target.value });
    };

    handleChangeConfirmPassword = prop => event => {
        this.setState({ [prop]: event.target.value });
    };

    handleClickShowPassword = () => {
        this.setState(state => ({ showPassword: !state.showPassword }));
    };

    handleClickShowNewPassword = () => {
        this.setState(state => ({ showNewPassword: !state.showNewPassword }));
    };

    handleClickShowConfirmPassword = () => {
        this.setState(state => ({ showConfirmPassword: !state.showConfirmPassword }));
    };

    onAlertMessage = (type, message) => {
        this.props.enqueueSnackbar(message, {
            variant: type,
        });
    }

    onUpdate = () => {
        const { email } = this.props;
        const { password, new_password, confirm_password } = this.state;

        if (email === '') {
            this.onAlertMessage("error", "Please input email to create new account!");
            return;
        }
        if (password === '') {
            this.onAlertMessage("error", "Please input old password!");
            return;
        }
        if (new_password === '') {
            this.onAlertMessage("error", "Please input new password!");
            return;
        }
        if (confirm_password === '') {
            this.onAlertMessage("error", "Please input confirm password!");
            return;
        }
        if (new_password !== confirm_password) {
            this.onAlertMessage("error", "Don't match two password!");
            return;
        }

        Apis.changePassword({ email, old_password: password, new_password })
            .then(res => {
                console.log(res);
                this.onAlertMessage("success", "Successfully Changed.");
            })
            .catch(err => {
                console.log(err.response);
                this.onAlertMessage("error", err.response.data.message);
            })
    }

    linkAccount =() =>{
        return true
    }
    render() {
        const { classes } = this.props;
        const { email } = this.props;
        return (
            <div>
                <GridContainer>
                    <GridItem xs={12} sm={12} md={5}>
                        <Card>
                            <CardHeader color="success">
                                <h4 className={classes.cardTitleWhite}>Change User Password</h4>
                            </CardHeader>
                            <CardBody>
                                <FormControl
                                    className={classes.formControl}>
                                    <InputLabel shrink htmlFor="ibEmail" className={classes.inputlabel}>
                                        Email
                                </InputLabel>
                                    <OutlinedInput
                                        id="ibEmail"
                                        placeholder="you@example.com"
                                        defaultValue={email}
                                        disabled
                                        classes={{
                                            root: classes.inputbaseRoot,
                                            input: classes.inputbaseInput,
                                        }}
                                        fullWidth
                                    />
                                </FormControl>
                                <FormControl
                                    className={classes.formControl}>
                                    <InputLabel shrink htmlFor="ibPassword" className={classes.inputlabel}>
                                        Old Password
                                </InputLabel>
                                    <OutlinedInput
                                        id="ibPassword"
                                        variant="outlined"
                                        placeholder="Old Password"
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
                                    <InputLabel shrink htmlFor="ibNewPassword" className={classes.inputlabel}>
                                        New Password
                                </InputLabel>
                                    <OutlinedInput
                                        id="ibNewPassword"
                                        variant="outlined"
                                        placeholder="New Password"
                                        classes={{
                                            root: classes.inputbaseRoot,
                                            input: classes.inputbaseInput,
                                        }}
                                        value={this.state.new_password}
                                        onChange={this.handleChange('new_password')}
                                        type={this.state.showNewPassword ? 'text' : 'password'}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="Toggle password visibility"
                                                    onClick={this.handleClickShowNewPassword}
                                                >
                                                    {this.state.showNewPassword ? <Visibility /> : <VisibilityOff />}
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

                                <Grid container xs={12} sm={12} md={12}>
                                    <Grid container direction="column" justify="center" alignItems="stretch" xs={12} sm={12} md={7}>
                                    </Grid>
                                    <Grid container direction="column" justify="center" alignItems="stretch" xs={12} sm={12} md={5}>
                                        <Button variant="contained" color="primary" className={classes.btnUpdate} disableRipple onClick={this.onUpdate}>
                                            Update Password
                                    </Button>
                                    </Grid>
                                </Grid>
                            </CardBody>
                        </Card>
                    </GridItem>
                </GridContainer>
            </div>
        );
    }
}

UserProfile.propTypes = {
    classes: PropTypes.object.isRequired
};

let mapStateToProps = (state) => {
    return {
        email: state.auth.email,
    };
}

export default withStyles(styles)(connect(mapStateToProps, null)(withSnackbar(UserProfile)));