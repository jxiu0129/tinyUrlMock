FROM node:alpine

WORKDIR /usr/src/app

COPY ["package.json", "yarn.lock", "./"]

RUN yarn install --frozen-lockfile

COPY . .

# prod
CMD ["yarn", "start"]

# dev
# CMD [ "yarn", "dev" ]