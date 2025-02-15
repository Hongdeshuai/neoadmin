import React, { Component } from "react";
import PropTypes from 'prop-types';
import { Switch, Route, Redirect } from "react-router-dom";
import "perfect-scrollbar/css/perfect-scrollbar.css";
// @material-ui/core components
import { withStyles } from '@material-ui/core/styles';

import { styles } from './styles';

import Header from "../../views/Header"
import Sidebar from '../../views/Sidebar';
import homeRoutes from '../../../routes/home';
import logo from '../../../assets/logo12.png';

const switchRoutes = (
    <Switch>
        {homeRoutes.map((prop, key) => {
            if (prop.redirect)
                return <Redirect from={prop.path} to={prop.to} key={key} />;
            return <Route path={prop.path} component={prop.component} key={key} />;
        })}
    </Switch>
);

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mobileOpen: false
        };
        this.resizeFunction = this.resizeFunction.bind(this);
    }

    handleDrawerToggle = () => {
        this.setState({ mobileOpen: !this.state.mobileOpen });
    };

    getRoute() {
        return this.props.location.pathname !== "/maps";
    }

    resizeFunction() {
        if (window.innerWidth >= 960) {
            this.setState({ mobileOpen: false });
        }
    }

    componentDidMount() {
        // if (navigator.platform.indexOf("Win") > -1) {
        //     const ps = new PerfectScrollbar(this.refs.mainPanel);
        // }
        window.addEventListener("resize", this.resizeFunction);
    }

    componentDidUpdate(e) {
        if (e.history.location.pathname !== e.location.pathname) {
            this.refs.mainPanel.scrollTop = 0;
            if (this.state.mobileOpen) {
                this.setState({ mobileOpen: false });
            }
        }
    }
    componentWillUnmount() {
        window.removeEventListener("resize", this.resizeFunction);
    }

    render() {
        const { classes, ...rest } = this.props;
        return (
            <div className={classes.wrapper}>
                <Sidebar
                    routes={homeRoutes}
                    logoText={""}
                    logo={logo}
                    // image={image}
                    handleDrawerToggle={this.handleDrawerToggle}
                    open={this.state.mobileOpen}
                    color="primary"
                    {...rest}
                />
                <div className={classes.mainPanel} ref="mainPanel">
                    <Header
                        routes={homeRoutes}
                        handleDrawerToggle={this.handleDrawerToggle}
                        {...rest}
                    />
                    {/* On the /maps route we want the map to be on full screen - this is not possible if the content and conatiner classes are present because they have some paddings which would make the map smaller */}
                    {this.getRoute() ? (
                        <div className={classes.content}>
                        <div className={classes.container}>{switchRoutes}</div>
                        </div>
                    ) : (
                        <div className={classes.map}>{switchRoutes}</div>
                    )}
                    {/* {this.getRoute() ? <Footer /> : null} */}
                </div>
            </div>
        );
    }
}

Home.propTypes = {
    classes: PropTypes.object.isRequired
};
  
export default withStyles(styles)(Home);