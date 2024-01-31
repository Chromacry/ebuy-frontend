# syntax=docker/dockerfile:1
FROM node:20.11.0 as build
ENV NODE_ENV=development
WORKDIR /projectx-frontend

# COPY package*.json .
COPY . .

RUN npm cache clean --force 
RUN npm verify

RUN npm install
RUN npm run build

COPY . .

# RUN npm install -g nodemon
# RUN npm rebuild bcrypt --build-from-source

FROM nginx:alpine
COPY --from=build /projectx-frontend/dist /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d
# Expose port 80 for HTTP Traffic 
EXPOSE 80
# start the nginx web server
CMD ["nginx", "-g", "daemon off;"]