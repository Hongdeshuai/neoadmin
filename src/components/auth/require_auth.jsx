import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

export default function(ComposedComponent) {
    class Authentication extends Component {

        componentWillMount() {
            if (!this.props.authenticated) {
                this.context.router.history.push('/login');
            }
        }

        componentWillUpdate(nextProps) {
            if (!nextProps.authenticated) {
                this.context.router.history.push('/login');
            }
        }

        render() {
            return <ComposedComponent {...this.props} />
        }
    }

    function mapStateToProps({auth}) {
        return { authenticated: auth.authenticated };
    }

    Authentication.contextTypes = {
        router: PropTypes.object
    }

    return connect(mapStateToProps)(Authentication);
}