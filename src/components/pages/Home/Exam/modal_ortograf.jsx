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

class EngModal extends Component {
    state = {
       
    };

    componentDidMount(){
        this.setState({
            to:this.props.email
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

    onCreateNew = async () => {
        const { requesting,name,message} = this.state;
        if (requesting) {
            return;
        }

        
        if (message =="") {
            this.props.onAlertMessage("error", "Message can't be empty");
            return;
        }
        let data = this.state
        await Apis.createNewOrtografQA(data)
        this.onClose()
        
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
                        {"Create English Question and Answer"}
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
                                    <InputLabel shrink htmlFor="ibEmail" className={classes.inputlabel}>
                                        Correct
                                    </InputLabel>
                                    <TextField
                                        multiline={true}
                                        id="question"
                                        placeholder="Compose your description here"
                                        classes={{
                                            
                                            root: classes.inputbaseRoot,
                                            input: classes.inputbaseInput,
                                            input: classes.TextField
                                        }}
                                        rows={3}
                                        value={this.state.Correct}
                                        onChange={this.handleChange('Correct')}
                                        fullWidth
                                    />
                                </FormControl>
                                <FormControl 
                                    className={classes.formControl}>
                                    <InputLabel shrink htmlFor="ibEmail" className={classes.inputlabel}>
                                        Description1
                                    </InputLabel>
                                    <TextField
                                        multiline={true}
                                        id="question"
                                        placeholder="Compose your Description1 here"
                                        classes={{
                                            
                                            root: classes.inputbaseRoot,
                                            input: classes.inputbaseInput,
                                            input: classes.TextField
                                        }}
                                        rows={3}
                                        value={this.state.Description1}
                                        onChange={this.handleChange('Description1')}
                                        fullWidth
                                    />
                                </FormControl>
                                <FormControl 
                                    className={classes.formControl}>
                                    <InputLabel shrink htmlFor="ibEmail" className={classes.inputlabel}>
                                        Incorrect
                                    </InputLabel>
                                    <TextField
                                        multiline={true}
                                        id="question"
                                        placeholder="Write here Incorrect "
                                        classes={{
                                            
                                            root: classes.inputbaseRoot,
                                            input: classes.inputbaseInput,
                                            input: classes.TextField
                                        }}
                                        rows={3}
                                        value={this.state.Incorrect}
                                        onChange={this.handleChange('Incorrect')}
                                        fullWidth
                                    />
                                </FormControl>
                                <FormControl 
                                    className={classes.formControl}>
                                    <InputLabel shrink htmlFor="ibEmail" className={classes.inputlabel}>
                                        Description2
                                    </InputLabel>
                                    <TextField
                                        multiline={true}
                                        id="question"
                                        placeholder="Write here Description 2"
                                        classes={{
                                            
                                            root: classes.inputbaseRoot,
                                            input: classes.inputbaseInput,
                                            input: classes.TextField
                                        }}
                                        rows={3}
                                        value={this.state.Description2}
                                        onChange={this.handleChange('Description2')}
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
                                    Create
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

EngModal.propTypes = {
    classes: PropTypes.object.isRequired,
};

// const RegisterlWrapped = withStyles(styles)(Register);


export default withStyles(styles)(EngModal);
