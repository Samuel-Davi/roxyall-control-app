import AccountBox from "@/components/layout/editPages/AccountBox";
import { contasMockData } from "@/utils/utils";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function ManageAccounts() {

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable style={styles.iconButton} onPress={() => router.push('/pages/home')}>
          <Ionicons name='arrow-back' size={28} color="white" />
        </Pressable>
        <Text style={{color: 'white', fontSize: 20}} >Contas</Text>
        <Pressable style={styles.iconButton} onPress={() => router.push('/editsPages/createAccount')}>
          <Ionicons name='add-circle-outline' size={28} color="white" />
        </Pressable>
      </View>
      <View style={styles.main}>
        {contasMockData.map((account) => (
          <AccountBox id={account.id} key={account.id} visible={true} saldo={account.saldo} name={account.nome} />
        ))}
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
  header:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '5%',
    marginBottom: 16,
  },
  main:{
    height: '90%',
    borderRadius: 10,
    padding: 16,
    rowGap: 20
  },
  iconButton: {
    backgroundColor: '#1e293b',
    padding: 8,
    borderRadius: 8,
  }
})