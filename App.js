import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, Dimensions } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';

import Carousel, { PaginationLight } from 'react-native-x-carousel';

const { width } = Dimensions.get('window');

export default function App() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:3000/produtos');
      const data = response.data;
      if (data) {
        setProducts(data);
      } else {
        console.error('Invalid data format');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleProductChange = (productId) => {
    const selectedProduct = products.find((product) => product.id === productId);
    setSelectedProduct(selectedProduct);
  };

  const renderItem = data => (
    <View
      key={data.coverImageUri}
      style={styles.cardContainer}
    >
      <View
        style={styles.cardWrapper}
      >
        <Image
          style={styles.card}
          source={{ uri: data.coverImageUri }}
        />
        <View
          style={[
            styles.cornerLabel,
            { backgroundColor: data.cornerLabelColor },
          ]}
        >
          <Text style={styles.cornerLabelText}>
            { data.cornerLabelText }
          </Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Menu de Produtos</Text>

      {/* Picker */}
      <Picker
        selectedValue={selectedProduct ? selectedProduct.id : null}
        onValueChange={(value) => handleProductChange(value)}
        style={styles.picker}>
        <Picker.Item label="Selecione um produto" value={null} />
        {products.map((product) => (
          <Picker.Item key={product.id} label={product.nome} value={product.id} />
        ))}
      </Picker>

      {/* Display Product Details */}
      {selectedProduct && (
        <View style={styles.productDetailContainer}>
          <Text style={styles.productDetailText}>Descrição: {selectedProduct.descricao}</Text>
          <Text style={styles.productDetailText}>Preço: {selectedProduct.preco}</Text>
          {/* Add more details as needed */}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width,
  },
  cardWrapper: {
    borderRadius: 8,
    overflow: 'hidden',
  },
  card: {
    width: width * 0.9,
    height: width * 0.5,
  },
  cornerLabel: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    borderTopLeftRadius: 8,
  },
  cornerLabelText: {
    fontSize: 12,
    color: '#fff',
    fontWeight: '600',
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 2,
    paddingBottom: 2,
  },
});