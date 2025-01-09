import {
  View,
  Text,
  ActivityIndicator,
  Pressable,
  TextInput,
} from "react-native";
import React, { FC, ReactNode, useState } from "react";
import { StatusBar } from "expo-status-bar";
import Header from "@/components/Header";
import {
  ArrowPathRoundedSquareIcon,
  ChevronDoubleRightIcon,
} from "react-native-heroicons/outline";
import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";

interface searchFlightData {
  originCity: string;
  destinationCity: string;
  departureDate: string;
  seat: number;
}

interface FlightOfferData {
  originLocationCode: string;
  destinationLocationCode: string;
  departureDate: Date;
  returnDate: Date;
  adults: number;
  maxResults: number;
}

// Trip Option Component
interface TripOptionProps {
  pageNavigation: string;
  handleNavigationChange: (type: string) => void;
}

const TripOption: FC<TripOptionProps> = ({
  pageNavigation,
  handleNavigationChange,
}) => (
  <View className="w-full flex-row justify-between px-4 py-2">
    <Pressable
      onPress={() => handleNavigationChange("oneWay")}
      className="flex-row w-1/2"
    >
      <View
        className={`w-full justify-center items-center flex-row space-x-2 pb-2 ${
          pageNavigation === "oneWay"
            ? "border-b-4 border-[#12B3A8]"
            : "border-transparent"
        }`}
      >
        <ChevronDoubleRightIcon
          size={20}
          strokeWidth={pageNavigation === "oneWay" ? 3 : 2}
          color={pageNavigation === "oneWay" ? "#12B3A8" : "gray"}
        />
        <Text
          className={`text-xl pl-2 ${
            pageNavigation === "oneWay" ? "text-[#12B3A8]" : "text-gray-500"
          }`}
          style={{
            fontWeight: pageNavigation === "oneWay" ? "700" : "500",
          }}
        >
          One Way
        </Text>
      </View>
    </Pressable>

    <Pressable
      onPress={() => handleNavigationChange("roundTrip")}
      className="flex-row w-1/2"
    >
      <View
        className={`w-full justify-center items-center flex-row space-x-2 pb-2 ${
          pageNavigation === "roundTrip"
            ? "border-b-4 border-[#12B3A8]"
            : "border-transparent"
        }`}
      >
        <ArrowPathRoundedSquareIcon
          size={20}
          strokeWidth={pageNavigation === "roundTrip" ? 3 : 2}
          color={pageNavigation === "roundTrip" ? "#12B3A8" : "gray"}
        />
        <Text
          className={`text-xl pl-2 ${
            pageNavigation === "roundTrip" ? "text-[#12B3A8]" : "text-gray-500"
          }`}
          style={{
            fontWeight: pageNavigation === "roundTrip" ? "700" : "500",
          }}
        >
          Round Trip
        </Text>
      </View>
    </Pressable>
  </View>
);

// Location Component
interface LocationInputProps {
  placeholder: string;
  icon: ReactNode;
  value: string;
  onPress: () => void;
}

const LocationInput: FC<LocationInputProps> = ({
  placeholder,
  icon,
  value,
  onPress,
}) => (
  <View className="border-2 border-gray-300 mx-4 mb-4 rounded-2xl justify-center">
    <Pressable onPress={onPress}>
      <View className="px-4 flex-row justify-between items-center">
        <View className="w-[15%] border-r-2 border-gray-300">{icon}</View>

        <View className="w-[80%] py-3">
          {value ? (
            <Text className="bg-transparent text-gray-600 font-bold">
              {value}
            </Text>
          ) : (
            <Text className="bg-transparent text-lg text-gray-600 font-semibold">
              {placeholder}
            </Text>
          )}
        </View>
      </View>
    </Pressable>
  </View>
);

// Depature Date Component
interface DepartureDateProps {
  placeholder: string;
  icon: ReactNode;
  value: string;
  onPress: () => void;
}

const DepartureDate: FC<DepartureDateProps> = ({
  placeholder,
  icon,
  value,
  onPress,
}) => (
  <Pressable
    onPress={onPress}
    className="border-2 border-gray-300 mx-4 mb-4 rounded-2xl justify-center py-4 flex-row items-center pl-4"
  >
    <View className="w-[15%] border-r-2 border-gray-300">{icon}</View>
    <View className="w-[85%] px-4 items-start justify-start">
      <Text className="bg-transparent text-gray-600 font-bold">
        {value || placeholder}
      </Text>
    </View>
  </Pressable>
);

export default function HomeScreen() {
  const [isPending, setIsPending] = useState(false);
  const [pageNavigation, setPageNavigation] = useState("oneWay");
  const [flighOfferData, setFlightOfferData] = useState<FlightOfferData>({
    originLocationCode: "",
    destinationLocationCode: "",
    departureDate: new Date(),
    returnDate: new Date(),
    adults: 0,
    maxResults: 10,
  });

  const [searchFlightData, setSearchFlightData] = useState<searchFlightData>({
    originCity: "",
    destinationCity: "",
    departureDate: "",
    seat: 0,
  });
  const [selectedDate, setSelectedDate] = useState<any>(new Date());

  const handleNavigationChange = (type: string) => setPageNavigation(type);

  return (
    <View className="flex-1 items-center bg-[#F5F7FA] relative">
      <StatusBar style="light" />

      {isPending && (
        <View className="absolute z-50 w-full h-full justify-center items-center">
          <View className="bg-black bg-opacity-50 h-full w-full justify-center items-center opacity-[0.45]" />
          <View className="absolute">
            <ActivityIndicator size="large" color="#ffffff" />
          </View>
        </View>
      )}

      {/* Header */}
      <View className="h-64 mb-4 justify-start border-orange-600 w-full bg-[#192031] relative pt-16 rounded-br-[30px] rounded-bl-[30px]">
        <Header />
      </View>

      {/* Form Area */}
      <View className="w-full px-4 -mt-32 mx-4">
        <View className="bg-white rounded-3xl pt-2 pb-4 shadow-md shadow-slate-300">
          <View className="flex-row justify-between w-full px-4 py-2">
            <TripOption
              pageNavigation={pageNavigation}
              handleNavigationChange={handleNavigationChange}
            />
          </View>

          {/* Location Input */}
          <LocationInput
            placeholder={
              searchFlightData.originCity
                ? searchFlightData.originCity
                : "Depature City"
            }
            icon={
              <FontAwesome5 size={20} color="gray" name="plane-departure" />
            }
            value={searchFlightData.originCity}
            onPress={() => {}}
          />

          {/* Origin City */}
          <LocationInput
            placeholder={
              searchFlightData.destinationCity
                ? searchFlightData.destinationCity
                : "Destination City"
            }
            icon={<FontAwesome5 size={20} color="gray" name="plane-arrival" />}
            value={searchFlightData.destinationCity}
            onPress={() => {}}
          />

          {/* Departure Date */}
          <DepartureDate
            placeholder={
              selectedDate && selectedDate.length > 0
                ? selectedDate.replace(/^"|"$/g, "")
                : "Departure Date"
            }
            icon={<FontAwesome5 size={20} color="gray" name="calendar-alt" />}
            value={searchFlightData.departureDate.replace(/^"|"$/g, "")}
            onPress={() => {}}
          />

          {/* Seat Input */}
          <View className="border-2 border-gray-300 mx-4 rounded-2xl py-3 flex flex-row justify-center items-center pl-4">
            <View>
              <MaterialCommunityIcons
                size={20}
                color="gray"
                name="seat-passenger"
              />
            </View>
            <TextInput
              className="w-[85%] text-base px-4 font-semibold"
              placeholder="Seat"
              keyboardType="numeric"
              value={String(searchFlightData.seat)}
              onChangeText={(text) => {
                const seatValue = parseInt(text, 10);
                const validSeatValue = isNaN(seatValue) ? 0 : seatValue;

                setSearchFlightData((prev) => ({
                  ...prev,
                  seat: validSeatValue,
                }));

                setFlightOfferData((prev) => ({
                  ...prev,
                  adults: validSeatValue,
                }));
              }}
            />
          </View>

          {/* Search Button */}
          <View className="w-full justify-start pt-2 px-4 mt-4">
            <Pressable
              onPress={() => {}}
              className="bg-[#12B3A8] rounded-xl justify-center items-center py-4"
            >
              <Text className="text-white font-bold text-xl">Search</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
}
