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

const PlaceOrderScreen = ({ navigation, route }) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [orderTotal, setOrderTotal] = useState(0);

  const chef = route.params?.chef || {
    name: 'Adriana Camargo',
    specialty: 'Chef Profissional',
  };

  // Mock data dos itens do menu
  const menuItems = [
    {
      id: 1,
      name: 'Salada Caesar',
      description: 'Alface romana, croutons, parmesão e molho caesar',
      price: 25.90,
      image: images.dishes.saladaCaesar,
      category: 'Saladas'
    },
    {
      id: 2,
      name: 'Salmão Grelhado',
      description: 'Salmão fresco grelhado com legumes da estação',
      price: 45.90,
      image: images.dishes.salmaoGrelhado,
      category: 'Pratos Principais'
    },
    {
      id: 3,
      name: 'Risotto de Cogumelos',
      description: 'Risotto cremoso com mix de cogumelos frescos',
      price: 35.90,
      image: images.dishes.risottoCogumelos,
      category: 'Pratos Principais'
    },
    {
      id: 4,
      name: 'Smoothie Verde',
      description: 'Couve, maçã, gengibre e água de coco',
      price: 15.90,
      image: images.dishes.smoothieVerde,
      category: 'Bebidas'
    },
  ];

  const handleItemToggle = (item) => {
    setSelectedItems(prev => {
      const isSelected = prev.find(selected => selected.id === item.id);
      let newSelected;
      
      if (isSelected) {
        newSelected = prev.filter(selected => selected.id !== item.id);
      } else {
        newSelected = [...prev, { ...item, quantity: 1 }];
      }
      
      // Calcular total
      const total = newSelected.reduce((sum, selectedItem) => 
        sum + (selectedItem.price * selectedItem.quantity), 0
      );
      setOrderTotal(total);
      
      return newSelected;
    });
  };

  const handleQuantityChange = (itemId, change) => {
    setSelectedItems(prev => {
      const newSelected = prev.map(item => {
        if (item.id === itemId) {
          const newQuantity = Math.max(1, item.quantity + change);
          return { ...item, quantity: newQuantity };
        }
        return item;
      });
      
      // Calcular total
      const total = newSelected.reduce((sum, selectedItem) => 
        sum + (selectedItem.price * selectedItem.quantity), 0
      );
      setOrderTotal(total);
      
      return newSelected;
    });
  };

  const handleConfirmOrder = () => {
    if (selectedItems.length === 0) {
      alert('Selecione pelo menos um item para continuar');
      return;
    }
    
    // Aqui você enviaria o pedido para o backend
    alert(`Pedido confirmado! Total: R$ ${orderTotal.toFixed(2)}`);
    navigation.goBack();
  };

  const isItemSelected = (itemId) => {
    return selectedItems.find(item => item.id === itemId);
  };

  const getItemQuantity = (itemId) => {
    const item = selectedItems.find(item => item.id === itemId);
    return item ? item.quantity : 0;
  };

  const renderMenuItem = (item) => {
    const selected = isItemSelected(item.id);
    const quantity = getItemQuantity(item.id);

    return (
      <View key={item.id} style={styles.menuItem}>
        <TouchableOpacity 
          style={styles.menuItemContent}
          onPress={() => handleItemToggle(item)}
        >
          <Image source={item.image} style={styles.itemImage} />
          <View style={styles.itemInfo}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemDescription}>{item.description}</Text>
            <Text style={styles.itemPrice}>R$ {item.price.toFixed(2)}</Text>
          </View>
          <View style={styles.selectionIndicator}>
            <Ionicons 
              name={selected ? "checkmark-circle" : "ellipse-outline"} 
              size={24} 
              color={selected ? colors.primary : colors.gray} 
            />
          </View>
        </TouchableOpacity>
        
        {selected && (
          <View style={styles.quantityContainer}>
            <TouchableOpacity 
              style={styles.quantityButton}
              onPress={() => handleQuantityChange(item.id, -1)}
            >
              <Ionicons name="remove" size={20} color={colors.primary} />
            </TouchableOpacity>
            <Text style={styles.quantityText}>{quantity}</Text>
            <TouchableOpacity 
              style={styles.quantityButton}
              onPress={() => handleQuantityChange(item.id, 1)}
            >
              <Ionicons name="add" size={20} color={colors.primary} />
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
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
        <Text style={styles.headerTitle}>Fazer Pedido</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Chef Info */}
        <View style={styles.chefInfo}>
          <Text style={styles.chefName}>{chef.name}</Text>
          <Text style={styles.chefSpecialty}>{chef.specialty}</Text>
        </View>

        {/* Instructions */}
        <View style={styles.instructionsContainer}>
          <Text style={styles.instructionsTitle}>Select options</Text>
          <Text style={styles.instructionsText}>
            Escolha os pratos que deseja pedir e ajuste as quantidades
          </Text>
        </View>

        {/* Menu Items */}
        <View style={styles.menuContainer}>
          {menuItems.map(renderMenuItem)}
        </View>
      </ScrollView>

      {/* Order Summary */}
      {selectedItems.length > 0 && (
        <View style={styles.orderSummary}>
          <View style={styles.totalContainer}>
            <Text style={styles.totalLabel}>Total:</Text>
            <Text style={styles.totalAmount}>R$ {orderTotal.toFixed(2)}</Text>
          </View>
          <CustomButton
            title="Confirmar Pedido"
            onPress={handleConfirmOrder}
            style={styles.confirmButton}
          />
        </View>
      )}
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
  chefInfo: {
    padding: spacing.lg,
    backgroundColor: colors.white,
    marginBottom: spacing.md,
  },
  chefName: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.semibold,
    color: colors.text,
  },
  chefSpecialty: {
    fontSize: fontSize.md,
    color: colors.textSecondary,
  },
  instructionsContainer: {
    padding: spacing.lg,
    backgroundColor: colors.white,
    marginBottom: spacing.md,
  },
  instructionsTitle: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.semibold,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  instructionsText: {
    fontSize: fontSize.md,
    color: colors.textSecondary,
  },
  menuContainer: {
    backgroundColor: colors.white,
    marginBottom: spacing.xl,
  },
  menuItem: {
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
  },
  menuItemContent: {
    flexDirection: 'row',
    padding: spacing.lg,
    alignItems: 'center',
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: borderRadius.md,
    marginRight: spacing.md,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.semibold,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  itemDescription: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  itemPrice: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.semibold,
    color: colors.primary,
  },
  selectionIndicator: {
    marginLeft: spacing.md,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.md,
    backgroundColor: colors.lightGray,
  },
  quantityButton: {
    width: 36,
    height: 36,
    borderRadius: borderRadius.round,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.primary,
  },
  quantityText: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.semibold,
    color: colors.text,
    marginHorizontal: spacing.lg,
    minWidth: 30,
    textAlign: 'center',
  },
  orderSummary: {
    backgroundColor: colors.white,
    padding: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colors.lightGray,
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  totalLabel: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.semibold,
    color: colors.text,
  },
  totalAmount: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
    color: colors.primary,
  },
  confirmButton: {
    marginTop: spacing.sm,
  },
});

export default PlaceOrderScreen;

