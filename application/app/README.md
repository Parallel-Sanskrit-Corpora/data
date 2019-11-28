# PartnerPortal

[Try to respect Karma conventions for git commit messages](http://karma-runner.github.io/2.0/dev/git-commit-msg.html)

Before each commit, try to care of indentation and test code
```shell
npm run lint
npm run sass-lint
npm run e2e
```

## Getting Started

Install Node.js and npm if they are not already on your machine.
Verify that you are running at least Node.js version 8.x or greater and npm version 5.x or greater.

Clone this repo into new project folder
```shell
git clone https://github.com/MetaCoaching/PartnerPortal.git PartnerPortal
cd PartnerPortal
```

Install the npm packages described in the package.json
```shell
npm install
```

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.0.8.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

Run `ng serve --open --configuration=local` if you want to use the configuration file `environment.local.ts`.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Using Docker

Ensure you have docker and docker-compose installed [Installation](https://docs.docker.com/engine/installation/)

Initialization of docker-compose environment after a fresh git clone
```
docker/prepare.sh
```

Install/update third-party dependencies using [npm-install](https://docs.npmjs.com/cli/install)
```
docker-compose run --rm partnerportal npm install
```
