import { bankLogos, CardName, cardNames, cardsMockData, contasMockData, TypeCardMockDatas, TypeContasMockDatas } from "@/utils/utils";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import Toast from 'react-native-toast-message'
import { Image, Modal, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Sheet from "@/components/layout/Sheet";

export default function EditCard() {

    const params = useLocalSearchParams();
    const id = Number(params.id);

    const usedNames = cardsMockData.map(card => card.nome);

    const [availableCards, setAvailableCards] = useState<CardName[]>(cardNames.filter(name => !usedNames.includes(name)));
    const [card, setCard] = useState<TypeCardMockDatas | null>(null);
    const [selectedBank, setSelectedBank] = useState(availableCards[0] || '');

    const [isSheetVisible, setIsSheetVisible] = useState(false);
    const [modalDeleteVisible, setModalDeleteVisible] = useState(false);

    const [limite, setLimite] = useState(0.0);
    const [diaFechamento, setDiaFechamento] = useState(27);
    const [diaFechamentoValido, setDiaFechamentoValido] = useState(true);
    const [diaVencimento, setDiaVencimento] = useState(3);
    const [diaVencimentoValido, setDiaVencimentoValido] = useState(true);

    useEffect(() => {
        const getCard = cardsMockData.find(account => account.id === id);
        setCard(getCard || null);
        if (getCard) {
            setSelectedBank(getCard.nome);
            setLimite(getCard.limite);
            setDiaFechamento(getCard.diaFechamento);
            setDiaFechamentoValido(getCard.diaFechamento >= 1 && getCard.diaFechamento <= 31);
            setDiaVencimento(getCard.diaVencimento);
            setDiaVencimentoValido(getCard.diaVencimento >= 1 && getCard.diaVencimento <= 31);
        }
    }, [id])

    useEffect(() => {
        if (card) {
            setAvailableCards(prev => [...prev, card.nome]);
        }
    }, [card])

    const editCard = () => {
        if (card && selectedBank && card.limite > 0) {
            const updatedCard: TypeCardMockDatas = {
                ...card,
                nome: selectedBank,
                limite: limite,
                diaFechamento: diaFechamento,
                diaVencimento: diaVencimento,
            };
            const index = cardsMockData.findIndex(acc => acc.id === card.id);
            if (index !== -1) {
                cardsMockData[index] = updatedCard;
                router.push('/editsPages/manageCards');
            }
        } else {
            Toast.show({
                type: 'error',
                text1: 'Preencha todos os campos corretamente'
            })
        }
    }

    const deleteCard = () => {
        if (card) {
            const index = contasMockData.findIndex(acc => acc.id === id);
            if (index !== -1) {
                cardsMockData.splice(index, 1);
                setModalDeleteVisible(false);
                router.push('/editsPages/manageCards');
            }
        } else {
            console.log('Conta não encontrada para exclusão');
        }
    }


    return (
        <View style={styles.screen}>
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: '5%', marginBottom: 16 }}>
                <Pressable style={styles.iconButtonBack} onPress={() => router.push('/editsPages/manageCards')}>
                    <Ionicons name='arrow-back' size={28} color="white" />
                </Pressable>
                <Text style={{ color: 'white', fontSize: 20 }}>Editar Cartão</Text>
                <Pressable style={styles.iconButtonDelete} onPress={() => setModalDeleteVisible(true)}>
                    <MaterialCommunityIcons name='delete' size={28} color="white" />
                </Pressable>
            </View>
            <View style={styles.container}>
                <Text style={{ color: 'white' }}>Escolha o banco:</Text>
                <Pressable style={styles.bankView} onPress={() => {if (selectedBank.valueOf()) setIsSheetVisible(true)}} >
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
                    value={limite.toString()}
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
                                setDiaFechamento(Number(text) < 1 || Number(text) > 31 ? card?.diaFechamento || 27 : Number(text));
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
                                setDiaVencimento(Number(text ) < 1 || Number(text) > 31 ? card?.diaVencimento || 3 : Number(text));
                            }}
                        />
                    </View>
                </View>
                <View>
                    <Text style={{ color: 'white', marginBottom: 8 }}>Conta de pagamento:</Text>
                    
                </View>
                <TouchableOpacity onPress={() => editCard()}  style={styles.buttonOutline}>
                    <Text style={styles.buttonOutlineText}>Salvar Alterações</Text>
                </TouchableOpacity>
            </View>
            <Sheet visible={isSheetVisible} onClose={() => setIsSheetVisible(false)}>
                {availableCards.map((card) => (
                    <Pressable key={card.valueOf()} onPress={() => { //consertar isso aqui, ta dando erro na key
                        if (card !== selectedBank) {
                            setSelectedBank(card);
                        } else Toast.show({
                            type: 'info',
                            text1: 'Você já selecionou este cartão'
                        });
                        setIsSheetVisible(false);
                    }} style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10 }}>
                        {card != 'Outros' ? (<Image style={styles.bankLogo} source={bankLogos[card]} />) : (<MaterialCommunityIcons name='credit-card' size={50} color="white" />)}
                        <Text style={{ color: 'white', marginLeft: 10 }}>{card}</Text>
                    </Pressable>
                ))}
            </Sheet>
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
                            onPress={deleteCard}
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
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        backgroundColor: '#0f172a',
        flex: 1,
        padding: 16,
    },
    iconButtonBack: {
        backgroundColor: '#1e293b',
        padding: 8,
        borderRadius: 8,
        position: 'absolute',
        left: 6,
    },
    iconButtonDelete: {
        backgroundColor: '#1e293b',
        padding: 8,
        borderRadius: 8,
        position: 'absolute',
        right: 6,
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