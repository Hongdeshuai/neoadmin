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

class SendMail extends Component {
    state = {
        to:'',
        email: '',
        password: '',
        confirm_password: '',
        showPassword: false,
        showConfirmPassword: false
    };

    componentDidMount(){
        this.setState({
            to:this.props.email,
            message:this.props.note
        })
        // alert(this.props.email)
    }
    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

  
   
    
    onClose = () => {
        this.props.onClose();
    }
    onUpdate = ()=>{
        this.props.onUpdate();
    }
    onCreateNew = async () => {
        const { to,email, password, confirm_password, requesting,name,message} = this.state;
        if (requesting) {
            return;
        }

        if (to === '') {
            this.props.onAlertMessage("error", "Please input email to send message");
            return;
        }
        
        if (message =="") {
            this.props.onAlertMessage("error", "Message can't be empty");
            return;
        }
        let resp = await Apis.updateNote(to, message)
        this.onUpdate()
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
                        {"Note for user"}
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
                                   
                                    <TextField
                                        multiline={true}
                                        id="message"
                                        placeholder="Compose your message"
                                        classes={{
                                            
                                            root: classes.inputbaseRoot,
                                            input: classes.inputbaseInput,
                                            input: classes.TextField
                                        }}
                                        rows={5}
                                        value={this.state.message}
                                        onChange={this.handleChange('message')}
                                        fullWidth
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
                                    Update
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

SendMail.propTypes = {
    classes: PropTypes.object.isRequired,
};

// const RegisterlWrapped = withStyles(styles)(Register);


export default withStyles(styles)(SendMail);
