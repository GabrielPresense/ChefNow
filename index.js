import { Asset } from 'expo-asset';
import logo from './logo.png';

// Função auxiliar para criar imagens temporárias
const createTempImage = (color, text) => {
  return `https://via.placeholder.com/200/${color}/FFFFFF?text=${text}`;
};

export const images = {
  // Categorias
  categories: {
    italiana: { uri: createTempImage('FF5722', 'Italiana') },
    saudavel: { uri: createTempImage('4CAF50', 'Saudavel') },
    carnes: { uri: createTempImage('8B4513', 'Carnes') },
  },
  
  // Pratos
  dishes: {
    saladaCaesar: { uri: createTempImage('4CAF50', 'SC') },
    salmaoGrelhado: { uri: createTempImage('FF5722', 'SG') },
    risottoCogumelos: { uri: createTempImage('8B4513', 'RC') },
    smoothieVerde: { uri: createTempImage('4CAF50', 'SV') },
  },
  
  // Chefs
  chefs: {
    default: { uri: createTempImage('FF5722', 'Chef') },
    adriana: { uri: createTempImage('FF5722', 'AC') },
  },
  
  // Logo e ícones
  logo: logo,
  splash: { uri: createTempImage('FF5722', 'Splash') },
}; 