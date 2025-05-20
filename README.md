# Nebula Store

## Sobre o Projeto

Nebula Store é uma aplicação frontend desenvolvida com React, TypeScript e Material UI que consome a Fake Store API para demonstrar implementação de autenticação JWT, listagem de produtos e visualização detalhada em uma loja virtual.

## Funcionalidades

- ✅ Autenticação de usuários com JWT
- ✅ Listagem de produtos autenticada
- ✅ Visualização detalhada de cada produto
- ✅ Exibição de foto, título, preço e descrição de produtos
- ✅ Funcionalidade de logout com limpeza de token

## Tecnologias Utilizadas

- **React** - Biblioteca JavaScript para construção de interfaces
- **TypeScript** - Superset JavaScript com tipagem estática
- **Vite** - Ferramenta de build e desenvolvimento
- **Material UI** - Framework de componentes React
- **React Router** - Biblioteca para gerenciamento de rotas
- **Axios** - Cliente HTTP para requisições à API
- **JWT** - Método para autenticação segura

## Configuração do Ambiente

### Pré-requisitos

- Node.js (versão 14.x ou superior)
- npm ou yarn

### Instalação

1. Clone o repositório:

```bash
git clone https://github.com/seu-usuario/nebula-store.git
cd nebula-store
```

2. Instale as dependências:

```bash
npm install
# ou
yarn install
```

3. Inicie o servidor de desenvolvimento:

```bash
npm run dev
# ou
yarn dev
```

4. Acesse a aplicação em `http://localhost:5173`

## Estrutura do Projeto

```
src/
  ├── components/       # Componentes React reutilizáveis
  │   ├── Login.tsx
  │   ├── Navbar.tsx
  │   ├── ProductCard.tsx
  │   ├── ProductDetail.tsx
  │   ├── ProductList.tsx
  │   └── ProtectedRoute.tsx
  ├── contexts/         # Contextos React (autenticação)
  │   └── AuthContext.tsx
  ├── services/         # Serviços (API, autenticação)
  │   └── api.ts
  ├── types/            # Definições de tipos TypeScript
  │   └── index.ts
  ├── App.tsx           # Componente principal
  ├── Router.tsx        # Configuração de rotas
  └── main.tsx          # Ponto de entrada da aplicação
```

## Uso da Aplicação

### Autenticação

Para testar a aplicação, use as seguintes credenciais:

- **Username**: mor_2314
- **Password**: 83r5^\_

### Fluxo da Aplicação

1. Inicie na tela de login e insira as credenciais
2. Após autenticação, será redirecionado para a listagem de produtos
3. Clique em um produto para visualizar seus detalhes
4. Use o botão de logout no cabeçalho para encerrar a sessão

## API Utilizada

O projeto consome a [Fake Store API](https://fakestoreapi.com/), utilizando os seguintes endpoints:

- **Login**: `POST https://fakestoreapi.com/auth/login`
- **Produtos**: `GET https://fakestoreapi.com/products`
- **Detalhes do Produto**: `GET https://fakestoreapi.com/products/{id}`

## Implementação da Autenticação

A autenticação é implementada usando JWT (JSON Web Token). O token recebido após o login é armazenado no localStorage e incluído automaticamente nos cabeçalhos das requisições subsequentes por meio de um interceptor do Axios.

## Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'Adicionando nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo LICENSE para detalhes.

## Contato

Seu Nome - [seu-email@exemplo.com](mailto:seu-email@exemplo.com)
