import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, FlatList, ActivityIndicator, Button } from 'react-native';
import axios from 'axios';

function HomeScreen() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://fakestoreapi.com/products');
        setProducts(response.data); // Products are directly in response.data
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.headingContainer}>
        <Text style={styles.heading}>E-SHOPPING CART</Text>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          key={'fixed'} // Use a fixed key to prevent dynamic changes
          data={products}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.cardContainer}>
              <View style={styles.card}>
                <Image source={{ uri: item.image }} style={styles.productImage} />
                <Text style={styles.productTitle}>{item.title}</Text>
                <Text style={styles.productPrice}>${item.price}</Text>
                <View style={styles.buttonContainer}>
                  <Button title="Add to Cart" color="#000" onPress={() => { /* Add your logic here */ }} />
                </View>
              </View>
            </View>
          )}
          numColumns={2} // Fixed number of columns
          columnWrapperStyle={styles.row} // Style for each row of items
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
    backgroundColor: '#f5f5f5',
    marginTop: 90,
  },
  headingContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  cardContainer: {
    flex: 1,
    margin: 8,
    position: 'relative',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 3,
    height: 320,
    padding: 10,
    alignItems: 'center',
  },
  productImage: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },
  productTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 8,
  },
  productPrice: {
    fontSize: 18,
    color: '#888',
  },
  row: {
    justifyContent: 'space-between',
  },
  buttonContainer:{
    marginTop: 15
  }
});

export default HomeScreen;
