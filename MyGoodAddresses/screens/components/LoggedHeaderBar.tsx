import React, { useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Text, TouchableOpacity, StyleSheet, View, Image } from 'react-native';
import { AuthContext } from '../../auth/AuthProvider';
import { defaultAvatar } from '../../data/avatars';


export const loggedScreenOptions = {
  headerShown: true,
  headerTitle: () => <Text style={styles.headerTitle}>{"MesBonnesAddresses"}</Text>,
  headerRight: () => (
    <LoggedHeaderBar />
  ),
}

const LoggedHeaderBar = () => {
  const navigation = useNavigation();
  const currentUser = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('MenuSettings')}>
        <Image
          source={{ uri: currentUser?.photoURL ? currentUser?.photoURL : defaultAvatar.url }}
          style={styles.profileIcon}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: 16,
    height: 60,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
  },
  profileIcon: {
    width: 35,
    height: 35,
    borderRadius: 16,
    borderColor: '#333333',
    borderWidth: 1,
  },
  menu: {
    position: 'absolute',
    top: 40,
    right: 16,
    backgroundColor: '#f2f2f2',
    borderRadius: 4,
    padding: 8,
  },
  menuItem: {
    paddingVertical: 4,
    paddingHorizontal: 6,
  },
  menuText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
  },
});

export default LoggedHeaderBar;
