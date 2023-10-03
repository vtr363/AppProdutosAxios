import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';

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
    padding: 16,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 16,
  },
  productDetailContainer: {
    marginTop: 16,
  },
  productDetailText: {
    fontSize: 16,
  },
});
