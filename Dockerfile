FROM node:23-alpine3.21
RUN npm install --global pnpm
WORKDIR /opt/app

COPY pnpm-workspace.yaml pnpm-lock.yaml package.json ./
RUN pnpm install

COPY . .

RUN pnpm lint
RUN pnpm test --coverage
RUN pnpm build
