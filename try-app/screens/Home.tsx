import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { findFoodProducts } from '../utils/findFoodProducts';

export default function Home({ navigation }: { navigation: any }) {
  const foodProducts = findFoodProducts();

  return (
    <View style={styles.container}>
      <FlatList
        data={foodProducts.data}
        renderItem={({ item }) =>
          <TouchableOpacity onPress={() => navigation.navigate('HomeDetails', { foodProductId: item.id })}>
            <Text style={styles.title}>{item.name}</Text>
          </TouchableOpacity>
        }
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
