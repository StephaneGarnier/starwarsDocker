FROM smebberson/alpine-nginx-nodejs

COPY default.conf /etc/nginx/conf.d/default.conf

WORKDIR /usr/src/webapp
COPY . ./
RUN npm install
RUN cp -a public/* /usr/html
EXPOSE 80