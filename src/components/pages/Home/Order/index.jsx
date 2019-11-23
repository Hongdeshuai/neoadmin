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

import Detail from './details'
import { styles } from './styles';
import Apis from '../../../../utils/Apis'
import MUIDataTable from "mui-datatables";
import './table.css'

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { InputLabel } from "@material-ui/core";

import Preview from "./preview"
class Debts extends Component {

    state = {
        totalCount: 0,
        pageNumber: 1,
        users: [],
        isLoading: false,
        open:false,
        raw : {},
        para:{},
        value:0,
        open2:false,
        selectedCompanies : []
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
        
        this.makeCompanyTableData();
    }

    numberWithSpaces(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    }

    async  getInvoices(){
        console.log(this.props.token)
        console.log(this.props.email)
        let response = await Apis.getDebtRequests(this.props.token);
        let data = []
        console.log("respose", response)
        if(response.status == 200){
            if(!response.data) {
                this.setState({
                    data:data,
                    isLoading:true
                })
                return null;
            }

            let tmp = response.data.data

            this.setState({
                raw :response.data.data
            })

            tmp.map((val,key)=>{
                console.log(key,val)
                data[key] = []
                data[key][0] = val['invoice_id']
                data[key][1] = val['email']
                data[key][2] = val['name']
                
                let t = JSON.parse(val['meta'])
                console.log("this is meta", t)
                data[key][3] = t['ZipCode']
                data[key][4] = t['OrganizationNumber']
                data[key][5] = t['BG']
                data[key][6] = val['type']
                data[key][7] = "Details"
                data[key][8] = "Preview"
            })
            this.setState({
                data:data,
                isLoading:true
            })
        }
        else{
            alert("error reading")
            this.setState({isLoading:true})
        }        
        console.log(data)
        this.setState({data:data})
    }

    
    handleClose = ()=>{
        this.setState({
            open:false,
            open2:false
        })

    }

    handleChange = (event, value) => {
        let t = []
        if(value === 1){
            this.getInvoices();
            console.log("prev going to invoice ", this.state.prevCompanies)
        }else{
            
            t = this.state.selectedCompanies
            this.setState({prevCompanies:t})
            t = []
            console.log("prev changed=====================================", t)
        }

        this.setState({ value });

      };
    
    showMail(id,row){
        this.setState({id:id})
        this.setState({open:true})

    }

    closeMail = ()=>{
        this.setState({open:false})
    }

    handleDetail = (tableMeta) =>{
        console.log("this is table meta data",tableMeta)
        let para = {}
        para.is_manual = this.state.raw[tableMeta.rowIndex]['is_manual']
        para.access_token = this.state.raw[tableMeta.rowIndex]['access_token']
        para.invoice_id = this.state.raw[tableMeta.rowIndex]['invoice_id']
        para.req_id = this.state.raw[tableMeta.rowIndex]['id']

        this.setState({
            para:para
        },()=>{
            this.setState({
                open:true
            })
            console.log("para=",this.state.para)
            
        })
        
        
    }

    handlePreview = (tableMeta) =>{
        console.log("this is table meta data",tableMeta)
        let para = {}
        para.is_manual = this.state.raw[tableMeta.rowIndex]['is_manual']
        para.access_token = this.state.raw[tableMeta.rowIndex]['access_token']
        para.invoice_id = this.state.raw[tableMeta.rowIndex]['invoice_id']
        para.req_id = this.state.raw[tableMeta.rowIndex]['id']

        this.setState({
            para:para
        },()=>{
            this.setState({
                open2:true
            })
            console.log("para=",this.state.para)
            
        })
    }

    render() {
        const { totalCount, pageNumber, users, isLoading } = this.state;
        const data = this.state.data;
        let cdata = this.state.cdata
        const { classes } = this.props;
        let value = this.state.value
        const compCol = ["ID", "Name", "Email", 'Org.No', 'Phone', 'Type']
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

        const columns = [{name:"ID"}, {name:"Email"}, {name:"Name"}, {name:"Zip Code"}, {name:"OrgNumber"},{name:"BG"},
            {
                name:"Type",
                options:{
                    customBodyRender: (value, tableMeta, updateValue) => {
                        return(
                            <div className="i_actions" style={{cursor:"pointer"}}>
                                {(value == '0')?"Not Signed":"Signed"}
                            </div>
                        )
                    }
                }
            },
            {
                name:"Details",
                options: {
                    customBodyRender: (value, tableMeta, updateValue) => {
                        console.log("value",value)
                        console.log("tableMeta",tableMeta)
                        console.log("updateValue",updateValue)
                        return (
                            <div className="i_actions" style={{cursor:"pointer"}}>
                                <i class="material-icons" onClick={()=>{
                                        this.handleDetail(tableMeta)
                                    }
                                }>
                                    details
                                </i>
                            </div>    
                        );
                      }
                    }  
            },
            {
                name:"Approve",
                options: {
                    customBodyRender: (value, tableMeta, updateValue) => {
                        console.log("value",value)
                        console.log("tableMeta",tableMeta)
                        console.log("updateValue",updateValue)
                        return (
                            <div className="i_actions" style={{cursor:"pointer"}}>
                                <i class="material-icons" onClick={()=>{
                                    this.handlePreview(tableMeta)
                                }}>
                                    drafts
                                </i>
                            </div>    
                        );
                      }
                    }  
            }
        ];


        const options = {
            filterType: 'checkbox',
        };

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
        
        let debtTab = (
            <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                        <Card>
                            
                            <CardHeader color="primary">
                                <h4 className={classes.cardTitleWhite}>Debt Collection Requests </h4>
                            </CardHeader>
                            <CardBody className="CustomTable">
                            
                                <MUIDataTable
                                    data={data}
                                    columns={columns}
                                    options={options}
                                />
                                
                                {   
                                    !isLoading?
                                        <CircularProgress className={classes.progress}  color="secondary" />
                                    :null    
                                }
                                
                            </CardBody>
                        </Card>

                        {
                            this.state.open?
                                <Detail open={true} onClose={this.handleClose} para={this.state.para} ></Detail>
                            :
                                null    
                        }

                        {
                            this.state.open2?
                                <Preview open={true} onClose={this.handleClose} para={this.state.para} ></Preview>
                            :
                                null    
                        }
                        
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
                            <Tab label="Borrow Requests" className={InputLabel} />
                        
                        </Tabs>
                        {value === 0 && companyTab}
                        {value === 1 && debtTab}
                </div> 
            </div>
        );
    }
}

Debts.propTypes = {
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

export default withStyles(styles)(connect(mapStateToProps, null)(withSnackbar(Debts)));