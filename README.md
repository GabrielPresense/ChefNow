# Chef Delivery App

Aplicativo React Native para delivery de comida com foco em chefs especializados.

## Funcionalidades

### Telas Implementadas

1. **Login** - Autenticação de usuários
2. **Sign-up** - Cadastro de novos usuários (Cliente ou Chef)
3. **Home** - Tela principal com busca e categorias
4. **Search** - Lista de chefs com filtros
5. **Chef Profile** - Perfil detalhado do chef com avaliações
6. **Place Order** - Seleção de itens e fazer pedido
7. **Favorites** - Lista de chefs favoritos

### Componentes Reutilizáveis

- **CustomButton** - Botão personalizado com estilo do app
- **CustomInput** - Campo de entrada com validação
- **ChefCard** - Card do chef com foto, avaliação e favoritos

### Navegação

- **Stack Navigator** - Para navegação entre telas principais
- **Tab Navigator** - Para navegação entre Home, Search e Favorites

## Como Executar

### Pré-requisitos

- Node.js (versão 14 ou superior)
- npm ou yarn
- Expo CLI
- Dispositivo móvel com Expo Go ou emulador

### Instalação

1. Clone o projeto:
```bash
git clone <url-do-repositorio>
cd ChefDeliveryApp
```

2. Instale as dependências:
```bash
npm install
```

3. Execute o projeto:
```bash
npm start
```

4. Escaneie o QR code com o Expo Go no seu dispositivo móvel ou execute em um emulador.

### Scripts Disponíveis

- `npm start` - Inicia o servidor de desenvolvimento
- `npm run android` - Executa no emulador Android
- `npm run ios` - Executa no emulador iOS (apenas macOS)
- `npm run web` - Executa no navegador web

## Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
│   ├── CustomButton.js
│   ├── CustomInput.js
│   └── ChefCard.js
├── navigation/          # Configuração de navegação
│   └── AppNavigator.js
├── screens/            # Telas do aplicativo
│   ├── LoginScreen.js
│   ├── SignUpScreen.js
│   ├── HomeScreen.js
│   ├── SearchScreen.js
│   ├── ChefProfileScreen.js
│   ├── PlaceOrderScreen.js
│   └── FavoritesScreen.js
├── styles/             # Estilos e tema
│   └── theme.js
└── utils/              # Utilitários
```

## Tecnologias Utilizadas

- **React Native** - Framework para desenvolvimento mobile
- **Expo** - Plataforma para desenvolvimento React Native
- **React Navigation** - Navegação entre telas
- **Expo Vector Icons** - Ícones do aplicativo

## Paleta de Cores

- **Primary**: #FF5722 (Laranja)
- **Secondary**: #FFFFFF (Branco)
- **Background**: #F5F5F5 (Cinza claro)
- **Text**: #333333 (Cinza escuro)
- **Star**: #FFD700 (Dourado)

## Próximos Passos

Para conectar com o backend, você precisará:

1. **Configurar APIs** - Substituir dados mock por chamadas reais
2. **Autenticação** - Implementar JWT ou sistema de auth
3. **Estado Global** - Adicionar Context API ou Redux
4. **Validações** - Melhorar validações de formulário
5. **Imagens** - Implementar upload de imagens
6. **Notificações** - Adicionar push notifications
7. **Pagamentos** - Integrar gateway de pagamento

## Estrutura de Dados Esperada

### Chef
```javascript
{
  id: number,
  name: string,
  email: string,
  specialty: string,
  rating: number,
  image: string,
  description: string,
  reviews: Array
}
```

### Menu Item
```javascript
{
  id: number,
  name: string,
  description: string,
  price: number,
  image: string,
  category: string
}
```

### Order
```javascript
{
  id: number,
  chefId: number,
  items: Array,
  total: number,
  status: string,
  createdAt: string
}
```

## Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

