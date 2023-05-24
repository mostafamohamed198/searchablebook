FROM node:latest

WORKDIR /thesearchable

COPY package.json package-lock.json ./

COPY . .

RUN npm install -g npm@9.6.7

EXPOSE 3000

# CMD ["npm", "run", "dev"]

# FROM node:latest

# WORKDIR /thesearchable

# COPY . .
# # COPY package.json package-lock.json ./
# # RUN npm install 
# # RUN npm install react-scripts@3.4.1 -g 
# RUN npm install -g npm@9.6.7
# # COPY . ./
# EXPOSE 3000
