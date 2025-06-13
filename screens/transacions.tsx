import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { format } from 'date-fns';
import { AddTransaction } from '@/components/AddTransaction';
import { Transaction } from '@/types/types';
// import { addTransacionsOnBD, SQLiteContext } from '@/services/sqliteContext';
import { useAuth } from '@/context/AuthContext';
// import { useTransactions } from '@/context/TransactionContext';

const { height, width } = Dimensions.get('window')

const categories = ['Alimentação', 'Transporte','Despesas Fixas', 'Lazer', 'Saúde', 'Renda Fixa', 'Renda Variável', 'Outros'];

export default function Transactions() {

  //layout
  const [modalVisible, setModalVisible] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  //logic
  const { user } = useAuth()
  // const db = useContext(SQLiteContext)
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  // const { transactions, addTransaction } = useTransactions()

  // const handleSaveNewTransaction = async (data: Transaction) => {
  //   let newData = data
  //   if(!(newData.category.startsWith("Renda"))){
  //     newData.amount *= -1
  //   }
  //   newData.id = transactions.length + 1
    
  //   await addTransacionsOnBD(newData, user, db)
  //   addTransaction(newData)
  // };

  const showDatePicker = () => setDatePickerVisibility(true);
  const hideDatePicker = () => setDatePickerVisibility(false);

  const handleConfirm = (date: Date) => {
    setSelectedDate(date);
    hideDatePicker();
  };

  const handleClearFilters = () => {
    setSelectedDate(null);
    setSelectedCategory('Todos');
  };

  // const orderedData = transactions.sort(
  //   (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  // )

  // const filteredData = orderedData.filter(tx => {
  //   const txDateString = tx.date.slice(0, 10); // Assume tx.date é string ISO
  
  //   const dateMatch = selectedDate
  //     ? txDateString === format(selectedDate, 'yyyy-MM-dd')
  //     : true;
  
  //   const categoryMatch =
  //     selectedCategory === 'Todos' || tx.category === selectedCategory;
  
  //   return dateMatch && categoryMatch;
  // });

  return (
    <View style={{ flex: 1, backgroundColor: '#0f172a', paddingHorizontal: 16, paddingTop: height*0.015 }}>
      {/* <TouchableOpacity
        onPress={showDatePicker}
        style={{
          backgroundColor: '#1e293b',
          padding: 12,
          borderRadius: 12,
          marginBottom: height*0.015,
        }}
      >
        <Text style={{ color: 'white', textAlign: 'center' }}>
          {selectedDate
            ? `Data: ${format(selectedDate, 'dd/MM/yyyy')}`
            : 'Filtrar por data'}
        </Text>
      </TouchableOpacity>

      <View style={styles.viewCategorias}>
        {categories.map(cat => (
          <TouchableOpacity
            key={cat}
            onPress={() => setSelectedCategory(cat)}
            style={[styles.buttonsFiltrarCategorias, {backgroundColor: selectedCategory === cat ? '#38bdf8' : '#1e293b'}]}
          >
            <Text style={{ color: 'white' }}>{cat}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        onPress={handleClearFilters}
        style={styles.buttonLimparFiltros}
      >
        <Text style={{ color: 'white', textAlign: 'center' }}>Limpar Filtros</Text>
      </TouchableOpacity>

      <FlatList
        style={{maxHeight: height*0.57}}
        data={filteredData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.transaction}>
            <View>
              <Text style={styles.description}>{item.description}</Text>
              <Text style={styles.category}>{item.category}</Text>
            </View>
            <View style={styles.rightSection}>
              <Text style={[styles.value, { color: item.amount < 0 ? '#EF4444' : '#10B981' }]}>
                {item.amount < 0 ? '-' : '+'}R$ {Math.abs(item.amount).toFixed(2)}
              </Text>
              <Text style={styles.date}>{item.date}</Text>
            </View>
          </View>
        )}
      />

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        maximumDate={new Date()}
        locale="pt-BR"
      />
      <TouchableOpacity
        onPress={() => {
          // ação de navegação ou modal de adicionar transação
          console.log('Adicionar transação');
          setModalVisible(true)
        }}
        style={styles.buttonAddTransaction}
      >
        <Text style={{ fontSize: 30, color: '#0f172a' }}>+</Text>
      </TouchableOpacity>

      <AddTransaction
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSubmit={handleSaveNewTransaction}
      /> */}
      <Text style={styles.description}>Transactions</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: '#0f172a',
  },
  picker: {
    color: 'white',
    backgroundColor: '#1e293b',
    marginBottom: 16,
    borderRadius: 12,
  },
  viewCategorias:{
    flexWrap: 'wrap', 
    alignItems:'center', 
    flexDirection: 'row', 
    justifyContent: 'center', 
    paddingBottom: height*0.015,
    gap: 10
  },
  buttonsFiltrarCategorias:{
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: 8,
    height: height*0.03
  },
  buttonLimparFiltros:{
    backgroundColor: '#ef4444',
    padding: 10,
    borderRadius: 12,
    marginBottom: 16,
  },
  transaction: {
    backgroundColor: '#1e293b',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  description: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  category: {
    color: '#94a3b8',
    fontSize: 12,
    marginTop: 4,
  },
  rightSection: {
    alignItems: 'flex-end',
  },
  value: {
    fontSize: 16,
    fontWeight: '600',
  },
  date: {
    color: '#94a3b8',
    fontSize: 12,
    marginTop: 4,
  },
  buttonAddTransaction:{
    position: 'absolute',
    bottom: height * 0.08,
    right: (width * 0.5) - 30,
    backgroundColor: '#38bdf8',
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  }
});