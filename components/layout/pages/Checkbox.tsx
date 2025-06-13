import { useEffect, useRef } from "react";
import { Animated, Easing, Pressable, StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from '@expo/vector-icons'

interface CheckboxProps {
    isChecked: boolean;
    onChange: (value: boolean) => void;
}
  
export default function Checkbox({ onChange, isChecked }: CheckboxProps) {

    const animatedValue = useRef(new Animated.Value(isChecked ? 1 : 0)).current

    useEffect(() => {
        Animated.timing(animatedValue, {
        toValue: isChecked ? 1 : 0,
        duration: 200,
        useNativeDriver: false,
        easing: Easing.out(Easing.quad),
        }).start()
    }, [isChecked])

    const backgroundColor = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['white', '#1d4ed8'],
    })

    return (
        <Pressable style={styles.container} onPress={() => {
            onChange(!isChecked)
            console.log('clicou')
        }}>
        <Animated.View style={[styles.checkbox, {backgroundColor}]}>
            {isChecked && <MaterialIcons name="check" size={14} color="white" />}
        </Animated.View>
        </Pressable>
    );
}
  
const styles = StyleSheet.create({
container: {
    flexDirection: 'row',
    alignItems: 'center',
},
checkbox: {
    width: 18,
    height: 18,
    borderWidth: 2,
    borderColor: '#333',
    borderRadius: 4,
    marginRight: 8,
    backgroundColor: 'white',
},
checkedBox: {
    backgroundColor: 'black',
},
label: {
    fontSize: 16,
},
})