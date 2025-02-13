import React, { useState } from "react";
import {
  Container,
  LeftSection,
  Logo,
  FormContainer,
  InputField,
  Button,
  SignInText,
  EyeIcon,
  ImageWrapper
} from "./style";
import { registerUser } from "../../services/userService";
import logo from "../../assets/logo.png";
import signup_icon from "../../assets/signup_icon-removebg-preview.png";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleToggleConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }
  
    try {
      const response = await registerUser({ email, password });
  
      if (response.status === 201) {
        setSuccess(response.message);
        setError("");
        setName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
      } else {
        setError(response.error || "Đã xảy ra lỗi khi đăng ký.");
      }
    } catch (err) {
      if (err.message) {
        setError(err.message);
      } else {
        setError("Đã xảy ra lỗi không xác định.");
      }
      setSuccess("");
    }
  };
  

  return (
    <Container>
      <LeftSection>
        <Logo src={logo} />
        <div className="illustration">
        <ImageWrapper>
          <img src={signup_icon} />
        </ImageWrapper>
        </div>
      </LeftSection>
      <FormContainer>
        <h2>Create Account</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {success && <p style={{ color: "green" }}>{success}</p>}
        <InputField>
          <label>Email</label>
          <span className="icon">📧</span>
          <input
            type="email"
            placeholder="email@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </InputField>
        <InputField>
          <label>Name</label>
          <span className="icon">📧</span>
          <input
            type="text"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </InputField>
        <InputField>
          <label>Password</label>
          <span className="icon">🔒</span>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <EyeIcon onClick={handleTogglePassword}>
            {showPassword ? "👁️" : "🙈"}
          </EyeIcon>
        </InputField>
        <InputField>
          <label>Re-password</label>
          <span className="icon">🔒</span>
          <input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Enter your confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <EyeIcon onClick={handleToggleConfirmPassword}>
            {showConfirmPassword ? "👁️" : "🙈"}
          </EyeIcon>
        </InputField>
        <Button onClick={handleRegister}>Create Account</Button>
        <SignInText>
          - or - <a href="/login">Sign in</a>
        </SignInText>
      </FormContainer>
    </Container>
  );
};

export default RegisterPage;
