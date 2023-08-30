import React from "react";
import styled from "styled-components";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <LogoContainer>
          <Logo>AtoZ</Logo>
          <Slogan>Your One-Stop Shop for Everything</Slogan>
        </LogoContainer>
        <LinksContainer>
          <FooterHeading>Quick Links</FooterHeading>
          <FooterLink href="#">Home</FooterLink>
          <FooterLink href="#">Products</FooterLink>
          <FooterLink href="#">About Us</FooterLink>
          <FooterLink href="#">Contact</FooterLink>
        </LinksContainer>
        <SocialMediaContainer>
          <FooterHeading>Connect with Us</FooterHeading>
          <SocialIconLink href="#" target="_blank">
            <StyledFb />
          </SocialIconLink>
          <SocialIconLink href="#" target="_blank">
            <StyledTwitter />
          </SocialIconLink>
          <SocialIconLink href="#" target="_blank">
            <StyledInsta />
          </SocialIconLink>
        </SocialMediaContainer>
      </FooterContent>
      <FooterBottom>
        <Copyright>&copy; 2023 MyShop. All rights reserved.</Copyright>
        <TermsLink href="#">Terms of Service</TermsLink>
        <PrivacyLink href="#">Privacy Policy</PrivacyLink>
      </FooterBottom>
    </FooterContainer>
  );
};

const FooterContainer = styled.footer`
  background-color: #000;
  padding: 2rem;
  color: #e6e6e6;
`;
const StyledFb = styled(FaFacebook)`
  color: #fff;
  width: 2rem;
  height: 2rem;
  &:hover {
    color: #1877f2;
  }
`;
const StyledTwitter = styled(FaTwitter)`
  color: #fff;
  width: 2rem;
  height: 2rem;
  &:hover {
    color: #00acee;
  }
`;
const StyledInsta = styled(FaInstagram)`
  color: #fff;
  width: 2rem;
  height: 2rem;
  &:hover {
    color: #e1306c;
  }
`;
const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const LogoContainer = styled.div`
  flex: 1 1 300px;
`;

const Logo = styled.h2`
  font-size: 1.8rem;
  color: #e6e6e6;
  margin-bottom: 0.5rem;
`;

const Slogan = styled.p`
  font-size: 0.9rem;
  color: #e6e6e6;
`;

const LinksContainer = styled.div`
  flex: 1 1 200px;
`;

const FooterHeading = styled.h3`
  font-size: 1rem;
  color: #e6e6e6;
  margin-bottom: 1rem;
`;

const FooterLink = styled.a`
  display: block;
  font-size: 0.9rem;
  color: #e6e6e6;
  margin-bottom: 0.5rem;
  text-decoration: none;
  &:hover {
    color: #ff6b6b;
  }
`;

const SocialMediaContainer = styled.div`
  flex: 1 1 150px;
`;

const SocialIconLink = styled.a`
  display: inline-block;
  margin-right: 1rem;
`;

const SocialIcon = styled.img`
  width: 24px;
  height: 24px;
`;

const FooterBottom = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding-top: 1rem;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  border-top: 1px solid #e6e6e6;
  margin-top: 1rem;
  font-size: 0.85rem;
`;

const Copyright = styled.p`
  color: #e6e6e6;
  margin-bottom: 1rem;
  width: 40%;
`;

const TermsLink = styled.a`
  color: #e6e6e6;
  margin-right: 1rem;
  text-decoration: none;
  width: 31%;
  &:hover {
    color: #ff6b6b;
  }
`;

const PrivacyLink = styled.a`
  color: #e6e6e6;
  text-decoration: none;
  &:hover {
    color: #ff6b6b;
  }
`;

export default Footer;
