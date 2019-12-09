import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
// core components
import CircularProgress from '@material-ui/core/CircularProgress';

import GridItem from "../../../views/GridItem";
import GridContainer from "../../../views/GridContainer";
import Card from "../../../views/Card";
import CardHeader from "../../../views/CardHeader";
import CardBody from "../../../views/CardBody";
import { withSnackbar } from 'notistack';

import { styles } from './styles';
import Apis from '../../../../utils/Apis'
import MUIDataTable from "mui-datatables";
import './table.css'
import SendMail from "./mail"
import Assign from "./assign"
class Users extends Component {

    state = {
        totalCount: 0,
        pageNumber: 1,
        users: [],
        isLoading: false,
        raw_data:[],
        note:''
    }

    componentDidMount() {
        console.log("AccountsMange ---- componentWillMount");
        this.getUsers();
    }

    async approve(email,row,state){
        console.log("I am blocking",row, state)
        let result = await Apis.approve({"email":email,state:state})
        if(result.status == 200){
            console.log("Yes it is")
            let tmp = this.state.data;
            tmp[row][11] = state
            this.setState({
                data:tmp
            })
        }
        console.log("this is blocking result",result)
    }

    showMail(email,row){
        console.log("=============let me see==============",this.state.raw_data[row])
        
        this.setState({email:email, note: this.state.raw_data[row]['note']},()=>{
            this.setState({open:true})
        })
        
    }

    updateNote = ()=>{
        this.getUsers()
        this.setState({open:false, assign_open:false})
    }
    closeMail = ()=>{
        this.setState({open:false, assign_open:false})
    }
    
    // numberWithSpaces(x) {
    //     return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    // }
    async  getUsers(){
        let response = await Apis.getUsers("admin");
        let data = []
        console.log("respose", response.data.data)
        
        if(response.status ==200){
            if(!response.data.data) {
                this.setState({
                    data:data,
                    raw_data:response.data.data,
                    isLoading:true
                })
                return null;    
            }
            let tmp = response.data.data
            
            tmp.map((val,key)=>{
                console.log(key,val)
                data[key] = []
                data[key][0] = val['first_name'] +" " +  val['sur_name']
                data[key][1] = val['email']? val['email']: ''
                data[key][2] = val['phone']? val['phone']: ''
                data[key][3] = val['name']? val['name'] : ''
                data[key][4] = val['password']? val['password'] : ''
                data[key][5] = val['address'] ? val['address'] : ''
                data[key][6] = val['city']? val['city']: ''
                data[key][7] = val['province']? val['province']: ''
                data[key][8] = val['postal_code']? val['postal_code'] :''
                data[key][9] = val['dni']? val['dni'] : ''
                data[key][10] = val['student_number']? val['student_number'] : ''
                data[key][11] = val['status']? val['status'] : 0
                // data[key][2] = val['block']
            })
            this.setState({
                data:data,
                raw_data:tmp,
                isLoading:true,
                open:false
            })
        }
        else{
            alert("error reading")
            this.setState({isLoading:true})
        }        
        // console.log(data)
        // this.setState({data:data})
    }

    async assign(email,row){
        // alert(`hello${email}`)
        this.setState({email:email,assign_open:true})
        
    }
    render() {
        const columns = [{name: "Name"},{name : "Email Address"}, {name : "Phone"}, {name : "Username"},{ name : "Password"},  
                {name:"Address"}, {name:"City"}, {name:"Province"},{name:"Postal"},{name:"DNI"},{name:"Student"},
                {
                name:"Action",
                options: {
                customBodyRender: (value, tableMeta, updateValue) => {
                    console.log("value",value)
                    console.log("tableMeta",tableMeta)
                    console.log("updateValue",updateValue)
                    return (
                        <div className="i_actions" style={{cursor:"pointer"}}>
                            <i class="material-icons" onClick={()=>{
                                this.showMail(tableMeta['rowData'][1],tableMeta['rowIndex']);
                                
                            }}>
                                note
                            </i>
                            {
                                (value=="0")?
                                    <i class="material-icons" onClick={()=>{
                                        this.approve(tableMeta['rowData'][1],tableMeta['rowIndex'],1);
                                        
                                    }}>
                                        lock_open
                                    </i>
                                :
                                    <i class="material-icons" onClick={()=>{
                                        this.approve(tableMeta["rowData"][1],tableMeta['rowIndex'],0);
                                    }}>
                                        lock
                                    </i>
                            }

                            <i class="material-icons" onClick={()=>{
                                        this.assign(tableMeta["rowData"][1],tableMeta['rowIndex']);
                                        
                            }}>
                                edit
                            </i>

                          
                        </div>    
                    );
                  }
                }         
            }
        ];

        const data = this.state.data;

        const options = {
            rowsSelected:false,
            selectableRows:false,
            print:false,
            download:false,
            filter:false
        };

        const { classes } = this.props;
        const {  isLoading } = this.state;
        const {open} = this.state
        return (
            <div container>
                <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                        <Card>
                            
                            <CardHeader color="primary">
                                <h4 className={classes.cardTitleWhite}>Users </h4>
                            </CardHeader>
                            <CardBody className="CustomTable">
                            
                                <MUIDataTable
                                    data={data}
                                    columns={columns}
                                    options={options}
                                />
                                {
                                    this.state.open?
                                        <SendMail open={true} onClose={this.closeMail} onUpdate={this.updateNote} email={this.state.email} note={this.state.note}/>
                                    :null    
                                }
                                {
                                    this.state.assign_open?
                                        <Assign open={true} onClose={this.closeMail} email={this.state.email}/>
                                    :null
                                }
                                {   !isLoading?
                                        <CircularProgress className={classes.progress}  color="secondary" />
                                    :null    
                                }
                                
                                
                            </CardBody>
                        </Card>
                    </GridItem>
                </GridContainer>
            </div>
        );
    }
}

Users.propTypes = {
    classes: PropTypes.object.isRequired
};

let mapStateToProps = (state) => {
    return {
        email: state.auth.email,
        token: state.auth.token,
        apiKey: state.auth.api_key
    };
}

export default withStyles(styles)(connect(mapStateToProps, null)(withSnackbar(Users)));