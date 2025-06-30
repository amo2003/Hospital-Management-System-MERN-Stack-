// Contact.js
import React, { useRef, useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import './Contact.css';
import ContactNav from '../ContactNav/ContactNav';

function Contact() {
  const form = useRef();
  const [currentTime, setCurrentTime] = useState('');
  const [sending, setSending] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formattedTime = now.toLocaleString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      });
      setCurrentTime(formattedTime);
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const sendEmail = (e) => {
    e.preventDefault();
    if (sending) return; // Prevent duplicate submits
    setSending(true);

    emailjs
      .sendForm(
        'service_0fe7u5s',
        'template_a11y5na',
        form.current,
        { publicKey: '98tA3GrZ8CKCHsRoe' }
      )
      .then(() => {
        alert("✅ SUCCESS! Your message has been sent.");
        form.current.reset();
        setSending(false);
      })
      .catch(() => {
        alert("⚠️ Oops! Something went wrong. Please try again.");
        setSending(false);
      });
  };

  return (
    <div>
      <ContactNav />

      <div className="contact-page">

        {/* Info Card */}
        <div className="info-card-container">
          <div className="info-card">
            <h2>🏥 Nawaloka Hospital PLC</h2>
            <p><strong>Vision:</strong> To be Sri Lanka’s most trusted private healthcare provider, leading in medical innovation and compassionate care.</p>
            <p><strong>Mission:</strong> Delivering exceptional care to every patient through cutting-edge technology, skilled professionals, and a human touch.</p>
            <p><strong>Hotline:</strong> +94 11 765 4321</p>
            <p><strong>Email:</strong> info@medicareplus.lk</p>
            <p><strong>Address:</strong> 123 Wellness Street, Colombo, Sri Lanka</p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="contact-wrapper">
          <div className="hospital-header">
            <h1>Contact Us</h1>
            <p className="hospital-subtitle">Have a question or need help? Send us a message below.</p>
          </div>

          <form ref={form} onSubmit={sendEmail} className="contact-form" noValidate>
            <label htmlFor="customer_name">Customer Name:</label>
            <input id="customer_name" type="text" name="customer_name" placeholder="Your full name" required disabled={sending} />

            <label htmlFor="customer_email">Customer Email:</label>
            <input id="customer_email" type="email" name="customer_email" placeholder="you@example.com" required disabled={sending} />

            <label htmlFor="customer_contact">Customer Contact:</label>
            <input id="customer_contact" type="text" name="customer_contact" placeholder="+94XXXXXXXXX" required disabled={sending} />

            <label htmlFor="message">Message:</label>
            <textarea id="message" name="message" placeholder="Write your message here..." required disabled={sending} />

            <label htmlFor="submission_time_display">Submission Time:</label>
            <input
              id="submission_time_display"
              type="text"
              name="submission_time_display"
              value={currentTime}
              readOnly
              disabled
            />
            <input type="hidden" name="submission_time" value={currentTime} />

            <input
              type="submit"
              value={sending ? "Sending..." : "Send Message"}
              disabled={sending}
              aria-busy={sending}
            />
          </form>
        </div>

      </div>
    </div>
  );
}

export default Contact;
