# Código compartilhado

Este diretório contém o código fonte das implementações do cliente de rede e dos
modelos (conforme definidos na [arquitetura comum](../docs/arquitetura.md)), bem
como de algumas funções utilitárias que também são compartilhadas entre as
diferentes implementações do *frontend*.

## Utilização

Diferente das demais implementações neste repositório, o código fonte
compartilhado não pode ser executado diretamente e foi desenvolvido para ser
importado como uma biblioteca. Os módulos definidos estão divididos em dois
diretórios: `utils`, que contém o cliente de rede e as funções utilitárias, e
`models`, que contém as classes dos modelos. Todas as funções e classes
exportadas foram implementadas utilizando a linguagem JavaScript e, para a
utilização com a linguagem TypeScript (como é o caso da implementação que
utiliza o [*framework* Angular](../Angular/README.md)), é necessário escrever
[definições de
módulos](https://www.typescriptlang.org/docs/handbook/declaration-files/templates/module-d-ts.html)
compatíveis. A implementação dessas funções não possui nenhuma dependência
externa, utilizando apenas implementações fornecidas nas bibliotecas padrão da
linguagem JavaScript.

### Utilitários e Cliente de Rede

Conforme mencionado anteriormente, o cliente de rede e algumas funções
utilitárias estão definidos em módulos contidos no diretório `utils`. O módulo
auxiliar `exceptions.js` apenas exporta duas classes: `NetworkError` e
`HTTPError`, que consistem em exceções customizadas (i.e. herdam da classe
`Error`), lançadas pelo cliente de rede quando ocorre um erro ao realizar a
requisição e quando o servidor retorna um código de erro, respectivamente.

O módulo `utils`, por sua vez, exporta algumas funções utilitárias utilizadas
pelos modelos e pelas implementações do *frontend*. São elas: a função
`removeEmptyFilters`, que recebe um objeto JavaScript (representando os filtros
a serem aplicados em uma busca) e retorna um objeto contendo apenas as chaves
que não-vazias, isto é, que não são "falsy" (como é o caso de vetores e strings
vazias e dos valores `null` e `undefined`); a função `objectEquals`, que recebe
dois objetos JavaScript e retorna um valor booliano indicando se eles são iguais
ou não; a função `parseDate`, que recebe uma string no formato `"%Y-%m-%d"`
(utilizado por padrão nos formulários HTML) e retorna um objeto da classe
`Date`, representando essa data e a função `toFormDate`, que realiza a
operação contrária, recebendo um objeto da classe `Date` e retornando uma string
no formato utilizado pelos formulários HTML.

Por fim, o módulo `NetworkClient` exporta uma classe de mesmo nome, cujos
métodos correspondem aos *endpoints* disponibilizados pela [API do
backend](https://github.com/PedroPires20/SimpleLibrary-Backend/blob/main/docs/instalacao.md).
Essa classe recebe, em seu construtor, a URL base da API e dois parâmetros
opcionais: `booksPath` e `loansPath`, que representam o caminho para as
operações sobre os livros e empréstimos, respectivamente e são definidos, por
padrão, como `/books` e `/loans`. Os métodos dessa classe são todos assíncronos
(i.e. retornam objetos da classe `Promise`) e utilizam da [API
Fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API), da linguagem
JavaScript para gerar e enviar requisições HTTP para a API. Os parâmetros das
requisições (quando existentes), são passados diretamente aos métodos como
parâmetro e os cabeçalhos e corpo das requisições são construídos, sendo a
requisição, propriamente dita, disparada na sequência.

### Modelos

No diretório `models`, por sua vez, estão definidos os modelos utilizados pelo
*frontend*. É definida a classe abstrata `Model` e as classes concretas `Book` e
`Loan`, que representam os livros e empréstimos, respectivamente. As
implementações dessas classes seguem o diagrama de classes apresentado na
documentação da [arquitetura comum](../docs/arquitetura.md#modelos) às
implementações do *frontend*.
