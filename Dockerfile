# syntax=docker/dockerfile:1
FROM node:20.11.0 as build

ARG VITE_BACKEND_BASE_URL

ENV NODE_ENV=development
ENV VITE_BACKEND_BASE_URL=$VITE_BACKEND_BASE_URL
WORKDIR /projectx-frontend

# COPY package*.json .
COPY . .

RUN npm install
RUN npm run build

COPY ./dist .

FROM nginx:alpine
COPY --from=build /projectx-frontend/dist /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d
# Expose port 80 for HTTP Traffic 
EXPOSE 80
# start the nginx web server
CMD ["nginx", "-g", "daemon off;"]