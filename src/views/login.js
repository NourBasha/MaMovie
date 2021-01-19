
import { useState} from 'react';
import {connect } from 'react-redux';
import {setUserAuthenticated} from '../store/actions/actions';
import {useHistory} from 'react-router-dom';
import Footer from "../components/container/footer";



const Login = (props) => {

 const [email,setEmail]= useState('');
 const [password,setPassword]= useState('');
 const history = useHistory();
 const [loading, setLoading] = useState(false);



 const loginSubmit = (e)=>{


    e.preventDefault();

    setLoading(true);

    let users = JSON.parse(window.localStorage.getItem('users'));
    
    var BreakException = {};

    try {
            users.forEach(user => {

            if(user.email === email.toLocaleLowerCase() && user.password === password){
                //global auth state
                props.setAuthenticated();
                // local data
                window.localStorage.setItem('authState',true);
                window.localStorage.setItem('activeUsername', user.username);
                window.localStorage.setItem('activeEmail',user.email);
    
                setLoading(false);
              
                history.push('/');

                throw BreakException;
            }
    
        });

    }catch(e){
        if (e !== BreakException) throw e;
    }

   

 }

    return(
        <div className='login container-fluid pr-0 pl-0 h-100 '>

               <div className='container' style={{marginBottom:'250px'}} >
               <div className='d-flex justify-content-center align-items-center text-center'>
                    <div className=' login-heading '>
                  <h2 className='appText'>Login</h2>
                  </div>    
                    </div>
                  


                <div className='row login-data d-flex justify-content-center align-items-center'>

                       
                    <div className='form-container'>
                        <form onSubmit={loginSubmit}>
                         
                          <div className='mb-3'>
                            <label className='form-label'  >Email address</label>
                                <input type='text'
                                    className='form-control'
                                    onChange={(e)=>setEmail(e.target.value)}
                                    value={email} />
                          </div>

                          <div className='mb-3'>
                                <label className='form-label'  >Password</label>
                                    <input type='password' className='form-control'
                                    onChange={(e)=>setPassword(e.target.value)}
                                    value={password} />
                          </div>
                            
                            <button type='submit' className='btn mamovie-button'>Login</button>
                    </form>
                    </div>
                </div>
               
                <div className='row d-flex justify-content-around'>
                { loading
                ?
                    <div className=" col-4 text-center">
                        <div className="spinner-border text-info m-5 "
                            style={{width:'4rem', height:'4rem'}} role="status">
                        </div>
                    </div>
                    :null
                 }
                </div>
                   </div>
               
                   <div className='row d-flex justify-content-around ' >
                  <div className='col-4' style={{backgroundColor:'#029e9eab', borderRadius:'5px', padding:'10px'}}>
                        <p className='appText' style={{fontSize:'15px'}}>If This Is Your First Visit, Use The Following Credentials To Login</p>
                        <p className='appText' style={{fontSize:'15px'}}>Email: user@email.com</p>
                        <p className='appText' style={{fontSize:'15px'}}>Password: Abcd@1234  </p>
                  </div>
           </div>

               <Footer  />
                 
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