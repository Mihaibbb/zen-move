import { Dimensions, Platform, StyleSheet } from "react-native";
import mainColors from "../../Colors/main";

const styles = StyleSheet.create({
    container: {
        width: "100%",
        minHeight: Dimensions.get("window").height - 75,
        alignItems: "center",
        marginTop: Platform.OS === "ios" ? 60 : 35,
        
    },

    category: {
        width: "100%",
        maxWidth: "90%",
        
        flexDirection: "row",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 8,
        borderRadius: 20
    },

    categoryClickable: {
        flexDirection: "row",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%"
    },

    categoryText: {
        fontSize: 35,
        fontWeight: "bold",
        color: "#fff",
        width: "50%",
        textAlign: "center"
        
    },

    categoryIcon: {
       maxWidth: 50,
       maxHeight: 50
    },

    searchBar: {
        flex: .45,
        
        alignItems: "center",
        flexDirection: "row",
        width: "100%",
        maxWidth: "90%",
        height: 100,
        marginHorizontal: "auto",
        backgroundColor: mainColors.backgroundColor,
        borderRadius: 50,
        paddingHorizontal: 16,
        marginBottom: 25
    },

    searchBarInput: {
        marginLeft: 15,
        height: "100%",
        width: "100%",
        color: "#fff"
    }
});

export default styles;