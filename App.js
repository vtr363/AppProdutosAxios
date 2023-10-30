import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Image,FlatList, Dimensions } from "react-native";
import { Picker } from "@react-native-picker/picker";
import axios from "axios";

import Carousel, { PaginationLight } from "react-native-x-carousel";

const { width } = Dimensions.get("window");

export default function App() {
  const [products, setProducts] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [selectedCategoria, setSelectedCategoria] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
    fetchCategorias();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:3000/produtos");
      const data = response.data;
      setProducts(data);

    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchCategorias = async () => {
    try {
      const response = await axios.get("http://localhost:3000/categorias");
      const data = await response.data;
      setCategorias(data);
      console.log(categorias)
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const handleCategoriaChange = (categoriaId) => {
    const selectedProduct = categorias.find(
      (categoria) => categoria.id === categoriaId
    );
    setSelectedCategoria(selectedProduct);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Menu de Produtos</Text>

      {/* Picker */}
      <Picker
        selectedValue={selectedCategoria}
        onValueChange={(value) => handleCategoriaChange(value)}
        style={styles.picker}
      >
        <Picker.Item label="Selecione um produto" value={null} />
        {categorias.map((categoria) => (
          <Picker.Item
            key={categoria.id}
            label={categoria.nome}
            value={categoria.id}
          />
        ))}
      </Picker>
      <FlatList
        data={categorias}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            
            <Text style={styles.nome}>{item.nome}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  heading: {
    
    fontSize: 24,
    fontWeight: 'bold',
    paddingTop: 30,
    marginBottom: 16,
    
  },item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
    paddingVertical: 10,
  },
  nome: {
    fontSize: 16,
  },
});
