# Use the official Node.js 16 image as a parent image
FROM node:16

# Set the working directory in the Docker container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./



# Install project dependencies
RUN npm install

# Bundle app source inside Docker image
COPY . .

# Your app listens on port 3000, so you'll expose that port
EXPOSE 3000


# Run tests
RUN npm test


# Define the command to run the app
CMD [ "node", "src/app.js" ]
