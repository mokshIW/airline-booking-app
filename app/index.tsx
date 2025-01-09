import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import Animated, { FadeInDown } from "react-native-reanimated";
import { router } from "expo-router";

export default function WelcomeScreen() {
  return (
    <SafeAreaView className="flex-1 bg-[#192031]">
      <StatusBar style="light" />
      <View className="h-full">
        <View className="w-full px-4 items-center my-8 gap-y-4">
          <Animated.View
            entering={FadeInDown.duration(200).springify()}
            className="flex-row justify-center items-center pb-24"
          >
            <MaterialCommunityIcons name="airplane" size={24} color="#12B3A8" />
            <Text className="text-white text-xl leading-[60px] pl-1">
              STACKS
            </Text>
            <Text className="text-[#4AE8DD] text-xl leading-[60px] pl-1 italic">
              FLY
            </Text>
          </Animated.View>

          <Animated.View
            entering={FadeInDown.duration(200).delay(200).springify()}
          >
            <Text className="text-white text-[52px] font-medium leading-[60px]">
              Discover your Dream Flight Easily
            </Text>
          </Animated.View>

          <Animated.View
            entering={FadeInDown.duration(200).delay(400).springify()}
            className="mt-4"
          >
            <Text className="text-neutral-300 text-xl font-medium leading-[38px]">
              Find an easy way to buy airplane tickets with just a few clicks in
              the app.
            </Text>
          </Animated.View>

          <Animated.View
            entering={FadeInDown.duration(200).delay(600).springify()}
            className="h-1/4 w-full justify-start pt-8 px-4"
          >
            <Pressable
              onPress={() => router.push("/(tabs)")}
              className="bg-[#12B3A8] rounded-xl justify-center items-center py-4"
            >
              <Text className="text-white font-bold text-2xl">Discover</Text>
            </Pressable>

            <View className="flex flex-row mt-4 w-full justify-center gap-2">
              <Text className="text-neutral-300 font-medium text-xl leading-[38px] text-center">
                Don't have an account?
              </Text>
              <Text className="text-neutral-300 font-bold text-xl leading-[38px] text-center">
                Register
              </Text>
            </View>
          </Animated.View>
        </View>
      </View>
    </SafeAreaView>
  );
}
