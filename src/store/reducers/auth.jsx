import { handleActions } from 'redux-actions';
import { 
    loginRequesting,
    loginSuccess,
    loginFailure,
    logout
} from '../actions/auth';

  
const initialState = () => {
    const session = JSON.parse(localStorage.getItem('session'))
    return ({
        requesting: false,
        authenticated: session !== undefined && session != null ? 1 : 0, //0: init, 1: login_success, -1: login failed 
        email: session?session.email:'',
        api_key:session?session.api_key:'',
        token: session?session.token:'',
        companies: session?session.companies:[],
        message: {},
        error: {},
    })
};

export default handleActions(
    {
        [loginRequesting]: (state) => {
            return {
                ...state,
                requesting: true,
                authenticated: 0,
                email: '',
                message: { body: 'Logging in...', time: new Date() },
                error: {},
            }
        },

        [loginSuccess]: (state, {payload}) => {
            localStorage.setItem('session', JSON.stringify(payload));
            console.log("session", payload);
            return {
                ...state,
                requesting: false,
                authenticated: 1,
                email: payload.email,
                token: payload.token,
                api_key:payload.api_key,
                name:payload.name,
                companies:payload.companies,
                message: {},
                error: {},
            }
        },

        [loginFailure]: (state, {payload}) => {
            console.log("loginFailure -------", payload);
            return {
                ...state,
                requesting: false,
                authenticated: -1,
                message: {},
                error: {
                    body: "Log in failed",
                    time: new Date(),
                },
            }
        },

        [logout]: (state) => {
            localStorage.removeItem('session');
  
            return {
                ...state, authenticated: 0, token:'', email:'', api_key:''
            }
        },
        
        // [resetPassword]: (state, {payload}) => {
        //     return {
        //         ...state, resetPassword: true,
        //    }
        // },
    },
    initialState()
);