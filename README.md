# [openforms](https://openforms.in)


✨ openforms is a standalone, self-hosted data collection platform

Visit [openforms.in](https://openforms.in) for more info. Check out the [**live demo**](https://demo.openforms.in).

### Tech stack

**Backend**

![typescript-badge](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white) ![postgres-badge](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white) ![redis-badge](https://img.shields.io/badge/redis-%23DD0031.svg?&style=for-the-badge&logo=redis&logoColor=white) ![nestjs-badge](https://img.shields.io/badge/nestjs-E0234E?style=for-the-badge&logo=nestjs&logoColor=white) ![prisma-badge](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white) ![docker-badge](https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white)


**Frontend**

![typescript-badge](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white) ![react-badge](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) ![nextjs-badge](https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![docker-badge](https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white)



> NOTE : the tools will keep evolving as we move forward.

### Production installation workflow

Coming soon...

### Development workflow

- make sure you have `docker` and `node` up and running
- clone the repo
```sh
git clone git@github.com:biku1998/openforms.git
```
- install deps for both frontend and backend
```sh
npm --prefix ./frontend i
npm --prefix ./backend i
```
- copy compose override file
```sh
cp docker-compose.override.yml.example docker-compose.override.yml
```
- copy .env files
```sh
cp .env.example .env
```
- run docker compose
```sh
docker compose up -d

# run below if you face any issues from the above command
docker compose up --build --force-recreate
```

That's it ✨

You can access

- backend server at http://localhost:3001
- frontend running at https://localhost:3000
- postgres running at http://localhost:5432
- redis running at http://localhost:6379
- redis commander(gui to explore redis data) running at http://localhost:8081

You can also check logs by running

```sh
docker-compose logs
```
