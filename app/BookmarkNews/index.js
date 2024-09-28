import tw from "twrnc";
import { useRouter } from "expo-router";
import React, { useCallback } from "react";
import { interpolate } from "react-native-reanimated";
import Carousel from "react-native-reanimated-carousel";
import { useBookmarks } from "../../context/BookmarkContext";
import { Text, View, Dimensions, Button } from "react-native";
import UseDynamicStyles from "../../context/UseDynamicStyles";
import BookmarkSingleNews from "../../components/BookmarkSingleNews";
const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

const BookmarkNews = () => {
  const router = useRouter();
  const dynamicStyles = UseDynamicStyles();
  const { bookmarkedArticles } = useBookmarks();

  const animationStyle = useCallback(
    (value) => {
      "worklet";
      const translateY = interpolate(value, [-1, 0, 1], [-windowHeight, 0, 0]);
      const translateX = interpolate(value, [-1, 0, 1], [-windowWidth, 0, 0]);
      const zIndex = interpolate(value, [-1, 0, 1], [300, 0, -300]);
      const scale = interpolate(value, [-1, 0, 1], [1, 1, 0.85]);
      return {
        transform: [true ? { translateY } : { translateX }, { scale }],
        zIndex,
      };
    },
    [windowHeight, windowWidth, true]
  );

  const renderCarouselItem = ({ item, index }) => (
    <BookmarkSingleNews item={item} index={index} />
  );

  const renderContent = () => {
    if (bookmarkedArticles.length === 0) {
      return <StatusMessage message="There are no bookmarks" />;
    }

    return (
      <Carousel
        loop={false}
        mode={"stack"}
        vertical={true}
        data={bookmarkedArticles}
        width={windowWidth}
        height={windowHeight}
        renderItem={renderCarouselItem}
        customAnimation={animationStyle}
      />
    );
  };

  const StatusMessage = ({ message }) => (
    <View style={tw`items-center`}>
      <Text style={[tw`text-xl text-center mb-4`, dynamicStyles.textColor]}>
        {message}
      </Text>
      <Button title="Home Page" onPress={() => router.back()} />
    </View>
  );

  return (
    <View
      style={[
        dynamicStyles.backgroundColor,
        tw`flex-1 justify-center items-center`,
      ]}
    >
      {renderContent()}
    </View>
  );
};

export default BookmarkNews;
