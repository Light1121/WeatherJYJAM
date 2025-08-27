import type { FC } from "react";
import styled from "styled-components";

const BaseText = styled.p`
  font-family: 'Instrument Sans', sans-serif;
  font-size: 1rem;
  color: #333;
  margin-bottom: 1rem;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const SignUp: FC = () => (
  <div>
    <BaseText>Sign up to continue.</BaseText>
    <FormContainer>
      <input type="text" placeholder="Username" />
      <input type="email" placeholder="Email" />
      <input type="password" placeholder="Password" />
      <button>Sign Up</button>
    </FormContainer>
  </div>
);

export default SignUp;
