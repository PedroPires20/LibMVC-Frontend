# Arquitetura (React)

A implementação do *frontend* feita em React, baseia-se ainda mais fortemente
nas ideias propostas por Juntao QIU no artigo [Modularizing React Applications
with Established UI
Patterns](https://martinfowler.com/articles/modularizing-react-apps.html) — que
também serve de base para a arquitetura "geral" do *frontend* (isto é, a parte
que independe do *framework*) —, uma vez que o foco desse artigo é justamente em
aplicações Web que utilizam o React como tecnologia para implementação de
interfaces do usuário. Partindo das camadas já estabelecidas na [arquitetura
comum](../../docs/arquitetura.md) do *frontend*, foram implementadas, utilizando
os recursos fornecidos pelo React, as camadas correspondentes à lógica da
interface e às visualizações (*views*).

## Visão geral

O diagrama a seguir apresenta uma visão geral da arquitetura da implementação em
React, incluindo os componentes suas camadas (denotadas pelas cores) e as
relações de dependência (representadas por setas):

![Diagrama arquitetura (implementação em React)](Diagrama_arquitetura.png)

A camada lógica (representada em roxo) é composta por [*custom
hooks*](https://react.dev/learn/reusing-logic-with-custom-hooks), um padrão de
programação do React que permite isolar a lógica do restante da implementação
dos componentes bem como compartilhar uma mesma lógica entre vários componentes.
Conforme definido anteriormente, essa camada tem os objetivos de realizar a
conexão entre as camadas "genéricas" (nominalmente, os modelos e o cliente de
rede) e as camadas específicas para um *framework* (nesse caso, o React), além
de implementar a lógica "mais geral" da interface — envolvendo aspectos como o
carregamento de dados, tratamento de eventos de "mais alto nível" (como a
submissão de um formulário) e gerenciamento do estado global do *frontend*.

A camada das visualizações (representada em verde), por sua vez, é composta por
uma coleção de componentes do React que implementam diferentes partes da
interface que vão desde elementos mais simples (como botões, caixas de diálogo,
componentes de entrada para formulários, etc.) até a porções mais "complexas" da
interface, (como a tabela principal para a exibição dos dados, o conjunto de
entradas para navegação pelo acervo/empréstimos, formulários, etc.). Os
componentes do React são funções que retornam uma descrição (*markup*) da
interface que será apresentada, que, ao final, gerará o código HTML renderizado
pelo navegador Web. Essa "biblioteca" de componentes customizados é, então,
utilizada para compor as páginas principais da interface da aplicação (isto é, a
página para gerenciamento do acervo e a página para gerenciamento dos
empréstimos), que também são componentes React.

As camadas mencionadas anteriormente bem como algumas especificidades da
implementação do *frontend* baseada na biblioteca React serão exploradas com
detalhes nas seções seguintes.

## Camada lógica

Seguindo os padrões propostos no artigo de Juntao QIU, a camada lógica
implementada é composta de *custom hooks* que atuam como a fonte de dados do
*frontend* e como uma especie de *gateway* para as operações definidas pela
aplicação. Um *custom hook* foi implementado para cada entidade da aplicação, ou
seja, temos um *custom hook* associado aos livros (`useBooks`) e outro aos
empréstimos (`useLoans`). Além desses, também foram desenvolvidos *custom hooks*
para lidar com o carregamento dos dados de alguns campos que compõem os
livros/empréstimos. Mais especificamente, foram implementados os *hooks*
`useBookFields` e `useLoanFields`, responsáveis por carregar e gerenciar os
dados de todos os valores únicos de alguns campos selecionados dos
livros/empréstimos, como os títulos de todos os livros no acervo ou o nome de
todos os leitores com empréstimos cadastrados no sistema. Esses dados são
utilizados em alguns pontos específicos da interface, como os seletores dos
filtros e os formulários de criação de empréstimos (que lista os livros
disponíveis) e de livros (que lista as categorias de livros já cadastradas).

Os *custom hooks* `useBooks` e `useLoans` possuem um estado interno — que se
traduz em uma chamada ao *hook* `useState`, disponibilizado pelo React para esse
fim —, responsável por manter os filtros atualmente aplicados pelo usuário aos
dados e, no caso do `useBooks`, a chave de busca (*query*) inserida pelo
usuário, se aplicável. Esses *hooks* retornam funções que permitem a seus
consumidores atualizar o estado dos filtros/*query* aplicados aos dados e
possuem um efeito colateral — implementado utilizando uma chamada do *hook*
`useEffect`, do React —, que é configurado para realizar uma chamada ao método
do cliente de rede responsável pelo carregamento dos dados dos
livros/empréstimos (mais especificamente, os métodos `fetchBooks`, para os
livros, e `fetchLoans`, para os empréstimos) sempre que hover uma mudança
nesse(s) estado(s). Antes de atualizar o estado dos filtros/query, o método
disponibilizado aos consumidores do *hook* verifica se realmente hove uma
alteração nos filtros/*query* aplicado(s), de modo que uma chamada para a API só
será feita se realmente for necessário (i.e., se os dados correspondentes à
consulta/filtros atuais já não estão em memória), o que dá mais flexibilidade ao
chamador, que pode utilizar essa função sem se preocupar com a possibilidade de
chamadas desnecessárias à API. Ao carregar os livros/empréstimos, esses *hooks*
atualizam um outro estado interno, que reporta o status de carregamento dos
dados (que varia entre "em progresso", "finalizado" ou "erro"). Após receber uma
resposta de sucesso da API, além de armazenar as instâncias dos modelos
correspondentes aos dados retornados, que são criadas pelo *hook* a partir do
objeto retornado pelo cliente de rede, o estado de carregamento dos dados é
atualizado, indicando que os dados foram carregados com sucesso. Em caso de
erro, além de definir o status no estado de carregamento como "erro", os
detalhes obtidos partir da exceção levantada pelo cliente de rede também são
armazenados nessa variável de estado. Os valores desse estado também são
retornados ao chamador do *hook*, permitindo que o usuário tenha um *feedback*
visual do processo de realização das chamadas à API. A rotina de carregamento
também é ativada, por padrão, sempre que o *hook* é chamado pela primeira vez,
de modo que os dados de todos os livros/empréstimos são sempre carregados na
primeira chamada ao *hook*, uma vez que os filtros/*query* padrão são ambos
definidos como nulos inicialmente.

Além disso, esses *custom hooks* também implementam e retornam funções para
tratar as operações de criação, edição e remoção de livros/empréstimos,
completando, assim, as quatro operações básicas no desenvolvimento de uma
aplicação (o chamado CRUD, do inglês *Create Read Update Delete*). Para a
criação de livros e empréstimos são retornadas as funções `createBook` e
`createLoan`, respectivamente. Essas funções recebem, como parâmetro, um objeto
contendo os valores das entradas do formulário de criação de livros/empréstimos.
Os campos desse objeto são definidos a partir dos nomes dos componentes de
entrada do formulário (a propriedade `name`, no caso dos componentes `<input/>`
padrão do HTML) e, os valores, correspondem ao valor entrado pelo usuário em
cada um destes (isto é, à propriedade `value`, no caso dos elementos padrão
HTML). Os componentes de formulário customizados que foram implementados (como o
`<Select/>`, que representa um elemento de seleção de opções em uma lista),
também possuem as propriedades `name` e `value`, comportando-se de forma análoga
aos elementos padrão. Sendo assim, no componente que representa o formulário,
todos os elementos de entrada têm o evento de modificação de valor (`onChange`)
tratado por um mesmo *handler*, que modifica a chave associada ao nome do
componente, atribuindo a ela o valor atual. Esses objetos são, então, passados,
como parâmetro, para as funções de criação de livros/empréstimos, que os
convertem para uma representação interna, isto é, uma instância da classe de
modelo e, na sequência, para um objeto que gerará o corpo da requisição HTTP
para a criação da nova entidade. Após essa conversão, é disparada uma requisição
para o *endpoint* associado à operação de criação de novo livro/empréstimo.
Essas funções retornam um objeto com os campos `error` e `errorMessage`, em que
`error` é um booliano que indica se ocorreu algum erro na requisição e
`errorMessage` é uma string contendo a mensagem de erro associada à exceção
encontrada (e só é preenchido caso algum erro ocorra).

As funções para a atualização de livros/empréstimos — `updateBook` e
`updateLoan`, respectivamente —, funcionam de forma análoga às funções de
criação de novos livros/empréstimos discutidas anteriormente, com o diferencial
de que essas funções também recebem, como parâmetro, um inteiro identificando o
índice do livro/empréstimo a ser atualizado no vetor de itens atualmente
selecionados, que é armazenado no estado do *custom hook*. Esse índice é
determinando no momento em que o usuário abre o menu de contexto com as opções
de atualizar e deletar um livro/empréstimo, clicando em uma das linhas da tabela
exibida na interface. Esse evento de "clique" na linha possui um *handler* que
grava o índice da linha clicada em uma variável de estado do componente da
página e permite, assim, que esse seja passado como parâmetro para as funções de
atualização e remoção de livros/empréstimos. A partir do índice recebido como
parâmetro, essas funções são capazes de determinar o identificador único (ID) da
entidade-alvo da atualização, acessando o vetor armazenado na variável de estado
que contém os itens atualmente selecionados. Esse ID é, então, fornecido como
parâmetro para a função do cliente de rede, que dispara a requisição da API
responsável pela operação de atualização. Além disso, outro diferencial dessas
funções é o tratamento dado ao objeto contendo os dados do formulário. Após a
conversão desse objeto para a representação interna (i.e. instância da classe do
modelo), é feita uma chamada para o método abstrato `getFieldsDiff`, definido na
classe `Model`, que, dado outra instância da classe, retorna um objeto contendo
apenas os campos que se diferem entre essas duas instâncias e seu valor na
instância recebida como parâmetro. Esse método é chamado a partir da instância
armazenada no vetor de itens selecionados e seu resultado — que já está em
formato apropriado para uso nas requisições da API — é fornecido como um segundo
parâmetro ao método do cliente de rede que realiza a chamada da API. Após
receber uma resposta de sucesso, o livro/empréstimo do índice recebido é
substituído pela instância atualizada, gerada a partir dos dados do formulário.
Essas funções também retornam um objeto com os mesmos campos das funções de
criação de livros/empréstimos para indicar se ocorreu algum erro.

Por fim, as funções para a remoção de livros/empréstimos — `deleteBook` e
`deleteLoan`, respectivamente —, são bastante similares às funções de
atualização, porém, como não é necessário preencher nenhum formulário para
realizar essa operação, apenas o índice do livro/empréstimo a ser apagado no
vetor de itens selecionados é recebido como parâmetro. A partir do índice, o ID
do livro/empréstimo é obtido da mesma forma que nas funções de atualização e,
então, passado como parâmetro para o método do cliente de rede responsável por
disparar as requisições para apagamento de livros/empréstimos. Após receber uma
resposta de sucesso da API, o livro/empréstimo do índice recebido é apagado do
vetor de itens selecionados. Essa função também retorna um objeto para indicar a
ocorrência de erros, que segue o mesmo formato utilizado pelas funções
discutidas anteriormente.

Por fim, os *custom hooks* `useBookFields`e `useLoanFields` operam de forma
análoga aos *hooks* `useBooks`e `useLoans`, detalhados anteriormente, no que diz
respeito ao processo de carregamento dos dados e ao estado interno, que mantém,
para cada campo considerado, seus valores retornados pela API. A principal
diferença nesse processo está na forma como o carregamento dos dados (*fetch*) é
acionado. Para esses *hooks*, o processo é feito uma única vez, apenas no
momento em que o *hook* é chamado, não havendo, portanto, nenhuma dependência
externa. Porém, para casos em que é necessário obter novamente os valores via
API após o carregamento desses dados — como quando um novo livro/empréstimo é
criado ou atualizado —, é retornada uma função (`refreshBookFields`, para os
livros e `refreshLoanFields`, para os empréstimos), que permite atualizar esse
valores por meio de uma nova chamada à API. Outra diferença, está na ausência
das demais operações do CRUD, que não são necessárias nesse caso, uma vez que o
objetivo é apenas obter e manter todos os valores de um determinado campo. A
única exceção é o *hook* `useBookFields`, que suporta a adição de novas
categorias por meio da função `appendCategory`, que é retornada e permite
realizar alteração, porém apenas no estado interno do *hook*, ficando a cargo de
outra operação (nesse caso, a criação de um novo livro), persistir as
modificações no sistema.

Esses *hooks* mantêm uma variável de estado separada para cada campo que
armazenam/retornam e nem toda propriedade da entidade em questão
(livro/empréstimo) é considerada, sendo mantidas apenas aquelas cuja listagem
dos valores é utilizada diretamente pelo *frontend* da aplicação. No caso do
*hook* `useBookFields` são mantidos os valores dos campos: autores, categorias,
editoras e formatos, utilizados pelos seletores dos filtros e pelo formulário de
criação de novos livros. Já o *hook* `useLoanFields` mantém apenas as
informações relativas aos leitores e aos títulos dos livros emprestados, que são
as utilizadas diretamente pelos filtros nesse caso.

## Camada de visualizações

Os componentes implementados buscam ter o mínimo de lógica o possível, se
comportando, na maioria dos casos, como meros templates para geração de HTML a
partir de seus parâmetros, seguindo o princípio do isolamento da lógica do
restante da implementação, defendido por Juntao QIU em seu artigo. Boa parte da
lógica da interface da aplicação está concentrada nos *custom hooks* explorados
anteriormente, de modo que vários dos componentes implementados não possuem
estado próprio, sendo controlados por seus componentes-pai, por meio de
parâmetros, ou servindo meramente como uma forma de modularizar a construção da
interface, dividindo o *markup* e os estilos (CSS) em "partes menores". Para os
componentes que possuem alguma forma de gerenciamento de estado e/ou efeito
colateral interno, essas funcionalidades se limitam ao gerenciamento de aspectos
exclusivos do componentes (como abrir ou fechar a lista de opções no seletor,
por exemplo) e não estão diretamente relacionados ao fluxo de dados da
aplicação. Nesses casos, "misturar" a lógica com o código das views no
componente não representa um problema e é, na verdade, até benéfico, dado que o
código/estado relativo à lógica do componente encontra-se encapsulado e
associado ao restante do código do componente, facilitando a manutenção.

Quanto ao fluxo de dados propriamente dito, o React impõe o sistema de *one-way
data binding*, isto é, os dados fluem em apenas uma direção, dos componentes
mais altos na hierarquia para os componentes mais baixos. Além disso, não há
nenhum mecanismo para a injeção de dependências, como ocorre no *framework*
Angular. Tendo isso em mente, as chamadas para os *custom hooks*, que contêm o
estado global da aplicação, são feitas em componentes de mais alto nível (no
caso, as páginas) e os dados são passados ao longo da hierarquia por meio de
parâmetros (*props*) até chegaram ao componente no qual serão utilizados. Para
evitar que os dados fiquem sendo repassados de componente a componente até
chegar a elementos mais "profundos" na hierarquia, o React disponibiliza uma API
de contextos, que facilita o acesso a dados em qualquer ponto da hierarquia da
aplicação. Esse recurso, porém, não foi utilizado nesta implementação, visto que
sua hierarquia de componentes não é tão "profunda" e os dados do *hook* não
precisaram ser repassados entre vários componentes. Os componentes `BookDialog`
e `LoanDialog` representam as únicas exceções em que componentes em um nível
inferior da hierarquia acessam os *custom hooks* diretamente (isto é, sem
utilizar *props*). Esses componentes implementam os diálogos para criação/edição
de livros e empréstimos, respectivamente, e contêm os formulários que realizam
essas operações. O componente `BookDialog` precisa acessar uma lista contendo as
categorias de livros atualmente registradas no sistema e, portanto, realiza uma
chamada ao *hook* `useBookFields`. Já o componente `LoanDialog` precisa de
acesso aos títulos/IDs dos livros disponíveis no acervo e, para isso, realiza
uma chamada ao *hook* `useBooks`, para que essas informações sejam extraídas das
instâncias do modelo (obtidas utilizando uma filtragem vazia, de modo a retornar
todos os livros no acervo).
