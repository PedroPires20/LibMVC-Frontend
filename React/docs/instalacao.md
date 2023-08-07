# Instalação e Execução

Para instalar e executar o *frontend* do sistema **SimpleLibrary** baseado em
React em sua máquina, basta seguir as instruções abaixo:

1. Instale a versão mais recente do Node.js, que pode ser encontrada nesse [link](https://nodejs.org/en/download).

2. Instale o *backend* do sistema, seguindo as instruções nesse
   [link](https://github.com/PedroPires20/SimpleLibrary-Backend/blob/main/docs/instalacao.md),
   e garanta que este esteja executando corretamente.

3. Clone o repositório do *frontend*:

```console
git clone https://github.com/PedroPires20/SimpleLibrary-Frontend.git
```

4. Acesse o diretório correspondente à implementação em React e instale as
   dependências do projeto, executando, a partir do diretório em que clonou o
   repositório, os seguintes comandos:

```console
cd React
npm install
```

5. Se o seu servidor do *backend* não estiver executando na máquina local (*localhost*)
na porta 3000, modifique a seguinte linha do arquivo `vite.config.js`, informando a URL
nal qual o servidor do *backend* pode ser encontrado:

```javascript
API_BASE_URL: JSON.stringify("URL do servidor do backend")
```

## Execução

Para executar o servidor de desenvolvimento do Vite, basta executar o seguinte comando no
diretório da implementação em React:

```console
npm run dev
```

O servidor de desenvolvimento já estará disponível na porta `5173` e a
a interface do sistema poderá ser acessada pela URL
`http://localhost:5173`.

## Compilação

Se desejar compilar a implementação em React para o formato utilizado na
distribuição como uma página web, basta executar o seguinte comando (também no
diretório da implementação em React):

```console
npm run build
```
