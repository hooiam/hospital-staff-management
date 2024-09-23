# Use an official Node.js image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app source code
COPY . .

# Build the React app for production
RUN npm run build

# Install serve to serve the static build files
RUN npm install -g serve

# Expose the port serve will run on
EXPOSE 3000

# Serve the React app
CMD ["serve", "-s", "dist"]
