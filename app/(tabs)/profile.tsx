import { icons } from "@/constants/icons";
import React from "react";
import { Image, Text, View } from "react-native";

const profile = () => {
  return (
    <View className="bg-primary flex-1 px-10">
      <View className="flex justify-center items-center flex-1 flex-col gap-5">
        <Image source={icons.person} className="size-10" tintColor="#fff" />
        <Text className="text-2xl font-bold text-gray-500">John Doe</Text>
      </View>
      <Text>profile</Text>
    </View>
  );
};

export default profile;
