import { accountNames, contasMockData, TypeContasMockDatas } from "@/utils/utils";
import { Ionicons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { router } from "expo-router";
import { useState } from "react";
import Toast from 'react-native-toast-message'
import { Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function CreateAccount() {

    const usedNames = contasMockData.map(account => account.nome);
    const availableAccounts = accountNames.filter(name => !usedNames.includes(name));

    const [selectedBank, setSelectedBank] = useState(availableAccounts[0] || '');
    const [saldo, setSaldo] = useState(0.0);

    const addAccount = () => {
        if (selectedBank && saldo >= 0) {
            const newAccount:TypeContasMockDatas = {
                id: contasMockData.length + 1,
                id_user: 1, // usuario fixo para o exemplo
                nome: selectedBank,
                saldo: saldo
            };
            contasMockData.push(newAccount);
            router.push('/editsPages/manageAccounts'); // Redireciona para a página de gerenciamento de contas
        } else {
            Toast.show({
                type: 'error',
                text1: 'Preencha todos os campos corretamente'
            })
        }
    }


    return (
        <View style={styles.screen}>
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: '5%', marginBottom: 16 }}>
                <Pressable style={styles.iconButton} onPress={() => router.push('/editsPages/manageAccounts')}>
                    <Ionicons name='arrow-back' size={28} color="white" />
                </Pressable>
                <Text style={{ color: 'white', fontSize: 20 }}>Criar Conta</Text>
            </View>
            <View style={styles.container}>
                <Text style={{ color: 'white', marginBottom: 8 }}>Escolha a conta:</Text>
                {selectedBank.valueOf() !== "" ? (
                    <Picker selectedValue={selectedBank}
                    style={{ color: 'white', backgroundColor: '#334155', height: 50, width: '100%', marginBottom: 16 }}
                    dropdownIconColor="white"
                    onValueChange={(itemValue) => setSelectedBank(itemValue)}
                >
                {availableAccounts.map(name => (
                    <Picker.Item key={name} label={name} value={name} />
                ))}
                </Picker>
                ) : (
                    <Text style={{ color: 'white', marginBottom: 16 }}>Nenhuma conta disponível !!</Text>
                )}
                <Text style={{ color: 'white', marginBottom: 8 }}>Saldo atual da conta:</Text>
                <TextInput
                    keyboardType="numeric"
                    style={{
                        color: 'white',
                        fontSize: 18,
                        marginBottom: 16,
                        backgroundColor: '#334155',
                        padding: 10,
                        borderRadius: 8
                    }}
                    placeholder="Digite o saldo"
                    placeholderTextColor="#9ca3af"
                    onChangeText={(text) => {
                        setSaldo(Number(text));
                    }}
                />
                <TouchableOpacity onPress={() => addAccount()}  style={styles.buttonOutline}>
                    <Text style={styles.buttonOutlineText}>Criar Conta</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        backgroundColor: '#0f172a',
        flex: 1,
        padding: 16,
    },
    iconButton: {
        backgroundColor: '#1e293b',
        padding: 8,
        borderRadius: 8,
        position: 'absolute',
        left: 6,
    },
    container: {
        height: '90%', borderRadius: 10, padding: 16,
        rowGap: 5,
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
})