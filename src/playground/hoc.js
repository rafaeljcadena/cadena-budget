// Higher Order Component (HOC)
// Reuse code
// Render hijacking

import React from "react";
import ReactDOM from 'react-dom'

const Info = (props) => (
  <div>
    <h1>Info</h1>
    <p>The info is: {props.info}</p>
  </div>
);

const withAdminWarning = (WrappedComponent) => {
  return (props) => (
    <div>
      {props.isAdmin && <p>This is private info. Please don't share</p> }
      <WrappedComponent {...props} />
    </div>
  );
};
const AdminInfo = withAdminWarning(Info);

const requireAuthentication = (WrappedComponent) => {
  return (props) => (
    <div>
      { props.isAuthenticated ? (
        <div>
          <p> Hi, Admin you're accessing the system</p>
          <WrappedComponent {...props} />
        </div>
      ) : (
        <p>Please log in to see the content</p>  
      )}
    </div>
  );
}

const AuthInfo = requireAuthentication(Info);



// ReactDOM.render(<AdminInfo isAdmin={true} info='This are the detail' />, document.getElementById('app'));
ReactDOM.render(<AuthInfo isAuthenticated={false} info='This are the detail' />, document.getElementById('app'));
