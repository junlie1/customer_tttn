import axios from "axios";
import auth from "../config/firebase";
import { createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword, signInWithPopup,GoogleAuthProvider, FacebookAuthProvider, fetchSignInMethodsForEmail  } from "firebase/auth";

export const registerUser = async (userData) => {
  const { email, password } = userData;

  const errorMessages = {
    "auth/email-already-in-use": "Email này đã được sử dụng. Vui lòng sử dụng email khác.",
    "auth/invalid-email": "Định dạng email không hợp lệ. Vui lòng kiểm tra lại.",
    "auth/weak-password": "Mật khẩu phải có ít nhất 6 ký tự.",
    "auth/network-request-failed": "Kết nối mạng bị lỗi. Vui lòng thử lại.",
    "auth/internal-error": "Đã xảy ra lỗi nội bộ. Vui lòng thử lại sau.",
  };

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    await sendEmailVerification(user);

    return {
      status: 201,
      message: "Đăng ký thành công! Vui lòng kiểm tra email để xác thực tài khoản.",
      userId: user.uid,
    };
  } catch (error) {
    console.error("Firebase Error:", error.message);

    const customMessage = errorMessages[error.code] || "Đã xảy ra lỗi không xác định.";

    throw {
      message: customMessage,
      code: error.code,
    };
  }
};

export const loginUser = async (email, password) => {
    const errorMessages = {
        "auth/user-not-found": "Tài khoản không tồn tại. Vui lòng kiểm tra lại email.",
        "auth/wrong-password": "Mật khẩu không chính xác. Vui lòng thử lại.",
        "auth/too-many-requests": "Đã có quá nhiều lần đăng nhập thất bại. Vui lòng thử lại sau.",
        "auth/invalid-email": "Định dạng email không hợp lệ. Vui lòng kiểm tra lại.",
        "auth/invalid-credential": "Sai tài khoản hoặc mật khẩu",
      };
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      return {
        status: 200,
        message: "Đăng nhập thành công!",
        user: {
          uid: user.uid,
          email: user.email,
          emailVerified: user.emailVerified,
        },
      };
    } catch (error) {
      console.error("Firebase Login Error:", error.message);
  
      const customMessage = errorMessages[error.code] || "Đã xảy ra lỗi không xác định.";
      throw {
        message: customMessage,
        code: error.code,
      };
    }
  };


export const loginByGoogle = async () => {
  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({
    prompt: "select_account",
  });
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    const userInfo = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
    };
    return {  
      success: true,
      data: userInfo  ,
    };
  } catch (error) {
    console.error("Error during Google Login:", error);
    return {
      success: false,
      error: error.message,
    };
  }
};

export const loginByFacebook = async () => {
  const provider = new FacebookAuthProvider();
  provider.setCustomParameters({
    display: "popup",
  });

  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    // Trích xuất thông tin người dùng
    const userInfo = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
    };

    return {
      success: true,
      data: userInfo,
    };
  } catch (error) {
    if (error.code === "auth/account-exists-with-different-credential") {
      // Lấy email và credential ban đầu
      const email = error.customData.email;
      const pendingCredential = FacebookAuthProvider.credentialFromError(error);

      // Tìm phương thức đăng nhập khác mà tài khoản đã sử dụng
      const providers = await fetchSignInMethodsForEmail(auth, email);
      if (providers.includes("google.com")) {
        return {
          success: false,
          error: "Tài khoản này đã được đăng ký bằng Google. Vui lòng đăng nhập bằng Google.",
        };
      }
      return {
        success: false,
        error: `Tài khoản này đã được đăng ký bằng phương thức khác (${providers.join(
          ", "
        )}).`,
      };
    } else {
      console.error("Error during Facebook Login:", error.message);
      return {
        success: false,
        error: error.message,
      };
    }
  }
};

export const updateUserService = async (customerId, updateData) => {
  try {
    const response = await axios.put(`${process.env.REACT_APP_API_URL_BACKEND}/user/update/${customerId}`,updateData);
    return response.data;
  } catch (error) {
    console.error('error',error);
  }
}