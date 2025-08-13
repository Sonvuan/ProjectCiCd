# Stage 1: Build Angular app
# FROM node:20.19.0 AS build

# WORKDIR /app
# COPY package*.json ./
# RUN npm install -g @angular/cli
# RUN npm install
# COPY . .
# RUN ng build --configuration production

# # Stage 2: Serve with Nginx
# FROM nginx:alpine
# COPY --from=build /app/dist/tim-kiem-dong1 /usr/share/nginx/html
# COPY nginx.conf /etc/nginx/conf.d/default.conf
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]


FROM node:alpine

WORKDIR /app
COPY . /app/
RUN npm install -g @angular/cli
RUN npm install
CMD [ "ng", "serve", "--host", "0.0.0.0"]