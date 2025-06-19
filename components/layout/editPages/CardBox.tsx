import { bankLogos } from "@/utils/utils";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Image, Pressable, StyleSheet, Text, useWindowDimensions, View } from "react-native";
import * as Progress from 'react-native-progress';

type AccountBoxProps = {
    id: number;
    name: keyof typeof bankLogos;
    limiteDisponivel: number;
    faturaAtual: number;
    visible: boolean
}

export default function CardBox({id, name, limiteDisponivel, faturaAtual, visible} : AccountBoxProps){

    const { width } = useWindowDimensions()
    const progressWidth = (width*0.8) - 36;


    return (
        <View style={styles.accountItem}>
            <Pressable onPress={() => router.push({pathname: '/editsPages/editCard', params: {id: id}})} style={styles.upinfo}>
                <View style={{flexDirection: 'row', columnGap: 10, alignItems: 'center'}}>
                    {name != 'Carteira' ? (<Image style={styles.bankLogo} source={bankLogos[name]} />) : (<MaterialCommunityIcons name='wallet' size={44} color="white" />)}
                    <View>
                        <Text style={styles.accountName}>{name}</Text>
                        <Text style={styles.accountType}>Conta manual</Text>
                    </View>
                </View>
                <Ionicons name='arrow-forward' size={24} color="green" />
            </Pressable>
            <View style={styles.downinfo}>
                <Progress.Bar
                    progress={faturaAtual / (faturaAtual + limiteDisponivel)}
                    width={progressWidth}
                    color="#00ffff"
                    borderRadius={6}
                    animated={true}
                />
                <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginTop: 10}}>
                    <View>
                        <Text style={styles.accountName}>Fatura atual</Text>
                        <Text style={[styles.accountMoney, {color: visible ? '#fff' : 'gray'}]}>
                            {visible ? "R$ " + (faturaAtual).toFixed(2) : "---"}
                        </Text>
                    </View>
                    <View>
                        <Text style={styles.accountName}>Disponível</Text>
                        <Text style={[styles.accountMoney, {color: visible ? '#fff' : 'gray'}]}>
                            {visible ? "R$ " + limiteDisponivel.toFixed(2) : "---"}
                        </Text>
                    </View>
                    
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    bankLogo: {
        width: 50,
        height: 50,
        borderRadius: 10
    },
    accountItem: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#1e293b',
        padding: 15,
        borderRadius: 10,
        columnGap: 10
    },
    upinfo:{
        flexDirection: 'row',
        width: '90%',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomColor: '#fff',
        paddingVertical: 10,
        borderBottomWidth: 0.5
    },
    downinfo:{
        flexDirection: 'column',
        width: '90%',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
    },
    accountName: {
        color: 'gray',
        fontSize: 10,
        fontWeight: 'bold',
    },
    accountType: {
        color: '#9ca3af',
        fontSize: 12,
    },
    accountMoney: {
        color: '#fff',
        fontWeight: 'bold',
    },
})