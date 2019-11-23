import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
// core components
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

import GridItem from "../../../views/GridItem";
import GridContainer from "../../../views/GridContainer";
import Table from "../../../views/Table";
import Card from "../../../views/Card";
import CardHeader from "../../../views/CardHeader";
import CardBody from "../../../views/CardBody";
import { withSnackbar } from 'notistack';

import { styles } from './styles';
import ConfirmDialog from './ConfirmDialog'
import Apis from '../../../../utils/Apis'
import MUIDataTable from "mui-datatables";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import './table.css'
import { InputLabel } from "@material-ui/core";
class Invoices extends Component {

    state = {
        totalCount: 0,
        pageNumber: 1,
        users: [],
        isLoading: false,
        cdata: [],
        value: 0,
        selectedCompanies:[],
        prevCompanies:[],
        companyArray:[],
    }
    makeCompanyTableData(){
        let tmp = this.props.companies;
        let cdata = []
        tmp.map((val, key) => {
            cdata[key] = []
            let t = JSON.parse(val['meta'])
            cdata[key][0] = val['id']
            cdata[key][1] = t['Name']
            cdata[key][2] = t['Email']
            cdata[key][3] = t['OrganizationNumber']
            cdata[key][4] = t['Phone1']
            cdata[key][5] = val['type']
        })

        this.setState({
            cdata: cdata
        })
    }
    componentDidMount() {
        this.makeCompanyTableData()
    }
    numberWithSpaces(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    }

    compareArray(a,b){
        console.log("compariang a",a,"and",b)
        if(a.length != b.length)
            return false
        a.sort()    
        b.sort()
        
        for (let i=0; i < a.length; i++){
            if (a[i] !== b[i])
                return false
        }
        return true

    }
    async  getInvoices() {
        console.log(this.props.token)
        console.log(this.props.email)
        console.log(this.props.companies)
        let response = await Apis.getInvoices(this.props.token);
        let data = []
        console.log("respose", response)
        if (response.status == 200) {
            if (!response.data) {
                this.setState({
                    data: data,
                    isLoading: true
                })
                return null;
            }
            let tmp = response.data.Invoices

            tmp.map((val, key) => {
                console.log(key, val)
                data[key] = []
                data[key][0] = val['DocumentNumber']
                data[key][1] = this.numberWithSpaces(val['Balance'])
                data[key][2] = val['Currency']
                data[key][3] = val['CustomerName']
                data[key][4] = val['DueDate']
                data[key][5] = val['InvoiceDate']
                data[key][6] = val['OCR']
                data[key][7] = val['Sent']
                data[key][8] = this.numberWithSpaces(val['Total'])
                data[key][9] = val['FinalPayDate']

            })
            this.setState({
                data: data,
                isLoading: true
            })
        }
        else {
            alert("error reading")
            this.setState({ isLoading: true })
        }

        
        // console.log(data)
        // this.setState({data:data})
    }

    makeCompanyArray(){
        let i = 0;
        let tmp = [];
        for(i=0;i<this.state.selectedCompanies.length;i++){
            tmp.push(this.props.companies[this.state.selectedCompanies[i]])
        }
        this.setState({
            companyArray: tmp
        })
    }
    handleChange = (event, value) => {
        let t = []
        if(value === 1){
            this.getInvoices();
            console.log("prev going to invoice ", this.state.prevCompanies)
            this.makeCompanyArray()
        }else{
            
            t = this.state.selectedCompanies
            
            this.setState({prevCompanies:t})
            t = []
            console.log("prev changed=====================================", t)
        }

        this.setState({ value });

      };

    handleChangePage = (event, page) => {
        this.getUsers(page + 1);
    }

    render() {
        const columns = ["DocumentNumber", "Balance", "Currency", "CustomerName", "DueDate", "InvoiceDate", "OCR", "Sent", "Total", "FinalPayDate"];
        const { value } = this.state;

        let data = this.state.data;
        const options = {
            filterType: 'checkbox',
            textLabels:{}
        };
        let cdata = this.state.cdata

        const compCol = ["ID", "Name", "Email", 'Org.No', 'Phone', 'Status']
        const compOptions = {
            filterType: 'checkbox',
            download: false,
            print: false,
            fixedHeader: false,
            textLabels: {
                selectedRows: {
                    text: "Company(s) selected",
                    delete: ""
                    
                }
            },
            rowsSelected:this.state.selectedCompanies,
            onRowsSelect:(currentRowsSelected, allRowsSelected)=>{
                console.log("currentRowsSelected",currentRowsSelected)
                console.log("current", this.state.selectedCompanies)
                console.log('prev state', this.state.prevCompanies)
                let tmp = this.state.selectedCompanies
                console.log("selected companies start", tmp)
                let index = tmp.indexOf(currentRowsSelected[0].index)
                if (index == -1){
                    tmp.push(currentRowsSelected[0].index)
                    console.log("added companies start", tmp)
                }else{
                    tmp.splice(index,1)
                    console.log("removed companies start", tmp)
                }
                this.setState({
                    selectedCompanies:tmp
                })
            }
        }
       

        const { classes } = this.props;
        const { totalCount, pageNumber, users, isLoading } = this.state;
        let invoiceTab = (
            <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                    <Card>

                        <CardHeader color="primary">
                            <h4 className={classes.cardTitleWhite}>Invoices </h4>
                        </CardHeader>
                        <CardBody className="CustomTable">

                            <GridItem xs={12} sm={12} md={12}>
                                <MUIDataTable
                                    data={data}
                                    columns={columns}
                                    options={options}
                                />

                                {!isLoading ?
                                    <CircularProgress className={classes.progress} color="secondary" />
                                    : null
                                }
                            </GridItem>

                        </CardBody>
                    </Card>
                </GridItem>

            </GridContainer>
        )

        let companyTab = (
            <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                    <Card>

                        <CardHeader color="primary">
                            <h4 className={classes.cardTitleWhite}>Companies </h4>
                        </CardHeader>
                        <CardBody className="CustomTable">
                            <GridItem xs={12} sm={12} md={12}>
                                <MUIDataTable
                                    
                                    data={cdata}
                                    columns={compCol}
                                    options={compOptions}
                                />

                            </GridItem>

                        </CardBody>
                    </Card>
                </GridItem>

            </GridContainer>
        )
        return (
            <div container>
                <div className="TabView">
                    <Tabs
                        value={value}
                        onChange={this.handleChange}
                        indicatorColor="primary"
                        textColor="primary"
                        variant="scrollable"
                        scrollButtons="auto"
                        className={InputLabel}
                    >
                        <Tab label="Company" className={InputLabel} />
                        <Tab label="Invoices" className={InputLabel} />
                    
                    </Tabs>
                    {value === 0 && companyTab}
                    {value === 1 && invoiceTab}
                </div>
            </div>
        );
    }
}

Invoices.propTypes = {
    classes: PropTypes.object.isRequired
};

let mapStateToProps = (state) => {
    return {
        email: state.auth.email,
        token: state.auth.token,
        apiKey: state.auth.api_key,
        companies: state.auth.companies
    };
}

export default withStyles(styles)(connect(mapStateToProps, null)(withSnackbar(Invoices)));