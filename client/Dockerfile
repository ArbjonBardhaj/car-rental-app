
# Use an official node image as the base image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json files to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the project files to the container
COPY . .

# Expose the port on which the Vite app will run (default is 5173)
EXPOSE 5173

# Start the Vite app
CMD ["npm", "run", "dev"]
