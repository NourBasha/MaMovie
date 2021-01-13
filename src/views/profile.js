import {connect} from 'react-redux';

const Profile = (props) =>{
    return(
        <div className='profile container d-flex justify-content-center align-items-center'>
            <div >
                   {
                   window.localStorage.getItem('username') !== ''
                    ?
                        (<div className='profile-data'> 
                             <label> Username: </label>
                             <h3 className='appText'>{window.localStorage.getItem('activeUsername')}</h3>
                             <label> Email: </label>
                             <h3 className='appText' >{window.localStorage.getItem('activeEmail')}</h3>
                            
                        </div>)
                    :null
                    }
            </div>
        </div>
    )
}

const mapStateToProps = (state) =>{
    return{
        user: state.signUp.users
    }
}



export default connect(mapStateToProps) (Profile);