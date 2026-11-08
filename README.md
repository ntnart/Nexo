# Nexo

![Ícone do Nexo](nexo-icone.png)

**Nexo** é uma aplicação web de organização pessoal desenvolvida para facilitar o gerenciamento de tarefas do dia a dia.

O projeto permite cadastrar atividades, organizá-las por categorias e prioridades, acompanhar seu progresso e manter os dados salvos no navegador.

## Funcionalidades

- **Gerenciamento de tarefas:** adicionar, editar e excluir atividades.
- **Categorias:** organizar tarefas em Programação, Trabalho, Estudos e Pessoal.
- **Prioridades:** classificar atividades como baixa, média ou alta.
- **Acompanhamento:** marcar tarefas como concluídas ou pendentes.
- **Pesquisa:** localizar tarefas pelo título.
- **Filtros:** visualizar atividades por categoria.
- **Armazenamento local:** manter as tarefas salvas no navegador utilizando LocalStorage.
- **Interface responsiva:** adaptar a apresentação para diferentes tamanhos de tela.

## Tecnologias utilizadas

- HTML5
- CSS3
- JavaScript
- LocalStorage

O projeto foi desenvolvido utilizando tecnologias nativas da Web, sem frameworks ou bibliotecas externas.

## Como executar

Não é necessário instalar dependências ou configurar um servidor.

1. Faça o download ou clone este repositório.
2. Abra a pasta do projeto no computador.
3. Abra o arquivo `index.html` em um navegador.

Também é possível utilizar a extensão Live Server no Visual Studio Code para executar o projeto durante o desenvolvimento.

## Estrutura do projeto

```text
Nexo/
├── index.html       # Estrutura da aplicação
├── style.css        # Estilização e responsividade
├── script.js        # Funcionalidades e lógica
├── nexo-icone.png   # Ícone do projeto
└── README.md        # Documentação
```

## Armazenamento de dados

As tarefas são armazenadas localmente no navegador por meio do LocalStorage.

Isso permite que os dados continuem disponíveis após fechar e abrir a página novamente no mesmo navegador. Entretanto, os dados não são sincronizados entre dispositivos ou navegadores.

## Objetivo do projeto

O Nexo foi desenvolvido como projeto prático de aprendizado, com o objetivo de aplicar conhecimentos de desenvolvimento web, organização de código, manipulação do DOM, eventos JavaScript e armazenamento de dados no navegador.
