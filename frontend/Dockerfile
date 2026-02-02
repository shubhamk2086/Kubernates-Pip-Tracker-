FROM nginx:alpine

# Copy Angular browser build output into nginx html folder
COPY PIP_Tracker/dist/pip-tracker/browser/ /usr/share/nginx/html/


# Copy Nginx config
COPY default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
