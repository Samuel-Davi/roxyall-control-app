import { bankLogos } from "@/utils/utils"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { Image, StyleSheet, Text, View } from "react-native"



export function CreditCard({name, moneyVisible} : {name: keyof typeof bankLogos, moneyVisible: boolean}){

    return (
        <View style={{rowGap: 20}}>
            <View style={{flexDirection: 'row', alignItems: 'center', columnGap: 15}}>
                {name != 'Outros' ? (<Image style={styles.bankLogo} source={bankLogos[name]} />) : (<MaterialCommunityIcons name='credit-card' size={50} color="white" />)}
                <Text style={{color: 'white'}}>Cartão {name}</Text>
            </View>
            <View style={styles.limiteCartao}>
                <View>
                    <Text style={{color: 'gray'}}>Disponível</Text>
                    <Text style={{color: moneyVisible ? 'white' : 'gray'}}>{moneyVisible ? "R$ 175.00" : "---"}</Text>
                </View>
                <View>
                    <Text style={{color: 'gray'}}>Fatura Atual</Text>
                    <Text style={{color: moneyVisible ? 'red' : 'gray'}}>{moneyVisible ? "-R$ 85.00" : "---"}</Text>
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
    limiteCartao: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        backgroundColor: '#0f172a',
        padding: 20,
        borderRadius: 20,
        marginBottom: 10
    }
})

{/* <View style={styles.accountItem}>
          <View style={styles.accountItem}>
            <View style={styles.circlePurple} />
            <View>
              <Text style={styles.accountName}>Cartão Nubank</Text>
            </View>          
          </View>
          <Text style={[styles.accountMoney, {color: faturaVisible ? 'red' : 'gray'}]}>R$ {faturaVisible ? "-85,00" : "---"}</Text>
        </View> */}