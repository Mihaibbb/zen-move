import { Dimensions, StyleSheet } from "react-native";
import mainColors from "../../Colors/main";

const styles = StyleSheet.create({
    container: {
        width: "100%",
        minHeight: Dimensions.get("window").height
    },

    backButton: {
        position: "absolute",
        height: 55,
        width: 55,
        top: 50,
        left: 20,
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 55
    },

    bottomContainer: {
        minHeight: Dimensions.get("window").height * 0.2,
        maxHeight: Dimensions.get("window").height * 0.4,
        width: "100%",
        backgroundColor: mainColors.backgroundColor,
        borderRadius: 25,
        position: "absolute",
        bottom: 0,
        paddingHorizontal: 35,
        paddingBottom: 15
    },

    searchbarInput: {
        width: "100%"
    },

    searchbar: {
        flexDirection: "row",
        width: "100%",
        alignSelf: "center",
        alignItems: "center",
        backgroundColor: 'rgba(0, 0, 0, .6)',
        padding: 15,
        marginTop: 15,
        borderRadius: 35
    },

    searchbarIcon: {
        marginLeft: "auto"
    },

    pinGradient: {
        width: 50, 
        height: 50, 
        borderRadius: 50,
        justifyContent: "center",
        alignItems: "center"
    },

    closeRoute: {
        flexDirection: "row",
        marginVertical: 10,
        alignItems: "center",
        borderBottomWidth: 3,
        borderBottomColor: "rgba(0, 0, 0, .3)"
    },

    data: {
        flex: 0.8
    },

    goButton: {
        flex: 0.2,
        backgroundColor: "green",
        width: 50,
        height: 50,
        borderRadius: 15,
        justifyContent: "center",
        alignItems: "center"
    },

    hugeText: {
        fontSize: 22,
        color: "#fff",
        fontWeight: "900"
    },

    dataText: {
        fontSize: 22,
        color: "#fff",
        marginVertical: 15
    }
});

export default styles;