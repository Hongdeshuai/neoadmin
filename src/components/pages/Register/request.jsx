import React, { Component } from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import { styles } from './styles';
import Apis from '../../../utils/Apis'
import Button from '@material-ui/core/Button';
class Request extends Component  {

    constructor(props){
        super(props);
        this.state = {
            status:0,
            data:{},
            result:'',
            loading:true
        }
    }
    async componentDidMount()  {
        this.setState({ loading: true })
        this.setState({stage:0})
        let result = null
        try {
            result = await Apis.verifyAdmin(this.props.location.search)
            console.log("=================================")
            console.log("=================================",result)
            this.setState({
                loading: false,
                title: "Email Verified Successfully",
                status: true,
                data:result.data.data.data,
                result:result.data.data.status
            })
        } catch (e) {
            this.setState({
                loading: false,
                title: "Email Verification Failed",
                status: false,
                result:"Test"
            })

        }
    }
    render(){
        const { classes } = this.props;
        const {result} = this.state;
        const {data}  = this.state;
        return (
            <div>
            {
                (this.state.status=='0')?
                    <div>Loading</div>
                 :   
                 <div>
                {
                    this.state.status?
                        <Paper  className={classes.paper} elevation={10}>
                            <Typography className={classes.typo} variant="h5" component="h3">
                                The request was {result}
                            </Typography>
                            <Typography className={classes.typo} component="p">
                            
                            <Typography className={classes.typo} component="p">
                                name : {data.name}
                            </Typography>
                                email : {data.email} 
                            </Typography>
                        </Paper>
                    :
                    <Paper  className={classes.paper} elevation={10}>
                        
                        <Typography>
                            Invalid Token
                        </Typography>
                    </Paper>
                }
                
            </div>
            }
            </div>
            
        );
    }
  
}

Request.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Request);