import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { View, StyleSheet } from 'react-native';
import Header from '@/components/layout/pages/Header';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { useAuth } from '@/context/AuthContext';
// import { TransactionsProvider } from '@/context/TransactionContext';

export default function Layout() {

  // const {user} = useAuth()

  return (
    <View
      style={styles.background}
    >
        {/* <TransactionsProvider> */}
          <Tabs
            screenOptions={() => ({
              headerShown: false,
              tabBarStyle: {
                backgroundColor: '#00000055',
                borderTopWidth: 0,
                position: 'absolute',
                bottom: 16,
                marginHorizontal: 20,
                borderRadius: 16,
                height: 60,
                elevation: 0,
              },
            })}
          >
            
              <Tabs.Screen
                name='home'
                options={{
                  title: "Home",
                  tabBarIcon: () => {
                    return <Ionicons name='home' size={18} color='white' />
                  }
                }}
              />

              <Tabs.Screen
                name="transactions"
                options={{
                  title: 'Transações',
                  tabBarIcon: () => {
                    return <Ionicons name='swap-horizontal' size={18} color='white' />;
                  }
                }}
              />

              <Tabs.Screen
                name="dashboard"
                options={{
                  title: 'Painel',
                  tabBarIcon: () => {
                    return <Ionicons name='speedometer' size={18} color='white' />;
                  }
                }}
              />
            
          </Tabs>
        {/* </TransactionsProvider> */}
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
});
