import React, { useContext, useState } from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet, Alert, Switch } from 'react-native';
import { AuthContext } from '../../auth/AuthProvider';
import * as ImagePicker from 'expo-image-picker';
import { ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage"; 
import { firebaseDb, firebaseStorage } from '../../firebase';
import { push, ref, set } from 'firebase/database';

const AddAddressScreen = () => {
    const [addressName, setAddressName] = useState('');
    const [address, setAddress] = useState('');
    const [description, setDescription] = useState('');
    const [imageUri, setImageUri] = useState('');
    const [isPrivate, setIsPrivate] = useState(true);
    const user = useContext(AuthContext);

    const handleChooseImage = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.granted === false) {
            alert("Vous avez refusé l'accès à la bibliothèque de photos.");
            return;
        }

        const pickerResult = await ImagePicker.launchImageLibraryAsync();
        if (pickerResult.canceled) {
            return;
        }

        setImageUri(pickerResult.uri);
        const imageBlob = await fetch(pickerResult.uri).then(r => r.blob());
        
        const fileName = pickerResult.uri.split('/').pop();
        const imageStorageRef = storageRef(firebaseStorage, `images/${fileName}`);
        
        await uploadBytes(imageStorageRef, imageBlob);
    };

    const saveAddress = async () => {
        if (!user) {
            Alert.alert('Erreur', 'Aucun utilisateur connecté');
            return;
        }

        try {
            const fileName = imageUri.split('/').pop();
            const imageStorageRef = storageRef(firebaseStorage, `images/${fileName}`);
            const imageUrl = await getDownloadURL(imageStorageRef);

            const newAddressRef = push(ref(firebaseDb, 'addresses'));
            const newAddress = {
                addressName,
                address,
                isPrivate,
                description,
                userId: user.uid,
                imageUrl,
            };

            await set(newAddressRef, newAddress);
            Alert.alert('Succès', "Adresse ajoutée avec succès");
        } catch (error) {
            Alert.alert('Erreur', "Impossible de créer l'adresse : " + error);
        }
    };

    return (
        <View style={styles.container}>
            <Text>Nom :</Text>
            <TextInput
                value={addressName}
                onChangeText={setAddressName}
                style={styles.input}
            />

            <Text>Adresse :</Text>
            <TextInput
                value={address}
                onChangeText={setAddress}
                style={styles.input}
            />

            <Text>Description :</Text>
            <TextInput
                value={description}
                onChangeText={setDescription}
                style={styles.input}
            />

            <View>
                <Text>Privée :</Text>
                <Switch value={isPrivate} onValueChange={setIsPrivate} />
            </View>

            <Button 
                title="Choisir une image" 
                onPress={handleChooseImage} 
            />

            {imageUri ? (
                <Image 
                    source={{ uri: imageUri }} 
                    style={styles.image} 
                />
            ) : null}

            <Button
                title="Sauvegarder"
                onPress={saveAddress}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: 'grey',
        padding: 10,
        marginBottom: 20,
    },
    image: {
        width: 200,
        height: 200,
        resizeMode: 'cover',
        marginBottom: 20,
    },
});

export default AddAddressScreen;
