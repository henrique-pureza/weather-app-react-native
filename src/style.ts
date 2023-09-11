import { StyleSheet } from "react-native";

export const rem = 12;
export const em = 12;

export const css = StyleSheet.create({
    body: {
        margin: 0,
        padding: 0,

        fontFamily: "sans-serif",
        fontSize: 12,

        height: "100%"
    },
    container: {
        width: "90%"
    },
    h1: {
        fontSize: 2*em,
        fontWeight: "bold",
    },
    h2: {
        fontSize: 1.5*em,
        fontWeight: "bold",
    },
    h3: {
        fontSize: 1.17*em,
        fontWeight: "bold"
    },
    mt4: {
        marginTop: 1.5*rem
    },
    mb5: {
        marginBottom: 3*rem
    },
    mb4: {
        marginBottom: 1.5*rem
    },
    mb3: {
        marginBottom: 1*rem
    }
});
