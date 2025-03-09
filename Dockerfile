FROM node:22-alpine AS builder

WORKDIR /app
RUN npm install -g pnpm

COPY package.json .
COPY pnpm-lock.yaml .
RUN pnpm install --frozen-lockfile
COPY . .
RUN pnpm run build

FROM nginx:1.27

COPY --from=builder /app/dist /usr/share/nginx/html
