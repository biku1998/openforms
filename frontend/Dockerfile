##############################
# For local development
##############################

FROM node:18-alpine As development

# RUN apk add --no-cache libc6-compat

WORKDIR /usr/src/app

COPY --chown=node:node package*.json ./

RUN npm ci


COPY --chown=node:node src ./src
COPY --chown=node:node public ./public
COPY --chown=node:node next.config.js .
COPY --chown=node:node tsconfig.json .
# COPY --chown=node:node . .


##############################
# Build for production
##############################

FROM node:18-alpine As builder

WORKDIR /usr/src/app

COPY --chown=node:node package*.json ./

COPY --chown=node:node --from=development /usr/src/app/node_modules ./node_modules

COPY --chown=node:node src ./src
COPY --chown=node:node public ./public
COPY --chown=node:node next.config.js .
COPY --chown=node:node tsconfig.json .

COPY --chown=node:node . .

RUN npm run build

# RUN npm ci --only=production && npm cache clean --force


##############################
# Run production
##############################

FROM node:18-alpine As runner

WORKDIR /usr/src/app

# Don't run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

COPY --from=builder /usr/src/app/public ./public

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --chown=nextjs:nodejs --from=builder  /usr/src/app/.next/standalone ./
COPY --chown=nextjs:nodejs --from=builder  /usr/src/app/.next/static ./.next/static

ENV NODE_ENV production

CMD ["node","server.js"]