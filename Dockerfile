FROM node:22

WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev

COPY . .

EXPOSE 3000
CMD [ "npm", "start" ]