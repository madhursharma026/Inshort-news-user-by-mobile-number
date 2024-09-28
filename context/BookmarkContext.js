import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useState, useEffect, useContext } from "react";

const BookmarkContext = createContext();

export const useBookmarks = () => useContext(BookmarkContext);

export const BookmarkProvider = ({ children }) => {
  const [bookmarkedArticles, setBookmarkedArticles] = useState([]);

  useEffect(() => {
    const loadBookmarks = async () => {
      try {
        const storedBookmarks = await AsyncStorage.getItem(
          "bookmarkedArticles"
        );
        if (storedBookmarks) {
          setBookmarkedArticles(JSON.parse(storedBookmarks));
        }
      } catch (error) {
        console.error("Failed to load bookmarks:", error);
      }
    };
    loadBookmarks();
  }, []);

  useEffect(() => {
    const saveBookmarks = async () => {
      try {
        await AsyncStorage.setItem(
          "bookmarkedArticles",
          JSON.stringify(bookmarkedArticles)
        );
      } catch (error) {
        console.error("Failed to save bookmarks:", error);
      }
    };

    saveBookmarks();
  }, [bookmarkedArticles]);

  const toggleBookmark = (article) => {
    setBookmarkedArticles((prev) => {
      if (prev.some((a) => a.url === article.url)) {
        return prev.filter((a) => a.url !== article.url);
      } else {
        return [...prev, article];
      }
    });
  };

  return (
    <BookmarkContext.Provider value={{ bookmarkedArticles, toggleBookmark }}>
      {children}
    </BookmarkContext.Provider>
  );
};
