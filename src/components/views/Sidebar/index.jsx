import React from "react";
import {connect} from "react-redux";
import { bindActionCreators } from 'redux';

import classNames from 'classnames';
import PropTypes from 'prop-types';
import { NavLink } from "react-router-dom";
// @material-ui/core components
import { withStyles } from '@material-ui/core/styles';
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Icon from "@material-ui/core/Icon";

import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';

import styles from './styles';
import {logout} from "../../../store/actions/auth";

import Collapse from '@material-ui/core/Collapse';
const Sidebar = ({ ...props }) => {
    // verifies if routeName is the one active (in browser input)
    function activeRoute(routeName) {
        return props.location.pathname.indexOf(routeName) > -1 ? true : false;
    }

    // function handleClick()
    // {

    //     this.setState({
    //         opend:newstate
    //     })
    // }

    const logout = () => {
        props.logout();
    }

    const { classes, color, logo, image, logoText, routes } = props;

    var links = (
        <List className={classes.list}>
            
            {routes.map((prop, key) => {
                if (prop.redirect) return null;
                var activePro = " ";
                var listItemClasses;
                if (prop.path.includes("/logout")) {
                    activePro = classes.activePro + " ";
                    listItemClasses = classNames({
                        [" " + classes[color]]: true
                    });
                } else {
                    listItemClasses = classNames({
                        [" " + classes[color]]: activeRoute(prop.path)
                    });
                }
                let fontClasses = classNames({
                    [" " + classes.whiteFont]: true
                });
                if (!activeRoute(prop.path) && !prop.path.includes("/logout")) {
                    fontClasses = classNames({
                        [" " + classes.blackFont]: true
                    });
                }
                // const whiteFontClasses = classes.whiteFont;classNames({
                //     [" " + classes.whiteFont]: activeRoute(prop.path)
                // });
                
                if (!prop.path.includes("/logout")) {
                    return (
                        <NavLink
                            to={prop.path}
                            className={activePro + classes.item}
                            activeClassName="active"
                            key={key}>
                            <ListItem button className={classes.itemLink + listItemClasses}>
                                <ListItemIcon className={classes.itemIcon + fontClasses} >
                                    {typeof prop.icon === "string" ? (
                                        <Icon>{prop.icon}</Icon>
                                    ) : (
                                        <prop.icon />
                                    )}
                                </ListItemIcon>
                                <ListItemText
                                    primary={prop.sidebarName}
                                    className={classes.itemText + fontClasses}
                                    disableTypography={true}
                                />
                            </ListItem>
                        </NavLink>
                    );
                }
                return (
                    <div
                        className={activePro + classes.item}
                        activeClassName="active"
                        disableFocusRipple
                        disableRipple
                        key={key}>
                        <ListItem button className={classes.itemLink + listItemClasses} onClick={logout}>
                            <ListItemIcon className={classes.itemIcon + fontClasses} >
                                {typeof prop.icon === "string" ? (
                                    <Icon>{prop.icon}</Icon>
                                ) : (
                                    <prop.icon />
                                )}
                            </ListItemIcon>
                            <ListItemText
                                primary={prop.sidebarName}
                                className={classes.itemText + fontClasses}
                                disableTypography={true}
                            />
                        </ListItem>
                    </div>
                );
            })}
            
        </List>
    );

    var brand = (
        <div className={classes.logo}>
            <a href="/" className={classes.logoLink}>
                <div className={classes.logoImage}>
                    <img src={logo} alt="logo" className={classes.img} />
                </div>
                {logoText}
            </a>
        </div>
    );

    return (
        <div>
            <Hidden mdUp implementation="css">
                <Drawer
                    variant="temporary"
                    anchor="right"
                    open={props.open}
                    classes={{
                        paper: classes.drawerPaper
                    }}
                    onClose={props.handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true // Better open performance on mobile.
                    }}>
                    {brand}
                    <div className={classes.sidebarWrapper}>
                        {/* <HeaderLinks /> */}
                        {links}
                    </div>
                    {
                    image !== undefined ? 
                        (<div
                            className={classes.background}
                            style={{ backgroundImage: "url(" + image + ")" }}
                        />) 
                    :
                        null
                    }
                </Drawer>
            </Hidden>
            <Hidden smDown implementation="css">
                <Drawer
                    anchor="left"
                    variant="permanent"
                    open
                    classes={{
                        paper: classes.drawerPaper
                    }}>
                    {brand}
                    <div className={classes.sidebarWrapper}>{links}</div>
                    {
                        image !== undefined ? 
                            (<div
                                className={classes.background}
                                style={{ backgroundImage: "url(" + image + ")" }}
                            />) 
                        :
                            null}
                </Drawer>
            </Hidden>
        </div>
    );
};

Sidebar.propTypes = {
    classes: PropTypes.object.isRequired
};


const mapDispatchToProps = dispatch => ({
    logout : bindActionCreators(logout, dispatch),
})
  
// export default withStyles(styles)(Sidebar);
export default withStyles(styles)(connect(null, mapDispatchToProps)(Sidebar));