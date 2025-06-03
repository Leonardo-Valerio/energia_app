# FaltaEnergiaApp ⚡

## Descrição do Projeto

**FaltaEnergiaApp** é um aplicativo móvel desenvolvido como parte de um projeto universitário. O objetivo do aplicativo é permitir que usuários registrem e visualizem localmente informações sobre episódios de falta de energia causados por eventos naturais (como chuvas intensas, ventos fortes ou deslizamentos) que impactaram sua região ou município.

O foco é na persistência local dos dados utilizando AsyncStorage e na navegação entre diferentes telas para gerenciar as informações dos eventos.

## ✨ Funcionalidades Principais

O aplicativo conta com as seguintes telas e funcionalidades:

1.  **Tela 1 – Panorama Geral:** Exibe um resumo dos eventos de falta de energia registrados pelo usuário.
2.  **Tela 2 – Localização Atingida:** Permite o cadastro e visualização das regiões afetadas (bairro, cidade ou CEP).
3.  **Tela 3 – Tempo de Interrupção:** Possibilita o registro e visualização do tempo estimado ou real que a região ficou sem energia.
4.  **Tela 4 – Prejuízos Causados:** Oferece um campo para descrição dos prejuízos observados (residências impactadas, estabelecimentos afetados, etc.).
5.  **Tela 5 – Recomendações:** Apresenta orientações preventivas e boas práticas para lidar com eventos de falta de energia causados por desastres naturais.

## 🛠️ Tecnologias Utilizadas

* **React Native (v0.79.2)**: Framework para desenvolvimento de aplicativos móveis multiplataforma.
* **TypeScript**: Superset do JavaScript que adiciona tipagem estática.
* **React (v18.2.0)**: Biblioteca JavaScript para construção de interfaces de usuário (após downgrade do React 19 para compatibilidade).
* **React Navigation**: Para gerenciamento da navegação entre as telas do aplicativo.
* **AsyncStorage**: Para persistência local de dados no dispositivo do usuário.
* **@react-native-community/datetimepicker**: Componente para seleção de data (e hora, com `mode="date"` atualmente como workaround para estabilidade).
* **react-native-uuid**: Para geração de identificadores únicos para os eventos.

## 📂 Estrutura do Projeto (Simplificada)
FaltaEnergiaApp/
├── android/              # Código e configurações específicas do Android
├── ios/                  # Código e configurações específicas do iOS (se aplicável)
├── src/
│   ├── components/       # Componentes reutilizáveis (se houver)
│   ├── navigation/       # Configuração da navegação (ou pode estar no App.tsx)
│   ├── screens/          # Componentes de tela principais
│   │   ├── HomeScreen.tsx
│   │   ├── LocationScreen.tsx
│   │   ├── DurationScreen.tsx
│   │   ├── DamageScreen.tsx
│   │   ├── TipsScreen.tsx
│   │   └── EventDetailScreen.tsx
│   ├── storage/          # Lógica para AsyncStorage (eventStorage.ts)
│   └── types/            # Definições de tipos TypeScript (index.ts)
├── App.tsx               # Componente raiz e configuração da navegação principal
├── package.json          # Dependências e scripts do projeto
└── README.md             # Este arquivo

## 🚀 Pré-requisitos

Antes de começar, certifique-se de que você tem o seguinte instalado e configurado no seu ambiente de desenvolvimento:

* [Node.js](https://nodejs.org/) (versão >= 18, conforme `package.json`)
* npm ou Yarn
* Ambiente de desenvolvimento React Native configurado conforme a [documentação oficial](https://reactnative.dev/docs/environment-setup) (escolha a aba "React Native CLI Quickstart").
* [Android Studio](https://developer.android.com/studio) instalado e configurado com:
    * Android SDK (API Level recomendado pela versão do React Native ou mais recente)
    * Um Emulador Android (AVD) criado ou um dispositivo físico Android pronto para depuração USB.
* (Opcional, para desenvolvimento iOS) macOS com Xcode instalado.

## ⚙️ Configuração e Execução do Projeto

1.  **Clone o Repositório:**
    ```bash
    git clone https://SEU_LINK_PARA_O_REPOSITORIO_NO_GITHUB.git
    cd FaltaEnergiaApp
    ```

2.  **Instale as Dependências:**
    ```bash
    npm install
    ```
    ou
    ```bash
    yarn install
    ```

3.  **Configuração Específica do Android:**
    * **`local.properties`**: Certifique-se de que o Android SDK está corretamente configurado. Crie um arquivo chamado `local.properties` dentro da pasta `android` do projeto (`FaltaEnergiaApp/android/local.properties`).
        Adicione a seguinte linha, substituindo pelo caminho correto para o seu SDK do Android (lembre-se de usar barras duplas invertidas `\\` ou barras normais `/` no Windows):
        ```properties
        sdk.dir = CAMINHO_PARA_SEU_SDK_ANDROID
        ```
        Exemplo para Windows: `sdk.dir = C:\\Users\\SeuNome\\AppData\\Local\\Android\\Sdk`
    * **Variáveis de Ambiente (PATH)**: Garanta que as pastas `platform-tools` e `emulator` do seu Android SDK estão adicionadas à variável de ambiente PATH do seu sistema. Isso é crucial para que comandos como `adb` e `emulator` sejam reconhecidos no terminal.

4.  **Executando o Aplicativo:**

    * **Passo 1: Inicie o Metro Bundler** (servidor de desenvolvimento do React Native):
        Abra um terminal na raiz do projeto e execute:
        ```bash
        npm start
        ```
        Mantenha este terminal aberto.

    * **Passo 2: Prepare o Emulador/Dispositivo:**
        Inicie um emulador Android através do Android Studio (AVD Manager) ou conecte um dispositivo físico Android com a depuração USB ativada.

    * **Passo 3: Execute o Aplicativo no Android:**
        Abra um **novo terminal** (diferente do terminal do Metro), na raiz do projeto, e execute:
        ```bash
        npm run android
        ```

    * **(Opcional) Para iOS (requer macOS e Xcode):**
        ```bash
        cd ios && pod install && cd ..  # Se for a primeira vez ou após adicionar libs nativas
        npm run ios
        ```

## 📖 Detalhes das Funcionalidades das Telas

* **Panorama Geral (`HomeScreen.tsx`):**
    * Lista os eventos de falta de energia já registrados.
    * Permite navegar para o fluxo de cadastro de um novo evento.
    * Permite visualizar detalhes de um evento existente (navegando para `EventDetailScreen.tsx`).
    * Permite excluir eventos.
    * Link para a tela de Recomendações.

* **Localização Atingida (`LocationScreen.tsx`):**
    * Primeira etapa do formulário de cadastro/edição de evento.
    * Campos para Bairro, Cidade e CEP.

* **Tempo de Interrupção (`DurationScreen.tsx`):**
    * Segunda etapa do formulário.
    * Seleção de data/hora de início e fim da interrupção (atualmente usando `mode="date"` para o seletor de data para maior estabilidade, a implementação precisa da hora pode ser um ponto de melhoria).
    * Campo para observações sobre a duração.

* **Prejuízos Causados (`DamageScreen.tsx`):**
    * Terceira e última etapa do formulário.
    * Campo de texto para descrever os prejuízos.
    * Botão para salvar o novo evento ou atualizar um existente no AsyncStorage.

* **Recomendações (`TipsScreen.tsx`):**
    * Tela estática com informações e boas práticas sobre como lidar com faltas de energia devido a desastres naturais.

* **Detalhes do Evento (`EventDetailScreen.tsx`):**
    * Exibe todas as informações de um evento selecionado.
    * Botões para Editar (que leva ao fluxo de formulário com dados pré-preenchidos) e Excluir o evento.
