import React, { Component } from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

// core components
import GridItem from "../../../views/GridItem";
import GridContainer from "../../../views/GridContainer";
import Table from "../../../views/Table";
import Card from "../../../views/Card";
import CardHeader from "../../../views/CardHeader";
import CardBody from "../../../views/CardBody";
import Button from '@material-ui/core/Button';
import IconButton from "@material-ui/core/IconButton";
import CloudDownloadOutlined from '@material-ui/icons/CloudDownloadOutlined';
import Typography from '@material-ui/core/Typography';
import { Grid } from "@material-ui/core";
import { withSnackbar } from 'notistack';
import moment from 'moment-timezone'

import { styles } from './styles';
import ic_pdf from '../../../../assets/ic_pdf.svg';
import RemoveButton from './ConfirmDialog'
import Apis from '../../../../utils/Apis'

class Dashboard extends Component {

    state = {
        totalCount: 0,
        pageNumber: 1,
        docs: [],
        isLoading: false,
    }

    componentWillMount () {
        console.log("CloudManage ---- componentWillMount");
        const { pageNumber } = this.state;
        // this.getDocuments(pageNumber);
    }

    getDate(date_time) {
        let date = moment(date_time).local().format("YYYY-MM-DD");
        return date;//date_time.substring(0, 10);
    }

    getTime(date_time) {
        // http://momentjs.com/docs/#/manipulating/local/
        let time = moment(date_time).local().format("hh:mm A");
        return time;//date_time.substring(11, 16);
    }
    
    getDocuments = async (pageNumber) => {
        const { classes } = this.props;
        this.setState({ isLoading: true });
        try {
            let response = await Apis.getDocuments({pageNumber: pageNumber});
            console.log("getDocuments", response);

            let respDocs = response.data.docs;
            let docs = [];
            if (respDocs != undefined && respDocs != null) {
                for (let i = 0; i < respDocs.length; i ++) {
                    // users = [...users, {email: respUsers[i].email, isAllowed: respUsers[i].email, ]
                    docs = [...docs, 
                            [   
                                <img style={{width:30, height:30}} src={ic_pdf} alt="pdf icon"/>, 
                                <Typography noWrap className={classes.typographyContent}>{respDocs[i].name}</Typography>, 
                                <Typography noWrap className={classes.typographyContent}>{this.getDate(respDocs[i].date) + " " + this.getTime(respDocs[i].date)}</Typography>, 
                                <Typography noWrap className={classes.typographyContent}>{respDocs[i].size + "KB"}</Typography>, 
                                this.operationView(respDocs[i]._id, respDocs[i].url)
                            ]
                        ];
                }
                this.setState({pageNumber: pageNumber, totalCount: response.data.total, docs: docs, isLoading: false})
            }
            else {
                this.setState({pageNumber: pageNumber, totalCount: 0, docs: docs, isLoading: false})
            }
            // this.setState({ isLoading: false });
        }
        catch (error) {
            this.setState({isLoading: false});
            let messageProperty = Object.getOwnPropertyDescriptor(error, 'message');
            
            this.props.enqueueSnackbar(messageProperty.value, { 
                variant: 'error',
            });
        }
    }

    onDelete = async(index) => {
        console.log("onDelete", index);

        this.setState({ isLoading: true });
        try {
            let response = await Apis.deleteDocument({id: index});
            console.log ('Apis.deleteUser', response);
            await this.getDocuments(this.state.pageNumber);
        }
        catch (error) {
            this.setState({isLoading: false});
            
            let messageProperty = Object.getOwnPropertyDescriptor(error, 'message');
            
            this.props.enqueueSnackbar(messageProperty.value, { 
                variant: 'error',
            });
        }
    }

    viewButton = (url) => {
        const { classes } = this.props;
        return (
            <a href={url} target="_blank" style={{textDecoration:'none'}} >
                <Button color="secondary" className={classes.viewButton} disableRipple disableFocusRipple >
                    View
                </Button>
            </a>
        );
    }

    downloadButton = (url) => {
        const { classes } = this.props;
        return (
            <a href={url} style={{textDecoration:'none'}} download="123123">
                <IconButton
                    color="secondary"
                    aria-label="Download"
                    className={classes.tableActionButton}>
                    <CloudDownloadOutlined
                        className={
                            classes.tableActionButtonIcon + " " + classes.icon
                        }/>
                </IconButton>
            </a>
        )
    }

    removeButton = (index) => {
        return (
            // <IconButton
            //     color="secondary"
            //     aria-label="Delete"
            //     className={classes.tableActionButton}>
            //     <Delete
            //         className={
            //             classes.tableActionButtonIcon + " " + classes.icon
            //         }/>
            // </IconButton>
            <RemoveButton onDelete={this.onDelete} index={index}/>
        )
    }

    operationView = (index, url) => {
        console.log("operationView", index);
        return (
            <Grid container>
                {this.viewButton(url)} {this.removeButton(index)}
            </Grid>
        )
    }

    handleChangePage = (event, page) => {
        console.log("handleChangePage", page);
        this.getDocuments(page + 1);
    }

    render() {
        const { classes } = this.props;
        const { totalCount, pageNumber, docs, isLoading } = this.state;
        return (
            <GridContainer>
                 <GridItem xs={12} sm={12} md={12}>
                    
                </GridItem>
            </GridContainer>
        );
    }
}

Dashboard.propTypes = {
    classes: PropTypes.object.isRequired
};
  
export default withStyles(styles)(withSnackbar(Dashboard));