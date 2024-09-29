﻿# Use the official Node.js image as a base
FROM node:16 AS build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the React app
RUN npm run build

# Debugging step: List contents of the /app directory
RUN ls -al /app
RUN ls -al /app/build || echo "Build directory not found."
RUN ls -al /app/dist || echo "dist directory not found."

# Use Nginx to serve the React app
FROM nginx:alpine

# Copy the build output to Nginx's public folder
COPY --from=build /app/dist /usr/share/nginx/html

# Expose the default Nginx port
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
