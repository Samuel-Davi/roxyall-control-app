# 💰 Finance App

Um aplicativo mobile de controle financeiro pessoal, desenvolvido com **React Native**, que permite ao usuário registrar transações, acompanhar o saldo total e visualizar um gráfico interativo de categorias de despesas e receitas.

## 🧩 Tecnologias Utilizadas

- **React Native** — para desenvolvimento mobile multiplataforma
- **SQLite** — banco de dados local para armazenar transações do usuário
- **Context API** — gerenciamento de estado compartilhado (transações e usuário)
- **react-native-pie-chart** — gráfico de pizza para visualização de gastos
- **TypeScript** — tipagem estática para maior segurança e escalabilidade

## ✨ Funcionalidades

- Cadastro de usuário
- Registro de transações com:
  - Descrição
  - Valor
  - Data
  - Categoria fixa (ex: Alimentação, Transporte, etc.)
- Visualização de todas as transações com filtros por:
  - Categoria
  - Data
- Gráfico de pizza atualizado automaticamente ao adicionar uma nova transação
- Saldo total com botão de recarregamento
- Tabs para navegação entre:
  - Dashboard
  - Transações
  - Perfil (visível somente para usuários com ID 1)
- Modal para cadastro de nova transação
- Indicador de carregamento reutilizável
