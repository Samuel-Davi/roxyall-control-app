import CardBox from "@/components/layout/editPages/CardBox";
import { cardsMockData } from "@/utils/utils";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function ManageCards() {

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable style={styles.iconButton} onPress={() => router.push('/pages/home')}>
          <Ionicons name='arrow-back' size={28} color="white" />
        </Pressable>
        <Text style={{color: 'white', fontSize: 20}} >Cartões</Text>
        <Pressable style={styles.iconButton} onPress={() => router.push('/editsPages/createCard')}>
          <Ionicons name='add-circle-outline' size={28} color="white" />
        </Pressable>
      </View>
      <View style={styles.main}>
        {cardsMockData.map((card) => (
          <CardBox id={card.id} 
            key={card.id} 
            visible={true} 
            limiteDisponivel={card.limiteDisponivel} 
            faturaAtual={card.faturaAtual}
            name={card.nome} />
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