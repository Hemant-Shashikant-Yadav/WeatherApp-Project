FROM node:18-alpine AS build
 
# # Set the working directory inside the container
# WORKDIR /app
 
# # Copy package.json and package-lock.json
# COPY package*.json ./
 
# # Install dependencies
# RUN npm install
 
# # Copy the rest of your application files
# COPY . .

# COPY Varibles .env
 
# # Expose the port your app runs on
# EXPOSE 3000
 
# # Define the command to run your app
# CMD ["npm", "start"]
#############################################################################

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
COPY Varibles .env
RUN npm run build
 
# Production Stage
FROM nginx:stable-alpine AS production
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
