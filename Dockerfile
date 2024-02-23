FROM node:18
WORKDIR /app
COPY package*.json .
RUN npm install --force
COPY . .
RUN npm run build
FROM nginx:1.19-alpine
COPY --from=0 /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
