
# Freemage

It's an online photo sharing website in which users can like photos, delete their own photos, and upload photos.

## Getting Started

Follow these instructions to setup the project for development or production environment.

### 3rd Party Services
This project uses these 3rd party services:
- [Cloudinary](https://cloudinary.com/)
- [Google Analytics](https://analytics.google.com/analytics/web/)
- [Google OAuth](https://console.developers.google.com/)
- [Google Account](https://account.google.com/)

Note: You have to create account in these services to use this project. 

Note: I have a tutorial on [Google OAuth](https://github.com/Shahzayb/mern-google-login) 

### Installing

1. Clone the project and install dependencies

```
git clone https://github.com/Shahzayb/freemage.git
```
```
cd freemage
```
```
npm install
```
```
cd client && npm install
```

2. Create all third party services accounts mentioned above. I'm assuming you know about these services. If not, then there are many good tutorials on these services.

3. inside `freemage/config` folder, create `dev.env` file. And in `freemage/client`, create `local.env` file.

4. Here is the list of all env variables you have to provide.

**inside dev.env:** 

`CLOUDINARY_CLOUD_NAME=value` 

`CLOUDINARY_API_KEY=value` 

`CLOUDINARY_API_SECRET=value` 


`CLIENT_ID=value` | a google oauth client id.
`CLIENT_SECRET=value` | a google oauth lib client secret

`DB_URL=value` | your database uri

`JWT_SECRET=value` | a json web token secret


**inside .env.local:**
 
`REACT_APP_CLOUDINARY_API_KEY=value` 

`REACT_APP_CLOUDINARY_CLOUD_NAME=value` 


`REACT_APP_CLIENT_ID=value` | a google oauth client id

**note:** please create separate project of google oauth for development or production

`SKIP_PREFLIGHT_CHECK=true` | to avoid jest compatibility errors

## Running the tests

inside the root of the project run:
```
npm run test
```




## Built With
* [Express.js](http://expressjs.com/)
* [Mongoose](https://mongoosejs.com/)
* [NPM](https://www.npmjs.com/)
* [Create React App](https://create-react-app.dev/)

## Versioning

For the versions available, see the [tags on this repository](https://github.com/shahzayb/freemage/tags). 

## Author

* **Shahzaib Sarwar**  - [shahzayb](https://github.com/shahzayb)


## License

This project is licensed under the MIT License - see the [LICENSE.md](https://github.com/Shahzayb/freemage/blob/master/LICENSE) file for details
