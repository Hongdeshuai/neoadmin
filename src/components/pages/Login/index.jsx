import React, { Component } from "react";
import {connect} from "react-redux";
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Grid } from "@material-ui/core";
import Card from '@material-ui/core/Card';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withSnackbar } from 'notistack';

import { styles } from './styles';
import logo from '../../../assets/logo12.png';

import Register from '../Register'
import { loginRequesting } from "../../../store/actions/auth";

class Login extends Component {
    state = {
        showPassword: false,
        open_register: false,
        email:'',
        password: '',
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.authenticated === -1 && nextProps.error.body !== undefined) {
            this.props.enqueueSnackbar(nextProps.error.body.message, { 
                variant: 'error',
            });
            return;
        }
    }

    handleClickShowPassword = () => {
        this.setState(state => ({ showPassword: !state.showPassword }));
    };

    onSignIn = () => {
        const { requesting } = this.props;
        if (requesting){
            return;
        }
        const {email, password} = this.state;
        if (email === '') {
            this.props.enqueueSnackbar('Please input email!', { 
                variant: 'error',
            });
            return;
        }
        if (password === '') {
            this.props.enqueueSnackbar('Please input password!', { 
                variant: 'error',
            });
            return;
        }
        this.props.loginRequesting({email, password});
    }

    createNew = () => {
        const { requesting } = this.props;
        if (requesting){
            return;
        }
        this.setState({open_register: true});
    }
    
    onCloseRegiser = () => {
        this.setState({open_register: false});
    }

    onAlertMessage = (type, message) => {
        this.props.enqueueSnackbar(message, { 
            variant: type,
        });
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    handleCloseNotification = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        this.setState({ openNotification: false });
    };

    render() {
        const { classes } = this.props;
        const { authenticated, requesting } = this.props;
        if (authenticated === 1) {
            return <Redirect to="/" />;
        }
        // const btnSignInClassname = classNames({
        //     [" " + classes.btnFocusColor]: !requesting,
        // });

        return (
            <div container >
                <Grid
                    container
                    className={classes.root}
                    direction= 'row'>
                    <Grid 
                        item xs={12}
                        container
                        className={classes.login_container}>
                        <Card
                            className={classes.card}>
                            <Grid 
                                item xs={12}
                                container
                                direction="row"
                                justify="center"
                                alignItems='center'
                                className={classes.main_container}>
                                {/* <img src=></img> */}
                                <Grid container 
                                    direction="column"
                                    className={classes.main_subcontainer}>
                                        <img src={logo} alt="logo" className={classes.img} />
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
                                    <Grid item container justify="flex-end">
                                        <Button color="primary" className={classes.btnForgetPasssword} disableRipple disableFocusRipple >
                                            Forgot password?
                                        </Button>
                                    </Grid>
                                    {/* <Grid item container direction="column" justify="center" alignItems="stretch"> */}
                                    <div className={classes.wrapper}>
                                        <Grid item container direction="column" justify="center" alignItems="stretch">
                                            <Button color="primary" variant="contained" className={classes.btnSignIn} disableRipple
                                                onClick={this.onSignIn}>
                                                Sign In
                                            </Button>
                                        </Grid>
                                        {requesting && <CircularProgress size={24} className={classes.buttonProgress} />}
                                    </div>
                                    {/* </Grid> */}
                                    <Grid item container direction="row" justify="center" alignItems="center" className={classes.containerSignIn}>
                                        <Typography className={classes.lblNewAccount}>Not a member yet?</Typography>
                                        <Button color="primary" className={classes.btnNewAccount} disableRipple disableFocusRipple
                                            onClick={this.createNew}>
                                            Create New Account
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Card>
                    </Grid>
                </Grid>
                <Register 
                    onClose = {this.onCloseRegiser}
                    onAlertMessage = {this.onAlertMessage}
                    open={this.state.open_register}/>
            </div>
        );
    }
}

Login.propTypes = {
    classes: PropTypes.object.isRequired,
};

let mapStateToProps = (state) => {
    return {
        requesting: state.auth.requesting,
        authenticated: state.auth.authenticated,
        error: state.auth.error
    };
}

const mapDispatchToProps = dispatch => ({
    loginRequesting : bindActionCreators(loginRequesting, dispatch),
})

// const wrapperLogin = withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Login));
// export default withStyles(styles)(Login);
export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(withSnackbar(Login)));