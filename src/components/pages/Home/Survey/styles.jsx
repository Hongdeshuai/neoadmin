export const styles = theme => ({
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
    
    formControl: {
        margin: theme.spacing.unit,
        width: `calc(100% - ${theme.spacing.unit * 2}px)`
    },
    inputlabel: {
        fontSize: 18,
    },
    inputbaseRoot: {
        'label + &': {
            marginTop: theme.spacing.unit * 3,
        },
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
        ].join(','),
        // '&:focus': {
        //     borderColor: '#80bdff',
        //     boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
        // },
    },
      
    btnUpdate: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        marginTop: theme.spacing.unit,
        marginBottom: 20,
        // marginTop: -5,
        fontSize: 15,
        textTransform: 'none',
    },
});
