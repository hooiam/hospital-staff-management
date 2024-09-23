# Use an official Node.js image
FROM node:20-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app source code
COPY . .

# Copy the wait-for-it.sh script
# COPY wait-for-it.sh /usr/src/app/

# Make the script executable
# RUN chmod +x wait-for-it.sh

# Expose the port the app runs on
EXPOSE 5000

# Use wait-for-it.sh with a 30-second timeout before starting the app
# CMD ["./wait-for-it.sh", "mysql:3306", "-t", "90", "--", "npm", "start"]
CMD [ "npm", "start" ]