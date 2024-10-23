import React, { useState } from "react";
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
import {
  PinchGestureHandler,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  useAnimatedGestureHandler,
} from "react-native-reanimated";
import UseDynamicStyles from "../../context/UseDynamicStyles";

const ImageViewer = ({ visible, imageUri, onClose }) => {
  const { width, height } = useWindowDimensions();
  const dynamicStyles = UseDynamicStyles();

  const scale = useSharedValue(1); // Shared value to store scale

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  // Gesture handler for pinch-to-zoom
  const pinchHandler = useAnimatedGestureHandler({
    onActive: (event) => {
      scale.value = event.scale;
    },
    onEnd: () => {
      scale.value = withTiming(1, { duration: 300 }); // Reset zoom on gesture end
    },
  });

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
      hardwareAccelerated
    >
      <GestureHandlerRootView style={{ flex: 1 }}>
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

            <PinchGestureHandler onGestureEvent={pinchHandler}>
              <Animated.View style={[tw`w-full h-full`, animatedStyle]}>
                <Image
                  source={{ uri: imageUri }}
                  style={tw`w-full h-full`}
                  resizeMode="contain"
                  accessibilityLabel="View Image"
                  onError={() => {
                    Alert.alert("Error loading image");
                  }}
                />
              </Animated.View>
            </PinchGestureHandler>
          </View>
        </SafeAreaView>
      </GestureHandlerRootView>
    </Modal>
  );
};

export default ImageViewer;
