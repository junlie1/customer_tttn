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
import { sendResetPasswordEmail } from "../../services/userService";

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
      console.log('response',response);
      
      setError(""); 
      if (response.status === 200) {
        dispatch(setUser(response.data));
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
      console.log('response',response.data);
      
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
        dispatch(setUser(response?.data));
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

  const handleForgotPassword = async () => {
    if (!email) {
      setError("Vui lòng nhập email để khôi phục mật khẩu.");
      return;
    }
  
    const result = await sendResetPasswordEmail(email);
    if (result.success) {
      setSuccess(result.message);
      setError("");
    } else {
      setError(result.error);
      setSuccess("");
    }
  };

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
          <ForgotPassword onClick={handleForgotPassword}>Forgot Password?</ForgotPassword>
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
