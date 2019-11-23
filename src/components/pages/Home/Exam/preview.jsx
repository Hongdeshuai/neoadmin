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

class Preview extends Component {
    state = {
        detail:null,
        to:'',
        email: '',
        password: '',
        confirm_password: '',
        showPassword: false,
        showConfirmPassword: false
    };

    async componentDidMount(){
        this.setState({
            to:this.props.email
        })
        let prev = await Apis.previewRealFactoringDocument(this.props.para.req_id);
        this.setState({
            detail:prev.data.data
        })
        console.log("this is the preview html", prev)
        // alert(this.props.email)
    }
    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

  
    signNow = async () =>{
         alert(this.props.id)
        let resp = await Apis.signRealFactoringDocument(this.props.token, {document:this.state.detail,id:this.props.para.req_id})
        console.log("response from signing document",resp)
        this.props.onClose();
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
                        {"Preview for request document"}
                    </DialogTitle>

                    <DialogContent>
                        {
                            (this.state.detail==null)?<CircularProgress size={50} className={classes.buttonProgress} />
                            :
                            <div ref = 'invoice' dangerouslySetInnerHTML={{__html: this.state.detail}} >
                            </div>                         
                        }
                        
                    </DialogContent>
                    <DialogActions>

                        <div className={classes.wrapper}>
                            <Grid item container direction="column" justify="center" alignItems="stretch">
                                <Button color="primary" variant="contained" className={classes.btnNewAccount} 
                                    onClick={this.signNow}>
                                    Sign Now
                                </Button>

                                <Button color="primary" variant="contained"  className={classes.btnCancel} 
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

Preview.propTypes = {
    classes: PropTypes.object.isRequired,
};

// const RegisterlWrapped = withStyles(styles)(Register);


export default withStyles(styles)(Preview);
