import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, FlatList, Text, View, TouchableOpacity, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { firebaseDb } from '../../firebase';
import { AuthContext } from '../../auth/AuthProvider';
import { getDatabase, ref, child, get } from "firebase/database";
import { Address } from "../../models/adresses"


const Home = () => {
  const navigation = useNavigation();
  const currentUser = useContext(AuthContext);
  const [data, setData] = useState<Address[]>([]);
  const userId = currentUser?.uid;
  const dbRef = ref(getDatabase());

  useEffect(() => {
    get(child(dbRef, `addresses/${userId}`)).then((snapshot) => {
      if (snapshot.exists()) {
        setData(Object.values(snapshot.val()));
      } else {
        console.log("Aucune addresse existante");
      }
    }).catch((error) => {
      console.error(error);
    });
  }, [userId]);

  const renderItem = ({ item }: { item: Address }) => (
    <TouchableOpacity
      //@ts-ignore
      onPress={() => navigation.navigate('Map', { id: item.id })}
      style={styles.itemContainer}
    >
      <Text style={styles.itemName}>{item.city}</Text>
      <Text style={styles.itemDescription}>{item.description}</Text>
    </TouchableOpacity>
  );
  return (
    <div style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.name}
      />
      {/* @ts-ignore */}
      <Button title="Ajouter une adresse" onPress={() => navigation.navigate('CreateAddress')} />
    </div>
  );
}
const styles = StyleSheet.create({
  container: {
    display : "flex",
    flex: 1,
    width :'100%',
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
    width : '100%',
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