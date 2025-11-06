import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { View } from "react-native";

const client = new QueryClient();

export default function Layout() {
  return (
    <QueryClientProvider client={client}>
      <View style={{ flex: 1, backgroundColor: "#210b34" }}>
        <StatusBar style="light" />
        <Stack screenOptions = 
        {{ 
          headerShown: false, 
          presentation: "card", 
          animation: "fade" 
          }} />
      </View>
    </QueryClientProvider>
  );
}
