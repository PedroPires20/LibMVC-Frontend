# Implementação em Angular

Este diretório contém o código referente à implementação do *frontend* do
sistema SimpleLibrary baseada na biblioteca [Angular](https://angular.io/) como
tecnologia de suporte para a implementação das *views* e da lógica do
*frontend*.

O Angular é descrito por seus autores como um *framework* para design de
aplicações e uma plataforma para criar aplicações de página única (*single page
applications* ou SPAs) eficientes e sofisticadas. O Angular é desenvolvido sobre
a linguagem de programação [TypeScript](https://www.typescriptlang.org/) e, como
uma plataforma, é composto não só por um *framework* para construção de
aplicações Web baseadas em componentes, mas também por uma coleção de
bibliotecas para realizar diversas tarefas (como roteamento, gerenciamento de
formulários, etc.) e ferramentas para os desenvolvedores.

Os detalhes relativos a essa implementação em específico são explorados nas
seções seguintes.

## Tecnologias

Essa implementação do *frontend* foi desenvolvida utilizando a linguagem de
programação [TypeScript](https://www.typescriptlang.org/) e a linguagem
[CSS](https://developer.mozilla.org/pt-BR/docs/Web/CSS), para a definição dos
estilos (isto é, a formatação visual dos componentes). A linguagem TypeScript
foi utilizada por ser a base do *framework* Angular, que foi desenvolvido para
utilização com essa linguagem e, embora seja possível utilizar a linguagem
JavaScript (como nas demais implementações), isso não é recomendável, uma vez
que o *framework* não foi desenvolvido para ser utilizado dessa forma.

Por se tratar de uma "plataforma" de desenvolvimento, contendo, também, diversas
bibliotecas, nenhuma biblioteca externa ao Angular foi utilizada nessa
implementação. Apenas as bibliotecas de roteamento e gerenciamento de
formulários foram utilizadas, de modo que algumas outras bibliotecas, como a
biblioteca para comunicação em rede, não foram utilizadas (uma vez que essa
funcionalidade já é implementada pelo código compartilhado entre as
implementações do *frontend*). Como o Angular é desenvolvido de forma modular, a
não-utilização das demais bibliotecas não é um problema, uma vez que apenas o
que é utilizado é incluído no pacote final da aplicação.

## Instalação e utilização

Instruções para instalação e execução da implementação do *frontend* do
**SimpleLibrary** baseada em Angular, podem ser encontradas nesse
[link](docs/instalacao.md).

## Arquitetura

Um detalhamento da arquitetura específica utilizada para implementação do
*frontend* baseada em Angular pode ser encontrado nesse
[link](docs/arquitetura.md).
