# Mini-Tasks
[Demo on Heroku](https://mighty-lake-63811.herokuapp.com) 
A simple collaborative drag and drop task management site

# How to run it locally:
#### clone repository
```
git clone https://github.com/yuanxue68/Mini-Tasks.git
```

### install npm packages
```
npm install
```

### install bower dependencies
```
bower install
```

### create a .env.js in the project root directory with the following keys
```javascript
module.exports = {
  MONGO_URI: "your mongo url",
  SECRET: "somesecret",
	facebookClientID: 'your app id', // your App ID
	facebookClientSecret: 'your app secret', // your App Secret
	facebookCallbackURL: 'http://localhost:3000/api/auth/facebook/callback' //local example
};
```

### start the app 
```
gulp
```


