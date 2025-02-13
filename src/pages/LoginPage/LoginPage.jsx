import React, { useState } from "react";
import {
  LoginContainer,
  LeftSection,
  RightSection,
  Title,
  Form,
  InputField,
  Label,
  Input,
  Button,
  ForgotPassword,
  SocialLogin,
  SignUp,
  PasswordWrapper,
  EyeIcon,
  ImageWrapper,
} from "./style";
import login_icon from "../../assets/login_icon-removebg-preview.png";
import gg_icon from "../../assets/gg_icon.jpg";
import fb_icon from "../../assets/fb_icon.png";
import { useNavigate } from "react-router-dom";
import { loginByFacebook, loginByGoogle, loginUser } from "../../services/userService";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/slides/userSlide";
import MessageComponent from "../../components/MessageComponent/MessageComponent";

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async () => {
    try {
      const response = await loginUser(email, password);
      setError(""); 
      if (response.user) {
        dispatch(setUser(response.user));
        setSuccess("Đăng nhập thành công!"); 
        setTimeout(() => {
          setSuccess("");
          navigate("/"); 
        }, 1000);
      }
    } catch (err) {
      setError(err.message);
      setSuccess("");
    }
  };

  const handleNavigateSignup = () => {
    navigate("/signup");
  };

  const handleCloseMessage = () => {
    setError("");
    setSuccess("");
  };

  const handleLoginByGoogle = async () => {
    try {
      const response = await loginByGoogle();
      console.log('response',response?.data?.displayName);
      if(response.success) {
        dispatch(setUser(response?.data));
        setSuccess("Đăng nhập thành công!"); 
        setTimeout(() => {
          setSuccess("");
          navigate("/"); 
        }, 1000);
      }
    } catch (error) {
      setError(err.message);
      setSuccess("");
    }
  }

  const handleLoginByFacebook = async () => {
    try {
      const response = await loginByFacebook();
      console.log('response',response);
      
      if (response.success) {
        dispatch(setUser(response.data));
        setSuccess("Đăng nhập thành công!");
        setTimeout(() => {
          setSuccess("");
          navigate("/");
        }, 1000);
      }
      else {
        setError(response.error);
      }
    } catch (error) {
      setError(error.message);
      setSuccess("");
    }
  }

  return (
    <LoginContainer>
      <MessageComponent
        type="error"
        message={error}
        onClose={handleCloseMessage}
      />
      <MessageComponent
        type="success"
        message={success}
        onClose={handleCloseMessage}
      />

      <LeftSection>
        <Title>Welcome Back!!</Title>
        <Form>
          <InputField>
            <Label>Email</Label>
            <Input
              type="email"
              placeholder="email@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </InputField>
          <InputField>
            <Label>Password</Label>
            <PasswordWrapper>
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <EyeIcon onClick={handleTogglePassword}>
                {showPassword ? "👁️" : "🙈"}
              </EyeIcon>
            </PasswordWrapper>
          </InputField>
          <ForgotPassword>Forgot Password?</ForgotPassword>
          <Button type="button" onClick={handleLogin}>
            Login
          </Button>
        </Form>
        <SocialLogin>
          <span>- or -</span>
          <div>
            <img src={gg_icon} alt="Google Login" onClick = {handleLoginByGoogle}/>
            <img src={fb_icon} alt="Facebook Login" onClick={handleLoginByFacebook} />
          </div>
        </SocialLogin>
        <SignUp>
          Don't have an account? <p onClick={handleNavigateSignup}>Sign up</p>
        </SignUp>
      </LeftSection>
      <RightSection>
        <ImageWrapper>
          <img src={login_icon} alt="Login Illustration" />
        </ImageWrapper>
      </RightSection>
    </LoginContainer>
  );
};

export default LoginPage;
