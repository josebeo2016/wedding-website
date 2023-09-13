FROM httpd:2.4.57
COPY . /usr/local/apache2/htdocs/

CMD ["httpd-foreground"]