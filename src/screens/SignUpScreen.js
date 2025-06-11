import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import { colors, spacing, borderRadius, fontSize, fontWeight } from '../styles/theme';
import { images } from '../assets/images';

const SignUpScreen = ({ navigation }) => {
  const [formData, setFormData] = useState({
    userType: 'Usuario', // Usuario ou Chef
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});

  const updateFormData = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.fullName) {
      newErrors.fullName = 'Nome completo é obrigatório';
    }
    
    if (!formData.email) {
      newErrors.email = 'Email é obrigatório';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }
    
    if (!formData.password) {
      newErrors.password = 'Senha é obrigatória';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Senha deve ter pelo menos 6 caracteres';
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Confirmação de senha é obrigatória';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Senhas não coincidem';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignUp = () => {
    if (validateForm()) {
      // Aqui você conectaria com o backend
      navigation.navigate('Main');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Header com logo */}
          <View style={styles.header}>
            <View style={styles.logoContainer}>
              <Image source={images.logo} style={styles.logoImage} resizeMode="contain" />
            </View>
          </View>

          {/* Formulário */}
          <View style={styles.formContainer}>
            <View style={styles.tabContainer}>
              <TouchableOpacity 
                style={styles.inactiveTab}
                onPress={() => navigation.navigate('Login')}
              >
                <Text style={styles.inactiveTabText}>Login</Text>
              </TouchableOpacity>
              <View style={styles.activeTab}>
                <Text style={styles.activeTabText}>Sign-up</Text>
              </View>
            </View>

            <View style={styles.form}>
              {/* Seletor de tipo de usuário */}
              <View style={styles.userTypeContainer}>
                <TouchableOpacity
                  style={[
                    styles.userTypeButton,
                    formData.userType === 'Usuario' && styles.userTypeButtonActive
                  ]}
                  onPress={() => updateFormData('userType', 'Usuario')}
                >
                  <Ionicons 
                    name="person" 
                    size={20} 
                    color={formData.userType === 'Usuario' ? colors.white : colors.textSecondary} 
                  />
                  <Text style={[
                    styles.userTypeText,
                    formData.userType === 'Usuario' && styles.userTypeTextActive
                  ]}>
                    Usuário
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.userTypeButton,
                    formData.userType === 'Chef' && styles.userTypeButtonActive
                  ]}
                  onPress={() => updateFormData('userType', 'Chef')}
                >
                  <Ionicons 
                    name="restaurant" 
                    size={20} 
                    color={formData.userType === 'Chef' ? colors.white : colors.textSecondary} 
                  />
                  <Text style={[
                    styles.userTypeText,
                    formData.userType === 'Chef' && styles.userTypeTextActive
                  ]}>
                    Chef
                  </Text>
                </TouchableOpacity>
              </View>

              <CustomInput
                placeholder="Nome completo"
                value={formData.fullName}
                onChangeText={(value) => updateFormData('fullName', value)}
                error={errors.fullName}
              />

              <CustomInput
                placeholder="Email"
                value={formData.email}
                onChangeText={(value) => updateFormData('email', value)}
                keyboardType="email-address"
                autoCapitalize="none"
                error={errors.email}
              />

              <CustomInput
                placeholder="Senha"
                value={formData.password}
                onChangeText={(value) => updateFormData('password', value)}
                secureTextEntry
                error={errors.password}
              />

              <CustomInput
                placeholder="Confirmar senha"
                value={formData.confirmPassword}
                onChangeText={(value) => updateFormData('confirmPassword', value)}
                secureTextEntry
                error={errors.confirmPassword}
              />

              <CustomButton
                title="Sign-up"
                onPress={handleSignUp}
                style={styles.signUpButton}
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  header: {
    backgroundColor: colors.primary,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: borderRadius.xl,
    borderBottomRightRadius: borderRadius.xl,
  },
  logoContainer: {
    width: 120,
    height: 120,
    borderRadius: borderRadius.round,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoImage: {
    width: 100,
    height: 100,
  },
  formContainer: {
    flex: 1,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
  },
  tabContainer: {
    flexDirection: 'row',
    marginBottom: spacing.xl,
  },
  activeTab: {
    flex: 1,
    paddingVertical: spacing.md,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: colors.primary,
  },
  inactiveTab: {
    flex: 1,
    paddingVertical: spacing.md,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.gray,
  },
  activeTabText: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.semibold,
    color: colors.primary,
  },
  inactiveTabText: {
    fontSize: fontSize.md,
    color: colors.textSecondary,
  },
  form: {
    flex: 1,
  },
  userTypeContainer: {
    flexDirection: 'row',
    marginBottom: spacing.lg,
    gap: spacing.sm,
  },
  userTypeButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.sm,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.gray,
    backgroundColor: colors.white,
  },
  userTypeButtonActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  userTypeText: {
    marginLeft: spacing.xs,
    fontSize: fontSize.sm,
    color: colors.textSecondary,
  },
  userTypeTextActive: {
    color: colors.white,
  },
  signUpButton: {
    marginTop: spacing.md,
  },
});

export default SignUpScreen;

