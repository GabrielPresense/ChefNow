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

const SearchScreen = ({ navigation, route }) => {
  const [chefs, setChefs] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data dos chefs
  const mockChefs = [
    {
      id: 1,
      name: 'Diego',
      specialty: 'especialidade italiana',
      rating: 4.5,
      image: 'https://via.placeholder.com/60x60/FF5722/FFFFFF?text=D',
    },
    {
      id: 2,
      name: 'Jaqueline',
      specialty: 'especialidade frutos do mar',
      rating: 5.0,
      image: 'https://via.placeholder.com/60x60/4CAF50/FFFFFF?text=J',
    },
    {
      id: 3,
      name: 'Rodrigo',
      specialty: 'especialidade sobremesas',
      rating: 4.0,
      image: 'https://via.placeholder.com/60x60/2196F3/FFFFFF?text=R',
    },
    {
      id: 4,
      name: 'Marcielo',
      specialty: 'especialidade massas',
      rating: 4.5,
      image: 'https://via.placeholder.com/60x60/9C27B0/FFFFFF?text=M',
    },
    {
      id: 5,
      name: 'Natalia',
      specialty: 'especialidade comida saudável',
      rating: 4.8,
      image: 'https://via.placeholder.com/60x60/FF9800/FFFFFF?text=N',
    },
    {
      id: 6,
      name: 'João',
      specialty: 'especialidade carnes e grelhados',
      rating: 4.3,
      image: 'https://via.placeholder.com/60x60/795548/FFFFFF?text=J',
    },
  ];

  useEffect(() => {
    // Simular carregamento de dados
    setChefs(mockChefs);
    
    // Verificar se veio com parâmetros de busca
    if (route.params?.searchQuery) {
      setSearchQuery(route.params.searchQuery);
    }
    if (route.params?.category) {
      setSearchQuery(route.params.category);
    }
  }, [route.params]);

  const handleChefPress = (chef) => {
    navigation.navigate('ChefProfile', { chef });
  };

  const handleFavoritePress = (chefId) => {
    setFavorites(prev => {
      if (prev.includes(chefId)) {
        return prev.filter(id => id !== chefId);
      } else {
        return [...prev, chefId];
      }
    });
  };

  const filteredChefs = chefs.filter(chef => 
    chef.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    chef.specialty.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderChef = ({ item }) => (
    <ChefCard
      chef={item}
      onPress={() => handleChefPress(item)}
      onFavoritePress={() => handleFavoritePress(item.id)}
      isFavorite={favorites.includes(item.id)}
    />
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
        <Text style={styles.headerTitle}>
          {route.params?.category || 'Buscar Chefs'}
        </Text>
        <View style={styles.headerSpacer} />
      </View>

      {/* Results */}
      <View style={styles.content}>
        {searchQuery ? (
          <Text style={styles.resultsText}>
            Resultados para "{searchQuery}"
          </Text>
        ) : null}
        
        <FlatList
          data={filteredChefs}
          renderItem={renderChef}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
        />
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
    width: 40, // Para balancear o botão de voltar
  },
  content: {
    flex: 1,
    paddingTop: spacing.md,
  },
  resultsText: {
    fontSize: fontSize.md,
    color: colors.textSecondary,
    marginHorizontal: spacing.lg,
    marginBottom: spacing.md,
  },
  listContainer: {
    paddingBottom: spacing.xl,
  },
});

export default SearchScreen;

