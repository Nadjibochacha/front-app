import React from 'react';
import pic4 from '../images/pic4.jpg';
import './about.css';
import Button from 'react-bootstrap/esm/Button';
const About = () => {
  return (
    <div id='about' className='mt-5 container'>
        <div className="card mb-3">
            <div className="row g-0 align-items-center">
                <div className="col-md-5">
                    <img src={pic4} className="rounded-start" alt="..." />
                </div>
                <div className="col-md-7">
                    <div className="card-body">
                        <div className='title mb-3'>read about us</div>
                        <p className="card-text">
                            Welcome to SalCo Pharmacy, your neighborhood hub for wellness solutions.
                            Discover a comprehensive range of prescription medications, vitamins, and health products tailored to your needs.
                            Our experienced pharmacists offer personalized advice and support, ensuring your health comes first.
                            With convenient online ordering and prompt delivery services, managing your prescriptions has never been easier.
                            Trust SalCo Pharmacy for quality, reliability, and compassionate care. 
                            From flu shots to chronic condition management, we're here to help you live your healthiest life. 
                            Experience the difference at SalCo Pharmacy today. Your well-being is our priority. 
                            Visit us online for expert guidance and peace of mind. 
                        </p>
                    </div>
                </div>
            </div>
        </div>

    </div>
  )
}

export default About;
