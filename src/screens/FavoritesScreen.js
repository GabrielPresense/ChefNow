import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ChefCard from '../components/ChefCard';
import { colors, spacing, fontSize, fontWeight } from '../styles/theme';

const FavoritesScreen = ({ navigation }) => {
  const [favoriteChefs, setFavoriteChefs] = useState([]);

  // Mock data dos chefs favoritos
  const mockFavoriteChefs = [
    {
      id: 1,
      name: 'Diego',
      specialty: 'especialidade italiana',
      rating: 4.5,
      image: 'https://via.placeholder.com/60x60/FF5722/FFFFFF?text=D',
    },
    {
      id: 3,
      name: 'Rodrigo',
      specialty: 'especialidade sobremesas',
      rating: 4.0,
      image: 'https://via.placeholder.com/60x60/2196F3/FFFFFF?text=R',
    },
  ];

  useEffect(() => {
    // Simular carregamento de favoritos
    setFavoriteChefs(mockFavoriteChefs);
  }, []);

  const handleChefPress = (chef) => {
    navigation.navigate('ChefProfile', { chef });
  };

  const handleRemoveFavorite = (chefId) => {
    setFavoriteChefs(prev => prev.filter(chef => chef.id !== chefId));
  };

  const renderChef = ({ item }) => (
    <ChefCard
      chef={item}
      onPress={() => handleChefPress(item)}
      onFavoritePress={() => handleRemoveFavorite(item.id)}
      isFavorite={true}
    />
  );

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Ionicons name="heart-outline" size={80} color={colors.gray} />
      <Text style={styles.emptyTitle}>Nenhum favorito ainda</Text>
      <Text style={styles.emptyText}>
        Explore chefs e adicione seus favoritos aqui
      </Text>
      <TouchableOpacity 
        style={styles.exploreButton}
        onPress={() => navigation.navigate('Search')}
      >
        <Text style={styles.exploreButtonText}>Explorar Chefs</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Favoritos</Text>
        <View style={styles.headerSpacer} />
      </View>

      {/* Content */}
      <View style={styles.content}>
        {favoriteChefs.length > 0 ? (
          <>
            <Text style={styles.countText}>
              {favoriteChefs.length} chef{favoriteChefs.length !== 1 ? 's' : ''} favorito{favoriteChefs.length !== 1 ? 's' : ''}
            </Text>
            <FlatList
              data={favoriteChefs}
              renderItem={renderChef}
              keyExtractor={(item) => item.id.toString()}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.listContainer}
            />
          </>
        ) : (
          renderEmptyState()
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
  },
  backButton: {
    padding: spacing.xs,
  },
  headerTitle: {
    flex: 1,
    fontSize: fontSize.lg,
    fontWeight: fontWeight.semibold,
    color: colors.text,
    textAlign: 'center',
  },
  headerSpacer: {
    width: 40,
  },
  content: {
    flex: 1,
    paddingTop: spacing.md,
  },
  countText: {
    fontSize: fontSize.md,
    color: colors.textSecondary,
    marginHorizontal: spacing.lg,
    marginBottom: spacing.md,
  },
  listContainer: {
    paddingBottom: spacing.xl,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
  },
  emptyTitle: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.semibold,
    color: colors.text,
    marginTop: spacing.lg,
    marginBottom: spacing.sm,
  },
  emptyText: {
    fontSize: fontSize.md,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: spacing.xl,
  },
  exploreButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    borderRadius: 25,
  },
  exploreButtonText: {
    color: colors.white,
    fontSize: fontSize.md,
    fontWeight: fontWeight.semibold,
  },
});

export default FavoritesScreen;

