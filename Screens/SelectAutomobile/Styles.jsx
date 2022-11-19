import { Dimensions, Platform, StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        width: "100%",
        minHeight: Dimensions.get("window").height,
        alignItems: "center",
        marginTop: Platform.OS === "ios" ? 60 : 35,
        
    },

    category: {
        width: "100%",
        maxWidth: "90%",
        maxHeight: "20%",
        
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 10,
        borderRadius: 20
    },

    categoryText: {
        fontSize: 35,
        fontWeight: "bold",
        color: "#fff"
    }
});

export default styles;