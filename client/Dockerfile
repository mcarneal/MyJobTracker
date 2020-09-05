FROM node:dubnium
RUN rm /bin/sh && ln -s /bin/bash /bin/sh
# update the repository sources list
# and install dependencies

WORKDIR /root/myJobTracker/client
COPY ./ ./

RUN yarn global add forever
RUN yarn global add serve

RUN yarn install && yarn build

EXPOSE 5000
EXPOSE 3000

CMD serve -n -s build
