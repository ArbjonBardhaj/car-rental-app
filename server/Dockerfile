# Use a Node.js image as the base
FROM node:16-alpine

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 8800

CMD ["node", "app.js"]  
# 054020 kodi i kasafortes