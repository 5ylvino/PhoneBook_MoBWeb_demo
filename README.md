# PhoneBook_MoBWeb_demo
task 2
![mobile](https://user-images.githubusercontent.com/61919575/205386495-2420b682-08e3-4c28-8a13-9923953735d3.png)

## Frameworks:

- Laravel
- Expo React Native

## DBMS

- MYSQL

## How it works / How to start the project

There are 2 main folders - sylvester_ekweozor_task1 and sylvester_ekweozor_task2.
And also there are 4 parts to the project which are the DataBase, Backend - laravel, frontend - laravel, and Mobile app

- Database: Consist of 5 tables on which 1 of it, is our main table and the other are auto generated tables and
  we are only making use of 2 tables - the `users` and `personal_access_token`

[moving to the backend / frontend - admin app]

- We have the web and API endpoints, using the same controller script,
  on which we are using Auth Guard Authentication for admin web app
  and we are using Santum Authentication for APIs on Mobile.
  [NOTE] : To Start serving the backend
- - first our naxum backend is connected via our env file a and it is called `naxum`
- - Secondly, run migrate with the command `php artisan migrate`, to
    create on the require tables in our dataBase. Moreover,
    the DB file is located at `sylvester_ekweozor_task1/files_database/naxum.sql`
- - We are also using both API and web routes which have the required functionalities use on mobile and web app.
- - Create terminals for laravel app and then run these commands separately on each `php artisan serve` and `npm run dev`

- On mobile on the terminal for React Native Expo,
  also ensure you have internet for expo client to work, then run `yarn start`
  and then use the option on the console to select your simulating/emulating
  device `i` for IOS and `a` for android as shown with others commands on the console.
- - [Note] we are using React Native Expo with typescript and yarn
- - And we also have ReactNavigation, env, localstorage, which are the core libraries on the app.

    [____
    (1) Shown routes and controller files
    (2) Shown the admin app creating a new user, and continue according the functionalities and screens
    ____]

## My approach for developemnt

UI-first approach

## App Functionalities

1. Create an API End Point from the Admin page that have the functionalities to do the
   following.

- Verify and Validate the login logic from the app
- Update contact details from the app
- Search in the contacts from the app

2. Create an Admin Portal that have the functionalities to do the following

- Login and Logout functionalities
- Admin Portal must be responsive in any browser
- Account Admin - Create an account to be used on the mobile app
- Parameters - Username, Password, Full name, Contact Number, Email
- Account Listing - Able to filter by name, contact number and email

3. APP Brand Out Design - Create an APP using EXPO framework that will have the following
   functionalities:

- login using username and password set in the admin page
- logout with confirmation message.

- The Home will have 3 Screens with the following functionalities:
  - add new contacts
  - list all contacts added
  - update personal information in My Profile
  - search contacts
  - refresh contacts on the refresh contact button.
