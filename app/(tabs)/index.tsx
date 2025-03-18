import { useRouter } from "expo-router";
import React, { useCallback } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  Text,
  View,
} from "react-native";

import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { fetchMovies } from "@/services/api";
import { getTrendingMovies } from "@/services/appwrite";

import MovieCard from "@/components/MovieCard";
import SearchBar from "@/components/SearchBar";
import TrendingCard from "@/components/TrendingCard";
import useFetch from "@/services/useFetch";

export default function Index() {
  const router = useRouter();

  const {
    data: trendingMovies,
    loading: trendingLoading,
    error: trendingError,
  } = useFetch(getTrendingMovies);

  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError,
  } = useFetch(() => fetchMovies({ query: "" }));

  const isLoading = moviesLoading || trendingLoading;
  const errorMessage = moviesError?.message || trendingError?.message;

  const renderTrendingItem = useCallback(
    ({ item, index }: { item: TrendingMovie; index: number }) => (
      <TrendingCard movie={item} index={index} />
    ),
    []
  );

  const renderMovieItem = useCallback(
    ({ item }: { item: Movie }) => <MovieCard {...item} />,
    []
  );

  return (
    <View className="flex-1 bg-primary">
      <Image
        source={images.bg}
        className="absolute w-full z-0"
        resizeMode="cover"
      />
      <ScrollView
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ minHeight: "100%", paddingBottom: 10 }}
      >
        <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto" />

        {isLoading ? (
          <ActivityIndicator
            size="large"
            color="#0000ff"
            className="mt-10 self-center"
          />
        ) : errorMessage ? (
          <Text className="text-red-500 text-center mt-10">
            Error: {errorMessage}
          </Text>
        ) : (
          <View className="flex-1 mt-5">
            <SearchBar
              onPress={() => router.push("/search")}
              placeholder="Search for a movie"
            />

            {(trendingMovies ?? []).length > 0 && (
              <View className="mt-10">
                <Text className="text-lg text-white font-bold mb-3">
                  Trending Movies
                </Text>
                <FlatList
                  horizontal
                  data={trendingMovies}
                  showsHorizontalScrollIndicator={false}
                  className="mb-4 mt-3"
                  contentContainerStyle={{ gap: 26 }}
                  renderItem={renderTrendingItem}
                  keyExtractor={(item) => item.movie_id.toString()}
                  ItemSeparatorComponent={() => <View className="w-4" />}
                />
              </View>
            )}

            <View className="mt-5">
              <Text className="text-lg text-white font-bold mb-3">
                Latest Movies
              </Text>
              <FlatList
                data={movies?.results}
                renderItem={renderMovieItem}
                keyExtractor={(item) => item.id.toString()}
                numColumns={3}
                columnWrapperStyle={{
                  justifyContent: "flex-start",
                  gap: 20,
                  paddingRight: 5,
                  marginBottom: 10,
                }}
                className="mt-2 pb-32"
                scrollEnabled={false}
                removeClippedSubviews
                initialNumToRender={9}
                maxToRenderPerBatch={9}
                windowSize={5}
              />
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
