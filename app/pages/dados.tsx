import { getTransactionsData, getUsersData, SQLiteContext } from "@/services/sqliteContext";
import { Transaction } from "@/types/Transaction";
import { User } from "@/types/User";
import { SQLiteDatabase } from "expo-sqlite";
import { useContext, useEffect, useState } from "react";
import { Dimensions, FlatList, StyleSheet, Text, View } from "react-native";


export default function DataScreen(){
    const [dataUsers, setDataUsers] = useState<User[]>([])
    const [dataTransactions, setDataTransactions] = useState<Transaction[]>([])

    const { height } = Dimensions.get('window')

    const db = useContext(SQLiteContext)

    const getDados = async (db:SQLiteDatabase|null) => {
        if(db){
            const resultUsers:User[] | undefined = await getUsersData(db)
            if(resultUsers){
                setDataUsers(resultUsers)
            }
            const resultTransactions:Transaction[] | undefined = await getTransactionsData(db)
            if(resultTransactions){
                setDataTransactions(resultTransactions)
            }
        }
    }

    useEffect(() => {
        getDados(db)
    })


    return (
        <View style={styles.allScreen}>
            <Text style={{
                color: 'white',
                fontSize: 32
            }}>Users:</Text>
          <View style={styles.container}>
            <FlatList
                style={{
                    maxHeight: height*0.4
                }}
                data={dataUsers}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.userView}>
                        <View>
                            <Text style={styles.info}>{item.id}: {item.name}</Text>
                            <Text style={styles.email}>{item.email}</Text>
                        </View>
                    </View>
                )}
            />
            {/* <FlatList
                data={dataTransactions}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                <View style={styles.containerData}>
                    
                </View>
                )}
            /> */}
          </View>
        </View>
    );
}

const styles = StyleSheet.create({
    allScreen:{
        flex: 1, 
        backgroundColor: '#0f172a',
        alignItems: 'center',
        justifyContent: 'center'
    },
    container:{
        width: '90%',
        height: '50%',
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    userView: {
        backgroundColor: '#1e293b',
        padding: 16,
        borderRadius: 12,
        marginBottom: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    info: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
    email: {
        color: '#94a3b8',
        fontSize: 12,
        marginTop: 4,
    },
})