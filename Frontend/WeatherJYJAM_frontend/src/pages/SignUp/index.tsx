import type { FC } from "react";
import styled from "styled-components";
import LogoComponent from "../Home/_components/Header/Logo/Logo";

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  width: 100%;
  background: #f9f9f9;
  font-family: 'Instrument Sans', sans-serif;
  overflow: hidden;
`;

const LogoWrapper = styled.div`
  display: flex;
  justify-content: center; 
  width: 100%;
`;

const Logo = styled(LogoComponent)`
  width: 250px;
  height: auto;
  display: block;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  width: 100%;
  max-width: 800px;
  padding: 2rem;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
  margin-top: 0; 
`;

const FormTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 500;
  color: #3C3939;
  margin-bottom: 1.5rem;
  text-align: center;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-size: 0.95rem;
  color: #3C3939;
  font-weight: 400;
`;

const Input = styled.input`
  padding: 0.75rem 1rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  outline: none;
  background-color: #ccf1ff;
  color: #3C3939;

  &:focus {
    outline: 2px solid #0070f3;
  }
`;

const Button = styled.button`
  width: 160px;
  padding: 0.6rem;
  background: #87dbfd;
  color: #3C3939;
  font-size: 1rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  align-self: center;

  &:hover {
    background: #6ec7eb;
  }
`;

const FooterText = styled.p`
  margin-top: 1rem;
  font-size: 0.9rem;
  color: #3C3939;
  text-align: center;
  line-height: 1.6;

  a {
    display: block;
    margin-top: 0.25rem;
    color: #395D9F; 
    font-weight: 500;
    text-decoration: none;

    &:hover {
      color: #3C3939; 
    }
  }
`;

const Header: FC = () => {
  return (
    <PageContainer>
      <LogoWrapper>
        <Logo />
      </LogoWrapper>

      <FormContainer>
        <FormTitle>Sign In</FormTitle>

        <Grid>
          <Field>
            <Label htmlFor="username">Username</Label>
            <Input id="username" type="text" placeholder="Enter username" />
          </Field>
          <Field>
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" placeholder="Enter password" />
          </Field>
          <Field>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="Enter email" />
          </Field>
          <Field>
            <Label htmlFor="confirm-password">Confirm Password</Label>
            <Input
              id="confirm-password"
              type="password"
              placeholder="Confirm password"
            />
          </Field>
        </Grid>

        <Button>Sign Up</Button>

        <FooterText>
          Already have an account?
          <a href="/login">Log in here</a>
        </FooterText>
      </FormContainer>
    </PageContainer>
  );
};

export default Header;
