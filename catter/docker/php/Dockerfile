FROM php:8.2-fpm-alpine AS base

ENV FC_LANG en-US
ENV LC_CTYPE en_US.UTF-8

COPY --from=mlocati/php-extension-installer /usr/bin/install-php-extensions /usr/local/bin/

# Update system, kernel, required dependencies and add bash because sh sucks.
RUN apk update && \
    apk add libxrender libxext gcompat fontconfig libstdc++ libpng-dev libjpeg libjpeg-turbo-dev imagemagick-dev && \
    apk add --no-cache bash linux-headers $PHPIZE_DEPS

# Install PHP Extensions
RUN install-php-extensions mysqli pdo_mysql gd exif intl


FROM base AS dev
# Install dev-specific dependencies
RUN pecl install xdebug && docker-php-ext-enable xdebug
RUN pecl install imagick && docker-php-ext-enable imagick

# Copy Composer for localhost use
RUN install-php-extensions @composer

## Create production (eg. dev-stage) Image
FROM base AS prod

RUN docker-php-ext-install opcache && docker-php-ext-enable opcache
COPY . /home/fakturing