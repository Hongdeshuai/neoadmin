import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
// core components
import CircularProgress from '@material-ui/core/CircularProgress';

import GridItem from "../../../views/GridItem";
import GridContainer from "../../../views/GridContainer";
import Card from "../../../views/Card";
import CardHeader from "../../../views/CardHeader";
import CardBody from "../../../views/CardBody";
import { withSnackbar } from 'notistack';

import { styles } from './styles';
import { createStyles, withStyles } from '@material-ui/core/styles';
import Apis from '../../../../utils/Apis'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Divider from '@material-ui/core/Divider';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import CreateNewFolder from '@material-ui/icons/CreateNewFolder';
import AddBoxIcon from '@material-ui/icons/AddBox';
import FolderIcon from '@material-ui/icons/Folder';
import Subject from '@material-ui/icons/Subject';
import FolderCreateModal from './folder_create';
import FileCreateModal from './file_create'
import { Typography } from "@material-ui/core";
import Collapse from '@material-ui/core/Collapse';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { InputLabel } from "@material-ui/core";
import firebase from "firebase";
 
const config = {
  apiKey: "AIzaSyDs-AM6a4friRKfD5pHWYC_syorBQ6MDnU",
  authDomain: "neostudio-4034f.firebaseapp.com",
  storageBucket: "gs://neostudio-4034f.appspot.com"
};


class Material extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            fetching: false,
            selected: 0,
            files: [],
            file_selected: null,
            openFolderCreate: false,
            openFileCreate: false,
            value: 0
        }
        if (!firebase.apps.length) {
            firebase.initializeApp(config);
        }
    }

    handleChange = (event, value)=>{
        this.setState({value:value, selected:0, file_selected:null},()=>{
            this.fetchData()
        })

        
    }
    fetchData = () => {
        this.setState({ fetching: true })
        Apis.getMaterial(this.state.value).then((resp) => {
            let data = resp.data.data
            this.setState({ fetching: false, data: data, openFolderCreate: false, openFileCreate: false })
            console.log(resp.data.data)
        }).catch((e) => {
            this.setState({ fetching: false, data: [], openFolderCreate: false, openFileCreate: false })
        })
    }

    handleCreateFolder = (name) => {
        this.setState({ openFolderCreate: true })
    }
    handleDeleteFolder = ()=>{
        if(this.state.selected != null){
            this.setState({fetching:true})
            Apis.deleteMaterialFolder(this.state.data[this.state.selected]['_id']).then((resp)=>{
                this.fetchData()
            }).catch((e)=>{
                console.log(e)
                this.setState({fetching:false})
            })
            
        }
    }

    handleCreateFile = () => {
        this.setState({ openFileCreate: true })
    }
    handleDeleteFile = ()=>{
        if(this.state.selected != null && this.state.file_selected != null){
            this.setState({fetching:true})
            let data = {}
            data.folder_id = this.state.data[this.state.selected]['_id']
            data.mat_id = this.state.data[this.state.selected]['mat_files'][this.state.file_selected]['_id']
            Apis.deleteMaterial(data.folder_id, data.mat_id).then((resp)=>{
                this.fetchData()
            }).catch((e)=>{
                console.log(e)
                this.setState({fetching:false})
            })
            
        }
    }
    onCloseFolderCreate = () => {
        this.setState({ openFolderCreate: false })
    }
    onCloseFileCreate = () => {
        this.setState({ openFileCreate: false })
    }
    componentDidMount() {
        this.setState({value:0})
        this.fetchData()
    }

    render() {
        let classes = this.props.classes
        let { fetching, data, selected, value } = this.state

        let folderItem = (item, key) => {
            return (
                <ListItem button selected={this.state.selected == key}
                    onClick={() => {
                        this.setState({ selected: key, file_selected: null })
                        console.log(item)
                    }}
                >
                    <ListItemIcon>
                        <FolderIcon />
                    </ListItemIcon>
                    <ListItemText primary={item.folder_name} />
                </ListItem>
            )
        }

        let fileItem = (item, key) => {
            return (
                <>
                    <ListItem button selected={this.state.file_selected == key}
                        onClick={() => {
                            this.setState({ file_selected: key })
                        }}
                    >
                        <ListItemIcon>
                            <Subject />
                        </ListItemIcon>
                        <ListItemText primary={item.name} />
                    </ListItem>

                    <Collapse in={this.state.file_selected == key} timeout="auto" unmountOnExit>
                        <ListItemText className={classes.nested} style={{padding:"10px",paddingLeft:"30px",whiteSpace:"pre-line"}} primary={`${item.url}`} />
                    </Collapse>


                </>
            )
        }

        let audioTab = (
            <GridContainer>
                <GridItem xs={12} sm={12} md={4}>

                        <Card>
                            <CardHeader color={'success'}>
                                <CreateNewFolder className={classes.action_button} onClick={() => {
                                    this.handleCreateFolder();
                                }}></CreateNewFolder>
                                <DeleteIcon className={classes.action_button} style={{ float: 'right' }}
                                    onClick={()=>{
                                        this.handleDeleteFolder()}
                                    }
                                />
                                <EditIcon className={classes.action_button} style={{ float: 'right' }} 
                                    // onClick={this.handleDeleteFolder}
                                />
                            </CardHeader>
                            <CardBody className="CustomTable">
                                {
                                    fetching ? <CircularProgress></CircularProgress> : null
                                }
                                <GridItem xs={12} sm={12} md={12}>
                                    <List component="nav" aria-label="main mailbox folders">
                                        {

                                            data.map((prop, key) => {
                                                return folderItem(prop, key)
                                            })

                                        }
                                    </List>
                                </GridItem>
                            </CardBody>
                        </Card>
                    </GridItem>

                <GridItem xs={12} sm={12} md={6}>
                    <Card>
                        <CardHeader color={'secondary'}>
                            <AddBoxIcon className={classes.action_button} onClick={() => {
                                this.handleCreateFile();
                            }} />
                            <DeleteIcon className={classes.action_button} style={{ float: 'right' }} 
                                onClick={()=>{
                                    this.handleDeleteFile()
                                }}
                            />
                            <EditIcon className={classes.action_button} style={{ float: 'right' }} />
                        </CardHeader>
                        <CardBody className="CustomTable">
                            <GridItem xs={12} sm={12} md={12}>
                                <List component="nav" aria-label="main mailbox folders">
                                    {
                                        data && data[selected] ?
                                            data[selected]['mat_files'].map((prop, key) => {
                                                return fileItem(prop, key)
                                            })
                                            :
                                            null
                                    }
                                </List>
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
                        <Tab label="Audio Files" className={InputLabel} />
                        <Tab label="Video Files" className={InputLabel} />
                    
                    </Tabs>
                    {value === 0 && audioTab}
                    {value === 1 && audioTab}
                </div>

                {
                    this.state.openFolderCreate ?
                        <FolderCreateModal type={(this.state.value===0)?'audio':'video'} onCreate={this.fetchData} onClose={this.onCloseFolderCreate}></FolderCreateModal>
                        : null
                }
                {
                    this.state.openFileCreate ?
                        <FileCreateModal  type={(this.state.value===0)?'audio':'video'} onCreate={this.fetchData} onClose={this.onCloseFileCreate} id={this.state.data[selected]._id}></FileCreateModal>
                        : null
                }
            </div>
        )
    }
}

Material.propTypes = {
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

export default withStyles(styles)(connect(mapStateToProps, null)(withSnackbar(Material)));