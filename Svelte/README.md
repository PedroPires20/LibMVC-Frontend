# Implementação em Svelte

Este diretório contém o código referente à implementação do *frontend* do
sistema SimpleLibrary baseada no *framework* [Svelte](https://svelte.dev) como
tecnologia de suporte para a implementação das *views* e da lógica do
*frontend*.

O Svelte é descrito por seus autores como uma ferramenta para a construção de
aplicações Web que, como os demais *frameworks* de interface gráfica, permite
construir a aplicação de forma declarativa, a partir de componentes que combinam
*markup* (HTML), estilos (CSS) e comportamentos (i.e. lógica). Porém, diferente
dos principais *frameworks*, os componentes em Svelte são compilados para
módulos JavaScript, a fim de eliminar o *overhead* frequentemente associado aos
*frameworks* de interface de usuário, que ocorre devido à atuação do *framework*
em tempo de execução.

Os detalhes relativos a essa implementação em específico são explorados nas
seções seguintes.

## Tecnologias

Esta implementação do *frontend* foi desenvolvida utilizando a linguagem
[JavaScript](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript) e a
linguagem [CSS](https://developer.mozilla.org/pt-BR/docs/Web/CSS), para a
definição dos estilos (isto é, a formatação visual dos componentes). Além do
*framework* [Svelte](https://svelte.dev/), essa implementação também faz uso das
seguintes tecnologias:

- [Vite](https://vitejs.dev/), uma ferramenta de compilação, responsável
combinar todos os módulos do código desenvolvido e os recursos utilizados (como
imagens  e arquivos CSS) em um número menor de arquivos, a fim de otimizar o
carregamento e a "execução" das páginas desenvolvidas. O Vite também possui
ferramentas para auxiliar no processo de desenvolvimento, como um servidor com
suporte a *Hot Module Replacing* (HMR), recurso que permite a substituição de
módulos modificados em tempo de execução (isto é, sem interromper a aplicação),
permitido visualizar, imediatamente, as modificações realizadas durante o
desenvolvimento. Seu uso é recomendado pelos próprios autores do Svelte como uma
alternativa ao uso de seu *framework full-stack* (o SvelteKit), como pode ser
visto nesse
[link](https://svelte.dev/docs/introduction#start-a-new-project-alternatives-to-sveltekit).
Como comparação feita neste projeto limita-se ao *frontend* e utiliza uma
implementação compartilhada do *backend* — o que impossibilitaria ou tornaria
injustificável o uso de um *framework full-stack* — o SvelteKit não foi adotado
neste caso.

- [svelte-routing](https://github.com/EmilTholin/svelte-routing), uma biblioteca
baseada em Svelte para implementação de roteamento de forma declarativa. Pode
ser utilizada tanto para roteamento do lado do servidor (*Server Side Routing*
ou SSR), quanto do lado do cliente, para a construção de aplicações de página
única (SPAs), como é o caso desta implementação. Em sua essência, essa
biblioteca controla a renderização de diferentes componentes a partir da rota
(URL) que é acessada pelo usuário, seja diretamente ou por meio da navegação
entre as páginas (utilizando links).

## Instalação e utilização

Instruções para instalação e execução da implementação do *frontend* da
aplicação **SimpleLibrary** baseada em Svelte, podem ser encontradas nesse
[link](docs/instalacao.md).

## Arquitetura

Um detalhamento da arquitetura específica utilizada para implementação do
*frontend* baseada em Svelte pode ser encontrado nesse
[link](docs/arquitetura.md).
