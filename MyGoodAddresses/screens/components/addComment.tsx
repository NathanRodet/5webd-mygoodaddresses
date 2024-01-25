  import React, { useState, useContext } from 'react';
  import { View, TextInput, Button, StyleSheet, Text, Switch } from 'react-native';
  import { push, ref as firebaseRef, set } from 'firebase/database';
  import { AuthContext } from '../../auth/AuthProvider';
  import { firebaseDb } from '../../firebase';

  interface AddCommentProps {
    addressId: string;
  }

  const AddComment: React.FC<AddCommentProps> = ({ addressId }) => {
    const [text, setText] = useState<string>('');
    const currentUser = useContext(AuthContext);
    const handleAddComment = () => {
      if (!currentUser) {
        alert('Vous devez être connecté pour ajouter un commentaire');
        return;
      }
      const commentsRef = firebaseRef(firebaseDb, `comments/${addressId}`);
      const newCommentRef = push(commentsRef);
      set(newCommentRef, {
        userId: currentUser.uid,
        text,
        userName: currentUser.email,
        timestamp: Date.now(),
      }).then(() => {
        setText('');
      }).catch((error) => {
        alert('Impossible d\'ajouter le commentaire ' + error.message);
      });
    };

    return (
      <View style={styles.container}>
        <TextInput
          placeholder="Partager mon avis"
          value={text}
          onChangeText={setText}
          style={styles.input}
        />
        <Button
          title="Valider"
          onPress={handleAddComment}
        />
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: '100%',
      paddingHorizontal: 10,
    },
    input: {
      borderWidth: 1,
      borderColor: 'grey',
      padding: 10,
      marginBottom: 20,
      width: '100%', 
    },
    image: {
      width: 200,
      height: 200,
      resizeMode: 'cover',
      marginBottom: 20,
    },
  });

  export default AddComment
