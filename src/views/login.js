
import { useState} from 'react';
import {connect } from 'react-redux';
import {setUserAuthenticated} from '../store/actions/actions';
import {useHistory} from 'react-router-dom';



const Login = (props) => {

 const [email,setEmail]= useState('');
 const [password,setPassword]= useState('');
 const history = useHistory();
 const [loading, setLoading] = useState(false);



 const loginSubmit = ()=>{

    setLoading(true);

    let users = JSON.parse(window.localStorage.getItem('users'));

    users.forEach(user => {

        if(user.email === email && user.password === password){
            props.setAuthenticated();
            window.localStorage.setItem('authState',true);
            window.localStorage.setItem('activeUsername',true);
            window.localStorage.setItem('activeEmail',true);

            setLoading(false);
            history.push('/');
            return;
        }

    });

 }

    return(
        <div className='login container d-flex justify-content-center'>

                <div className='row login-data'>
                    <form onSubmit={loginSubmit}>
                        <label className='form-label'  >Email address</label>
                        <input type='text'
                            className='form-control'
                            onChange={(e)=>setEmail(e.target.value)}
                            value={email} />
                        <label className='form-label'  >Password</label>
                        <input type='password' className='form-control'
                        onChange={(e)=>setPassword(e.target.value)}
                        value={password} />
                        <button type='submit' className='btn btn-primary'>Login</button>
                   </form>
                </div>
                { loading
                ?
                <div className='row'>
                    <div className="text-center">
                        <div className="spinner-border text-info m-5 "
                            style={{width:'4rem', height:'4rem'}} role="status">
                        </div>
                    </div>
                </div>
                :null
                 }
 
        </div>
    )

}

const mapStateToProps = (state) =>{
        return {
            users: state.signUp.users
        }
}

const mapDispatchToProps = (dispatch)=>{
return {
    setAuthenticated : () => dispatch(setUserAuthenticated()),

}    
}

export default connect(mapStateToProps,mapDispatchToProps)(Login);