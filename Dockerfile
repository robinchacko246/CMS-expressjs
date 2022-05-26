FROM node:9-slim
WORKDIR /app
COPY package.josn /app
RUN npm install
COPY ./app
CMD ["nodemon"]