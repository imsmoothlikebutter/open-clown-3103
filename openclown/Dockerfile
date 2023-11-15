# Use an official Node.js runtime as the base image
FROM node:20

# Delete cached files
RUN rm -rf /app
RUN mkdir /app

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install Node.js dependencies
RUN npm install

# Copy the rest of the application source code to the container
COPY . .

# Expose port for backend outside
EXPOSE 5173

# Define the command to run your application
CMD ["npm", "run" ,"dev"]