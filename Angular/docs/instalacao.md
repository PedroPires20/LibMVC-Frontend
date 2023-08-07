# Instalação e Execução

Para instalar e executar o *frontend* do sistema **SimpleLibrary** baseado em
Angular em sua máquina, basta seguir as instruções abaixo:

1. Instale a versão mais recente do Node.js, que pode ser encontrada nesse [link](https://nodejs.org/en/download).

2. Instale o *backend* do sistema, seguindo as instruções nesse
   [link](https://github.com/PedroPires20/SimpleLibrary-Backend/blob/main/docs/instalacao.md),
   e garanta que este esteja executando corretamente.

3. Clone o repositório do *frontend*:

```console
git clone https://github.com/PedroPires20/SimpleLibrary-Frontend.git
```

4. Acesse o diretório correspondente à implementação em Angular e instale as
   dependências do projeto, executando, a partir do diretório em que clonou o
   repositório, os seguintes comandos:

```console
cd Angular
npm install
```

5. Defina URL em que o servidor do *backend* pode ser encontrado, criando o arquivo
`environment.ts` no diretório `src/environments` e preenchendo-o com o seguinte código:

```TypeScript
export const environment = {
    API_BASE_URL: "URL do servidor do backend"
};
```

Substituindo a string `"URL do servidor do backend"` pela URL na qual o servidor do
*backend* está respondendo.

## Execução

Para executar o servidor de desenvolvimento do Angular, basta executar o seguinte comando no
diretório da implementação em Angular:

```console
npm start
```

O servidor de desenvolvimento já estará disponível na porta `4200` e a
a interface do sistema poderá ser acessada pela URL
`http://localhost:4200/collection`.

## Compilação

Se desejar compilar a implementação em Angular para o formato utilizado na
distribuição como uma página web, basta executar o seguinte comando (também no
diretório da implementação em Angular):

```console
npm run build
```
