import { ScrollView, Text, View } from "react-native";
import mainColors from "../../Colors/main";
import styles from "./Styles";
import { LinearGradient } from 'expo-linear-gradient';
import Categories from "../../Categories/categories";

const SelectAutomobile = () => {

    return (
        <View style={styles.container}>

            {Categories.map((category, idx) => (
                <LinearGradient 
                    colors={[mainColors[category.lightColor], mainColors[category.darkColor]]} 
                    style={styles.category}
                    key={idx}
                >
                   <Text style={styles.categoryText}>{category.name}</Text>
               </LinearGradient>
            ))}

         
        </View>
    );
};

export default SelectAutomobile;