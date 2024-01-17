import { signOut } from 'firebase/auth';
import React, { useContext } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { firebaseAuth } from '../../firebase';
import { AuthContext } from '../../auth/AuthProvider';

async function functionSignOut() {
  try {
    await signOut(firebaseAuth);
    console.log('User signed Out successfully!');
  } catch (error) {
    console.error('Error logging out user:', error);
  }
}

const SettingsMenu = ({ navigation }: { navigation: any }) => {
  const currentUser = useContext(AuthContext);

  const handleLogout = async () => {
    await functionSignOut();
  };

  return (
    <View style={styles.container}>
      {
        <>
          <TouchableOpacity style={[styles.button, styles.disabledButton]} >
            <Text style={styles.buttonTextTitle}>{"ID utilisateur"}</Text>
            <Text style={styles.buttonText}>{currentUser?.uid}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.disabledButton]} >
            <Text style={styles.buttonTextTitle}>{"Email"}</Text>
            <Text style={styles.buttonText}>{currentUser?.email}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AvatarSelection')} >
            <Text style={styles.buttonText}>{"Modifier l'avatar"}</Text>
          </TouchableOpacity>

          {/* <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Profile')}>
            <Text style={styles.buttonText}>
              {
                currentUser?.displayName ?
                  currentUser?.displayName :
                  "Ajouter un nom d'utilisateur"
              }
            </Text>

          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Profile')}>
            <Text style={styles.buttonText}>
              {
                currentUser?.phoneNumber ?
                  currentUser?.phoneNumber :
                  "Ajouter un numéro de téléphone"
              }
            </Text>
          </TouchableOpacity> */}
        </>
      }
      <View style={styles.bottomContainer}>
        <TouchableOpacity style={[styles.button, styles.deleteButton]} onPress={handleLogout}>
          <Text style={styles.buttonText}>Supprimer le compte</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleLogout}>
          <Text style={styles.buttonText}>Déconnexion</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 20,
  },
  deleteButton: {
    backgroundColor: "darkred",
  },
  disabledButton: {
    backgroundColor: '#5A5A5A',
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#2196F3',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonTextTitle: {
    fontWeight: 'bold',
    color: 'white',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  bottomContainer: {
    width: '100%',
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 10,
  },

});

export default SettingsMenu;
