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
        borderRadius: 35,
        borderWidth: 2,
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
       
      
    },

    closeRouteCard: {
        width: "100%",
        marginVertical: 35,
        borderRadius: 25,
        padding: 15
    },

    closeRouteName: {
        flexDirection: "row",
        alignItems: "center"
    },

    closeRouteText: {
        color: "#fff",
        fontWeight: "bold",
        marginLeft: 10,
        fontSize: 18
    },

    data: {
        flex: 0.8
    },

    goButton: {
        flex: 0.2,
        backgroundColor: mainColors.backgroundColor,
       
       
        borderRadius: 15,
        justifyContent: "center",
        alignItems: "center",
        padding: 8,
        height: 65,
        width: 50
    },

    hugeText: {
        fontSize: 22,
        color: "#fff",
        fontWeight: "900"
    },

    dataText: {
        fontSize: 18,
        color: "#fff",
        marginVertical: 10,
        fontWeight: "500"
    }
});

export default styles;