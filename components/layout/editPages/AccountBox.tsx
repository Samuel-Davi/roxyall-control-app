import { bankLogos } from "@/utils/utils";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

type AccountBoxProps = {
    id: number;
    name: keyof typeof bankLogos;
    saldo: number;
    visible: boolean
}

export default function AccountBox({id, name, saldo, visible} : AccountBoxProps){
    return (
        <View style={styles.accountItem}>
            <Pressable onPress={() => router.push({pathname: '/editsPages/editAccount', params: {id: id}})} style={styles.upinfo}>
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
                <Text style={[styles.accountMoney, {color: visible ? '#fff' : 'gray'}]}>Saldo atual: {visible ? "R$ " + saldo : "---"}</Text>
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
        flexDirection: 'row',
        width: '90%',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
    },
    accountName: {
        color: '#fff',
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