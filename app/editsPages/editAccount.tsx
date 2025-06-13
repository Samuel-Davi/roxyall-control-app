import { accountNames, contasMockData, TypeContasMockDatas } from "@/utils/utils";
import { Ionicons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";

export default function EditAccount() {
    const params = useLocalSearchParams();
    const id = Number(params.id);

    const [account,  setAccount] = useState<TypeContasMockDatas | null>(null);
    const [selectedBank, setSelectedBank] = useState('');

    useEffect(() => {
        const getAccount = contasMockData.find(account => account.id === id);
        setAccount(getAccount || null);
        if (getAccount) setSelectedBank(getAccount.nome);
    }, [id])


    return (
        <View style={{ flex: 1, backgroundColor: '#0f172a', padding: 16 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', height: '5%', marginBottom: 16 }}>
                <Pressable onPress={() => router.push('/editsPages/manageAccounts')}>
                    <Ionicons name='arrow-back' size={28} color="white" />
                </Pressable>
                <Text style={{ color: 'white', fontSize: 20 }}>Editar Conta</Text>
                <Pressable onPress={() => console.log('Save Changes Pressed')}>
                    <Ionicons name='checkmark-circle-outline' size={28} color="white" />
                </Pressable>
            </View>
            <View style={{ height: '90%', borderRadius: 10, padding: 16 }}>
                {account ? (
                    <View style={{ backgroundColor: '#1e293b', padding: 15, borderRadius: 10 }}>
                        <Text style={{ color: 'white', marginBottom: 8 }}>Banco:</Text>
                        <Picker
                            selectedValue={selectedBank}
                            style={{ color: 'white', backgroundColor: '#334155' }}
                            dropdownIconColor="white"
                            onValueChange={(itemValue) => setSelectedBank(itemValue)}
                        >
                            {accountNames.map((bankName) => (
                                <Picker.Item key={bankName} label={bankName} value={bankName} />
                            ))}
                            {/* Adicione outros bancos conforme necessário */}
                        </Picker>
                        <Text style={{ color: 'white', marginTop: 16 }}>Saldo:</Text>
                        <TextInput
                            value={account.saldo.toString()}
                            onChangeText={text =>
                                setAccount(prev =>
                                    prev ? { ...prev, saldo: Number(text) } : prev
                                )
                            }
                            keyboardType="numeric"
                            style={{
                                color: 'white',
                                fontSize: 18,
                                marginBottom: 16,
                                backgroundColor: '#334155',
                                borderRadius: 8,
                                padding: 8,
                            }}
                            placeholder="Digite o saldo"
                            placeholderTextColor="#94a3b8"
                        />
                    </View>
                ) : (
                    <Text style={{ color: 'white' }}>Conta não encontrada</Text>
                )}
            </View>
        </View>
    )
}