import { AuthProvider } from "@/context/AuthContext";
// import { setupDatabase } from "@/services/setupDatabase";
import { SQLiteProvider } from "@/services/sqliteContext";
import { Stack } from "expo-router";
// import { useEffect } from "react";
import Toast from 'react-native-toast-message'

export default function RootLayout() {

  // useEffect(() => {
  //   setupDatabase()
  // }, [])

  console.log("root layout");

  return (
    <AuthProvider>
      <SQLiteProvider databaseName="roxyall-db">
        <Stack screenOptions={{
          headerShown: false
        }}>
          <Stack.Screen name="pages"/>
          <Stack.Screen name="index"/>
          <Stack.Screen name="cadastro"/>
          <Stack.Screen name="+not-found"/>
        </Stack>
      </SQLiteProvider>
      <Toast />
    </AuthProvider>
  )
}
