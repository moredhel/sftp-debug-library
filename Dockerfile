FROM node:12-alpine

RUN apk update --no-cache && apk add make


COPY new/package.json new/
COPY new/package-lock.json new/
COPY old/package.json old/
COPY old/package-lock.json old/
COPY Makefile .

RUN make deps

COPY . .

CMD ["make", "run"]
