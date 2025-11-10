# 🧪 Keoto Script Test App

Uma aplicação moderna e interativa para testar scripts de upsell/checkout da Keoto.

![Next.js](https://img.shields.io/badge/Next.js-16.0-black)
![React](https://img.shields.io/badge/React-19.2-blue)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.0-38bdf8)

## 🎯 O que é?

Esta é uma aplicação de teste que permite:
- ✅ Colar e testar scripts do Keoto dinamicamente
- ✅ Testar triggers de pagamento (`keoto-payment-trigger`)
- ✅ Testar triggers de recusa (`keoto-refuse-trigger`)
- ✅ Visualizar o comportamento em tempo real
- ✅ Modificar e recarregar scripts sem recarregar a página

## 🚀 Como usar

### 1. Iniciar a aplicação

```bash
npm run dev
# ou
pnpm dev
# ou
yarn dev
```

Abra [http://localhost:3000](http://localhost:3000) no navegador.

### 2. Testar um script

1. **Cole o script** no campo de texto à esquerda
2. **Clique em "Carregar Script"** para injetá-lo na página
3. **Teste os botões e links** no painel direito
4. **Modifique o script** e recarregue para testar variações

### 3. Exemplo de script

```html
<script>
  var paymentLink = "seu-id-de-pagamento-aqui";
  var upsellLink = "https://seu-link-de-sucesso.com/";
  var refuseLink = "https://seu-link-de-recusa.com/";
</script>
<script src="https://static.keoto.com/upsell/keoto-upsell-modal.min.js"></script>
```

## 🎨 Funcionalidades

### Painel Esquerdo
- **Editor de Script**: Cole e edite scripts do Keoto
- **Botões de Controle**: Carregue ou limpe scripts
- **Feedback Visual**: Indicadores de status e sucesso
- **Instruções**: Guia rápido de uso

### Painel Direito
- **Botões de Pagamento**: Diversos estilos de botões de aceite
- **Botões de Recusa**: Exemplos de triggers de recusa
- **Links de Teste**: Alternativas usando elementos `<a>`
- **Info de Classes**: Referência rápida das classes utilizadas

## 🔧 Tecnologias

- **Next.js 16** - Framework React
- **React 19.2** - Biblioteca UI
- **TailwindCSS 4** - Estilização
- **TypeScript** - Type safety

## 📚 Classes do Keoto

### `keoto-payment-trigger`
Adicione esta classe em qualquer elemento clicável para abrir o modal de checkout.

```html
<button class="keoto-payment-trigger">Comprar Agora</button>
<a href="#" class="keoto-payment-trigger">Aceitar Oferta</a>
```

### `keoto-refuse-trigger`
Adicione esta classe para permitir que o usuário recuse a oferta e seja redirecionado.

```html
<button class="keoto-refuse-trigger">Não, obrigado</button>
<a href="#" class="keoto-refuse-trigger">Continuar sem a oferta</a>
```

## 🎯 Casos de Uso

- **Desenvolvimento**: Teste scripts durante o desenvolvimento
- **QA**: Valide comportamentos antes de produção
- **Demonstração**: Mostre funcionalidades para clientes
- **Debug**: Identifique problemas com configurações específicas

## 🛠️ Estrutura do Projeto

```
upsell-script/
├── app/
│   ├── page.tsx      # Componente principal da app
│   ├── layout.tsx    # Layout raiz
│   └── globals.css   # Estilos globais
├── public/           # Assets estáticos
└── package.json      # Dependências
```

## 📝 Notas

- Os scripts são injetados dinamicamente no DOM
- Scripts antigos são removidos ao carregar novos
- Funciona com qualquer versão do script da Keoto
- Suporta modo claro e escuro

## 🐛 Problemas Conhecidos

Se o modal não abrir:
1. Verifique se o script foi carregado (badge verde)
2. Confirme que o `paymentLink` é válido
3. Verifique o console do navegador para erros

## 📄 Licença

Este projeto é uma ferramenta de teste interna.

---

Desenvolvido para [Keoto](https://keoto.com) 🚀
