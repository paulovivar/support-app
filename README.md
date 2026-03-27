<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">Un marco de trabajo progresivo para <a href="http://nodejs.org" target="_blank">Node.js</a> para construir aplicaciones del lado del servidor eficientes y escalables.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Descripción

Repositorio de inicio de TypeScript para el framework [Nest](https://github.com/nestjs/nest).
Backend de una aplicación de soporte y posts para clientes.

## Configuración del proyecto

```bash
$ npm install
```

## Compila y ejecuta el proyecto

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# build
$ npm run build

# pending migrations
$ npm run typeorm migration:run

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Ejecutar pruebas

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Migraciones de base de datos con TypeORM

```bash
# Genera la migración automáticamente
npm run migrations:generate ./src/database/migrations/init

# Crea una migración de forma manual
npm run migrations:create

# Muestra las migraciones generadas y si estan ejecutadas o no
npm run migrations:show

# Ejecuta una migración existemnte para una DB
npm run migrations:run
```

## Despliegue

Para implementar la aplicación NestJS en producción, hay algunos pasos clave que puedes seguir para garantizar su máxima eficiencia. Consultar la [documentación de implementación](https://docs.nestjs.com/deployment) para obtener más información.

Si buscas una plataforma en la nube para implementar tu aplicación NestJS, consulta [Mau](https://mau.nestjs.com), la plataforma oficial para implementar aplicaciones NestJS en AWS. Mau simplifica y agiliza la implementación, requiriendo solo unos pocos pasos:

```bash
$ npm install -g @nestjs/mau
$ mau deploy
```

Con Mau, se puede implementar la aplicación en tan solo unos clics, lo que permite centrarte en desarrollar funcionalidades en lugar de gestionar la infraestructura.

## Recursos

Recursos útiles al trabajar con NestJS:

- Visita la [Documentación de NestJS](https://docs.nestjs.com) para obtener más información sobre el framework.

- Si tienes preguntas o necesitas ayuda, visita el [canal de Discord](https://discord.gg/G7Qnnhy).

- Para profundizar y obtener más experiencia práctica, consulta nuestros [cursos](https://courses.nestjs.com/) en vídeo.

- Implementa tu aplicación en AWS con [NestJS Mau](https://mau.nestjs.com) en tan solo unos clics.

- Visualiza el gráfico de la aplicación e interactúa con NestJS en tiempo real con [NestJS Devtools](https://devtools.nestjs.com).

Para estar al día y recibir actualizaciones, sígue en [X](https://x.com/nestframework) y [LinkedIn](https://linkedin.com/company/nestjs).

¿Buscas trabajo o quieres ofrecer un puesto? Consulta [Bolsa de Empleos](https://jobs.nestjs.com).

## Soporte

Nest es un proyecto de código abierto con licencia MIT. Su crecimiento es posible gracias a los patrocinadores y al apoyo de sus increíbles colaboradores. Si deseas unirte a ellos, [lee más aquí](https://docs.nestjs.com/support).

## Mantente en contacto

- Autor - [Paulo Vivar](www.linkedin.com/in/paulovivar)
- Website - [https://paulo-vivar.vercel.app](https://paulo-vivar.vercel.app)
- Twitter - [@paulovivar](https://twitter.com/paulovivar)

## Licencia

Nest es [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
