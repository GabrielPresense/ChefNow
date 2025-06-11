# Guia de Integração com Backend

Este documento fornece instruções detalhadas para conectar o frontend React Native com seu backend existente.

## Configuração de API

### 1. Configurar Base URL

Crie um arquivo `src/config/api.js`:

```javascript
const API_BASE_URL = 'https://seu-backend.com/api';

export const apiConfig = {
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
};

export default API_BASE_URL;
```

### 2. Instalar Axios

```bash
npm install axios
```

### 3. Criar Serviço de API

Crie `src/services/api.js`:

```javascript
import axios from 'axios';
import { apiConfig } from '../config/api';

const api = axios.create(apiConfig);

// Interceptor para adicionar token de autenticação
api.interceptors.request.use(
  (config) => {
    const token = getAuthToken(); // Implementar função para pegar token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
```

## Endpoints Necessários

### Autenticação

```javascript
// src/services/authService.js
import api from './api';

export const authService = {
  login: async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },
  
  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },
  
  logout: async () => {
    const response = await api.post('/auth/logout');
    return response.data;
  },
};
```

### Chefs

```javascript
// src/services/chefService.js
import api from './api';

export const chefService = {
  getChefs: async (filters = {}) => {
    const response = await api.get('/chefs', { params: filters });
    return response.data;
  },
  
  getChefById: async (id) => {
    const response = await api.get(`/chefs/${id}`);
    return response.data;
  },
  
  searchChefs: async (query) => {
    const response = await api.get('/chefs/search', { params: { q: query } });
    return response.data;
  },
};
```

### Favoritos

```javascript
// src/services/favoriteService.js
import api from './api';

export const favoriteService = {
  getFavorites: async () => {
    const response = await api.get('/favorites');
    return response.data;
  },
  
  addFavorite: async (chefId) => {
    const response = await api.post('/favorites', { chefId });
    return response.data;
  },
  
  removeFavorite: async (chefId) => {
    const response = await api.delete(`/favorites/${chefId}`);
    return response.data;
  },
};
```

### Pedidos

```javascript
// src/services/orderService.js
import api from './api';

export const orderService = {
  createOrder: async (orderData) => {
    const response = await api.post('/orders', orderData);
    return response.data;
  },
  
  getOrders: async () => {
    const response = await api.get('/orders');
    return response.data;
  },
  
  getOrderById: async (id) => {
    const response = await api.get(`/orders/${id}`);
    return response.data;
  },
};
```

## Gerenciamento de Estado

### Instalar Context API ou Redux

Para Context API, crie `src/context/AppContext.js`:

```javascript
import React, { createContext, useContext, useReducer } from 'react';

const AppContext = createContext();

const initialState = {
  user: null,
  isAuthenticated: false,
  favorites: [],
  loading: false,
  error: null,
};

function appReducer(state, action) {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload, isAuthenticated: true };
    case 'LOGOUT':
      return { ...state, user: null, isAuthenticated: false };
    case 'SET_FAVORITES':
      return { ...state, favorites: action.payload };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    default:
      return state;
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}
```

## Modificações nas Telas

### LoginScreen.js

```javascript
// Substituir a função handleLogin
const handleLogin = async () => {
  if (validateForm()) {
    try {
      setLoading(true);
      const response = await authService.login(email, password);
      
      // Salvar token
      await AsyncStorage.setItem('authToken', response.token);
      
      // Atualizar estado global
      dispatch({ type: 'SET_USER', payload: response.user });
      
      navigation.navigate('Main');
    } catch (error) {
      setErrors({ general: 'Email ou senha incorretos' });
    } finally {
      setLoading(false);
    }
  }
};
```

### SearchScreen.js

```javascript
// Substituir useEffect para carregar dados reais
useEffect(() => {
  const loadChefs = async () => {
    try {
      setLoading(true);
      const filters = {};
      
      if (route.params?.category) {
        filters.category = route.params.category;
      }
      
      const response = await chefService.getChefs(filters);
      setChefs(response.chefs);
    } catch (error) {
      console.error('Erro ao carregar chefs:', error);
    } finally {
      setLoading(false);
    }
  };

  loadChefs();
}, [route.params]);
```

### FavoritesScreen.js

```javascript
// Substituir useEffect para carregar favoritos reais
useEffect(() => {
  const loadFavorites = async () => {
    try {
      setLoading(true);
      const response = await favoriteService.getFavorites();
      setFavoriteChefs(response.favorites);
    } catch (error) {
      console.error('Erro ao carregar favoritos:', error);
    } finally {
      setLoading(false);
    }
  };

  loadFavorites();
}, []);
```

## Armazenamento Local

### Instalar AsyncStorage

```bash
npm install @react-native-async-storage/async-storage
```

### Criar utilitário de storage

```javascript
// src/utils/storage.js
import AsyncStorage from '@react-native-async-storage/async-storage';

export const storage = {
  setItem: async (key, value) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Erro ao salvar no storage:', error);
    }
  },
  
  getItem: async (key) => {
    try {
      const value = await AsyncStorage.getItem(key);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      console.error('Erro ao ler do storage:', error);
      return null;
    }
  },
  
  removeItem: async (key) => {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error('Erro ao remover do storage:', error);
    }
  },
};
```

## Tratamento de Erros

### Criar hook para tratamento de erros

```javascript
// src/hooks/useError.js
import { useState } from 'react';
import { Alert } from 'react-native';

export function useError() {
  const [error, setError] = useState(null);

  const handleError = (error) => {
    console.error('Erro:', error);
    
    let message = 'Ocorreu um erro inesperado';
    
    if (error.response) {
      message = error.response.data.message || message;
    } else if (error.message) {
      message = error.message;
    }
    
    setError(message);
    Alert.alert('Erro', message);
  };

  const clearError = () => setError(null);

  return { error, handleError, clearError };
}
```

## Validação de Formulários

### Instalar biblioteca de validação

```bash
npm install yup
```

### Criar esquemas de validação

```javascript
// src/validation/schemas.js
import * as yup from 'yup';

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email('Email inválido')
    .required('Email é obrigatório'),
  password: yup
    .string()
    .min(6, 'Senha deve ter pelo menos 6 caracteres')
    .required('Senha é obrigatória'),
});

export const registerSchema = yup.object().shape({
  fullName: yup
    .string()
    .required('Nome completo é obrigatório'),
  email: yup
    .string()
    .email('Email inválido')
    .required('Email é obrigatório'),
  password: yup
    .string()
    .min(6, 'Senha deve ter pelo menos 6 caracteres')
    .required('Senha é obrigatória'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Senhas não coincidem')
    .required('Confirmação de senha é obrigatória'),
});
```

## Checklist de Integração

- [ ] Configurar URL base da API
- [ ] Implementar serviços de API
- [ ] Configurar autenticação com tokens
- [ ] Implementar gerenciamento de estado
- [ ] Adicionar tratamento de erros
- [ ] Configurar armazenamento local
- [ ] Implementar validação de formulários
- [ ] Testar todas as funcionalidades
- [ ] Adicionar loading states
- [ ] Implementar refresh/pull-to-refresh
- [ ] Configurar interceptors para renovação de token
- [ ] Adicionar logs para debugging

## Estrutura de Dados Esperada do Backend

### Resposta de Login
```json
{
  "success": true,
  "token": "jwt_token_here",
  "user": {
    "id": 1,
    "name": "João Silva",
    "email": "joao@email.com",
    "type": "user"
  }
}
```

### Lista de Chefs
```json
{
  "success": true,
  "chefs": [
    {
      "id": 1,
      "name": "Diego",
      "specialty": "especialidade italiana",
      "rating": 4.5,
      "image": "url_da_imagem",
      "description": "Descrição do chef"
    }
  ]
}
```

### Resposta de Erro
```json
{
  "success": false,
  "message": "Mensagem de erro",
  "errors": {
    "field": ["erro específico do campo"]
  }
}
```

