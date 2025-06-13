import { AuthProvider } from "@/context/AuthContext";
// import { setupDatabase } from "@/services/setupDatabase";
// import { SQLiteProvider } from "@/services/sqliteContext";
import { Stack } from "expo-router";
// import { useEffect } from "react";
import Toast from 'react-native-toast-message'
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {

  // useEffect(() => {
  //   setupDatabase()
  // }, [])

  return (
    <AuthProvider>
      {/* <SQLiteProvider databaseName="roxyall-db"> */}
        <SafeAreaProvider>
          <SafeAreaView
            style={{ flex: 1, backgroundColor: '#0f172a' }}
          >
            <Stack screenOptions={{
              headerShown: false
            }}>
              <Stack.Screen name="index"/>
              <Stack.Screen name="cadastro"/>
              <Stack.Screen name="+not-found"/>
            </Stack>
          </SafeAreaView>
        </SafeAreaProvider>
      {/* </SQLiteProvider> */}
      <Toast />
    </AuthProvider>
  )
}
