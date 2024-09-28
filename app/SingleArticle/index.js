import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import tw from "twrnc";
import React, { useState } from "react";
import ImageViewer from "../ImageViewer/index";
import RenderHTML from "react-native-render-html";
import Icon from "react-native-vector-icons/Ionicons";
import { useLocalSearchParams, useRouter } from "expo-router";
import UseDynamicStyles from "../../context/UseDynamicStyles";

const SingleArticle = () => {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const dynamicStyles = UseDynamicStyles();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedImageUri, setSelectedImageUri] = useState("");

  const handleImagePress = (imageURI) => {
    setSelectedImageUri(imageURI);
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const { title, imageURL, description } = useLocalSearchParams();

  return (
    <ScrollView style={[tw`flex-1 p-4`, dynamicStyles.backgroundColor]}>
      <View style={tw`flex-row justify-between items-center mb-4 mx-1`}>
        <TouchableOpacity onPress={() => router.back()}>
          <Icon
            name="arrow-back"
            size={24}
            color={dynamicStyles.textColor.color}
          />
        </TouchableOpacity>
      </View>

      <Text
        style={[
          tw`text-3xl font-bold mx-1 leading-10 mb-4 text-justify	`,
          dynamicStyles.textColor,
        ]}
      >
        {title}
        {/* Can You Pass This Aple-Orange Interview At Apple 🍎? */}
      </Text>

      <TouchableOpacity onPress={() => handleImagePress(imageURL)}>
        <Image
          source={{ uri: imageURL }}
          style={[
            tw`w-full h-50 rounded-lg mb-4`,
            {
              resizeMode: "cover",
            },
          ]}
        />
      </TouchableOpacity>

      <RenderHTML
        contentWidth={width}
        source={{
          html: description,
        }}
        baseStyle={{
          fontSize: 18,
          lineHeight: 30,
          fontFamily: "serif",
          marginBottom: 30,
          textAlign: "justify",
          color: dynamicStyles.textColor.color,
        }}
      />

      <ImageViewer
        visible={isModalVisible}
        imageUri={selectedImageUri}
        onClose={handleCloseModal}
      />
    </ScrollView>
  );
};

export default SingleArticle;
