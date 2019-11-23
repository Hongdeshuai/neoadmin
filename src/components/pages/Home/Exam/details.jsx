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

import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import PDF from 'react-pdf-js';
import { styles } from './styles';
import Apis from '../../../../utils/Apis'
import "react-pdf-reader/dist/TextLayerBuilder.css";
import { withSnackbar } from 'notistack';


class Detail extends Component {
    state = {
        name: '',
        email: '',
        password: '',
        confirm_password: '',
        showPassword: false,
        showConfirmPassword: false,
        type: 1,
        numPages: null,
        pageNumber: 1,
        invoice: null,
        attachment: null,
        pdfview: ''
    };
    // onGetHelp = ()=>{
    //     this.props.his
    // }
    onDocumentComplete = (pages) => {
        this.setState({ page: 1, pages });
    }

    onAlertMessage = (type, message) => {
        this.props.enqueueSnackbar(message, {
            variant: type,
        });
    }

    onSendRequest = async () => {
        let resp = await Apis.signReakFactoringDocument(this.props.token, this.props.para);
    }
    async componentDidMount() {
        console.log("this is mount para", this.props.para)
        let resp = await Apis.getAnInvoice(this.props.token, this.props.para.invoice_id, this.props.para.access_token, this.props.para.is_manual, this.props.para.req_id,'real_factoring')
        console.log("this is the invoice details I got", resp)
        if (resp.status == 200) {
            if (resp.data.data.Invoice) {
                this.setState({
                    invoice: resp.data.data.Invoice
                })
                this.onAlertMessage("info", "Succefully loaded invoice")
            } else {
                console.log("this is attchment", resp.data.data)
                this.setState({
                    attachment: resp.data.data,
                    pdfview: '<iframe width="100%" height="700" src="' + resp.data.data + '" />'
                })
                this.onAlertMessage("info", "Succefully loaded invoice")
            }
        }
    }

    onDocumentLoadSuccess = ({ numPages }) => {
        this.setState({ numPages });
    }

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

    onSend = () => {

    }

    onDocumentLoadSuccess = ({ numPages }) => {
        this.setState({ numPages });
    }

    render() {
        const { classes } = this.props;
        const { open } = this.props;
        const { requesting } = this.state;
        const invoice = this.state.invoice
        return (
            <div>
                <Dialog
                    fullWidth={true}
                    maxWidth={'md'}
                    size="lg"
                    open={open}
                    onClose={this.onClose}
                    aria-labelledby="signup-dialog-title"
                    aria-describedby="signup-dialog-description">
                    <DialogTitle id="signup-dialog-title"
                        className={classes.title}>
                        {"Invoice details"}
                    </DialogTitle>
                    {
                        (this.props.para.is_manual == 0) ?
                            <DialogContent>
                                {
                                    this.state.invoice ?
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
                                                        Invoice ID
                                                </InputLabel>
                                                    <OutlinedInput
                                                        id="Invoice Due"
                                                        placeholder="Your Name Please"
                                                        classes={{
                                                            root: classes.inputbaseRoot,
                                                            input: classes.inputbaseInput,
                                                        }}
                                                        value  = {this.state.invoice.DocumentNumber}
                                                        fullWidth
                                                    />
                                                </FormControl>

                                                <FormControl
                                                    className={classes.formControl}>
                                                    <InputLabel shrink htmlFor="ibName" className={classes.inputlabel}>
                                                    Accounting Method
                                            </InputLabel>
                                                    <OutlinedInput
                                                        id="AccountingMethod"
                                                        placeholder="Accounting Method"
                                                        classes={{
                                                            root: classes.inputbaseRoot,
                                                            input: classes.inputbaseInput,
                                                        }}
                                                        value = {this.state.invoice.AccountingMethod}
                                                        onChange={this.handleChange('name')}
                                                        fullWidth
                                                    />
                                                </FormControl>

                                                <FormControl
                                                    className={classes.formControl}>
                                                    <InputLabel shrink htmlFor="Address1" className={classes.inputlabel}>
                                                        Accounting Method
                                                    </InputLabel>
                                                    <OutlinedInput
                                                        id="Address1"
                                                        placeholder="..."
                                                        classes={{
                                                            root: classes.inputbaseRoot,
                                                            input: classes.inputbaseInput,
                                                        }}
                                                        value = {this.state.invoice.Address1}
                                                        onChange={this.handleChange('email')}
                                                        fullWidth
                                                    />
                                                </FormControl>

                                                <FormControl
                                                    className={classes.formControl}>
                                                    <InputLabel shrink htmlFor="Currency" className={classes.inputlabel}>
                                                        Currency
                                                    </InputLabel>
                                                    <OutlinedInput
                                                        id="Currency"
                                                        placeholder="SEK , USD"
                                                        classes={{
                                                            root: classes.inputbaseRoot,
                                                            input: classes.inputbaseInput,
                                                        }}
                                                        onChange={this.handleChange('email')}
                                                        value = {this.state.invoice.Currency}
                                                        fullWidth
                                                    />
                                                </FormControl>


                                            </Grid>
                                        </Grid>
                                    :
                                    <CircularProgress></CircularProgress>
                                }

                            </DialogContent>
                            :
                            <DialogContent>
                                <div alignItems="center">
                                    {
                                        this.state.attachment ?
                                            <div dangerouslySetInnerHTML={{ __html: this.state.pdfview }}>

                                            </div>

                                            :
                                            <CircularProgress></CircularProgress>
                                    }

                                </div>
                            </DialogContent>
                    }
                    <DialogActions>
                        <div className={classes.wrapper}>
                            <Grid item container direction="column" justify="center" alignItems="stretch">
                                <Button color="primary" variant="contained" className={classes.btnNewAccount}
                                    onClick={this.onSendRequest}>
                                    Send Sign Request
                                </Button>
                            </Grid>
                            {requesting && <CircularProgress size={24} className={classes.progress} />}
                        </div>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

Detail.propTypes = {
    classes: PropTypes.object.isRequired,
};

// const RegisterlWrapped = withStyles(styles)(Register);


export default withStyles(styles)(withSnackbar(Detail));
