import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
// core components

import { withSnackbar } from 'notistack';
import './styles.css'
import Psico from './psico'
import Ingles from './ingles'
import Codigo from './codigo'
import Ortograf from './ortograf'

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { InputLabel } from "@material-ui/core";
import { styles } from './styles';
import Apis from '../../../../utils/Apis'


const columns = [
    { id: '_id', label: 'ID', minWidth: 200 },

    { id: 'content', label: 'Content', minWidth: 300 },
    {
        id: 'createdAt',
        label: 'Created At',
        minWidth: 120,
        align: 'left',
        format: value => value.toLocaleString(),
    },
];

class Exam extends Component {
    constructor(props){
        super(props)
        this.state = {
            totalCount: 0,
            pageNumber: 0,
            page : 0,
            rowsPerPage : 10,
            users: [],
            isLoading: false,
            open:false,
            raw : {},
            para:{},
            value:0,
            open2:false,
            selectedCompanies : [],
            data : [],
            value : 0
        }
    }
    

   
    fetchData = () =>{
        this.setState({isLoading : false})
        Apis.readNews().then((resp)=>{
            console.log(resp.data)
            this.setState({data:resp.data.data, isLoading:true})
        }).catch((e)=>{
            this.setState({isLoading:true})
            return

        })
    }
    componentDidMount() {
        this.fetchData()
    }
    handleClose = () =>{
        this.setState({open : false})
        this.fetchData()
    }
    handleChangePage = (event, newPage) => {
        this.setState({
            page: newPage
        })
    }

    handleChange = (event, value)=>{
        this.setState({value:value},()=>{
            // this.fetchData()
        })
    }

    handleDelete = (id) =>{
        const name = '';
        const age = 0;
        const values = [];
        const properties = {};
        const answer = name || age || values || properties;
        const check = answer == [];
        alert(check)
        console.log("=================", answer)
    }

    handleChangeRowsPerPage = (event) => {
        this.setState({
            rowsPerPage : +event.target.value,
            page : 0
        })
    }
    
    render() {
        let { value, totalCount, pageNumber, users, isLoading, page, rowsPerPage, data } = this.state;
        let { classes } = this.props;
        
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
                        <Tab label="Codigo" className={InputLabel} />
                        <Tab label="English" className={InputLabel} />
                        <Tab label="Ortograf" className={InputLabel} />
                        <Tab label="Picture puzzle" className={InputLabel} />
                    
                    </Tabs>
                    {value === 0 && <Codigo data = {data}></Codigo>}
                    {value === 1 && <Ingles data = {data}></Ingles>}
                    {value === 2 && <Ortograf data = {data}></Ortograf>}
                    {value === 3 && <Psico data = {data}></Psico>}
                </div>
            </div>
        )
    }
}

Exam.propTypes = {
    classes: PropTypes.object.isRequired
};

let mapStateToProps = (state) => {
    return {
    };
}

export default withStyles(styles)(connect(mapStateToProps, null)(withSnackbar(Exam)));