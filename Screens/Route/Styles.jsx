import { Dimensions, StyleSheet } from "react-native";

const styles = StyleSheet.create({

    container: {
        
        width: "100%",
        minHeight: Dimensions.get("window").height,
        justifyContent: "center"
    },

    mapContainer: {
        width: "100%",
        height: Dimensions.get("window").height * .5,
       
    },

    content: {
        minHeight: Dimensions.get("window").height * .35,
        width: "100%",
       
    },

    backButton: {
        position: "absolute",
        height: 55,
        width: 55,
        top: 50,
        left: 20,
        zIndex: 100,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 55
    },

    pay: {
        width: "100%",
        height: 80,
        padding: 16,
        borderRadius: 16
    },

    payText: {
        fontWeight: "900",
        color: "#fff",
        textAlign: "center",
        fontSize: 22
    },

    pinGradient: {
        width: 50, 
        height: 50, 
        borderRadius: 50,
        justifyContent: "center",
        alignItems: "center"
    },

    multipleCards: {
     
        height: "90%",
        width: "90%",
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
        marginVertical: 25,
        marginBottom: 100
       
    },
    
    card: {
        height: "33.33%",
        maxHeight: 125,
        width: "100%",
        marginVertical: 10,
        borderRadius: 25,
       
    },

    infoContainer: {
        flexDirection: "row",
        alignItems: "center",
        margin: 10
    },

    infoText: {
        fontSize: 18,
        fontWeight: "400",
        marginLeft: 10,
        color: "rgba(255, 255, 255, .7)",
        textAlign: "center"
    },

    responseText: {
        color: "rgba(255, 255, 255, .7)",
        fontSize: 18,
        fontWeight: "bold",
        marginHorizontal: 20,
        marginVertical: 8
    }
});

export default styles;