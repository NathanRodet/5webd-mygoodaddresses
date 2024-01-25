import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, FlatList, Text, View, TouchableOpacity, Button, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { firebaseDb } from '../../firebase';
import { AuthContext } from '../../auth/AuthProvider';
import { ref, get, remove } from "firebase/database";
import { Address } from "../../models/adresses"
import { RouteProp } from '@react-navigation/native';
import AddComment from '../components/addComment';
import CommentsList from '../components/CommentList';
import { useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface RouteParams {
    addressId: string;
}
const SingleAddress = () => {
    const route = useRoute<RouteProp<{ params: RouteParams }, 'params'>>();
    const { addressId } = route.params;
    const navigation = useNavigation();
    const currentUser = useContext(AuthContext);
    const [data, setData] = useState<Address[]>([]);
    const userId = currentUser?.uid;

    useEffect(() => {
        const fetchAddresses = async () => {
            try {
                const addressesRef = ref(firebaseDb, 'addresses');
                const snapshot = await get(addressesRef);
                if (snapshot.exists()) {
                    const data = snapshot.val();
                    const fetchedAddresses = Object.keys(data).map(key => ({ id: key, ...data[key] }))
                        .filter(address => address.uid === addressId);
                    setData(fetchedAddresses);
                } else {
                    alert("Aucune adresse trouvée");
                }
            } catch (error) {
                alert('Erreur lors de la récupération des adresses:' + error);
            }
        };

        fetchAddresses();
    }, [userId]);

    const renderItem = ({ item }: { item: Address }) => (
        <View style={styles.itemContainer}>
            <View
                //@ts-ignore
                onPress={() => navigation.navigate('Map', { id: item.id })}
                style={styles.itemContent}
            >
                <Text style={styles.itemName}>{item.addressName}</Text>
                <Text style={styles.itemDescription}>{item.description}</Text>
            </View>

        </View>
    );
    async function removeAddress() {
        const db = firebaseDb;
        try {
            remove(ref(db, 'addresses/' + addressId));
            alert("Addresse supprimée avec succès");
            //@ts-ignore
            navigation.navigate('Home');

        } catch (error) {
            alert("Impossible de " + error);
        }
    }
    function confirmRemove() {
        Alert.alert('Attention', 'Etes-vous sur de vouloir supprimer cette addresse ?', [
            {
                text: 'Supprimer',
                onPress: removeAddress,
            },
            {
                text: 'Annuler',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
        ]);
    }


    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={confirmRemove}
                style={styles.trashIcon}
            >
                <Icon name="trash-can-outline" size={24} color="black" />
            </TouchableOpacity>
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={(item) => item.uid}
            />
            <AddComment addressId={addressId} />
            <CommentsList addressId={addressId} />
        </View>

    );
}
const styles = StyleSheet.create({
    container: {
        display: "flex",
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    itemContainer: {
        flexDirection: 'row', // Align items horizontally
        justifyContent: 'space-between', // Space between item content and trash icon
        alignItems: 'center', // Center items vertically
        padding: 10,
        borderBottomWidth: 1,
        width: '100%',
        borderBottomColor: '#ddd',
    },
    itemContent: {
        flex: 1, // Take up as much space as possible before the icon
    },
    itemName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    itemDescription: {
        fontSize: 14,
        color: 'gray',
    },
    trashIcon: {
        padding: 10, // Make it easier to tap
    },
});


export default SingleAddress;