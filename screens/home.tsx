import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useAuth } from '@/context/AuthContext';
// import { getSaldoFromBD, SQLiteContext } from '@/services/sqliteContext';
import CreditCard from '@/components/layout/pages/CreditCard';
import AccountBox from '@/components/layout/pages/AccountBox';
import { cardsMockData, contasMockData } from '@/utils/utils';
import { router } from 'expo-router';

export default function Home(){

  const [saldo, setSaldo] = useState(0.0)
  const [saldoVisible, setSaldoVisible] = useState(false)
  const [faturaVisible, setFaturaVisible] = useState(false)

  const { user, logout } = useAuth()
  // const db = useContext(SQLiteContext)
  const userImage = require("@/assets/images/eu.jpeg")

  const updateSaldo = async () => {
      // const result = await getSaldoFromBD(user, db)
      const mockSaldo = contasMockData.reduce((acc, item) => acc + item.saldo, 0)
      const result = mockSaldo
      if(result){
          setSaldo(result)
      }
  }

  useEffect(() => {
    updateSaldo()
  }, [])

  return (
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View style={{flexDirection: 'row', columnGap: 10}}>
            <Image source={userImage} style={styles.avatar} />
            <View>
              <Text style={styles.greeting}>Bom dia,</Text>
              <Text style={styles.username}>{user?.name}</Text>
            </View>
          </View>
          <View style={styles.headerIcons}>
            <TouchableOpacity onPress={() => logout()} style={styles.iconButton}>
              <Ionicons name="log-out" size={20} color="white" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Contas */}
        <View style={styles.card}>
            {/* Saldo geral */}
          <View style={styles.saldoGeral}>
            <View>
              <Text style={styles.infoText}>Saldo geral</Text>
              <Text style={[styles.money, {color: saldoVisible ? '#fff' : 'gray'}]}>{saldoVisible ?  "R$ " + saldo : "---"}</Text>
            </View>
            <TouchableOpacity onPress={() => setSaldoVisible(prev => !prev)}>
              <Ionicons name={saldoVisible ? 'eye' : 'eye-off'} size={28} color="white" />
            </TouchableOpacity>
          </View>
          <Text style={styles.infoText}>Minhas contas</Text>
          {contasMockData.map(item => (
            <AccountBox key={item.id} saldo={item.saldo} name={item.nome} visible={saldoVisible} />
          ))}
          <TouchableOpacity onPress={() => router.push('/editsPages/manageAccounts')} style={styles.buttonOutline}>
            <Text style={styles.buttonOutlineText}>Gerenciar contas</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.card}>
          <View style={styles.saldoGeral}>
            <View>
              <Text style={styles.infoText}>Todas as Faturas</Text>
              <Text style={[styles.money, {color: faturaVisible ? 'red' : 'gray'}]}>{faturaVisible ?  "-R$ 85.00" : "---"}</Text>
            </View>
            <TouchableOpacity onPress={() => setFaturaVisible(prev => !prev)}>
              <Ionicons name={faturaVisible ? 'eye' : 'eye-off'} size={28} color="white" />
            </TouchableOpacity>
          </View>
          <Text style={styles.infoText}>Meus Cartões</Text>
          {cardsMockData.map(item => (
            <CreditCard key={item.id} moneyVisible={faturaVisible} name={item.nome}
            faturaAtual={item.faturaAtual} limiteDisponivel={item.limiteDisponivel} />
          ))}
          <TouchableOpacity style={styles.buttonOutline}>
            <Text style={styles.buttonOutlineText}>Gerenciar Cartões</Text>
          </TouchableOpacity>
        </View>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0f172a',
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    columnGap: 10
  },
  greeting: {
    color: '#fff',
    fontSize: 14,
  },
  username: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  avatar: {
    width: 45,
    height: 45,
    borderRadius: 25,
    marginRight: 10,
  },
  headerIcons: {
    flexDirection: 'row',
    gap: 12,
  },
  iconButton: {
    backgroundColor: '#1e293b',
    padding: 8,
    borderRadius: 8,
  },
  card: {
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 35,
    marginVertical: 10,
  },
  saldoGeral : {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between' ,
    borderBottomColor: 'white', 
    borderBottomWidth: 0.5, 
    paddingVertical: 10, 
    marginBottom: 10
  },
  cardGreen: {
    backgroundColor: '#22c55e',
    borderRadius: 12,
    padding: 16,
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardText: {
    color: 'white',
    fontSize: 16,
    flex: 1,
    fontWeight: 'bold',
  },
  infoText: {
    color: '#fff',
    fontSize: 14,
    marginBottom: 8,
  },
  subText: {
    color: '#9ca3af',
    fontSize: 12,
    marginBottom: 10,
  },
  progressBarBackground: {
    width: '100%',
    height: 8,
    backgroundColor: '#374151',
    borderRadius: 4,
    marginBottom: 8,
  },
  progressBarFill: {
    height: 8,
    backgroundColor: '#fbbf24',
    borderRadius: 4,
  },
  button: {
    backgroundColor: '#d6a659',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#1e1e1e',
    fontWeight: 'bold',
  },
  money: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  circleBlue: {
    width: 45,
    height: 45,
    borderRadius: 15,
    backgroundColor: '#3b82f6',
    marginRight: 10,
  },
  circlePurple: {
    width: 45,
    height: 45,
    borderRadius: 15,
    backgroundColor: '#a855f7',
    marginRight: 10,
  },
  buttonOutline: {
    borderWidth: 1,
    borderColor: '#22c55e',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 12,
  },
  buttonOutlineText: {
    color: '#22c55e',
    fontWeight: 'bold',
  },
});
