import {
    createMuiTheme
} from "@material-ui/core/styles";

export const colors = {
    black: "#191919",
    lightGrey: "#898989",
    middleGrey: "#646464",
    darkGrey: "#404040",
    lightPurple: "#7B4BC4",
    middlePurple: "#6B41AB",
    darkPurple: "#5B3791",
    lightViolet: "#6A56FF",
    middleViolet: "#604EE6",
    darkViolet: "#5545CC"
};

export const theme = createMuiTheme({
    palette: {
        primary: {
            main: colors.lightViolet
        },
        secondary: {
            main: colors.lightPurple
        },
        default: {
            main: '#fff'
        },
        type: "dark"
    },
    typography: {
        useNextVariants: true,
        fontFamily: [
            "-apple-system",
            "BlinkMacSystemFont",
            '"Segoe UI"',
            "Roboto",
            '"Helvetica Neue"',
            "Arial",
            "sans-serif",
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"'
        ].join(",")
    }
});