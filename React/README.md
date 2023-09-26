# Implementação em React

Este diretório contém o código referente à implementação do *frontend* do
sistema SimpleLibrary baseada na biblioteca [React](https://react.dev/) como
tecnologia de suporte para a implementação das *views* e da lógica do frontend.

O React, conforme descrito por seus próprios criadores, é uma biblioteca
JavaScript para criação de interfaces de usuário baseada em componentes. Os
componentes encapsulam a estrutura, lógica, estado e os estilos de partes da
interface, permitindo que esta seja definida como a composição de vários
componentes menores, facilitando bastante o processo de desenvolvimento. Um
componente em React é, de forma bastante simplificada, uma função que gera HTML,
se comportando como uma espécie de "template" para construção de strings HTML.
Além disso, o React também fornece uma coleção de funções que facilitam a
implementação da lógica da interface, possibilitando que tarefas como
gerenciamento de estado, carregamento de dados, execução de efeitos colaterais,
etc., sejam implementadas de forma simples.

Os detalhes relativos a essa implementação em específico são explorados nas
seções seguintes.

## Tecnologias

Esta implementação do *frontend* foi desenvolvida utilizando a linguagem de
programação
[JavaScript](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript) e a
linguagem [CSS](https://developer.mozilla.org/pt-BR/docs/Web/CSS), para a
definição dos estilos (isto é, a formatação visual dos componentes). Além da
biblioteca [React](https://react.dev/), essa implementação também faz uso das
seguintes tecnologias:

- [Vite](https://vitejs.dev/), uma ferramenta de compilação, responsável
combinar todos os módulos do código desenvolvido e os recursos utilizados (como
imagens e arquivos CSS) em um número menor de arquivos, a fim de otimizar o
carregamento e a "execução" das páginas desenvolvidas. O Vite também possui
ferramentas para auxiliar no processo de desenvolvimento, como um servidor com
suporte a *Hot Module Replacing* (HMR), recurso que permite a substituição de
módulos modificados em tempo de execução (isto é, sem interromper a aplicação),
permitido visualizar, imediatamente, as modificações realizadas durante o
desenvolvimento. Seu uso é recomendado pelos próprios autores do React como uma
boa forma de configurar um ambiente JavaScript modular, como pode ser visto
nesse
[link](https://react.dev/learn/add-react-to-an-existing-project#step-1-set-up-a-modular-javascript-environment)
(o uso de alguma ferramenta de compilação em geral é extremamente recomendado
pelos criadores do React).

- [React Router](https://reactrouter.com/en/main), uma biblioteca baseada em
React que facilita a implementação de aplicações de página única (SPAs),
gerenciando a renderização de diferentes componentes baseada na rota (URL) que é
acessada pelo usuário e a navegação entre as páginas.

## Instalação e utilização

Instruções para instalação e execução da implementação do *frontend* da
aplicação **SimpleLibrary** baseada em React, podem ser encontradas nesse
[link](docs/instalacao.md).

## Arquitetura

Um detalhamento da arquitetura específica utilizada para implementação do
*frontend* baseada em React pode ser encontrado nesse
[link](docs/arquitetura.md).
