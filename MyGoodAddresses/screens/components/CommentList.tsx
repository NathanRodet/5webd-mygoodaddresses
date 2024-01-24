import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { get, ref as firebaseRef } from 'firebase/database';
import { firebaseDb } from '../../firebase';

interface Comment {
  id: string;
  userId: string;
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
        // Sort comments by timestamp
        fetchedComments.sort((a, b) => b.timestamp - a.timestamp);
        setComments(fetchedComments);
      }
    };

    fetchComments();
  }, [addressId]);

  return (
    <FlatList
      data={comments}
      renderItem={({ item }) => (
        <View>
          <Text>{item.text}</Text>
          <Text>{item.userId}</Text>

          {/* Display additional comment details as needed */}
        </View>
      )}
      keyExtractor={item => item.id}
    />
  );
};


export default CommentsList;
