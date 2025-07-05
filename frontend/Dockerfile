# Base image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy dependencies
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the files
COPY . .

# Build the app
RUN npm run build

# Install lightweight server
RUN npm install -g serve

# Run the app
CMD ["serve", "-s", "dist", "--listen", "5173"]
