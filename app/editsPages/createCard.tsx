import { bankLogos, cardNames, cardsMockData, contasMockData, TypeCardMockDatas, TypeContasMockDatas } from "@/utils/utils";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import Toast from 'react-native-toast-message'
import { Image, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

import Sheet from "@/components/layout/Sheet";

export default function CreateCard() {

    const usedNames = cardsMockData.map(card => card.nome);
    const availableCards = cardNames.filter(name => !usedNames.includes(name));

    const [selectedBank, setSelectedBank] = useState(availableCards[0] || '');

    const [isVisible, setIsVisible] = useState(false);

    const [limite, setLimite] = useState(0.0);
    const [diaFechamento, setDiaFechamento] = useState(27);
    const [diaFechamentoValido, setDiaFechamentoValido] = useState(true);
    const [diaVencimento, setDiaVencimento] = useState(3);
    const [diaVencimentoValido, setDiaVencimentoValido] = useState(true);

    const addCard = () => {
        if (selectedBank && limite >= 0) {
            const newCard:TypeCardMockDatas = {
                id: cardsMockData.length + 1,
                id_user: 1, // usuario fixo para o exemplo
                nome: selectedBank,
                limite: limite,
                faturaAtual: 0.0,
                diaFechamento: diaFechamento, 
                diaVencimento: diaVencimento, 
                limiteDisponivel: limite,
            };
            cardsMockData.push(newCard);
            router.push('/editsPages/manageCards');
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
                <Pressable style={styles.iconButton} onPress={() => router.push('/editsPages/manageCards')}>
                    <Ionicons name='arrow-back' size={28} color="white" />
                </Pressable>
                <Text style={{ color: 'white', fontSize: 20 }}>Criar Cartão</Text>
            </View>
            <View style={styles.container}>
                <Text style={{ color: 'white' }}>Escolha o banco:</Text>
                <Pressable style={styles.bankView} onPress={() => {if (selectedBank.valueOf()) setIsVisible(true)}} >
                    {selectedBank.valueOf() !== "" ? (
                        selectedBank !== 'Outros' ? (
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
                <Text style={{ color: 'white', marginBottom: 8 }}>Limite da conta:</Text>
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
                    placeholder="Digite o limite"
                    placeholderTextColor="#9ca3af"
                    onChangeText={(text) => {
                        setLimite(Number(text));
                    }}
                />
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={{width: '40%'}}>
                        <Text style={{ color: 'white', marginBottom: 8 }}>Fechamento:</Text>
                        <TextInput
                            keyboardType="numeric"
                            style={{
                                color: diaFechamentoValido ? 'white' : 'red',
                                fontSize: 18,
                                marginBottom: 16,
                                backgroundColor: '#334155',
                                padding: 10,
                                borderRadius: 8
                            }}
                            placeholder={"Dia " + diaFechamento}
                            placeholderTextColor="#9ca3af"
                            onChangeText={(text) => {
                                if (Number(text) < 1 || Number(text) > 31) setDiaFechamentoValido(false); else setDiaFechamentoValido(true);
                                setDiaFechamento(Number(text) < 1 || Number(text) > 31 ? 27 : Number(text));
                            }}
                        />
                    </View>
                    <View style={{width: '40%'}}>
                        <Text style={{ color: 'white', marginBottom: 8 }}>Vencimento:</Text>
                        <TextInput
                            keyboardType="numeric"
                            style={{
                                color: diaVencimentoValido ? 'white' : 'red',
                                fontSize: 18,
                                marginBottom: 16,
                                backgroundColor: '#334155',
                                padding: 10,
                                borderRadius: 8
                            }}
                            placeholder={"Dia " + diaVencimento}
                            placeholderTextColor="#9ca3af"
                            onChangeText={(text) => {
                                if (Number(text) < 1 || Number(text) > 31) setDiaVencimentoValido(false); else setDiaVencimentoValido(true);
                                setDiaVencimento(Number(text ) < 1 || Number(text) > 31 ? 3 : Number(text));
                            }}
                        />
                    </View>
                </View>
                <View>
                    <Text style={{ color: 'white', marginBottom: 8 }}>Conta de pagamento:</Text>
                    
                </View>
                <TouchableOpacity onPress={() => addCard()}  style={styles.buttonOutline}>
                    <Text style={styles.buttonOutlineText}>Criar Conta</Text>
                </TouchableOpacity>
            </View>
            <Sheet visible={isVisible} onClose={() => setIsVisible(false)}>
                {availableCards.map((card, index) => (
                    <Pressable key={index} onPress={() => {
                        setSelectedBank(card);
                        setIsVisible(false);
                    }} style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10 }}>
                        {card != 'Outros' ? (<Image style={styles.bankLogo} source={bankLogos[card]} />) : (<MaterialCommunityIcons name='credit-card' size={50} color="white" />)}
                        <Text style={{ color: 'white', marginLeft: 10 }}>{card}</Text>
                    </Pressable>
                ))}
            </Sheet>
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
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)', // fundo escurecido para modal
        justifyContent: 'flex-end', // faz o BottomSheet aparecer de baixo
    },
    contentContainer: {
        padding: 24,
        alignItems: 'stretch', // ocupa toda a largura do BottomSheet
        backgroundColor: '#fff', // cor de fundo do BottomSheet
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        minHeight: 120,
        minWidth: 100
    }
})