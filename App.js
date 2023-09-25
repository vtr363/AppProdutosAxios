import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Button, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import axios from "axios"; 

export default function App() {
  const [fromAxios, setFromAxios] = useState(false)
  const [loading, setLoading] = useState(false)
  const [json, setJson] = useState(null)

  const goAPIProsutos = () => {
    setFromAxios(false);
    setLoading(true);
  
    axios.get(`https:172.20.192.1:3000/produtos/`)
      .then(response => {
        console.log(response.data);
        setTimeout(() => {
          setLoading(false);
          setJson(response.data);
          setFromAxios(true);
          Keyboard.dismiss();
          setOperacao(false);
        }, 2000)
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
        <Text>
          {json}
        </Text>
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

