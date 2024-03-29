import React, { useState, useEffect, useRef, useContext } from 'react';
import { View, StyleSheet, Dimensions, Text, Image, TouchableOpacity } from 'react-native';
import * as Location from 'expo-location';
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import { MAP_API_KEY } from '../../utils/constants';
import { firebaseDb } from '../../firebase';
import { get, ref } from 'firebase/database';
import { AuthContext } from '../../auth/AuthProvider';

const MapScreen = () => {
    const mapRef = useRef(null);
    const navigation = useNavigation();
    const [region, setRegion] = useState(null);
    const [addresses, setAddresses] = useState([]);
    const user = useContext(AuthContext);
    const [markers, setMarkers] = useState([]);
    const [showUserAddressesOnly, setShowUserAddressesOnly] = useState(false);

    const goToInitialLocation = () => {
        if (region && mapRef.current) {
            mapRef.current.animateToRegion(region, 1000);
        }
    };

    const showMyAddresses = () => {
        setShowUserAddressesOnly(true);
        const userAddresses = addresses.filter(address => address.userId === user?.uid);
        updateMarkers(userAddresses);
    };

    const updateMarkers = (addressesToDisplay) => {
        setMarkers([]);
        geocodeAddresses(addressesToDisplay);
    };

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setRegion({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
            });
        })();
    }, []);

    useEffect(() => {
        const fetchAddresses = async () => {
            try {
                const addressesRef = ref(firebaseDb, 'addresses');
                const snapshot = await get(addressesRef);
                if (snapshot.exists()) {
                    const data = snapshot.val();
                    const fetchedAddresses = Object.keys(data).map(key => ({ id: key, ...data[key] }))
                        .filter(address => address.isPrivate === false || address.userId === user?.uid);
                    setAddresses(fetchedAddresses);
                } else {
                    console.log("Aucune adresse trouvée");
                }
            } catch (error) {
                console.error('Erreur lors de la récupération des adresses:', error);
            }
        };

        fetchAddresses();
    }, [user]);

    const geocodeAddresses = async (addressesToGeocode) => {
        for (const item of addresses || addressesToGeocode) {
            const coords = await getCoordinatesFromAddress(item.address);
            if (coords) {
                setMarkers(prevMarkers => [...prevMarkers, {
                    latitude: coords.lat,
                    longitude: coords.lng,
                    title: item.addressName,
                    description: item.address,
                    image: item.imageUri
                }]);
            } else {
                console.error(`Géocodage échoué pour ${item.address}`);
            }
        }
    };

    const getCoordinatesFromAddress = async (address) => {
        try {
            const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${MAP_API_KEY}`);
            const data = await response.json();

            if (data.status === 'OK' && data.results.length > 0) {
                return data.results[0].geometry.location;
            } else {
                console.error('Géocodage échoué pour l\'adresse:', address, 'Réponse:', data);
                return null;
            }
        } catch (error) {
            console.error('Erreur lors de la requête de géocodage:', error);
            return null;
        }
    };

    if (!region) {
        return <Text>Chargement de la localisation...</Text>;
    }

    return (
        <View style={styles.container}>
            <MapView
                ref={mapRef}
                provider={PROVIDER_GOOGLE}
                style={styles.map}
                initialRegion={region}
                showsUserLocation={true}
                followsUserLocation={true}
            >
                {markers.map((marker) => (
                    <Marker
                        key={`${marker.latitude}-${marker.longitude}`}
                        coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
                        pinColor='red'
                    >
                        <Callout tooltip style={styles.calloutContainer}>
                            <View style={styles.calloutView}>
                                <Text style={styles.calloutTitle}>{marker.title}</Text>
                                <Text>{marker.description}</Text>
                                {marker.image && (
                                    <Image
                                        source={{ uri: marker.image }}
                                        style={styles.calloutImage}
                                    />
                                )}
                            </View>
                        </Callout>
                    </Marker>
                ))}

            </MapView>
            <TouchableOpacity style={styles.buttonRencentrer} onPress={goToInitialLocation}>
                <Text>Recentrer</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('addAddress')}>
                <Text style={styles.addButtonText}>Ajouter</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.myAddressesButton}
                onPress={showMyAddresses}
            >
                <Text style={styles.myAddressesButtonText}>Voir mes adresses sur la carte</Text>
            </TouchableOpacity>
        </View>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    calloutContainer: {
        flexDirection: 'column',
        alignSelf: 'flex-start',
    },
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    calloutView: {
        backgroundColor: 'white',
        borderRadius: 6,
        padding: 10,
        width: 200, // Vous pouvez ajuster cette largeur
        height: 'auto', // Hauteur auto pour s'adapter au contenu
    },
    calloutTitle: {
        fontWeight: 'bold',
        marginBottom: 5, // Ajoute un peu d'espace sous le titre
    },
    calloutImage: {
        width: 120, // Ajustez selon la taille souhaitée
        height: 80, // Ajustez selon la taille souhaitée
        resizeMode: 'cover', // Ajuste l'image pour couvrir l'espace disponible
    },
    buttonRencentrer: {
        position: 'absolute',
        bottom: 80,
        right: 20,
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 20,
        elevation: 5,
        shadowOpacity: 0.2,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 2 },
    },
    addButton: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 20,
        elevation: 5,
        shadowOpacity: 0.2,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 2 },
    },
    addButtonText: {
        fontSize: 15,
        color: 'black',
    },
    myAddressesButton: {
        position: 'absolute',
        top: 20,
        left: 20,
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 20,
        elevation: 5,
        shadowOpacity: 0.2,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 2 },
    },
    myAddressesButtonText: {
        fontSize: 16,
        color: 'black',
    },
});

export default MapScreen;
