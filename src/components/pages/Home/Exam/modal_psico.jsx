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
import FileUploader from "react-firebase-file-uploader";
import { styles } from './styles';
import Apis from '../../../../utils/Apis'
import TextField from '@material-ui/core/TextField';
import firebase from "firebase";
import LinearProgress from '@material-ui/core/LinearProgress';
import GridItem from "../../../views/GridItem";
const config = {
    apiKey: "AIzaSyDs-AM6a4friRKfD5pHWYC_syorBQ6MDnU",
    authDomain: "neostudio-4034f.firebaseapp.com",
    storageBucket: "gs://neostudio-4034f.appspot.com"
};
if (!firebase.apps.length) {
    firebase.initializeApp(config);
}
class FileCreateModal extends Component {
    state = {
        detail: null,
        to: '',
        email: '',
        password: '',
        confirm_password: '',
        showPassword: false,
        showConfirmPassword: false,
        username: "",
        avatar: "",
        isUploading: false,
        progress: 0,
        pubURL: null
    };

    
    handleUploadStart = () => this.setState({ isUploading: true, progress: 0 });
    handleProgress = progress => this.setState({ progress });
    handleUploadError = error => {
        this.setState({ isUploading: false });
        console.error(error);
    };

    handleUploadSuccess = async (filename) => {
        this.setState({ avatar: filename, progress: 100, isUploading: false });
        firebase
            .storage()
            .ref("psico_exam")
            .child(filename)
            .getDownloadURL()
            .then(url => this.setState({ pubURL: url }));
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



    createFile = async () => {
        if(!this.state.to) {
            alert('Please input Filename')
            return;
        }
        let data = {}
        data['url'] = this.state.pubURL
        data['Correct'] = this.state.to
        this.setState({ requesting: true })
        await Apis.createNewPsicoQA(data)
        this.setState({ requesting: false })
        this.props.onClose()
    }
    render() {
        const { classes } = this.props;
        const { open } = this.props;
        const { requesting,isUploading,progress } = this.state;
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
                        {`Create Psico QA `}
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
                                <FileUploader
                                    accept="image/*"
                                    name="avatar"
                                    randomizeFilename
                                    storageRef={firebase.storage().ref('psico_exam')}
                                    onUploadStart={this.handleUploadStart}
                                    onUploadError={this.handleUploadError}
                                    onUploadSuccess={this.handleUploadSuccess}
                                    onProgress={this.handleProgress}
                                />
                                {
                                    this.state.pubURL?
                                        <GridItem>
                                            <img width="500px" src={this.state.pubURL}></img>
                                        </GridItem>
                                        
                                    :
                                        null    
                                }
                                <FormControl
                                    className={classes.formControl}>
                                    <InputLabel shrink htmlFor="ibName" className={classes.inputlabel}>
                                        Correct Answer
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

                                {
                                    isUploading && 
                                        <LinearProgress variant="buffer" value={progress}  color="secondary" />
                                }
                                
                                
                            </Grid>
                            {(requesting || isUploading)&& <CircularProgress size={24} className={classes.buttonProgress} />}
                        </Grid>
                    </DialogContent>
                    <DialogActions>

                        <div className={classes.wrapper}>
                            <Grid item container direction="row" justify="center" alignItems="stretch">
                                <Button color="primary" variant="contained" disabled={((this.state.pubURL!=null)?false:true)} className={classes.btnNewAccount}
                                    onClick={this.createFile}>
                                    Save
                                </Button>
                                <Button color="primary" variant="contained" className={classes.btnCancel}
                                    onClick={this.props.onClose}>
                                    Cancel
                                </Button>
                            </Grid>
                        </div>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

FileCreateModal.propTypes = {
    classes: PropTypes.object.isRequired,
};

// const RegisterlWrapped = withStyles(styles)(Register);


export default withStyles(styles)(FileCreateModal);
