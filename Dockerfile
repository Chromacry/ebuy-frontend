# syntax=docker/dockerfile:1
FROM node:20.11.0 as build

ARG VITE_BACKEND_BASE_URL
ARG PM2_PUBLIC_KEY
ARG PM2_SECRET_KEY

ENV NODE_ENV=development
ENV VITE_BACKEND_BASE_URL=$VITE_BACKEND_BASE_URL
WORKDIR /projectx-frontend

RUN echo ${VITE_BACKEND_BASE_URL}
# COPY package*.json .
COPY . .

RUN npm install
RUN npm run build

RUN npm install pm2 -g
ENV PM2_PUBLIC_KEY ${PM2_PUBLIC_KEY}
ENV PM2_SECRET_KEY ${PM2_SECRET_KEY}

EXPOSE 3000

CMD ["pm2-runtime", "ecosystem.config.js"]