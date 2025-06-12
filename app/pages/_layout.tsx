import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { View, StyleSheet } from 'react-native';
import Header from '@/components/layout/Header';
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
          {/* <Header/> */}
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
              tabBarActiveTintColor: '#00ffff',
              tabBarInactiveTintColor: '#aaa',
            })}
          >
            <ProtectedRoute>
              <Tabs.Screen
              name='home'
              options={{
                title: "Home",
                tabBarIcon: () => {
                  return <Ionicons name='home' size={18} color='white' />
                }
              }}
            />
            </ProtectedRoute>
            
            <ProtectedRoute>
              <Tabs.Screen
              name="transactions"
              options={{
                title: 'Transações',
                tabBarIcon: () => {
                  return <Ionicons name='swap-horizontal' size={18} color='white' />;
                }
              }}
            />
            </ProtectedRoute>
            
            <ProtectedRoute>
              <Tabs.Screen
              name="dashboard"
              options={{
                title: 'Painel',
                tabBarIcon: () => {
                  return <Ionicons name='speedometer' size={18} color='white' />;
                }
              }}
            />
            </ProtectedRoute>
            
            {/* {(user && user.id === 1) ? (
              <Tabs.Screen
                name='dados'
                options={{
                  title: 'Dados',
                  tabBarIcon: () => {
                    return <Ionicons name='analytics-outline' color='white'/>
                  }
                }}
              />
            ): (
              <Tabs.Screen
                name='dados'
                options={{
                  href:null
                }}
              />
            )} */}
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
