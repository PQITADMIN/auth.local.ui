# Stage 1 
FROM node:18.3.0-alpine3.15 as build-step
# create a working directory 
RUN mkdir /app
# set app folder as a working directory
WORKDIR /app
# copy package file to workdirectory
COPY package.json /app
# Installaing npm 
RUN npm install --force
RUN npm install --save-dev javascript-obfuscator
# copy all dependency and package module to workdirectory
COPY . /app

ARG REACT_APP_AUTH_VALUESTORY_API_BASE_URL
ENV REACT_APP_AUTH_VALUESTORY_API_BASE_URL $REACT_APP_AUTH_VALUESTORY_API_BASE_URL

# build your node project
RUN npm run build

RUN ./node_modules/javascript-obfuscator/bin/javascript-obfuscator build --output build --compact true --debug-protection true --debug-protection-interval 3000  --disable-console-output true --numbers-to-expressions true --self-defending true --split-strings true  --split-strings-chunk-length 15  --transform-object-keys true --string-array true --string-array-calls-transform true --string-array-calls-transform-threshold 0.9 

# Stage 2
# Install Nginx
FROM nginx:1.17.1-alpine
# Copy the build content to Nginx server
COPY --from=build-step /app/build /usr/share/nginx/html
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
# Expose the port for access
EXPOSE 80
# Run the Nginx server
CMD ["nginx", "-g", "daemon off;"]