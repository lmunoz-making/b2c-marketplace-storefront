# Stage 1: Build the application
FROM node:lts-alpine AS builder

# Establece el directorio de trabajo
WORKDIR /app

# Copia archivos de dependencias para mejorar el cacheo
COPY package*.json yarn.lock ./

# Instala dependencias - quitamos el registro personalizado a menos que sea realmente necesario
RUN yarn config set registry http://host.docker.internal:4873
RUN yarn install --frozen-lockfile

# Copia el resto del código fuente
COPY . .

# Construye la aplicación con manejo específico para Next.js 15
RUN yarn build

# Stage 2: Run the application
FROM node:lts-alpine AS runner

# Establece el directorio de trabajo
WORKDIR /app

# Crear usuario no privilegiado para mayor seguridad
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copia los archivos necesarios y establece los permisos correctos
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/package.json ./package.json
COPY --from=builder --chown=nextjs:nodejs /app/yarn.lock ./yarn.lock
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder --chown=nextjs:nodejs /app/next.config.ts ./

# Instala solo las dependencias de producción
RUN yarn config set registry http://host.docker.internal:4873
RUN yarn install --frozen-lockfile --production

# Cambia al usuario no privilegiado
USER nextjs

# Expone el puerto y establece el entorno
EXPOSE 3000
ENV NODE_ENV=production
ENV PORT=3000

# Comando para iniciar la aplicación
CMD ["yarn", "start"]
