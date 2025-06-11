import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CustomButton from '../components/CustomButton';
import { colors, spacing, borderRadius, fontSize, fontWeight } from '../styles/theme';
import { images } from '../assets/images';

const ChefProfileScreen = ({ navigation, route }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  
  // Dados do chef (podem vir dos parâmetros ou ser mock)
  const chef = route.params?.chef || {
    id: 1,
    name: 'Adriana Camargo',
    email: 'Adriana@gmail.com',
    specialty: 'Chef Profissional',
    rating: 4.5,
    image: images.chefs.adriana,
    description: 'Adriana é especializada em pratos saudáveis e funcionais, com ingredientes frescos e técnicas culinárias inovadoras. Atende eventos, jantares e refeições do dia a dia.',
    reviews: [
      {
        id: 1,
        rating: 5,
        comment: 'Bom funcional',
        author: 'Cliente 1'
      },
      {
        id: 2,
        rating: 4,
        comment: 'Quinta de legumes',
        author: 'Cliente 2'
      }
    ]
  };

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

  const handleViewMenu = () => {
    // Navegar para tela de menu (não implementada neste exemplo)
    console.log('View Menu pressed');
  };

  const handlePlaceOrder = () => {
    navigation.navigate('PlaceOrder', { chef });
  };

  const handleFavoriteToggle = () => {
    setIsFavorite(!isFavorite);
  };

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
        <Text style={styles.headerTitle}>Chef Profile</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Chef Info */}
        <View style={styles.chefInfoContainer}>
          <Image source={chef.image} style={styles.chefImage} />
          <Text style={styles.chefName}>{chef.name}</Text>
          <Text style={styles.chefEmail}>{chef.email}</Text>
          <Text style={styles.chefSpecialty}>{chef.specialty}</Text>
          
          <View style={styles.ratingContainer}>
            {renderStars(chef.rating)}
            <Text style={styles.ratingText}>{chef.rating}</Text>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtonsContainer}>
          <CustomButton
            title="View Menu"
            onPress={handleViewMenu}
            style={[styles.actionButton, styles.viewMenuButton]}
            textStyle={styles.viewMenuButtonText}
          />
          <CustomButton
            title="Place Order"
            onPress={handlePlaceOrder}
            style={styles.actionButton}
          />
        </View>

        {/* Add to Favorites */}
        <TouchableOpacity 
          style={styles.favoriteContainer}
          onPress={handleFavoriteToggle}
        >
          <Text style={styles.favoriteText}>Add to Favorites</Text>
          <Ionicons 
            name={isFavorite ? "heart" : "heart-outline"} 
            size={24} 
            color={isFavorite ? colors.red : colors.textSecondary} 
          />
        </TouchableOpacity>

        {/* Description */}
        <View style={styles.descriptionContainer}>
          <Text style={styles.sectionTitle}>Sobre o Chef</Text>
          <Text style={styles.descriptionText}>{chef.description}</Text>
        </View>

        {/* Reviews */}
        <View style={styles.reviewsContainer}>
          <Text style={styles.sectionTitle}>Avaliações</Text>
          {chef.reviews?.map((review) => (
            <View key={review.id} style={styles.reviewItem}>
              <View style={styles.reviewHeader}>
                <View style={styles.reviewStars}>
                  {renderStars(review.rating)}
                </View>
                <Text style={styles.reviewAuthor}>{review.author}</Text>
              </View>
              <Text style={styles.reviewComment}>{review.comment}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
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
  },
  chefInfoContainer: {
    alignItems: 'center',
    paddingVertical: spacing.xl,
    backgroundColor: colors.white,
    marginBottom: spacing.md,
  },
  chefImage: {
    width: 120,
    height: 120,
    borderRadius: borderRadius.round,
    marginBottom: spacing.md,
  },
  chefName: {
    fontSize: fontSize.xxl,
    fontWeight: fontWeight.bold,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  chefEmail: {
    fontSize: fontSize.md,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  chefSpecialty: {
    fontSize: fontSize.md,
    color: colors.text,
    marginBottom: spacing.md,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    marginLeft: spacing.sm,
    fontSize: fontSize.md,
    color: colors.text,
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    gap: spacing.md,
  },
  actionButton: {
    flex: 1,
  },
  viewMenuButton: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  viewMenuButtonText: {
    color: colors.primary,
  },
  favoriteContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    backgroundColor: colors.white,
    marginVertical: spacing.md,
  },
  favoriteText: {
    fontSize: fontSize.md,
    color: colors.text,
  },
  descriptionContainer: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    backgroundColor: colors.white,
    marginBottom: spacing.md,
  },
  sectionTitle: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.semibold,
    color: colors.text,
    marginBottom: spacing.md,
  },
  descriptionText: {
    fontSize: fontSize.md,
    color: colors.textSecondary,
    lineHeight: 22,
  },
  reviewsContainer: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    backgroundColor: colors.white,
    marginBottom: spacing.xl,
  },
  reviewItem: {
    marginBottom: spacing.md,
    paddingBottom: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  reviewStars: {
    flexDirection: 'row',
  },
  reviewAuthor: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
  },
  reviewComment: {
    fontSize: fontSize.md,
    color: colors.text,
  },
});

export default ChefProfileScreen;

