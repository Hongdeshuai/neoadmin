import {
    defaultFont
} from "../../../../App/styles";
import red from '@material-ui/core/colors/red';
export const styles = theme => ({
    CustomTable:{
        " td":{
            fontSize: "19px",
        }
    },
    cardCategoryWhite: {
        "&,& a,& a:hover,& a:focus": {
            color: "rgba(255,255,255,.62)",
            margin: "0",
            fontSize: "14px",
            marginTop: "0",
            marginBottom: "0"
        },
        "& a,& a:hover,& a:focus": {
            color: "#FFFFFF"
        }
    },

    title: {
        '& h2': {
          fontSize:20
        }
    },
    
    cardTitleWhite: {
        color: "#FFFFFF",
        marginTop: "0px",
        minHeight: "auto",
        fontWeight: "300",
        fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
        marginBottom: "3px",
        textDecoration: "none",
        "& small": {
            color: "#777",
            fontSize: "65%",
            fontWeight: "400",
            lineHeight: "1"
        }
    },
    status: {
        fontSize: 12
    },

    main_container: {
        minWidth: 400
    },
    formControl: {
        margin: theme.spacing.unit
    },
    inputlabel: {
      fontSize: 18,
    },
    inputbaseRoot: {
        'label + &': {
            marginTop: theme.spacing.unit * 3,
        },
    },
    help:{
        fontSize:20
    },
    inputbaseInput: {
        // borderRadius: 4,
        // border: '1px solid #ced4da',
        height:24,
        backgroundColor: theme.palette.common.white,
        fontSize: 16,
        padding: '10px 12px',
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        // Use the system font instead of the default Roboto font.
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(',')
    },
    btnNewAccount: {
        marginLeft: theme.spacing.unit + 20,
        marginRight: theme.spacing.unit + 20,
        marginBottom: 15,
        // marginTop: -5,
        fontSize: 15,
        textTransform: 'none',
    },
    wrapper: {
        margin: theme.spacing.unit,
      //   backgroundColor:'#f00',
        position: 'relative',
    },
    buttonProgress: {
        color: red[500],
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
        zIndex:10000
    },
    progress: {
        margin: theme.spacing.unit * 2,
        position:"absolute",
        left:'50%',
        top : '180px'
      },
    btnCancel:{
        marginLeft: theme.spacing.unit + 20,
        marginRight: theme.spacing.unit + 20,
        marginBottom: 15,
        // marginTop: -5,
        fontSize: 15,
        textTransform: 'none',
    }  
});
