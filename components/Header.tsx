import { useAuth } from "@/context/AuthContext";
import { getSaldoFromBD, SQLiteContext } from "@/services/sqliteContext";
import { Ionicons } from "@expo/vector-icons";
import { useContext, useEffect, useRef, useState } from "react";
import { Animated, Easing, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Header(){

    //layout
    const rotateAnim = useRef(new Animated.Value(0)).current;
    const userImage = require('@/assets/images/eu.jpeg')

    const [saldo, setSaldo] = useState(0)
    const { user, setUser } = useAuth()
    const db = useContext(SQLiteContext)

    const handleLogout = () => {
        setUser(null)
    };

    const atualizaSaldo = async () => {
        const result = await getSaldoFromBD(user, db)
        if(result){
            setSaldo(result)
        }
    }

    const handleReload = () => {
        Animated.sequence([
          Animated.timing(rotateAnim, {
            toValue: 1,
            duration: 800,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
          Animated.timing(rotateAnim, {
            toValue: 0,
            duration: 0,
            useNativeDriver: true,
          }),
        ]).start();
    
        atualizaSaldo();
    };

    const rotate = rotateAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    useEffect(() => {
        atualizaSaldo()
    })

    return (
        <View>
            <View style={styles.header}>
                <Image
                  source={userImage} // ou use um arquivo local
                  style={styles.userImage}
                />
                <TouchableOpacity onPress={handleReload} style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ color: saldo > 0 ? 'green' : 'red', fontSize: 24, fontWeight: 'bold' }}>
                    Saldo: R$ {saldo.toFixed(2)}
                    </Text>
                    <Animated.View style={{ transform: [{ rotate }], marginLeft: 8 }}>
                        <Ionicons
                            name="reload-circle"
                            size={28}
                            color="white"
                        />
                    </Animated.View>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleLogout}>
                  <Ionicons name="log-out-outline" size={24} color="#fff" />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    header:{
        width: '100%',
        padding: 20, 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center' ,
        backgroundColor: '#0f172a'
    },
    userImage:{
        width: 40,
        height: 40,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#334155',
    },
})