
# Install phase
FROM node:20 AS install
WORKDIR /app
COPY package*.json ./
RUN npm ci

# Build phase
FROM install AS build
WORKDIR /app
COPY . .
RUN npm run build
RUN npm prune --production

# Prod phase
FROM node:20-alpine AS prod
WORKDIR /app
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/prisma ./prisma
COPY package*.json ./
CMD ["npm", "run", "start:prod"]
