FROM node:18-alpine
WORKDIR /app
COPY package.json .
# RUN npm install --registry=https://registry.npm.taobao.org

ARG NODE_ENV
RUN if [ "$NODE_ENV" = "development" ]; then \
      echo "dev" && echo "$NODE_ENV" && npm install --registry=https://registry.npm.taobao.org; \
    else \
      echo "prod" && echo "$NODE_ENV" && npm install --omit=dev --registry=https://registry.npm.taobao.org; \
    fi
COPY . ./4
ENV PORT=3000
EXPOSE ${PORT}
CMD ["node", "index.js"]
