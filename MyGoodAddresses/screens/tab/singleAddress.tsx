import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, FlatList, Text, View, TouchableOpacity, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { firebaseDb } from '../../firebase';
import { AuthContext } from '../../auth/AuthProvider';
import { getDatabase, ref, child, get } from "firebase/database";
import { Address } from "../../models/adresses"
import { RouteProp } from '@react-navigation/native';
import AddComment from '../components/addComment';
import CommentsList from '../components/CommentList';
import { useRoute } from '@react-navigation/native';
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
    const dbRef = ref(getDatabase());

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
        <TouchableOpacity
            //@ts-ignore
            onPress={() => navigation.navigate('Map', { id: item.id })}
            style={styles.itemContainer}
        >
            <Text style={styles.itemName}>{item.addressName}</Text>
            <Text style={styles.itemDescription}>{item.description}</Text>
        </TouchableOpacity>
    );
    return (
        <View style={styles.container}>
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
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
    itemContainer: {
        padding: 10,
        borderBottomWidth: 1,
        width: '100%',
        borderBottomColor: '#ddd',
    },
    itemName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    itemDescription: {
        fontSize: 14,
        color: 'gray',
    },
});

export default SingleAddress;