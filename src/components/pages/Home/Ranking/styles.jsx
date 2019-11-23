import {
    defaultFont
} from "../../../../App/styles";

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

    operationButton : {
        defaultFont,
        height: 25,
        width: 40,
        fontSize: 11,
    },
    progress: {
        margin: theme.spacing.unit * 2,
        position:"absolute",
        left:'50%',
        top : '180px'
      },
      
});
