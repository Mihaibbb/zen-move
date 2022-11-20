import { Ionicons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import styles from '../Screens/SelectAutomobile/Styles';


const Categories = [
    {
        name: "Bus",
        lightColor: "blue",
        darkColor: "blue2",
        icon: <Ionicons name="bus-outline" size={50} color='#fff' style={styles.categoryIcon} />,
        smIcon: <Ionicons name="bus-outline" size={35} color='rgba(255, 255, 255, .7)' style={styles.categoryIcon} />
    },

    {
        name: "Train",
        lightColor: "green",
        darkColor: "green2",
        icon: <Ionicons name="ios-train-outline" size={50} color='#fff' style={styles.categoryIcon} />
    },

    {
        name: "Tramway",
        lightColor: "yellow",
        darkColor: "yellow2",
        icon: <MaterialIcons name="tram" size={50} color='#fff' style={styles.categoryIcon} />
    },

    {
        name: "Taxi",
        lightColor: "purple",
        darkColor: "purple2",
        icon: <FontAwesome5 name="taxi" size={50} color='#fff' style={styles.categoryIcon} />
    }
];

export default Categories;
