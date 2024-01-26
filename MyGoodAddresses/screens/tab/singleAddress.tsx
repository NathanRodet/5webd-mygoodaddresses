import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, FlatList, Text, View, TouchableOpacity, Button, Alert, ScrollView, Image } from 'react-native';
import { firebaseDb } from '../../firebase';
import { AuthContext } from '../../auth/AuthProvider';
import { ref, get, remove } from "firebase/database";
import { Address, AddressListProps } from "../../models/adresses"
import AddComment from '../components/addComment';
import CommentsList from '../components/CommentList';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


const SingleAddress = ({ route, navigation }: { navigation: any, route: any }) => {
    const { addressId }: AddressListProps = route.params;
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
                    const fetchedAddresses = Object.keys(data).map(key => ({ uid: key, ...data[key] }))
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
            <Text style={styles.itemName}>{item.addressName}</Text>
            <Text style={styles.itemDescription}>{item.address}</Text>
            <Text style={styles.itemDescription}>{item.description}</Text>
            {/* <Image source={{ uri: item.imageUri }} style={{ width: 200, height: 200 }} /> */}
            <View style={styles.horizontalLine} />
            <Text>Avis</Text>
            <CommentsList addressId={addressId} />
        </View>
    );

    async function removeAddress() {
        const db = firebaseDb;
        try {
            remove(ref(db, 'addresses/' + addressId));
            Alert.alert('', 'Addresse supprimée avec succès ');
            //@ts-ignore
            navigation.navigate('Main');

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
            <View style={styles.iconContainer}>
                <TouchableOpacity onPress={confirmRemove} style={styles.trashIcon}>
                    <Icon name="trash-can-outline" size={24} color="black" />
                </TouchableOpacity>
            </View>
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={(item) => item.uid}
                ListFooterComponent={<AddComment addressId={addressId} />}
            />
        </View>

    );
}
const styles = StyleSheet.create({
    container: {
        display: "flex",
        flex: 1,
        width: '100%'
    },
    horizontalLine: {
        borderBottomColor: 'black', 
        borderBottomWidth: StyleSheet.hairlineWidth,
        alignSelf: 'stretch',
        marginVertical: 10,
    },
    itemContainer: {
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        width: '100%',
    },
    itemContent: {
        flex: 1,
    },
    iconContainer: {
        width: '100%',
        justifyContent: 'flex-end',
        paddingHorizontal: 10,
        flexDirection: 'row',
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
        padding: 10,
        marginLeft: 0
    },
    image: {
        width: 200,
        height: 200,
        resizeMode: 'cover',
        marginVertical: 10,
    },
});


export default SingleAddress;