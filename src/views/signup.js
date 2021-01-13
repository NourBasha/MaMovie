import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { connect } from "react-redux";
import { signUpSuccess, setUserAuthenticated } from "../store/actions/actions";
import { useHistory } from "react-router";

const Signup = (props) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(false);
  const [passwordMatchText, setPasswordMatchText] = useState("");
  const history = useHistory();

  const handlePassword = (e) => {
    setPasswordMatchText(e.target.value);
    console.log(typeof passwordMatchText);
    console.log(typeof password);

    if (e.target.value === password) {
      setPasswordMatch(true);
      console.log("inside match.. true");
    }
  };

  

  const signupSubmit = (e) => {
    e.preventDefault();

    let user = {};

    if (passwordMatch) {
      user.username = username;
      user.email = email;
      user.password = password;
      

      setUsername("");
      setEmail("");
      setPassword("");
      setPasswordMatch("");
      setPasswordMatchText("");
      props.setAuthenticated();
     //local storage auth is in saga
      props.addUser(user);
      history.push("/");
    }
  };

  return (
    <div className="signup container  d-flex justify-content-center">
      
      <div className="signup-container ">
        <form onSubmit={signupSubmit} className="signup-form">
            <div className='mb-2'>
                    <label className="form-label">Username</label>
                <input
                    type="text"
                    className="form-control username"
                    id="username"
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
                />
            </div>
        
            <div className='mb-2'>  
                <label className="form-label">Email address</label>
                <input
                    type="text"
                    className="form-control"
                    id="email-input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
       

            <div className='mb-2'>
            <label className="form-label">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password-input"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />


            </div>
        


         <div className='mb-2'>
         <label className="form-label">Re-enter Password</label>
          <input
            type="password"
             className="form-control password-matching"
            value={passwordMatchText}
            id="password-input2"
            onChange={handlePassword}
          />
         </div>
          {passwordMatch ? (
            <div className='mb-3'>
              <FontAwesomeIcon
                className="password-match mr-2"
                id="password-match"
                icon="check-circle"
                color="green"
                
              ></FontAwesomeIcon>
              <label className="form-check-label">Password match</label>
            </div>
          ) : null}
          <button type="submit" className="mamovie-button btn">
            Sign up
          </button>
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    signupInfo: state.signUp.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addUser: (payload) => dispatch(signUpSuccess(payload)),
    setAuthenticated: () => dispatch(setUserAuthenticated()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
