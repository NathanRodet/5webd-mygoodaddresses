import React, { useContext, useState } from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet, Platform, Alert, Switch } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import { firebaseDb } from '../../firebase';
import { push, ref, set } from 'firebase/database';
import { AuthContext } from '../../auth/AuthProvider';

const AddAddressScreen = () => {

    const [addressName, setAddressName] = useState('');
    const [address, setAddress] = useState('');
    const [description, setDescription] = useState('');

    const [imageUri, setImageUri] = useState('');
    const [isPrivate, setIsPrivate] = useState(true);
    const user = useContext(AuthContext)
    const handleChooseImage = async () => {
        // let permissionResult;

        // if (Platform.OS === 'android') {
        //     permissionResult = await request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);
        // }

        // if (permissionResult === RESULTS.GRANTED) {
        //     launchImageLibrary({ noData: true }, response => {
        //         if (response.didCancel) {
        //             console.log('L\'utilisateur a annulé la sélection d\'image');
        //         } else if (response.errorCode) {
        //             console.log('ImagePicker Error: ', response.errorMessage);
        //         } else if (response.assets) {
        //             setImageUri(response.assets[0].uri);
        //         }
        //     });
        // } else {
        //     Alert.alert("Permission refusée", "Vous n'avez pas donné la permission pour accéder à la galerie.");
        // }
    };

    const saveAddress = async () => {
        if (!user) {
            console.log('Aucun utilisateur connecté');
            return;
        }
        try {
            const newAddressRef = push(ref(firebaseDb, 'addresses'));

            const newAddress = {
                uid: newAddressRef.key,
                addressName: addressName,
                address: address,
                isPrivate: isPrivate,
                description: description,

                userId: user.uid,
                // image: imageUri
            };

            await set(newAddressRef, newAddress);
           
            alert("Addresse ajoutée avec succès");
        } catch (error) {
            alert("Impossible de créeer l'addresse : " + error);
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
                <Text>Privée:</Text>
                <Switch value={isPrivate} onValueChange={setIsPrivate} />
            </View>
            {/* <Button 
                title="Choisir une image" 
                onPress={handleChooseImage} 
            /> */}

            {/* {imageUri ? (
                <Image 
                    source={{ uri: imageUri }} 
                    style={styles.image} 
                />
            ) : null} */}

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
