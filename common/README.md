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
utilização com a linguagem TypeScript (como é o caso da [implementação que
utiliza o *framework* Angular](../Angular/README.md)), é necessário escrever
[definições de
módulos](https://www.typescriptlang.org/docs/handbook/declaration-files/templates/module-d-ts.html)
compatíveis. A implementação dessas funções não possui nenhuma dependência
externa, utilizando apenas  bibliotecas padrão da linguagem JavaScript.

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
`Date`, representando essa data e a função `toFormDate`, que realiza a operação
contrária, recebendo um objeto da classe `Date` e retornando uma string no
formato utilizado pelos formulários HTML.

Por fim, o módulo `NetworkClient` exporta uma classe de mesmo nome, cujos
métodos correspondem aos *endpoints* disponibilizados pela [API do
backend](https://github.com/PedroPires20/SimpleLibrary-Backend/blob/main/docs/instalacao.md).
Essa classe recebe, em seu construtor, a URL base da API e dois parâmetros
opcionais: `booksPath` e `loansPath`, que representam o caminho para as
operações sobre os livros e empréstimos, respectivamente e são definidos, por
padrão, como `"/books"` e `"/loans"`. Os métodos dessa classe são todos
assíncronos (i.e. retornam objetos da classe `Promise`) e utilizam da [API
Fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API), da linguagem
JavaScript para gerar e enviar requisições HTTP para a API. Os parâmetros das
requisições (quando existentes), são passados diretamente aos métodos como
parâmetro. Os cabeçalhos, parâmetros e corpo das requisições são
definidos/construídos no interior do método, de acordo com o tipo de requisição
a ser feita. A requisição propriamente dita é, então, disparada na sequência e
seu código de status é avaliado, de modo que, em caso de erro, seja disparada
uma exceção do tipo `HTTPError` e, em caso de sucesso, seja retornado o objeto
correspondente o documento JSON recebido (quando aplicável).

### Modelos

No diretório `models`, por sua vez, estão definidos os modelos utilizados pelo
*frontend*. É definida a classe abstrata `Model` e as classes concretas `Book` e
`Loan`, que representam os livros e empréstimos, respectivamente. As
implementações dessas classes seguem o diagrama de classes apresentado na
[documentação da arquitetura comum](../docs/arquitetura.md#modelos) às
implementações do *frontend*. Conforme descrito nessa documentação, as classes
de modelo são uma espécie de "*data class* cujas propriedades correspondem aos
campos que descrevem os livros/empréstimos. Nas classes concretas são
implementados *getters* para cada uma dessas propriedades que é utilizada
diretamente pelas visualizações. Esses *getters* sempre retornam strings e, para
tanto, aplicam qualquer regra de formatação necessária para que estas estejam no
formato esperado para exibição na interface, também lidando com valores nulos e
outras condições de contorno, por exemplo.

Além dos *getters* mencionados anteriormente, também são implementados, nas
classes concretas dos modelos, os métodos abstratos `toRequestBody` e
`toFormData`, além do método estático `fromFormData`. O método `toRequestBody` é
responsável por retornar um objeto JavaScript no formato esperado pelo corpo das
requisições de criação/atualização de livros/empréstimos, contendo as mesmas
chaves descritas no contrato da API e valores no formato adequado, de modo que
possam ser diretamente convertidos para documentos JSON pelo cliente de rede e,
então, processados pela API. Já o método `toFormData` tem uma operação similar,
porém o objeto retornado deve conter valores no formato que é esperado pelas
entradas de formulários HTML, de modo que possam ser associados à propriedade
`value` de um componente de formulário (como um `<input/>`) sem gerar erros. Por
fim, o método estático `fromFormData` realiza a operação inversa do
`toFormData`, recebendo, como parâmetro, um objeto JavaScript associado ao
formulário HTML para criação/edição de livros/empréstimos, com valores no
formato utilizado pelos componentes de entrada deste e retorna uma instância da
classe de modelo, aplicando as conversões necessárias para manter os dados no
formato utilizado pela representação interna.

Por fim, na classe abstrata `Model`, temos a implementação do método
`getFieldsDiff`, compartilhado pelas classes concretas de modelos. Esse método
compara a instância atual da classe com uma outra instância, recebida como
parâmetro, retornado um objeto JavaScript cujas chaves correspondem aos campos
que diferem entre as instâncias e, os valores, aos valores dessas chaves na
instância recebida como parâmetro.
