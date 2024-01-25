import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { get, ref as firebaseRef } from 'firebase/database';
import { firebaseDb } from '../../firebase';

interface Comment {
  id: string;
  userName: string;
  text: string;
  timestamp: number;
}

interface CommentsListProps {
  addressId: string;
}

const CommentsList: React.FC<CommentsListProps> = ({ addressId }) => {
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    const fetchComments = async () => {
      const commentsRef = firebaseRef(firebaseDb, `comments/${addressId}`);
      const snapshot = await get(commentsRef);
      if (snapshot.exists()) {
        const data = snapshot.val();
        const fetchedComments: Comment[] = Object.keys(data).map(key => ({ id: key, ...data[key] }));
        fetchedComments.sort((a, b) => a.timestamp - b.timestamp);
        setComments(fetchedComments);
      }
    };

    fetchComments();
  }, [addressId]);

  return (
    <View style={styles.container}>
      <FlatList
        data={comments}
        style={styles.list}
        renderItem={({ item }) => (
          <View style={styles.commentContainer}>
            <Text style={styles.commentText}>{item.text}</Text>
            <Text style={styles.userName}>{item.userName}</Text>
          </View>
        )}
        keyExtractor={item => item.id}
        
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
  },
  list : {
    minHeight : "60%"
  },
  commentContainer: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 1.2,
    elevation: 2,
    minWidth: "90%",
    maxWidth : "90%"
  },
  commentText: {
    fontSize: 16,
    width : "100%",
    color: '#333',
  },
  userName: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
    fontStyle: 'italic',
  },
  separator: {
    height: 1,
    width: '100%',
    backgroundColor: '#ddd',
    marginVertical: 5,
  },
});

export default CommentsList;
