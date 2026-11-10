# Nexo

\<p align="center">
&#x20; \<img src="img/nexo-icone.png" alt="Ícone do Nexo" width="120">
\</p>

O **Nexo** é um site de organização pessoal simples e prático, criado para ajudar a gerenciar as tarefas da rotina e acompanhar as atividades do dia a dia.

Desenvolvi o projeto com foco em ser algo leve, responsivo e funcional, permitindo criar, editar, excluir e concluir tarefas, além de organizá-las por categorias e prioridades para facilitar o acompanhamento do que é mais importante.

**Acesse o projeto online:** [https://ntnart.github.io/Nexo/](https://ntnart.github.io/Nexo/)

---

## Funcionalidades

- **Gerenciamento de tarefas:** Crie, edite, exclua e marque suas atividades como concluídas ou pendentes.
- **Categorias e prioridades:** Organize suas tarefas por categorias personalizadas e defina a prioridade de cada uma (baixa, média ou alta).
- **Busca e filtros:** Pesquise tarefas pelo título e utilize filtros para facilitar a visualização das atividades.
- **Personalização:** Altere o tema da interface e ajuste as opções de visualização.
- **Armazenamento local:** Suas tarefas, categorias e preferências ficam salvas no navegador por meio do LocalStorage.

---

## Tecnologias Utilizadas

O projeto foi desenvolvido utilizando tecnologias nativas da Web, sem o uso de frameworks ou bibliotecas externas:

- **HTML5:** Estruturação das páginas.
- **CSS3:** Estilização, layout e responsividade.
- **JavaScript (ES6+):** Lógica da aplicação, manipulação do DOM e organização do código em módulos.
- **LocalStorage API:** Armazenamento dos dados diretamente no navegador.

---

## Armazenamento de Dados

O Nexo não possui servidor ou banco de dados externo. As tarefas, categorias e preferências ficam armazenadas localmente no navegador, utilizando o **LocalStorage**.

Isso significa que você pode fechar e abrir a aplicação novamente no mesmo navegador e continuar utilizando os dados salvos. Como o armazenamento é local, as informações não são sincronizadas entre navegadores ou dispositivos diferentes.

---

## Estrutura do Projeto

Os arquivos foram organizados em pastas para separar os estilos, imagens e scripts, facilitando a manutenção e a compreensão do código.

```text
Nexo/
├── css/
│   └── style.css           # Estilização e responsividade
├── img/
│   └── nexo-icone.png      # Ícone do projeto
├── js/
│   ├── categorias.js       # Gerenciamento de categorias
│   ├── configuracoes.js    # Configurações da aplicação
│   ├── dados-categorias.js # Dados iniciais das categorias
│   ├── filtros.js          # Busca, filtros e visualização
│   ├── interface.js        # Manipulação e renderização do DOM
│   ├── main.js             # Ponto de entrada da aplicação
│   ├── preferencias.js     # Preferências do usuário
│   ├── storage.js          # Leitura e gravação no LocalStorage
│   └── tarefas.js          # Gerenciamento das tarefas
├── categorias.html         # Página de categorias
├── configuracoes.html      # Página de configurações
├── index.html              # Página principal
└── README.md               # Documentação do projeto
```

---

## Como Executar Localmente

Para executar o projeto no computador, não é necessário instalar dependências. Basta ter um navegador e utilizar um servidor local para abrir a aplicação.

1. Clone o repositório ou faça o download dos arquivos:

   ```bash
   git clone https://github.com/ntnart/Nexo.git
   ```

2. Abra a pasta do projeto no Visual Studio Code.

3. Instale a extensão **Live Server**, caso ainda não tenha.

4. Clique com o botão direito no arquivo `index.html` e selecione **Open with Live Server**.

A aplicação será aberta no navegador e estará pronta para uso.

---

## Sobre o Desenvolvimento

Como estudante de Engenharia de Software, desenvolvi o Nexo como um projeto prático para consolidar conceitos importantes do desenvolvimento web.

Durante o desenvolvimento, trabalhei principalmente com a **modularização em JavaScript**, a manipulação do **DOM**, o tratamento de eventos e o armazenamento de dados com **LocalStorage**. Também pratiquei a construção de layouts responsivos e a organização de um projeto em diferentes arquivos e páginas.
