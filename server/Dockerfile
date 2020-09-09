FROM node:dubnium
RUN rm /bin/sh && ln -s /bin/bash /bin/sh
# update the repository sources list
# and install dependencies

WORKDIR /root/myJobTracker/server
COPY ./ ./

#SERVER - express app
RUN yarn global add forever
RUN yarn install

ENV NODE_ENV development
ENV NODE_PATH .
ENV LOGGING_LEVEL debug

EXPOSE 8808

CMD yarn start
