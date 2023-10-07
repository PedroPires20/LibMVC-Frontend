# Implementação em Angular

Este diretório contém o código referente à implementação do *frontend* do
sistema SimpleLibrary baseada no *framework* [Angular](https://angular.io/) como
tecnologia de suporte para a implementação das *views* e da lógica do
*frontend*.

O Angular é descrito por seus autores como um *framework* para design de
aplicações e uma plataforma para criar aplicações de página única (*single page
applications* ou SPAs) eficientes e sofisticadas. O Angular é desenvolvido sobre
a linguagem de programação [TypeScript](https://www.typescriptlang.org/) e, como
uma plataforma, é composto não só por um *framework* para construção de
aplicações Web baseadas em componentes, mas também por uma coleção de
bibliotecas para realizar diversas tarefas (como roteamento, gerenciamento de
formulários, etc.) além de ferramentas para os desenvolvedores.

Os detalhes relativos a essa implementação em específico são explorados nas
seções seguintes.

## Tecnologias

Essa implementação do *frontend* foi desenvolvida utilizando a linguagem de
programação [TypeScript](https://www.typescriptlang.org/) e a linguagem
[CSS](https://developer.mozilla.org/pt-BR/docs/Web/CSS), para a definição dos
estilos (isto é, a formatação visual dos componentes). A linguagem TypeScript
foi utilizada por ser a base do *framework* Angular, que foi desenvolvido para
utilização com essa linguagem. Embora seja possível utilizar a linguagem
JavaScript (como nas demais implementações) com o Angular, essa escolha não é
recomendada por seus desenvolvedores, uma vez que o *framework* não foi
desenvolvido para ser utilizado dessa forma.

Por se tratar de uma "plataforma" de desenvolvimento, incluindo, portanto,
diversas bibliotecas, não foi necessário utilizar, nessa implementação, nenhuma
biblioteca externa ao Angular. Dentre as bibliotecas disponibilizadas, apenas as
bibliotecas de roteamento e gerenciamento de formulários foram utilizadas, de
modo que algumas outras bibliotecas, como a biblioteca para comunicação em rede,
não foram utilizadas, ora para simplificar a implementação do sistema, ora para
garantir a reutilização de funcionalidades já implementadas na "camada comum"
(como é o caso da comunicação em rede). Como o Angular é desenvolvido de forma
modular, a não-utilização das demais bibliotecas não é um problema, uma vez que
apenas o que é utilizado é incluso no pacote final da aplicação.

## Instalação e utilização

Instruções para instalação e execução da implementação do *frontend* da
aplicação **SimpleLibrary** baseada em Angular, podem ser encontradas nesse
[link](docs/instalacao.md).

## Arquitetura

Um detalhamento da arquitetura específica utilizada para implementação do
*frontend* baseada em Angular pode ser encontrado nesse
[link](docs/arquitetura.md).
