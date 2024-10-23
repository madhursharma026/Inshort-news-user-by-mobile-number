import {
  View,
  Text,
  ScrollView,
  Dimensions,
  RefreshControl,
} from "react-native";
import tw from "twrnc";
import { gql } from "@apollo/client";
import SingleNews from "../SingleNews";
import client from "../../context/ApolloClient";
import { interpolate } from "react-native-reanimated";
import Carousel from "react-native-reanimated-carousel";
import { useLanguage } from "../../context/LanguageContext";
import { useReadNews } from "../../context/ReadNewsContext";
import UseDynamicStyles from "../../context/UseDynamicStyles";
import React, { useState, useEffect, useCallback, useRef } from "react";

const GET_NEWS_BY_LANGUAGE_QUERY = gql`
  query GetNewsByLanguage($language: String!) {
    newsByLanguage(language: $language) {
      id
      url
      title
      author
      priority
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
  const [refreshing, setRefreshing] = useState(false);
  const windowHeight = Dimensions.get("window").height;

  const fetchArticles = async () => {
    setLoading(true);
    try {
      const { data } = await client.query({
        query: GET_NEWS_BY_LANGUAGE_QUERY,
        variables: { language },
        fetchPolicy: "network-only", // Ensure fresh data is fetched
      });
      setArticles(data.newsByLanguage);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, [language]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchArticles();
    setRefreshing(false);
  }, [language]);

  const filteredArticles = articles.filter(
    (article) => !readArticles.some((read) => read.id === article.id)
  );

  const sortedArticles = [...filteredArticles].sort((a, b) => {
    const priorityOrder = {
      high: 0,
      normal: 1,
      low: 2,
    };

    const priorityA = a.priority ? a.priority.toLowerCase() : "normal";
    const priorityB = b.priority ? b.priority.toLowerCase() : "normal";
    const priorityComparison =
      priorityOrder[priorityA] - priorityOrder[priorityB];

    if (priorityComparison !== 0) return priorityComparison;

    return new Date(b.publishedAt) - new Date(a.publishedAt);
  });

  const handleSnapToItem = async (index) => {
    try {
      const article = sortedArticles[index];

      await client.mutate({
        mutation: gql`
          mutation DowngradeNewsPriority($id: Int!) {
            updateNews(id: $id, updateNewsInput: { priority: "low" }) {
              id
              priority
            }
          }
        `,
        variables: { id: article.id },
      });
    } catch (error) {
      console.error("Failed to downgrade priority", error);
    }
  };

  useEffect(() => {
    if (sortedArticles.length > 0 && carouselRef.current) {
      handleSnapToItem(0);
    }
  }, [sortedArticles]);

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
    if (sortedArticles.length === 0) {
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
          data={sortedArticles}
          renderItem={renderCarouselItem}
          onSnapToItem={handleSnapToItem}
          customAnimation={animationStyle}
        />
      </View>
    );
  };

  const StatusMessage = ({ message }) => (
    <View
      style={[tw`flex-1 justify-center items-center`, { height: windowHeight }]}
    >
      <Text style={[tw`text-lg text-center`, dynamicStyles.textColor]}>
        {message}
      </Text>
    </View>
  );

  return (
    <View style={[dynamicStyles.backgroundColor, tw`flex-1`]}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {renderContent()}
      </ScrollView>
    </View>
  );
};

export default FeedsScreen;
