FROM node:18-alpine
RUN npm install -g nodemon
WORKDIR /app
COPY package.json .
COPY . .
RUN npm install
EXPOSE 5005
RUN chmod +x startup.sh
CMD [ "./startup.sh" ]