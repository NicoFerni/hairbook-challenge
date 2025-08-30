import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { View } from "react-native";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  useEffect(() => {
    const hideSplashScreen = async () => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      await SplashScreen.hideAsync();
    };
    
    hideSplashScreen();
  }, []);

  return (
    <View style={{ flex: 1, paddingTop: 20 }}>
      <StatusBar style="dark" backgroundColor="#ffffff" />
      <Stack
        screenOptions={{
          headerShown: false, 
          contentStyle: { backgroundColor: '#f8fafc' },
          animation: 'slide_from_right',
        }}
      >
        <Stack.Screen 
          name="index" 
          options={{
            title: "HairBook Credits",
            headerShown: false,
          }}
        />
        
        <Stack.Screen 
          name="salon/[id]" 
          options={{
            title: "Detalles del Salón",
            headerShown: true,
            headerStyle: {
              backgroundColor: '#ffffff',
            },
            headerTitleStyle: {
              fontSize: 18,
              fontWeight: '600',
              color: '#1e293b',
            },
            headerTintColor: '#8B5CF6',
            presentation: 'modal', // Presentación modal para detalles
            animation: 'slide_from_bottom',
          }}
        />

        {/* Modal de confirmación de reserva */}
        <Stack.Screen 
          name="confirmation" 
          options={{
            title: "Confirmación",
            headerShown: false,
            presentation: 'transparentModal',
            animation: 'fade',
          }}
        />

        {/* Pantalla de perfil de usuario */}
        <Stack.Screen 
          name="profile" 
          options={{
            title: "Mi Perfil",
            headerShown: true,
            headerStyle: {
              backgroundColor: '#ffffff',
            },
            headerTitleStyle: {
              fontSize: 18,
              fontWeight: '600',
              color: '#1e293b',
            },
            headerTintColor: '#8B5CF6',
          }}
        />

        {/* Pantalla de historial de reservas */}
        <Stack.Screen 
          name="reservations" 
          options={{
            title: "Mis Reservas",
            headerShown: true,
            headerStyle: {
              backgroundColor: '#ffffff',
            },
            headerTitleStyle: {
              fontSize: 18,
              fontWeight: '600',
              color: '#1e293b',
            },
            headerTintColor: '#8B5CF6',
          }}
        />
      </Stack>
    </View>
  );
}