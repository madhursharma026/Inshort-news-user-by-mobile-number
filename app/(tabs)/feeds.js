import tw from "twrnc";
import { APIURL } from "@env";
import SingleNews from "../../components/SingleNews";
import { interpolate } from "react-native-reanimated";
import Carousel from "react-native-reanimated-carousel";
import { useLanguage } from "../../context/LanguageContext";
import { useReadNews } from "../../context/ReadNewsContext";
import { Dimensions, View, Text, Alert } from "react-native";
import UseDynamicStyles from "../../context/UseDynamicStyles";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect, useCallback, useRef } from "react";

const client = new ApolloClient({
  uri: APIURL,
  cache: new InMemoryCache(),
});

const GET_NEWS_BY_LANGUAGE_QUERY = gql`
  query GetNewsByLanguage($language: String!) {
    newsByLanguage(language: $language) {
      id
      url
      title
      author
      language
      sourceURL
      description
      publishedAt
      readMoreContent
      sourceURLFormate
    }
  }
`;

const FeedsScreen = () => {
  const carouselRef = useRef(null);
  const { language } = useLanguage();
  const { readArticles } = useReadNews();
  const dynamicStyles = UseDynamicStyles();
  const [error, setError] = useState(null);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      try {
        const { data } = await client.query({
          query: GET_NEWS_BY_LANGUAGE_QUERY,
          variables: { language },
        });
        setArticles(data.newsByLanguage);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();
  }, [language]);

  const filteredArticles = articles.filter(
    (article) => !readArticles.some((read) => read.id === article.id)
  );

  const handleSnapToItem = async (index) => {
    try {
      const article = filteredArticles[index];
      const readArticlesKey = "readArticles";
      const existingArticlesJSON = await AsyncStorage.getItem(readArticlesKey);
      const existingArticles = existingArticlesJSON
        ? JSON.parse(existingArticlesJSON)
        : [];
      if (!existingArticles.some((a) => a.id === article.id)) {
        existingArticles.push(article);
        await AsyncStorage.setItem(
          readArticlesKey,
          JSON.stringify(existingArticles)
        );
      }
    } catch (error) {
      console.error("Failed to save article or show alert", error);
    }
  };

  useEffect(() => {
    if (filteredArticles.length > 0 && carouselRef.current) {
      handleSnapToItem(0);
    }
  }, [filteredArticles]);

  const renderCarouselItem = ({ item, index }) => (
    <SingleNews item={item} index={index} />
  );

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

  const renderContent = () => {
    if (loading) {
      return <StatusMessage message="Loading articles..." />;
    }
    if (error) {
      return <StatusMessage message={`Error: ${error}`} />;
    }
    if (filteredArticles.length === 0) {
      return <StatusMessage message="No articles available" />;
    }

    return (
      <View>
        <Carousel
          ref={carouselRef}
          loop={false}
          mode={"stack"}
          vertical={true}
          width={windowWidth}
          height={windowHeight}
          data={filteredArticles}
          renderItem={renderCarouselItem}
          onSnapToItem={handleSnapToItem}
          customAnimation={animationStyle}
        />
      </View>
    );
  };

  const StatusMessage = ({ message }) => (
    <Text style={[tw`text-lg text-center`, dynamicStyles.textColor]}>
      {message}
    </Text>
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

export default FeedsScreen;
