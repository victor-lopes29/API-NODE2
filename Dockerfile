# Use uma imagem base do Node.js
FROM node:16-alpine

# Defina o diretório de trabalho no container
WORKDIR /app

# Copie os arquivos package.json e package-lock.json para o container
COPY package*.json ./

# Instale as dependências
RUN npm install

# Copie o restante do código do projeto para o container
COPY . .

# Exponha a porta que a aplicação irá utilizar
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["node", "app.js"]
