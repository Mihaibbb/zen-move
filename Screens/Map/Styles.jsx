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
        width: "100%",
        backgroundColor: mainColors.backgroundColor,
       
    },

    searchbarInput: {
        
    },

    searchbar: {
        flexDirection: "row",
        width: "90%",
       
        marginHorizontal: "auto",
        alignItems: "center",
        backgroundColor: 'rgba(0, 0, 0, .6)',
        padding: 15
    }
});

export default styles;