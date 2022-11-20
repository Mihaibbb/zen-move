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
import Categories from '../../Categories/Categories';
import getDistance from '../../DistanceGeolocation/DistanceGeolocation';
import { useIsFocused } from '@react-navigation/native';

const Map = ({ route, navigation }) => {

    const { vehicle, color1, color2 } = route.params;
    console.log(vehicle);
    const [location, setLocation] = useState(null);
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [closeRoutes, setCloseRoutes] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [initialRegion, setInitialRegion] = useState(null);
    const [input, setInput] = useState("");
    const [stations, setStations] = useState();

    const mapRef = useRef();
    const isFocused = useIsFocused();

    useEffect(() => {
        (async () => {
            
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }
    
            let location = await Location.getCurrentPositionAsync({
                accuracy: Location.Accuracy.Low
            });

            console.log(location);
            setLocation(location);
            setInitialRegion({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005
            });
            
        })();
    }, [route, navigation, isFocused]);

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
        setCloseRoutes([
            {
                timeRemained: 22700,
                distance: 2000,
                arrivesAt: new Date().getTime() + 1000 * 60,
                latitude: location.coords.latitude + 0.001,
                longitude: location.coords.longitude + 0.001,
                vehicleName: "B 34 ABC"
            },
    
            {
                timeRemained: 12650,
                distance: 3000,
                arrivesAt: new Date().getTime() + 1000 * 55,
                latitude: location.coords.latitude + 0.002,
                longitude: location.coords.longitude + 0.002,
                vehicleName: "B 34 BCD"

    
            },
    
            {
                timeRemained: 12750,
                distance: 3500,
                arrivesAt: new Date().getTime() + 1000 * 125,
                latitude: location.coords.latitude + 0.001,
                longitude: location.coords.longitude + 0.001,
                vehicleName: "B 35 XYZ"
            }
        ]);
        setStations([
            {
                latitude: location.coords.latitude + 0.001,
                longitude: location.coords.longitude + 0.001,
                arrivesAt: new Date().getTime() + 1000 * 15,
                vehicleName: "B 38 COD"
            },

            {
                latitude: location.coords.latitude - 0.005,
                longitude: location.coords.longitude + 0.005,
                arrivesAt: new Date().getTime() + 1000 * 15,
                vehicleName: "B 39 LOL"

            },

            {
                latitude: location.coords.latitude - 0.007,
                longitude: location.coords.longitude - 0.007,
                arrivesAt: new Date().getTime() + 1000 * 25,
                vehicleName: "BZ 54 SMS"

            },

            {
                latitude: location.coords.latitude + 0.05,
                longitude: location.coords.longitude - 0.025,
                arrivesAt: new Date().getTime() + 1000 * 5,
                vehicleName: "CJ 79 DAP"

            }
        ]);
    }, [location]);

    return (
        <View style={styles.container}>
            { initialRegion && <MapView 
                userInterfaceStyle={'dark'}
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
                            <TouchableOpacity onPress={() => navigation.navigate("route", { 
                                    latitude: station.latitude,
                                    longitude: station.longitude, 
                                    color1, 
                                    color2, 
                                    arrivesAt: station.arrivesAt,
                                    vehicleName: station.vehicleName,
                                    vehicleType: vehicle,
                                    vehicleId: Math.floor(Math.random() * Math.pow(10, 5))
                                })} key={idx}>

                                <LinearGradient style={styles.pinGradient} colors={[color1, color2]}>
                                    <Feather name="map-pin" size={26} color='#fff' />

                                </LinearGradient>
                            </TouchableOpacity>
                        </Marker>

                ))}
            </MapView>}

            <LinearGradient style={styles.backButton} colors={[color1, color2]}>
                <TouchableOpacity 
                    onPress={() => navigation.goBack()}
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
                <View style={[styles.searchbar, { borderColor: color2 }]}>
                    <TextInput 
                        placeholder="Where to?"
                        value={input}
                        onChangeText={setInput}
                        style={[styles.searchbarInput, {color: "#fff"}]}
                        placeholderTextColor="rgba(255, 255, 255, .4)"
                    />
                    <FontAwesome5 name="search" size={24} color='#fff' style={styles.searchbarIcon} />
                </View>

                {closeRoutes && closeRoutes.length > 0 && 
                    <View style={styles.closeRoutesContainer}>
                        <Text style={{ marginTop: 10, fontSize: 20, textAlign: "center", color: "rgba(255, 255, 255, .6)", fontWeight: "700" }}>Closest routes</Text>
                        {closeRoutes.map((closeRoute, idx) => (
                            <LinearGradient key={idx} colors={[color2, color1]} style={styles.closeRouteCard}>
                                <View style={styles.closeRouteName}>
                                    <View>
                                        {Categories.find(vehicleCat => vehicleCat.name.toLowerCase() === vehicle.toLowerCase()).smIcon}
                                    </View>
                                    <Text style={styles.closeRouteText}>{closeRoute.vehicleName}</Text>
                                </View>
                                <View style={[styles.closeRoute, { borderBottomColor: color1 }]}>

                                    {/* <View style={{ flex: 0. }}>
                                        <View style={{ width: 50, height: 50, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(255, 255, 255, .2)" }}>
                                            <Text>{idx + 1}</Text>
                                        </View>
                                    </View> */}

                                    <View style={styles.data}>
                                        <Text style={styles.dataText}>
                                            {closeRoute.timeRemained / 3600 >= 1 ? `${parseInt(closeRoute.timeRemained / 3600)} hr` : ""}
                                            {(closeRoute.timeRemained % 3600) / 60 >= 1 ? ` ${parseInt((closeRoute.timeRemained % 3600) / 60)} min` : ""}
                                            {(closeRoute.timeRemained % 3600) / 3600 >= 1 ? ` ${parseInt((closeRoute.timeRemained % 3600) / 3600)} sec` : ""}
                                        </Text>

                                        <Text style={styles.dataText}>
                                            {closeRoute.distance / 1000 < 1 ? `${closeRoute.distance} m` : `${parseFloat(closeRoute.distance / 1000).toFixed(2)} km`}
                                        </Text>

                                        <Text style={styles.dataText}>
                                            Arrives at <Text style={{ fontWeight: "900" }}>{`${new Date(closeRoute.arrivesAt).getHours() < 10 ? "0" : ""}${new Date(closeRoute.arrivesAt).getHours()}`}:{`${new Date(closeRoute.arrivesAt).getMinutes() < 10 ? "0" : ""}${new Date(closeRoute.arrivesAt).getMinutes()}`}</Text>
                                        </Text>
                                    </View>

                                    <TouchableOpacity
                                        style={styles.goButton}
                                        onPress={() => navigation.navigate("route", {
                                            latitude: closeRoute.latitude,
                                            longitude: closeRoute.longitude,
                                            color1,
                                            color2,
                                            arrivesAt: new Date(closeRoute.arrivesAt).getTime(),
                                            vehicleType: vehicle,
                                            vehicleName: closeRoute.vehicleName,
                                            vehicleId: Math.floor(Math.random() * Math.pow(10, 5))
                                        })}
                                    >
                                        <Text style={styles.hugeText}>GO!</Text>
                                    </TouchableOpacity>
                                </View>

                            </LinearGradient>
                        ))}
                    </View>
                }
            </ScrollView>
        </View>
    );
};

export default Map;