
  const handlSubmit = () => {
    setIsLoading(true);
    login({ email, password }, (err, result) => {
      if (err) throw err;
      if (!result.status) {
        Object.keys(result.errMsg).forEach((key) => {
          message.error(result.errMsg[key]);
        });
        setIsLoading(false);
      } else {
        localStorage.setItem("blog_token", result.token);
        localStorage.setItem("blog_user", JSON.stringify(result.user));
        router.replace('/');
        setIsLoading(false);
      }
    });
  };


  const URL = "https://mashriq.herokuapp.com/dash/v1";

  export const login = (data, callback) => {
  fetch(`${URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((resp) => resp.json())
    .then((result) => callback(null, result))
    .catch((err) => callback(err, null));
};

var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({"phone":"07713321607","password":"dhdtfj"});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("https://iq-printer.herokuapp.com/login", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));



https://github.com/AmmarYasir29/Blog-Dashboard/blob/master/pages/login.js

https://github.com/AmmarYasir29/Blog-Dashboard/blob/2d037195f89f396a0eb75fa9fa83db906b57ec2c/api.js#L3