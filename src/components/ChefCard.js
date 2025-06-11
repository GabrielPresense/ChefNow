import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, borderRadius, fontSize, fontWeight } from '../styles/theme';
import { images } from '../assets/images';

const ChefCard = ({ 
  chef, 
  onPress, 
  onFavoritePress, 
  isFavorite = false,
  showFavoriteButton = true 
}) => {
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Ionicons key={i} name="star" size={16} color={colors.star} />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <Ionicons key="half" name="star-half" size={16} color={colors.star} />
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Ionicons key={`empty-${i}`} name="star-outline" size={16} color={colors.star} />
      );
    }

    return stars;
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.content}>
        <Image 
          source={chef.image || images.chefs.default} 
          style={styles.chefImage} 
        />
        <View style={styles.info}>
          <Text style={styles.chefName}>{chef.name}</Text>
          <View style={styles.ratingContainer}>
            {renderStars(chef.rating || 0)}
          </View>
          <Text style={styles.specialty}>{chef.specialty}</Text>
        </View>
        {showFavoriteButton && (
          <TouchableOpacity 
            style={styles.favoriteButton}
            onPress={onFavoritePress}
          >
            <Ionicons 
              name={isFavorite ? "heart" : "heart-outline"} 
              size={24} 
              color={isFavorite ? colors.red : colors.textSecondary} 
            />
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    marginVertical: spacing.xs,
    marginHorizontal: spacing.md,
    elevation: 2,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
  },
  content: {
    flexDirection: 'row',
    padding: spacing.md,
    alignItems: 'center',
  },
  chefImage: {
    width: 60,
    height: 60,
    borderRadius: borderRadius.round,
    marginRight: spacing.md,
  },
  info: {
    flex: 1,
  },
  chefName: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.semibold,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  ratingContainer: {
    flexDirection: 'row',
    marginBottom: spacing.xs,
  },
  specialty: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
  },
  favoriteButton: {
    padding: spacing.xs,
  },
});

export default ChefCard;

