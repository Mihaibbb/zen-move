import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { useState } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import { Dimensions, ScrollView, TextInput, TouchableOpacity, View } from 'react-native';
import styles from './Styles';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import mainColors from '../../Colors/main'; 
import getDistance from '../../DistanceGeolocation/DistanceGeolocation';

const Map = ({ route, navigation }) => {

    const { vehicle, color1, color2 } = route.params;
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [initialRegion, setInitialRegion] = useState(null);
    const [input, setInput] = useState("");

    const mapRef = useRef();

    useEffect(() => {
        (async () => {
          
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }
    
            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
            setInitialRegion({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005
            });
            
        })();
      }, []);

    return (
        <ScrollView style={styles.container}>
            { initialRegion && <MapView 
                loadingBackgroundColor='#000'
                style={{ width: "100%", minHeight: Dimensions.get("window").height * 0.8 }} 
                ref={mapRef}
                initialRegion={initialRegion}
                zoomEnabled={true}
                showsUserLocation={true}
                onMapReady={() => {
                    let cpyInitialRegion = Object.assign({}, initialRegion);
                    cpyInitialRegion["latitudeDelta"] = 0.005;
                    cpyInitialRegion["longitudeDelta"] = 0.005;
                    mapRef.current.animateToRegion(initialRegion, 1000);
                }}
                onPress={e => console.log(e.nativeEvent.coordinate)}
            />}

            <LinearGradient style={styles.backButton} colors={[color1, color2]}>
                <TouchableOpacity 
                    onPress={() => navigation.navigate("choose-transport")}
                    style={{
                        width: "100%",
                        height: "100%",
                        justifyContent: "center",
                        alignItems: "center"
                    }}
                >
                    <FontAwesome5 
                        name="angle-left" 
                        size={30} 
                        color="#fff" 
                    />
                </TouchableOpacity>
            </LinearGradient>

            <ScrollView style={styles.bottomContainer}>
                <View style={styles.searchbar}>
                    <TextInput 
                        placeholder="Where to?"
                        value={input}
                        onChangeText={setInput}
                        style={styles.searchbarInput}
                    />
                    <FontAwesome5 name="search" />
                </View>
            </ScrollView>
        </ScrollView>
    );
};

export default Map;