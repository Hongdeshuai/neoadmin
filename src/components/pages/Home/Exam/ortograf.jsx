import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
// core components
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Collapse from '@material-ui/core/Collapse';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Subject from '@material-ui/icons/Subject';

import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

import GridItem from "../../../views/GridItem";
import GridContainer from "../../../views/GridContainer";
import Card from "../../../views/Card";
import CardHeader from "../../../views/CardHeader";
import CardBody from "../../../views/CardBody";
import { withSnackbar } from 'notistack';

import Modal from './modal_ortograf'
import { styles } from './styles';
import Apis from '../../../../utils/Apis'
import Preview from "./preview"


const columns = [
    {
        id: '_id',
        label: 'ID',
        minWidth: 200,
        format: value => value.slice(value.length - 4, value.length)
    },

    {
        id: 'Question', label: 'Question and Answer', minWidth: 300,
        format: value => value
    }
];

class Ortograf extends Component {
    constructor(props) {
        super(props)
        this.state = {
            totalCount: 0,
            pageNumber: 0,
            page: 0,
            rowsPerPage: 10,
            users: [],
            isLoading: false,
            open: false,
            raw: {},
            para: {},
            value: 0,
            open2: false,
            selectedCompanies: [],
            data: [],
            selected: null
        }
    }



    fetchData = () => {
        this.setState({ isLoading: false })
        Apis.readOrtografExam().then((resp) => {
            console.log(resp.data)
            this.setState({ data: resp.data.data, isLoading: true })
        }).catch((e) => {
            this.setState({ isLoading: true })
            return

        })
    }
    componentDidMount() {
        this.fetchData()
    }
    handleClose = () => {
        this.setState({ open: false })
        this.fetchData()
    }
    handleChangePage = (event, newPage) => {
        this.setState({
            page: newPage
        })
    }

    handleDelete = (id) => {
        Apis.deleteOrtograf(id).then((resp) => {
            this.fetchData()
        }).catch((e) => {
            alert("failed")
        })
    }
    handleChangeRowsPerPage = (event) => {
        this.setState({
            rowsPerPage: +event.target.value,
            page: 0
        })
    }
    render() {
        let { totalCount, pageNumber, users, isLoading, page, rowsPerPage, data } = this.state;
        let { classes } = this.props;
        return (
            <div container>
                <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                        <Card>
                            <CardHeader color="primary">
                                <h4 className={classes.cardTitleWhite}>Codigo Exam</h4>
                            </CardHeader>
                            <br></br>
                            <GridContainer>

                                    <Button color="primary" variant="contained" className={classes.btnNewAccount}
                                        onClick={() => {
                                            this.setState({ open: true })
                                        }}
                                    >
                                        Create new QA
                                        </Button>    
                            
                                    <Button color="secondary" variant="contained" className={classes.btnNewAccount}
                                        onClick={() => {
                                            this.refs.file.click()
                                        }}
                                    >
                                        Import from File
                                    </Button>
                                    <input type='file' ref='file' accept=".csv" style={{display:"none"}}
                                        onChange ={e=>{
                                            console.log(e.target.files[0])
                                            if(e.target.files.length>0){
                                                Apis.uploadOrtograf(e.target.files[0]).then(()=>{
                                                    this.fetchData()
                                                    
                                                })
                                                e.target.value = null
                                            }
                                        }}
                                    />

                                    <Button color="" variant="contained" className={classes.btnNewAccount}
                                        onClick={() => {
                                            Apis.deleteOrtograf('all').then(()=>{
                                                this.fetchData()
                                            })
                                        }}
                                    >
                                        Clear all
                                    </Button>
                            </GridContainer>
                            
                            <CardBody className="CustomTable">
                                <Table stickyHeader>
                                    <TableHead>
                                        <TableRow>
                                            {columns.map(column => (
                                                <TableCell
                                                    key={column.id}
                                                    align={column.align}
                                                    style={{ minWidth: column.minWidth, fontWeight: "900", borderBlockColor: "black", color: "black" }}
                                                >
                                                    {column.label}
                                                </TableCell>
                                            ))}
                                            <TableCell style={{ fontWeight: "900", borderBlockColor: "black", color: "black" }}>
                                                Action
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {this.state.data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
                                            return (
                                                <TableRow selected={this.state.selected == row['_id']} hover role="checkbox" style={{ cursor: "pointer" }} tabIndex={-1} key={row.code} onClick={() => {
                                                }}>
                                                    {columns.map(column => {

                                                        if (column.id == 'Question') {
                                                            return (
                                                                <List component="nav" aria-label="main mailbox folders">
                                                                    <ListItem button
                                                                        onClick={() => {
                                                                            this.setState({ selected: row['_id'] })
                                                                        }}
                                                                    >
                                                                        <ListItemIcon>
                                                                            <Subject />
                                                                        </ListItemIcon>
                                                                        <ListItemText primary={row['Correct']} />
                                                                    </ListItem>

                                                                    <Collapse in={this.state.selected == row['_id']} timeout="auto" unmountOnExit>
                                                                        <ListItemText className={[classes.nested]} style={{ padding: "10px", paddingLeft: "30px", whiteSpace: "pre-line" }} primary={`Description1: ${row['Description1']}`} />
                                                                        <ListItemText className={classes.nested} style={{ padding: "10px", paddingLeft: "30px", whiteSpace: "pre-line" }} primary={`Incorrect: ${row['Incorrect']}`} />
                                                                        <ListItemText className={classes.nested} style={{ padding: "10px", paddingLeft: "30px", whiteSpace: "pre-line" }} primary={`Description2: ${row['Description2']}`} />
                                                                    </Collapse>


                                                                </List>
                                                            )
                                                        }
                                                        return (
                                                            <TableCell key={column._id}>
                                                                {column.format((row[column.id]))}
                                                            </TableCell>
                                                        );
                                                    })}
                                                    <TableCell key={"a"}>
                                                        <i class="material-icons" onClick={() => {
                                                            this.handleDelete(row['_id'])
                                                            // alert(row['_id'])
                                                        }}>
                                                            delete
                                            </i>
                                                    </TableCell>
                                                </TableRow>
                                            );

                                        })}

                                    </TableBody>
                                </Table>
                                <TablePagination
                                    rowsPerPageOptions={[10, 25, 100]}
                                    component="div"
                                    count={data.length}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    backIconButtonProps={{
                                        'aria-label': 'previous page',
                                    }}
                                    nextIconButtonProps={{
                                        'aria-label': 'next page',
                                    }}
                                    onChangePage={this.handleChangePage}
                                    onChangeRowsPerPage={this.handleChangeRowsPerPage}
                                />


                                {
                                    !isLoading ?
                                        <CircularProgress className={classes.progress} color="secondary" />
                                        : null
                                }

                            </CardBody>
                            
                        </Card>

                                {
                                    this.state.open ?
                                        <Modal open={true} onClose={this.handleClose} para={this.state.para} ></Modal>
                                        :
                                        null
                                }

                                {
                                    this.state.open2 ?
                                        <Preview open={true} onClose={this.handleClose} para={this.state.para} ></Preview>
                                        :
                                        null
                                }

                    </GridItem>
                </GridContainer>
            </div>
                    );
                }
            }
            
            Ortograf.propTypes = {
                        classes: PropTypes.object.isRequired
                };
                
let mapStateToProps = (state) => {
    return {
                    };
                }
                
export default withStyles(styles)(connect(mapStateToProps, null)(withSnackbar(Ortograf)));