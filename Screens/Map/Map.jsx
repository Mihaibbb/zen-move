import MapView, { MapMarker, Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { useState } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import { Dimensions, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import styles from './Styles';
import { Feather, FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import mainColors from '../../Colors/main'; 
import getDistance from '../../DistanceGeolocation/DistanceGeolocation';

const Map = ({ route, navigation }) => {

    const { vehicle, color1, color2 } = route.params;
    const [location, setLocation] = useState(null);
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [closeRoutes, setCloseRoutes] = useState([
        {
            timeRemained: 22700,
            distance: 2000,
            arrivesAt: new Date().getTime() + 1000 * 60
        },

        {
            timeRemained: 12650,
            distance: 3000,
            arrivesAt: new Date().getTime() + 1000 * 55

        },

        {
            timeRemained: 12750,
            distance: 3500,
            arrivesAt: new Date().getTime() + 1000 * 125
        }
    ]);
    const [errorMsg, setErrorMsg] = useState(null);
    const [initialRegion, setInitialRegion] = useState(null);
    const [input, setInput] = useState("");
    const [stations, setStations] = useState();

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

    // useEffect(() => {
    //     if (!longitude || !latitude) return;
    //     (async () => {
    //         try {
    //             const options = {
    //                 method: 'GET',
    //                 headers: {
    //                     "Content-Type": "application/json"
    //                 }
    //             };

    //             const request = await fetch(`http://localhost:8000/pedestrial/get-close-routes?vehicle=${vehicle}&longitude=${longitude}&latitude=${latitude}`, options);
    //             const response = await request.json();
    //             if (await response.success) {
    //                 setCloseRoutes(await response.distances);
    //             }
    //         } catch (e) {
    //             console.log(e);
    //         }
    //     })();
    // }, [longitude, latitude]);

    useEffect(() => {
        if (!location) return;
        setLatitude(location.coords.latitude);
        setLongitude(location?.coords?.longitude);
        setStations([
            {
                latitude: location.coords.latitude + 0.001,
                longitude: location.coords.longitude + 0.001,
                arrivesAt: new Date().getTime() + 1000 * 15
            },

            {
                latitude: location.coords.latitude - 0.005,
                longitude: location.coords.longitude + 0.005,
                arrivesAt: new Date().getTime() + 1000 * 15

            },

            {
                latitude: location.coords.latitude - 0.007,
                longitude: location.coords.longitude - 0.007,
                arrivesAt: new Date().getTime() + 1000 * 25

            },

            {
                latitude: location.coords.latitude + 0.05,
                longitude: location.coords.longitude - 0.025,
                arrivesAt: new Date().getTime() + 1000 * 5

            }
        ]);
    }, [location]);

    return (
        <View style={styles.container}>
            { initialRegion && <MapView 
                loadingBackgroundColor='#000'
                style={{ width: "100%", minHeight: Dimensions.get("window").height * 1, alignSelf: "stretch" }} 
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
            >
                {stations && stations.length > 0 && stations.map((station, idx) => (
                        <Marker 
                            coordinate={{
                                latitude: station.latitude, 
                                longitude: station.longitude,
                                latitudeDelta: 0.005,
                                longitudeDelta: 0.005
                            }}
                            key={idx}
                        >
                            <TouchableOpacity onPress={() => navigation.navigate("route")} key={idx}>

                                <LinearGradient style={styles.pinGradient} colors={[color1, color2]}>
                                    <Feather name="map-pin" size={26} color='#fff' />

                                </LinearGradient>
                            </TouchableOpacity>
                        </Marker>

                ))}
            </MapView>}

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
                <LinearGradient style={[styles.searchbar]} colors={[color1, color2]} start={{ x:0, y: 0.5 }} end={{ x: 1, y: 0.5 }}>
                    <TextInput 
                        placeholder="Where to?"
                        value={input}
                        onChangeText={setInput}
                        style={[styles.searchbarInput, {color: "#fff"}]}
                        placeholderTextColor="rgba(255, 255, 255, .4)"
                    />
                    <FontAwesome5 name="search" size={24} color='#fff' style={styles.searchbarIcon} />
                </LinearGradient>

                {closeRoutes && closeRoutes.length > 0 && 
                    <View style={styles.closeRoutesContainer}>
                        {closeRoutes.map((route, idx) => (
                            <View style={styles.closeRoute} key={idx}>

                                <View style={styles.data}>
                                    <Text style={styles.dataText}>
                                        {route.timeRemained / 3600 >= 1 ? `${parseInt(route.timeRemained / 3600)} hr` : ""}
                                        {(route.timeRemained % 3600) / 60 >= 1 ? ` ${parseInt((route.timeRemained % 3600) / 60)} min` : ""}
                                        {(route.timeRemained % 3600) / 3600 >= 1 ? ` ${parseInt((route.timeRemained % 3600) / 3600)} sec` : ""}
                                    </Text>

                                    <Text style={styles.dataText}>
                                        {route.distance / 1000 < 1 ? `${route.distance} m` : `${parseFloat(route.distance / 1000).toFixed(2)} km`}
                                    </Text>

                                    <Text style={styles.dataText}>
                                        Arrives at <Text style={{ fontWeight: "900" }}>{new Date(route.arrivesAt).getHours()}:{new Date(route.arrivesAt).getMinutes()}</Text>
                                    </Text>
                                </View>

                                <TouchableOpacity
                                    style={styles.goButton}
                                    onPress={() => navigation.navigate("route", {
                                        route: route
                                    })}
                                >
                                    <Text style={styles.hugeText}>GO!</Text>
                                </TouchableOpacity>
                            </View>
                        ))}
                    </View>
                }
            </ScrollView>
        </View>
    );
};

export default Map;