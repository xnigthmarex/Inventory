import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { TextInput, TouchableOpacity, Text, View, Keyboard, TouchableWithoutFeedback, Button } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuth } from '../context/AuthContext';


export default function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const {onLogin, onRegister} = useAuth();

  const handleUsernameChange = (text:string) => {
    setUsername(text);
  };

  const handlePasswordChange = (text:string) => {
    setPassword(text);
  };

  const handleLogin = async () => {
    const result = await onLogin!(username, password);
    if (result && result.error) {
      alert(result.error);
    }
  }

  

  const handleCreateAccount = async() => {
    const result  = await onRegister!(username, password);
    if(result&&result.error){
      alert(result.error);
    }else{
      handleLogin();
    }
  }

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard} accessible={false}>
      <LinearGradient
        colors={['#ADD8E6', '#00008B']}
        style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingBottom: 140 }}
      >
        <View style={{ marginBottom: 10, flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ color: 'white', fontSize: 40 }}>Inventory</Text>
        </View>
        <TextInput
          placeholder="Enter Username"
          placeholderTextColor="#999999"
          value={username}
          onChangeText={handleUsernameChange}
          className="border-2"
          style={{
            color: 'black',
            fontSize: 18,
            backgroundColor: '#F5F5F5',
            paddingHorizontal: 15,
            paddingVertical: 10,
            borderRadius: 5,
            width: '60%',
            marginBottom: 20,
          }}
        />
        <TextInput
          placeholder="Enter Password"
          placeholderTextColor="#999999"
          secureTextEntry
          value={password}
          onChangeText={handlePasswordChange}
          className="border-2"
          style={{ //some times you need to use style instead of className
            color: 'black',
            fontSize: 18,
            backgroundColor: '#F5F5F5',
            paddingHorizontal: 15,
            paddingVertical: 10,
            borderRadius: 5,
            width: '60%',
            marginBottom: 20,
          }}
        />
        <TouchableOpacity
          onPress={handleLogin}
          style={{
            backgroundColor: '#00008B',
            paddingVertical: 10,
            paddingHorizontal: 20,
            borderRadius: 5,
          }}
        >
          <Text style={{ color: 'white', fontSize: 18 }}>Login</Text>
        
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleCreateAccount}
          style={{
            backgroundColor: '#00008B',
            paddingVertical: 10,
            paddingHorizontal: 20,
            borderRadius: 5,
          }}
        >
          <Text style={{ color: 'white', fontSize: 18 }}>Create Account</Text>
        
        </TouchableOpacity>
        <StatusBar style="auto" />
      </LinearGradient>
    </TouchableWithoutFeedback>
  );
}
