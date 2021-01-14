


const Footer = (props)=>{
    return (
        
      <div className="footer">
      <div className="container">
        <div className="row">
          <div className="col-12 col-sm-8 col-md-8 col-lg-6 text-left footer-brand ">
            <a
              id="brand-logo"
              className="navbar-brand mr-3 ma"
              href="/">
              Ma<span className="mamovies">Movies</span>{" "}
            </a>
            <p>
              This website gets its data from themoviedb, we only use it here
              to showcase our software development abilities and to practice
              software development. We hope you enjoy your visit to our
              website and hopefully you will come back again!
            </p>
          </div>

          <div className="col-12 col-sm-4 col-md-4 col-lg-3 text-left  helpful-links ">
            <h6>Helpful Links</h6>
            <div className="row ">
              <div className="col">
                <ul className="footer-links1">
                  <li>
                    <a href="/">About</a>
                  </li>
                  <li>
                    <a href="/">Team</a>
                  </li>
                  <li>
                    <a href="/">Privacy Policy</a>
                  </li>
                </ul>
              </div>
              <div className="col">
                <ul className="footer-links2">
                  <li>
                    <a href="/">FAQ</a>
                  </li>
                  <li>
                    <a href="/">Blog</a>
                  </li>
                  <li>
                    <a href="/">Contact</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-3 text-left footer-address">
            <h6>Contact Us</h6>
            <ul>
              <li>24 Gamal Abdel Nasser st, Alexandria, Egypt</li>
              <li>Phone: +201020696796</li>
              <li>
                Email: <a href="/">Nour.basha2011@gmail.com</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  
    )
}

export default Footer;