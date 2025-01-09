import { View, Text, ActivityIndicator } from "react-native";
import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import Header from "@/components/Header";

export default function HomeScreen() {
  const [isPending, setIsPending] = useState(false);

  return (
    <View className="flex-1 justify-start bg-[#F5F&FA] relative">
      <StatusBar style="light" />

      {isPending && (
        <View className="absolute z-50 w-full h-full justify-center items-center">
          <View className="bg-black bg-opacity-50 h-full w-full justify-center items-center opacity-[0.45]" />
          <View className="absolute">
            <ActivityIndicator size="large" color="#ffffff" />
          </View>
        </View>
      )}
      <View className="h-64 mb-4 justify-start border-orange-600 w-full bg-[#192031] relative pt-16 rounded-br-[30px] rounded-bl-[30px]">
        {/* Header */}
        <Header />
      </View>
    </View>
  );
}
