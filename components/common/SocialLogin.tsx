import React from 'react';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';

const responseGoogle = (response) => {
  console.log(response);
}

const responseFacebook = (response) => {
  console.log(response);
}

function App() {
  return (
    <div className="App">
      <GoogleLogin
        clientId="YOUR_GOOGLE_CLIENT_ID"
        buttonText="Login with Google"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={'single_host_origin'}
      />
      <FacebookLogin
        appId="YOUR_FACEBOOK_APP_ID"
        autoLoad={true}
        fields="name,email,picture"
        callback={responseFacebook} />
    </div>
  );
}

export default App;