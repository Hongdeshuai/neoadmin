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

class FileCreateModal extends Component {
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



    createFile = async() => {
        let data = {}
        data.id = this.props.id
        data.content = {}
        data.content['question'] = this.state.question
        data.content['answer'] = this.state.answer
        this.setState({requesting:true})
        await Apis.createFaqFile(data)
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
                        {`To Create Question and Answer`}
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
                                        Question
                                        </InputLabel>
                                    <OutlinedInput
                                        id="ibName"
                                        placeholder="Name of Folder to Create here"
                                        classes={{
                                            root: classes.inputbaseRoot,
                                            input: classes.inputbaseInput,
                                        }}
                                        value={this.state.question}
                                        onChange={this.handleChange('question')}
                                        fullWidth
                                    />
                                </FormControl>

                                <FormControl
                                    className={classes.formControl}>
                                    <InputLabel shrink htmlFor="ibName" className={classes.inputlabel}>
                                        Answer
                                        </InputLabel>
                                        <TextField
                                            multiline={true}
                                            id="message"
                                            placeholder="Compose your answer"
                                            classes={{
                                                
                                                root: classes.inputbaseRoot,
                                                input: classes.inputbaseInput,
                                                input: classes.TextField
                                            }}
                                            rows = {3}
                                            value={this.state.answer}
                                            onChange={this.handleChange('answer')}
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
                                    onClick={this.createFile}>
                                    Create QA
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

FileCreateModal.propTypes = {
    classes: PropTypes.object.isRequired,
};

// const RegisterlWrapped = withStyles(styles)(Register);


export default withStyles(styles)(FileCreateModal);
