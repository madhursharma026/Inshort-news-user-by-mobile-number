import {
  Text,
  View,
  Modal,
  Image,
  SafeAreaView,
  TouchableOpacity,
  useWindowDimensions,
  Alert,
} from "react-native";
import tw from "twrnc";
import React from "react";
import UseDynamicStyles from "../../context/UseDynamicStyles";

const ImageViewer = ({ visible, imageUri, onClose }) => {
  const { width, height } = useWindowDimensions();
  const dynamicStyles = UseDynamicStyles();

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
      hardwareAccelerated
    >
      <SafeAreaView
        style={[
          tw`flex-1 items-center justify-center`,
          dynamicStyles.backgroundColor,
        ]}
      >
        <View
          style={[
            tw`relative rounded-lg overflow-hidden p-2`,
            { width: width * 0.9, height: height * 0.9 },
          ]}
        >
          <TouchableOpacity
            onPress={onClose}
            style={tw`absolute top-4 left-4 z-10`}
          >
            <Text style={[tw`text-3xl`, dynamicStyles.textColor]}>✕</Text>
          </TouchableOpacity>
          <Image
            source={{ uri: imageUri }}
            style={tw`w-full h-full`}
            resizeMode="contain"
            accessibilityLabel="View Image"
            onError={() => {
              Alert.alert("Error loading image");
            }}
          />
        </View>
      </SafeAreaView>
    </Modal>
  );
};

export default ImageViewer;
