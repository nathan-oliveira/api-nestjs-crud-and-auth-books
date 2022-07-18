## Docker
docker pull mysql
docker-compose -f "docker-compose.yml" up -d --build
docker-compose -f "docker-compose.yml" down

docker container ls -a --filter status=exited --filter status=created
docker stop f16c33c8feb6
docker rm f16c33c8feb6

## Dependências
npm i --save class-transformer class-validator typeorm mysql
npm i --save @nestjs/config 
npm i --save @nestjs/typeorm @nestjs/mapped-types --legacy-peer-deps
npm i --save @nestjs/swagger swagger-ui-express --legacy-peer-deps
npm i bcrypt
npm i -D @types/bcrypt

npm install --save @nestjs/passport passport passport-local
npm install --save-dev @types/passport-local

npm install --save @nestjs/jwt passport-jwt
npm install --save-dev @types/passport-jwt

## Package.json (scripts)
"typeorm": "ts-node -r tsconfig-paths/register ./node_modules/typeorm/cli.js"

yarn typeorm migration:create -n CreateUsers
yarn typeorm migration:run