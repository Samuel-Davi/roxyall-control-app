import Sheet from "@/components/layout/Sheet";
import { AccountName, accountNames, bankLogos, contasMockData, TypeContasMockDatas } from "@/utils/utils";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Image, Modal, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Toast from "react-native-toast-message";

export default function EditAccount() {
    const params = useLocalSearchParams();
    const id = Number(params.id);

    const usedNames = contasMockData.map(account => account.nome);
    

    const [availableAccounts, setAvailableAccounts] = useState<AccountName[]>(accountNames.filter(name => !usedNames.includes(name)));
    const [account,  setAccount] = useState<TypeContasMockDatas | null>(null);
    const [selectedBank, setSelectedBank] = useState(availableAccounts[0] || '');

    const [modalDeleteVisible, setModalDeleteVisible] = useState(false);
    const [isSheetVisible, setIsSheetVisible] = useState(false);

    useEffect(() => {
        const getAccount = contasMockData.find(account => account.id === id);
        setAccount(getAccount || null);
        if (getAccount) setSelectedBank(getAccount.nome);
    }, [id])

    useEffect(() => {
        if (account) {
            setAvailableAccounts(prev => [...prev, account.nome]);
        }else console.log('Conta não encontrada');
    }, [account])

    const editAccount = () => {
        if (account && selectedBank && account.saldo >= 0) {
            const updatedAccount: TypeContasMockDatas = {
                ...account,
                nome: selectedBank,
            };
            const index = contasMockData.findIndex(acc => acc.id === account.id);
            if (index !== -1) {
                contasMockData[index] = updatedAccount;
                router.push('/editsPages/manageAccounts');
            }
        } else {
            Toast.show({
                type: 'error',
                text1: 'Preencha todos os campos corretamente'
            })
        }
    }

    const deleteAccount = () => {
        if (account) {
            const index = contasMockData.findIndex(acc => acc.id === account.id);
            if (index !== -1) {
                contasMockData.splice(index, 1);
                setModalDeleteVisible(false);
                router.push('/editsPages/manageAccounts');
            }
        } else {
            console.log('Conta não encontrada para exclusão');
        }
    }


    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Pressable style={styles.iconButton} onPress={() => router.push('/editsPages/manageAccounts')}>
                    <Ionicons name='arrow-back' size={28} color="white" />
                </Pressable>
                <Text style={{ color: 'white', fontSize: 20 }}>Editar Conta</Text>
                <Pressable style={styles.iconButton} onPress={() => setModalDeleteVisible(true)}>
                    <Ionicons name='trash' size={28} color="white" />
                </Pressable>
            </View>
            <View style={styles.main}>
                {account ? (
                    <View style={{ backgroundColor: '#1e293b', padding: 15, borderRadius: 10 }}>
                        <Text style={{ color: 'white', marginBottom: 16 }}>Banco:</Text>
                        <Pressable style={styles.bankView} onPress={() => {if (selectedBank.valueOf()) setIsSheetVisible(true)}} >
                            {selectedBank.valueOf() !== "" ? (
                                selectedBank !== 'Carteira' ? (
                                    <Image style={styles.bankLogo} source={bankLogos[selectedBank]} />
                                ) : (
                                    [<MaterialCommunityIcons name='credit-card' size={40} color="white" />,
                                        <Text style={{ color: 'white', marginLeft: 10 }}>Outros Cartões</Text>
                                    ]
                                )
                            ) : (
                                <Text style={{ color: 'grey', marginBottom: 16 }}>Nenhuma conta disponível !!</Text>
                            )}
                        </Pressable>
                        <Text style={{ color: 'white', marginVertical: 16 }}>Saldo:</Text>
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
                <TouchableOpacity onPress={() => editAccount()}  style={styles.buttonOutline}>
                    <Text style={styles.buttonOutlineText}>Salvar Alterações</Text>
                </TouchableOpacity>
            </View>
            {modalDeleteVisible && (
                <Modal
                visible={modalDeleteVisible}
                transparent
                animationType="fade"
                onRequestClose={() => setModalDeleteVisible(false)}
                >
                <View style={{
                    flex: 1,
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <View style={{
                    backgroundColor: '#1e293b',
                    padding: 24,
                    borderRadius: 12,
                    alignItems: 'center',
                    width: '80%'
                    }}>
                    <Text style={{ color: 'white', fontSize: 18, marginBottom: 16, textAlign: 'center' }}>
                        Tem certeza que deseja excluir este cartão?
                    </Text>
                    <View style={{ flexDirection: 'row', gap: 16 }}>
                        <TouchableOpacity
                        style={{
                            backgroundColor: '#ef4444',
                            paddingVertical: 10,
                            paddingHorizontal: 20,
                            borderRadius: 8,
                            marginRight: 8
                        }}
                        onPress={deleteAccount}
                        >
                        <Text style={{ color: 'white', fontWeight: 'bold' }}>Excluir</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                        style={{
                            backgroundColor: '#334155',
                            paddingVertical: 10,
                            paddingHorizontal: 20,
                            borderRadius: 8
                        }}
                        onPress={() => setModalDeleteVisible(false)}
                        >
                        <Text style={{ color: 'white', fontWeight: 'bold' }}>Cancelar</Text>
                        </TouchableOpacity>
                    </View>
                    </View>
                </View>
                </Modal>
            )}
            <Sheet visible={isSheetVisible} onClose={() => setIsSheetVisible(false)}>
                {availableAccounts.map((account) => (
                    <Pressable key={account.valueOf()} onPress={() => {
                        if (account.valueOf() !== selectedBank.valueOf()) {
                            setSelectedBank(account);
                        }else{
                            Toast.show({
                                type: 'info',
                                text1: 'Você já selecionou essa conta'
                            });
                        }
                        setIsSheetVisible(false);
                    }} style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10 }}>
                        {account != 'Carteira' ? (<Image style={styles.bankLogo} source={bankLogos[account]} />) : (<MaterialCommunityIcons name='wallet' size={50} color="white" />)}
                        <Text style={{ color: 'white', marginLeft: 10 }}>{account}</Text>
                    </Pressable>
                ))}
            </Sheet>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#0f172a',
        flex: 1,
        padding: 16,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between', 
        alignItems: 'center', 
        height: '5%',
        marginBottom: 16
    },
    main: {
        height: '90%', borderRadius: 10, padding: 16 
    },
    iconButton: {
        backgroundColor: '#1e293b',
        padding: 8,
        borderRadius: 8,
    },
    bankView:{
        width: '50%',
        height: 60,
        marginTop: 10,
        flexDirection: 'row', 
        backgroundColor: '#334155', 
        alignItems:'center',
        justifyContent: 'center',
        paddingHorizontal: 10,
        borderRadius: 8,
        marginBottom: 16,
    },
    bankLogo: {
        width: 50,
        height: 50,
        borderRadius: 10,
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