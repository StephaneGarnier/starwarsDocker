FROM smebberson/alpine-nginx-nodejs

COPY default.conf /etc/nginx/conf.d/default.conf

WORKDIR /usr/src/webapp
COPY . ./
RUN npm install
RUN git config --global url."https://".insteadOf git://
RUN git config --global http.sslverify "false"
RUN node_modules/bower/bin/bower install --allow-root --config.interactive=false
RUN node_modules/grunt/bin/grunt prod
RUN cp -a build/public/* /usr/html
EXPOSE 80