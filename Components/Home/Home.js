import React from 'react';
import HomeNav from '../HomeNav/HomeNav';
import './home.css';
import Footer from '../Footer/Footer';
import { FaPhoneAlt, FaCalendarCheck } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="uniq-home-page">
      <HomeNav />
      <div className="uniq-home-container">
        {/* Hero Section */}
        <section className="hero-section">
          <div className="hero-content">
            <h1>Nawaloka Hospital PLC</h1>
            <h2 className='mainh2'>Your Partner In Health and Wellness</h2>
            <p>
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout. The
              point of using Lorem Ipsum is that it has a more-or-less normal
              distribution of letters, as opposed to using:
            </p>

            <div className="hero-buttons">
              <button 
                className="appointment-btn" 
                onClick={() => navigate('/bookappointment')}
              >
                <FaCalendarCheck /> BOOK AN APPOINTMENT
              </button>

              <button 
                className="appointment-btn" 
                onClick={() => navigate('/displaytoD')}
              >
                <FaPhoneAlt /> VIEW APPOINTMENT
              </button>
            </div>
          </div>

          <div className="hero-circles">
            <div className="circle circle-1"></div>
            <div className="circle circle-2"></div>
            <div className="circle circle-3"></div>
          </div>
        </section>

        {/* Services Section */}
        <section className="services-section">
          <h2>Our Healthcare Service</h2>
          <p className="pa">
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout.
          </p>

          <div className="services-grid">
            <div 
              className="service-card" 
              onClick={() => navigate('/emergency')} 
              role="button" 
              tabIndex={0} 
              onKeyPress={e => { if (e.key === 'Enter') navigate('/emergency') }}
            >
              <div className="service-icon emergency"></div>
              <h3>Emergency Department</h3>
              <p>24/7 critical care for trauma and urgent issues.</p>
            </div>

            <div 
              className="service-card" 
              onClick={() => navigate('/pediatric')}
              role="button"
              tabIndex={0}
              onKeyPress={e => { if (e.key === 'Enter') navigate('/pediatric') }}
            >
              <div className="service-icon pediatric"></div>
              <h3>Pediatric Department</h3>
              <p>Care for children, infants, and adolescents.</p>
            </div>

            <div 
              className="service-card" 
              onClick={() => navigate('/physician')}
              role="button"
              tabIndex={0}
              onKeyPress={e => { if (e.key === 'Enter') navigate('/physician') }}
            >
              <div className="service-icon physician"></div>
              <h3>General Physician</h3>
              <p>Routine checkups and general medical care.</p>
            </div>

            <div 
              className="service-card" 
              onClick={() => navigate('/neurology')}
              role="button"
              tabIndex={0}
              onKeyPress={e => { if (e.key === 'Enter') navigate('/neurology') }}
            >
              <div className="service-icon neurology"></div>
              <h3>Neurology Department</h3>
              <p>Specialized care for brain and nerve disorders.</p>
            </div>

            <div 
              className="service-card" 
              onClick={() => navigate('/cardiology')}
              role="button"
              tabIndex={0}
              onKeyPress={e => { if (e.key === 'Enter') navigate('/cardiology') }}
            >
              <div className="service-icon cardiology"></div>
              <h3>Cardiology Department</h3>
              <p>Heart care, diagnosis, and treatment services.</p>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
