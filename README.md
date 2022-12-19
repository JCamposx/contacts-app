# Contacts App

Full Stack application developed using Laravel for backend and React for
frontend.

## Table of Contents

* [Setup](#setup)
  * [Development setup](#development-setup)
    * [Local setup](#local-setup)
      * [Backend locally](#backend-locally)
      * [Frontend locally](#frontend-locally)
      * [Running app locally](#running-app-locally)
    * [Docker setup](#docker-setup)
      * [Backend env variables with docker](#backend-env-variables-with-docker)
      * [Frontend env variables with docker](#frontend-env-variables-with-docker)
      * [Running app with docker](#running-app-with-docker)

## Setup

### Development setup

First of all, you have to clone the repo and move into it.

```bash
git clone https://github.com/JCamposx/laravel-react-contacts-app
cd laravel-react-contacts-app
```

#### Local setup

In order to run the app locally, there are some requirements you must have
installed.

* [PHP](https://www.php.net/manual/en/install.php)
* [Composer](https://getcomposer.org/download/)
* [Nodejs and npm](https://nodejs.org/en/)
* [MySQL](https://dev.mysql.com/doc/refman/8.0/en/installing.html)

All of this depends on the operating system you are using. Also, check [Laravel
installation guide](https://laravel.com/docs/9.x/installation) if you have any
errors.

Once you are sure that you meet all the requirements, you can start configuring
the backend.

##### Backend locally

First, move into backend directory.

```bash
cd backend
```

You have to create an **.env** file. To do this, copy the **.env.example** file
and rename it.

```bash
cp .env.example .env
```

After that, go into the **.env** file and modify DB variables according to what
you have on your MySQL server. For example, if you have the server locally, the
database name is ***contacts_app*** and the credentials are ***admin*** for the
username and ***password1234*** for the password, you would modify the variables
as follows.

```bash
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=contacts_app
DB_USERNAME=admin
DB_PASSWORD=password1234
```

Now, install all dependencies.

```bash
npm install
composer install
```

Then, run the next commands to have the laravel project ready.

```bash
php artisan key:generate
php artisan migrate
php artisan passport:install
```

Finally, run the server.

```bash
php artisan serve
```

You will see that the server will be running in `localhost` on port `8000`.

##### Frontend locally

First, open a new terminal and move into frontend directory.

```bash
cd frontend
```

Next, you have to once again create an **.env** file. Same as backend, copy the
**.env.example** file and rename it.

```bash
cp .env.example .env
```

After this, modify the env variable to be able to connect with the backend API.
If you followed the backend instructions step by step, put the following.

```bash
VITE_API_URL=http://localhost:8000/api
```

Note that the url ends with **api without /**.

First of all, you have to install [yarn](https://www.npmjs.com/package/yarn)
globally.

```bash
npm install -g yarn
```

Then, install all dependencies using yarn.

```bash
yarn install
```

Finally, run the server.

```bash
yarn dev
```

You will see that the server will be running in `localhost` on port `5173`.

##### Running app locally

Having followed all steps, just go to
[http://localhost:5173](http://localhost:5173) and start using the app.

#### Docker setup

Be sure you have installed docker and docker compose. You can check it running
the following commands.

```bash
docker -v
docker-compose -v
```

Both commands should return the corresponding versions without any error.

Now, you have to manage the environment variables.

##### Backend env variables with docker

First, move into backend directory.

```bash
cd backend
```

You have to create an **.env** file. To do this, copy the **.env.example** file
and rename it.

```bash
cp .env.example .env
```

After that, go should modify the DB variables in the **.env** file as follows.

```bash
DB_CONNECTION=mysql
DB_HOST=mysql
DB_PORT=3306
DB_DATABASE=contacts_app
DB_USERNAME=root
DB_PASSWORD=password
```

This variables are mandatory, if they are different, the app will not work.

##### Frontend env variables with docker

First, move into frontend directory.

```bash
cd ../frontend
```

Next, you have to once again create an **.env** file. Same as backend, copy the
**.env.example** file and rename it.

```bash
cp .env.example .env
```

After this, modify the env variable to be able to connect with the backend API.
Put the following.

```bash
VITE_API_URL=http://localhost:8000/api
```

Once again, this variable is mandatory. If it is different, the app will not
work.

##### Running app with docker

Having set the environment variables, simply go back to the root project
directory and run the containers with the following command.

```bash
cd ..
docker compose up
```

You will see that the backend server will be running in `localhost` on port
`8000` and the frontend one will be running in `localhost` on port`8080`.

Having followed all steps, you cant interact with the entire app going to the
frontend server at [http://localhost:8080](http://localhost:8080). Also, you can
interact with the API in [http://localhost:8000](http://localhost:8000) .
