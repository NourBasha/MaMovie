const PageNotFound = (props) =>{


    return(
        <div   className='container'>

                <div className='row d-flex justify-content-center align-items-center'>

                    <div style={{marginTop:'70px', background:'#202429f5', padding:'40px', borderRadius:'10px'}}>
                        <h5 className='appText' style={{
                             margin: '0',
                             padding: '5px 0 5px 0',
                             fontFamily: `'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif`
                        }} >  Page Not Found ... </h5>
                    </div>
                </div>
        </div>
    )
}

export default PageNotFound;