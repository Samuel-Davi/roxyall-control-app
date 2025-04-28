import React, { useState } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Transaction } from '@/types/Transaction';
import { format } from 'date-fns';

type Props = {
  visible: boolean;
  onClose: () => void;
  onSubmit: (data: Transaction) => void;
};

export const AddTransaction: React.FC<Props> = ({ visible, onClose, onSubmit }) => {
  const [id] = useState(0)
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Alimentação');

  const handleSubmit = () => {
    if (!description || !amount) return;

    onSubmit({
      id,
      description,
      amount: parseFloat(amount),
      date: format(new Date(), 'yyyy-MM-dd'),
      category,
    });
    setDescription('');
    setAmount('');
    setCategory('Alimentação');
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.title}>Adicionar Transação</Text>

          <TextInput
            style={styles.input}
            placeholder="Descrição"
            placeholderTextColor="#aaa"
            value={description}
            onChangeText={setDescription}
          />
          <TextInput
            style={styles.input}
            placeholder="Valor"
            placeholderTextColor="#aaa"
            keyboardType="numeric"
            value={amount}
            onChangeText={setAmount}
          />
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={category}
              onValueChange={(itemValue) => setCategory(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="Alimentação" value="Alimentação" />
              <Picker.Item label="Transporte" value="Transporte" />
              <Picker.Item label="Lazer" value="Lazer" />
              <Picker.Item label="Despesas Fixas" value="Despesas Fixas" />
              <Picker.Item label="Saúde" value="Saúde" />
              <Picker.Item label="Renda Fixa" value="Renda Fixa" />
              <Picker.Item label="Renda Variável" value="Renda Variável" />
            </Picker>
          </View>

          <View style={styles.buttons}>
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.cancelText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
              <Text style={styles.submitText}>Salvar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: '#0009',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: '#1e293b',
    padding: 20,
    borderRadius: 12,
    width: '90%',
  },
  title: {
    color: 'white',
    fontSize: 20,
    marginBottom: 12,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#334155',
    color: 'white',
    padding: 10,
    borderRadius: 8,
    marginVertical: 6,
  },
  pickerContainer: {
    backgroundColor: '#334155',
    borderRadius: 8,
    marginVertical: 6,
  },
  picker: {
    color: 'white',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  cancelButton: {
    backgroundColor: '#64748b',
    padding: 10,
    borderRadius: 8,
    flex: 1,
    marginRight: 8,
  },
  submitButton: {
    backgroundColor: '#3b82f6',
    padding: 10,
    borderRadius: 8,
    flex: 1,
    marginLeft: 8,
  },
  cancelText: {
    color: 'white',
    textAlign: 'center',
  },
  submitText: {
    color: 'white',
    textAlign: 'center',
  },
});
