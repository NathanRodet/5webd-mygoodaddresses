import React, { useState } from 'react';
import { Text, TouchableOpacity, StyleSheet, View, Image } from 'react-native';
import { signOut } from 'firebase/auth';
import { firebaseAuth } from '../../firebase';

export const loggedScreenOptions = {
  headerShown: true,
  headerTitle: () => <Text style={styles.headerTitle}>Mes Bonnes Adresses</Text>,
  headerRight: () => (
    <LoggedHeaderBar />
  ),
}

async function functionSignOut() {
  try {
    await signOut(firebaseAuth);
    console.log('User signed Out successfully!');
  } catch (error) {
    console.error('Error logging out user:', error);
  }
}

const LoggedHeaderBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = async () => {
    await functionSignOut();
  };

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleMenuToggle}>
        <Image
          source={{ uri: 'https://www.gravatar.com/avatar/94d093eda664addd6e450d7e9881bcad?s=200&d=identicon&r=PG' }}
          style={styles.profileIcon}
        />
      </TouchableOpacity>
      {isMenuOpen && (
        <View style={styles.menu}>
          <TouchableOpacity onPress={handleLogout} style={styles.menuItem}>
            <Text style={styles.menuText}>Logout</Text>
          </TouchableOpacity>
        </View>
      )}
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
