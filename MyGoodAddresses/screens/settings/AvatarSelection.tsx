import React, { useState } from 'react';
import { Text, View, Image, TouchableOpacity, StyleSheet, Button } from 'react-native';
import { Avatar } from '../../models/users';
import { avatars } from '../../data/avatars';
import { updateProfile } from 'firebase/auth';
import { firebaseAuth } from '../../firebase';

const AvatarSelection = ({ navigation }: { navigation: any }) => {
  const [selectedAvatar, setSelectedAvatar] = useState<Avatar | null>(null);

  const handleAvatarSelection = async (avatar: Avatar) => {
    setSelectedAvatar(avatar);
  };

  const handleUpdateAvatar = async () => {
    if (selectedAvatar) {
      const currentUser = firebaseAuth.currentUser;
      if (currentUser) {
        try {
          await updateProfile(currentUser, { photoURL: selectedAvatar.url });
          console.log('User photoURL updated successfully');
          navigation.navigate('MenuSettings');
        } catch (error) {
          console.error('Error updating user photoURL:', error);
        }
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Available avatars</Text>
      <View style={styles.avatarList}>
        {avatars.map((avatar, index) => (
          <TouchableOpacity key={avatar.url} onPress={() => handleAvatarSelection(avatar)}>
            <Image source={{ uri: avatar.url }} style={styles.avatarImage} />
          </TouchableOpacity>
        ))}
      </View>
      {selectedAvatar && (
        <View>
          <Text style={[styles.title, styles.centeredTitle]}>{"Selected avatar"}</Text>
          <Image source={{ uri: selectedAvatar.url }} style={styles.selectedAvatarImage} />
          <Button title="Selectionner cet avatar" onPress={handleUpdateAvatar} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  avatarList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarImage: {
    width: 100,
    height: 100,
    margin: 10,
  },
  selectedAvatarImage: {
    width: 200,
    height: 200,
    margin: 10,
  },
  centeredTitle: {
    textAlign: 'center',
  },
});

export default AvatarSelection;
