import { bankLogos } from "@/utils/utils";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Image, StyleSheet, Text, View } from "react-native";

type AccountBoxProps = {
    name: keyof typeof bankLogos;
    visible: boolean
}

export default function AccountBox({name, visible} : AccountBoxProps){
    return (
        <View style={styles.accountItem}>
            <View style={styles.accountItem}>
                {name != 'Carteira' ? (<Image style={styles.bankLogo} source={bankLogos[name]} />) : (<MaterialCommunityIcons name='wallet' size={50} color="white" />)}
                <View>
                    <Text style={styles.accountName}>{name}</Text>
                    <Text style={styles.accountType}>Conta manual</Text>
                </View>          
            </View>
            <Text style={[styles.accountMoney, {color: visible ? '#fff' : 'gray'}]}>{visible ? "R$ 17,00" : "---"}</Text>
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
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        columnGap: 10
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