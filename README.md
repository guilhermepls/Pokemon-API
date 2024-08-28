# AP2 - TRABALHO PARCIAL DESENVOLVIMENTO DE SOFTWARE PARA WEB – Node.js

## Objetivo
- Criar um sistema para disponibilização de uma API REST de gerenciamento de
Pokémons e persistência de dados.

## Dependências 
- O projeto depende de uma instância do MongoDB. 

## Variáveis de Ambiente
* `MONGODB_URI`: Variável de ambiente para conexão com o MongoDB. 
  * Sem essa variável o código irá assumir a conexão `mongodb://localhost:27017/pokedex`. 

* `PORT`: Variável de ambiente para a porta da aplicação. 
  * Sem essa variável o código irá assumir a porta `3000`. 


## Configuração e scripts
- Para instalar as depedências: `npm install` 
- Para desenvolvimento: `npm run dev`
- Para produção: `npm start`