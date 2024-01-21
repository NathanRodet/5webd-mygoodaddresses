import React, { useContext, useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Switch } from 'react-native';
import { firebaseDb } from '../../firebase'; // Make sure this path is correct for your project structure
import { ref, push } from 'firebase/database';
import { AuthContext } from '../../auth/AuthProvider';
import { showMessage, hideMessage } from "react-native-flash-message";
const CreateAddress = () => {
  const [city, setCity] = useState('');
  const [zip, setZip] = useState('');
  const [road, setRoad] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);
  const [description, setDescription] = useState('');
  const [name, setName] = useState('');
  const currentUser = useContext(AuthContext);

  // const [picture, setPicture] = useState(null);

  const handleSubmit = async () => {
    try {
      const addressData = {
        city,
        road,
        isPrivate,
        description,
        name,
        // picture
      };

      const userAddressesRef = ref(firebaseDb, `addresses/${currentUser?.uid}`);
      const response = await push(userAddressesRef, addressData);

      alert("Addresse ajoutée avec succès");
    } catch (e) {
      alert("Impossible de créeer l'addresse : " + e);
    }
  };
  return (
    <View style={styles.container}>
      <TextInput style={styles.input} placeholder="City" value={city} onChangeText={setCity} />
      <TextInput style={styles.input} placeholder="Road" value={road} onChangeText={setRoad} />
      <TextInput style={styles.input} placeholder="Description" value={description} onChangeText={setDescription} />
      <TextInput style={styles.input} placeholder="Name" value={name} onChangeText={setName} />
      <View style={styles.switchContainer}>
        <Text>Privée:</Text>
        <Switch value={isPrivate} onValueChange={setIsPrivate} />
      </View>
      {/* Placeholder for image upload logic */}
      <Button title="Save Address" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
});

export default CreateAddress;
