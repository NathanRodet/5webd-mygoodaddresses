import { StyleSheet, Text, View } from 'react-native';
import { findFoodProductById } from '../utils/findFoodProductById';
import { HomeDetailsProps } from '../models/HomeDetails';


export default function HomeDetails({ route, navigation }: { navigation: any, route: any }) {
  const { foodProductId }: HomeDetailsProps = route.params;
  const foodProduct = findFoodProductById(foodProductId);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{foodProduct.name}</Text>
      <Text style={styles.text}>{foodProduct.description}</Text>
      <Text style={styles.text}>{foodProduct.price}</Text>
      <Text style={styles.text}>{foodProduct.weight}</Text>
      <Text style={styles.text}>{foodProduct.category}</Text>
      <Text style={styles.text}>{foodProduct.origin}</Text>
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
  text: {
    fontSize: 20,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
