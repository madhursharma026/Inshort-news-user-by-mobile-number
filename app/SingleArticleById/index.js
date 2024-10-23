// SingleArticleById.js
import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import client from "../../context/ApolloClient";
import { gql } from "@apollo/client";
import Article from "../../components/Article";

// Define your GraphQL query
const GET_ARTICLE_BY_ID = gql`
  query GetArticleById($id: Int!) {
    article(id: $id) {
      id
      title
      description
      imageURL
      createdAt
    }
  }
`;

const SingleArticleById = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [article, setArticle] = useState(null);
  const { articleId } = useLocalSearchParams();

  const fetchArticle = async () => {
    try {
      const { data } = await client.query({
        query: GET_ARTICLE_BY_ID,
        variables: { id: parseInt(articleId) },
      });
      setArticle(data.article);
      setError(null);
    } catch (err) {
      setError("Error fetching article: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticle();
  }, [articleId]);

  // Show loading state
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  // Handle error state
  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>{error}</Text>
      </View>
    );
  }

  // Extract article data
  const { title, imageURL, description } = article;

  return (
    <Article
      title={title}
      imageURL={imageURL}
      description={description}
      onBackPress={() => router.back()}
    />
  );
};

export default SingleArticleById;
