//layout imports
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';

//logic imports
import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
// import { SQLiteContext, verificaLogin } from '@/services/sqliteContext';
import Toast from 'react-native-toast-message'
import { useAuth } from '@/context/AuthContext';
import { userMockData } from '@/utils/utils';
import * as LocalAuthentication from 'expo-local-authentication';
import { Alert } from 'react-native';

export default function AnimatedLogin() {

  //autenticação
  // const db = useContext(SQLiteContext)
  const router = useRouter()
  const { login } = useAuth()

  //layout
  const offset = useSharedValue(100);
  const opacity = useSharedValue(0);

  //controllers
  const [passwordVisible, setPasswordVisible] = useState(false);

  //userInfos
  // const [email, setEmail] = useState('')
  const [password, setPassword]  = useState('')

  //layout functions
  useEffect(() => {
    offset.value = withTiming(0, { duration: 700, easing: Easing.out(Easing.exp) });
    opacity.value = withTiming(1, { duration: 700 });
    handleBiometricLogin()
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: offset.value }],
    opacity: opacity.value,
  }));

  //authentication functions
  const signIn = async () => {
    if(!password) {
      Toast.show({
        type: 'error',
        text1: 'Preencha todos os campos'
      })
      return
    }
    // if (!db){
    //   console.log("banco de dados não carregado")
    //   return
    // }
    // const user = await verificaLogin(email, password, db)
    const user = userMockData.find(value => value.password == password)
    if(user){
      login(user)
      router.push('/pages/home')
    }else{
      Toast.show({
        type: 'error',
        text1: 'Senha incorreta'
      })
      return
    }
  }

  async function handleBiometricLogin() {
    const hasHardware = await LocalAuthentication.hasHardwareAsync();
    const isEnrolled = await LocalAuthentication.isEnrolledAsync();

    if (!hasHardware || !isEnrolled) {
      Alert.alert('Biometria não disponível');
      return;
    }

    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: 'Faça login com biometria',
      fallbackLabel: 'Usar senha',
      cancelLabel: 'Cancelar',
    });

    if (result.success) {
      const user = userMockData.find(value => value.id == 1)
      user ? login(user) : null
      router.push('/pages/home')
    } else {
      switch (result.error) {
        case 'user_cancel':
          Toast.show({
            type: 'error',
            text1:'Autenticação cancelada pelo usuário'
          });
          break;
        case 'system_cancel':
          Toast.show({
            type: 'error',
            text1: 'Autenticação cancelada pelo sistema'
          });
          break;
        case 'not_available':
          Toast.show({
            type: 'error',
            text1:'Biometria não disponível'
          });
          break;
        case 'not_enrolled':
          Toast.show({
            type: 'error',
            text1: 'Nenhuma biometria cadastrada'
          });
          break;
        case 'lockout':
          Toast.show({
            type: 'error',
            text1: 'Muitas tentativas falhas. Tente novamente depois.'
          });
          break;
        default:
          Toast.show({
            type: 'error',
            text1: 'Falha na autenticação biométrica'
          });
          break;
      }
    }
  }

  return (
    <View
      style={styles.container}
    >
      <Image source={require('../assets/images/favicon.png')} style={styles.logo} />

      <Animated.View style={animatedStyle}>
        <Text style={styles.title}>Entrar no Sistema</Text>

        <View style={styles.inputContainer}>
            <TextInput
                style={styles.input}
                placeholder="Senha"
                placeholderTextColor="#aaa"
                secureTextEntry={!passwordVisible}
                value={password}
                onChangeText={setPassword}
            />
            <TouchableOpacity
                onPress={() => setPasswordVisible(!passwordVisible)}
                style={styles.eyeButton}
            >
                <Ionicons
                name={passwordVisible ? 'eye' : 'eye-off'}
                size={24}
                color="#888"
                />
            </TouchableOpacity>
        </View>

        {/* <View style={styles.row}>
          <TouchableOpacity>
            <Text style={styles.link}>Esqueci a senha</Text>
          </TouchableOpacity>
        </View> */}

        <TouchableOpacity onPress={signIn} style={styles.signInButton}>
          <Text style={styles.signInText}>Entrar</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => handleBiometricLogin()} style={styles.signUpButton}>
          <Text style={styles.signUpText}>Entrar com Biometria</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#0f111a',
      padding: 24,
      justifyContent: 'center',
    },
    logo: {
      width: 200,
      height: 200,
      alignSelf: 'center',
    },
    title: {
      fontSize: 24,
      fontWeight: '500',
      color: '#00f7ff',
      textAlign: 'center',
      marginBottom: 32,
      letterSpacing: 1,
    },
    input: {
      backgroundColor: '#1a1d2b',
      borderWidth: 1,
      borderColor: '#00f7ff',
      borderRadius: 10,
      padding: 14,
      fontSize: 16,
      color: '#fff',
      marginBottom: 16,
    },
    inputContainer: {
        position: 'relative',
        width: '100%',
        marginVertical: 10,
    },
    eyeButton: {
        position: 'absolute',
        right: 15,
        top: '20%',
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      alignItems: 'center',
      marginBottom: 24,
    },
    checkboxContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    checkboxLabel: {
      marginLeft: 6,
      fontSize: 14,
      color: '#aaa',
    },
    link: {
      color: '#00f7ff',
      textDecorationLine: 'underline',
      fontSize: 14,
    },
    signInButton: {
      backgroundColor: '#00f7ff',
      padding: 16,
      borderRadius: 10,
      marginBottom: 12,
      shadowColor: '#00f7ff',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.4,
      shadowRadius: 6,
    },
    signInText: {
      color: '#0f111a',
      textAlign: 'center',
      fontSize: 16,
      fontWeight: '600',
    },
    signUpButton: {
      padding: 14,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: '#00f7ff',
    },
    signUpText: {
      textAlign: 'center',
      color: '#00f7ff',
      fontSize: 16,
      fontWeight: '500',
    },
  });
  
  