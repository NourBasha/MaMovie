
const NotAuthorised = (props) => {
  return (
    <div className="not-auth container" >
      <div className="row d-flex justify-content-center text-center">
        <div className="col  align-content-center">
          
           <div className='message-container'>
           <h4 className="not-auth-message">
              You Are Not Authorised To Continue To This Page, Please Login Or
              Sign Up To Continue
            </h4>
           </div>
          
        </div>
      </div>
    </div>
  );
};
export default NotAuthorised;
