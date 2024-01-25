import React, { useCallback, useContext, useEffect, useState } from 'react';
import { StyleSheet, FlatList, Text, View, TouchableOpacity, Button } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { firebaseDb } from '../../firebase';
import { AuthContext } from '../../auth/AuthProvider';
import { ref, get } from "firebase/database";
import { Address } from "../../models/adresses"


const Home = () => {
  const navigation = useNavigation();
  const currentUser = useContext(AuthContext);
  const [data, setData] = useState<Address[]>([]);
  const userId = currentUser?.uid;

  const fetchAddresses = async () => {
    try {
      const addressesRef = ref(firebaseDb, 'addresses');
      const snapshot = await get(addressesRef);
      if (snapshot.exists()) {
        const data = snapshot.val();
        const fetchedAddresses = Object.keys(data).map(key => ({ id: key, ...data[key] }))
          .filter(address => address.userId === userId);
        setData(fetchedAddresses);
      } else {
        alert("Aucune adresse trouvée");
      }
    } catch (error) {
      alert('Erreur lors de la récupération des adresses:' + error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchAddresses();
      return () => { };
    }, [userId])
  );

  const renderItem = ({ item }: { item: Address }) => (
    <TouchableOpacity
      //@ts-ignore
      onPress={() => navigation.navigate('singleAddress', { addressId: item.uid })}
      style={styles.itemContainer}
    >
      <Text style={styles.itemName}>{item.addressName}</Text>
      <Text style={styles.itemDescription}>{item.description}</Text>
      <Text style={styles.itemDescription}>{item.address}</Text>

    </TouchableOpacity>
  );
  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.uid}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },

  itemContainer: {
    padding: 10,
    borderBottomWidth: 1,
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

export default Home;