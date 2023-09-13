FROM httpd:2.4.57
COPY . /usr/local/apache2/htdocs/
COPY ./httpd.conf /usr/local/apache2/conf/httpd.conf
CMD ["httpd-foreground"]