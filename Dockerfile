FROM oven/bun:1.3 AS base
RUN mkdir -p /usr/src/app && chown bun:bun /usr/src/app
USER bun
WORKDIR /usr/src/app

FROM base AS install
RUN mkdir -p /tmp/prod /tmp/dev
# copy package.json, lockfile
COPY package.json bun.lock /tmp/prod/
COPY package.json bun.lock /tmp/dev/
# We will manually run postinstalls later
RUN cd /tmp/dev && bun i
RUN cd /tmp/prod && bun i --production

FROM base AS build
COPY . .
COPY --from=install /tmp/dev/node_modules node_modules
RUN NODE_ENV=production bun run build

FROM base AS release
COPY package.json .
COPY --from=install /tmp/prod/node_modules node_modules
COPY --from=build /usr/src/app/.svelte-kit/generated/build build

EXPOSE 3000/tcp
CMD ["bun", "run", "./build"]