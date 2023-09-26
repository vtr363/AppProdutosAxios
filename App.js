import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Button, Keyboard, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import axios from "axios"; 

export default function App() {
  const[json, setJson] = useState([]);

  const goAPIProsutos = () => {
    
  
    axios.get('http://localhost:3000/produtos')
      .then(response => {
        console.log(response.data);
        if(response.data){

          setJson(response.data);
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  return (
    <SafeAreaView style={{top: 30}}>
      <View style={{ margin: 18 }}>
        {/* <TextInput
          style={{ margin: 18 }}
          onChangeText={(value) => setnomeProduto(value)}
          placeholder="Entre com o CEP"
        /> */}
        <Button
          title={'Mostrar produtos'}
          onPress={() => { goAPIProsutos() }}
          color='green'
        />
        {json.map((produto) => {
          console.log(produto);
          <Text>{produto}</Text>
        })}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

