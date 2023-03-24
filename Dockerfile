FROM node:18-alpine3.16

RUN mkdir /root/vacation-back

WORKDIR /root/vacation-back

COPY . /root/vacation-back

RUN npm install

RUN npm i ts-node
# RUN {build command}

CMD npm run start