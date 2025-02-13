import React from 'react';
import {
  FooterContainer,
  FooterLogo,
  FooterSocialIcons,
  FooterLinks,
  FooterSection,
  FooterWrapper,
  CouponSection
} from './style';
import logo from '../../assets/logo.png'
import facebook_icon from '../../assets/facebook_icon.jpg';
import twitter_icon from '../../assets/twitter_logo.png';
import youtube_icon from '../../assets/youtuebe_icon.png';
import ins_icon from '../../assets/ins_icon.jpg';
import coupon from '../../assets/coupon.jpg';

const FooterComponent = () => {
  return (
    <FooterContainer>
        <CouponSection>
        <div className="content">
          <h2>Personalized Coupon</h2>
          <p className="subheading">The Travel</p>
          <p>
            Submit your email to see if you qualify for an exclusive coupon!
          </p>
          <form>
            <input type="email" placeholder="Your email address" />
            <button type="submit">Subscribe</button>
          </form>
        </div>
        <div className="image"><img src={coupon} /></div>
      </CouponSection>
      <FooterWrapper>
        {/* Logo và Social Icons */}
        <FooterSection>
          <FooterLogo>
            <img src={logo} alt="Gotta Go" />
          </FooterLogo>
          <FooterSocialIcons>
            <a href="#facebook" aria-label="Facebook">
              <img src={facebook_icon} alt="Facebook" />
            </a>
            <a href="#twitter" aria-label="Twitter">
              <img src={twitter_icon} alt="Twitter" />
            </a>
            <a href="#youtube" aria-label="YouTube">
              <img src={youtube_icon} alt="YouTube" />
            </a>
            <a href="#instagram" aria-label="Instagram">
              <img src={ins_icon} alt="Instagram" />
            </a>
          </FooterSocialIcons>
        </FooterSection>

        {/* Các mục thông tin */}
        <FooterLinks>
          <FooterSection>
            <h3>Our Destinations</h3>
            <ul>
              <li>Around Viet Nam</li>
            </ul>
          </FooterSection>
          <FooterSection>
            <h3>Our Activities</h3>
            <ul>
              <li>Book a Ride</li>
              <li>Travel Stories</li>
              <li>Explore Destinations</li>
            </ul>
          </FooterSection>
          <FooterSection>
            <h3>Travel Blogs</h3>
            <ul>
              <li>Top Destinations</li>
              <li>User Stories</li>
              <li>Road Trip Guides</li>
              <li>Explore with Us</li>
            </ul>
          </FooterSection>
          <FooterSection>
            <h3>About Us</h3>
            <ul>
              <li>Our Story</li>
              <li>Work with us</li>
            </ul>
          </FooterSection>
        </FooterLinks>
      </FooterWrapper>
    </FooterContainer>
  );
};

export default FooterComponent;
