FROM node:8.9-alpine
# Set the working directory to /dashboard
RUN mkdir /usr/src/app
WORKDIR /usr/src/app

# add `/usr/src/app/node_modules/.bin` to $PATH
ENV PATH /usr/src/node_modules/.bin:$PATH

# install and cache app dependencies

ADD package.json /usr/src/package.json
RUN cd /usr/src/

RUN npm install

# add app
# COPY . ./

# start app
CMD [ "npm", "start" ]
