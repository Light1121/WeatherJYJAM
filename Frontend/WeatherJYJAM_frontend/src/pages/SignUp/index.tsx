import type { FC } from "react";
import styled from "styled-components";
import LogoComponent from "../Home/_components/Header/Logo/Logo";

const SignUpContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  min-height: 100vh;
  background: #f9f9f9;
  font-family: 'Instrument Sans', sans-serif;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  max-width: 400px;
  padding: 2rem;
  margin-top: 2rem;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
`;

const Input = styled.input`
  padding: 0.75rem 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
  outline: none;
  background-color: #ccf1ff;

  &:focus {
    border-color: #0070f3;
  }
`;

const Button = styled.button`
  padding: 0.75rem;
  background: #87dbfd;
  color: #000;
  font-size: 1rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;

  &:hover {
    background: #6ec7eb;
  }
`;

const FooterText = styled.p`
  margin-top: 1rem;
  font-size: 0.9rem;
  color: #555;
  text-align: center;

  a {
    color: #0070f3;
    font-weight: 500;
    text-decoration: none;
  }
`;

const Header: FC = () => {
  return (
    <SignUpContainer>
      <LogoComponent />

      <FormContainer>
        <Input type="text" placeholder="Username" />
        <Input type="email" placeholder="Email" />
        <Input type="password" placeholder="Password" />
        <Input type="password" placeholder="Confirm Password" />
        <Button>Sign Up</Button>

        <FooterText>
          Already have an account? <a href="/login">Log in here</a>
        </FooterText>
      </FormContainer>
    </SignUpContainer>
  );
};

export default Header;
