# Wybór obrazu bazowego
FROM node:18-alpine

# Ustaw katalog roboczy
WORKDIR /app

# Kopiowanie plików
COPY package*.json ./

# Instalacja zależności
RUN npm install

# Kopiowanie plików aplikacji
COPY . .

# Eksponowanie portów HTTP i HTTPS
EXPOSE 3001
EXPOSE 3002

# Komenda startowa
CMD ["npm", "start"]

# Budowanie obrazu
# docker build . -t app-web-api:v1