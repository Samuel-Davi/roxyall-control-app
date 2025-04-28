import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import Animated, { Easing, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { Loading } from '@/components/Loading';
import Toast from 'react-native-toast-message';
import { cadastroUsuario, SQLiteContext } from '@/services/sqliteContext';
import { User } from '@/types/User';

export default function Cadastro() {

  //logic register
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false)
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter();
  const db = useContext(SQLiteContext)

  //layout
  const offset = useSharedValue(100);
  const opacity = useSharedValue(0);

  const handleRegister = async () => {
    if(!email || !name || !password || !confirmPassword){
      Toast.show({
        text1: "Preencha os campos corretamente",
        type: 'error'
      })
      return
    }

    if(password !== confirmPassword){
      Toast.show({
        text1: "Senhas Diferentes",
        type: 'error'
      })
      return
    }
    const user:User = {
      id:0,
      email: email,
      password: password,
      name: name,
      avatar: ''
    }
    setLoading(true)
    const result = await cadastroUsuario(user, db)
    if(result){
      Toast.show({
        type: 'success',
        text1: 'Cadastro Realizado'
      })
      setLoading(false)
      router.push('/')
    } else{
      Toast.show({
        type: 'error',
        text1: "Erro ao Cadastrar Usuário"
      })
      setEmail("")
      setName("")
      setPassword("")
      setConfirmPassword("")
    }
    setLoading(false)
  };

  //layout functions
  useEffect(() => {
    offset.value = withTiming(0, { duration: 700, easing: Easing.out(Easing.exp) });
    opacity.value = withTiming(1, { duration: 700 });
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: offset.value }],
    opacity: opacity.value,
  }));

  return (
    <View
      style={styles.container}
    >
      <Image source={require('../assets/images/favicon.png')} style={styles.logo} />

      <Animated.View style={animatedStyle}>
        <Text style={styles.title}>Crie sua conta</Text>

        <TextInput  
            value={name}
            onChangeText={setName}
            style={styles.input} 
            placeholder="Nome" 
            placeholderTextColor="#aaa" 
        />
        <TextInput  
            value={email}
            onChangeText={setEmail}
            style={styles.input} 
            placeholder="Email" 
            placeholderTextColor="#aaa" 
        />
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
        <View style={styles.inputContainer}>
            <TextInput
                style={styles.input}
                placeholder="Confirme a senha"
                placeholderTextColor="#aaa"
                secureTextEntry={!confirmPasswordVisible}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
            />
            <TouchableOpacity
                onPress={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
                style={styles.eyeButton}
            >
                <Ionicons
                  name={confirmPasswordVisible ? 'eye' : 'eye-off'}
                  size={24}
                  color="#888"
                />
            </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={handleRegister} style={styles.signUpButton}>
          {loading ? (<Loading/>) : (<Text style={styles.signInText}>Cadastrar</Text>)}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/')}>
          <Text style={styles.linkText}>Já tem conta? Faça login</Text>
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
  link: {
    color: '#00f7ff',
    textDecorationLine: 'underline',
    fontSize: 14,
  },
  signUpButton: {
    backgroundColor: '#00f7ff',
    padding: 16,
    borderRadius: 10,
    marginVertical: 12,
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
  signUpText: {
    textAlign: 'center',
    color: '#00f7ff',
    fontSize: 16,
    fontWeight: '500',
  },
  linkText: {
    color: '#38bdf8',
    marginTop: 20,
    fontSize: 14,
    alignSelf: 'center'
  },
});
