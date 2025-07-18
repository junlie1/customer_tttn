import axios from "axios";
import {auth} from "../config/firebase";
import { createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword, signInWithPopup,GoogleAuthProvider, FacebookAuthProvider, fetchSignInMethodsForEmail, updateProfile, sendPasswordResetEmail  } from "firebase/auth";
import { saveUserToFirestore } from "./saveUserToFirestore";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";
import {db} from '../config/firebase'

//không lưu vào Firestore ngay sau khi đăng ký, mà sẽ chỉ lưu khi người dùng đăng nhập lần đầu tiên sau khi xác thực email.
export const registerUser = async (userData) => {
  const { email, password, name } = userData;

  const errorMessages = {
    "auth/email-already-in-use": "Email này đã được sử dụng. Vui lòng sử dụng email khác.",
    "auth/invalid-email": "Định dạng email không hợp lệ. Vui lòng kiểm tra lại.",
    "auth/weak-password": "Mật khẩu phải có ít nhất 6 ký tự.",
    "auth/network-request-failed": "Kết nối mạng bị lỗi. Vui lòng thử lại.",
    "auth/internal-error": "Đã xảy ra lỗi nội bộ. Vui lòng thử lại sau.",
  };

  try {
    // Đăng ký tài khoản
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    await updateProfile(user, {displayName: name});

    // Gửi email xác thực
    await sendEmailVerification(user);

    return {
      status: 201,
      message: "Đăng ký thành công! Vui lòng kiểm tra email để xác thực tài khoản trước khi đăng nhập.",
      data: {
        uid: user.uid,
        email: user.email,
        name: user.displayName,
        phone: user.phoneNumber
      }
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

// Khi người dùng đăng nhập, nếu email đã xác thực, chúng ta sẽ lưu vào Firestore.
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

    // Kiểm tra nếu email đã xác thực
    if (!user.emailVerified) {
      await auth.signOut(); // Đăng xuất nếu email chưa xác thực
      throw {
        message: "Email chưa được xác thực. Vui lòng kiểm tra email và xác thực trước khi đăng nhập.",
        code: "auth/email-not-verified",
      };
    }

    // Nếu email đã xác thực, lưu vào Firestore (chỉ khi đăng nhập lần đầu)
    await saveUserToFirestore(user);

    return {
      status: 200,
      message: "Đăng nhập thành công!",
      data: {
        uid: user.uid,
        email: user.email,
        emailVerified: user.emailVerified,
        name: user.displayName,
        phone: user.phoneNumber
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
    // Lưu thông tin vào Firestore
    await saveUserToFirestore(user);

    return {  
      success: true,
      data: {
        uid: user.uid,
        email: user.email,
        name: user.displayName,
        phone: user.phoneNumber
      },
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
      name: user.displayName,
      phone: user.phoneNumber
    };
    await saveUserToFirestore(user);
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
    const response = await axios.patch(`${process.env.REACT_APP_API_URL_BACKEND}/user/update/${customerId}`,updateData);
    return response.data;
  } catch (error) {
    console.error('error',error);
  }
}

export const getUserById = async (customerId) => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API_URL_BACKEND}/user/${customerId}`);
    return response.data;
  } catch (error) {
    console.error("Error", error);
  }
}

export const sendResetPasswordEmail = async (email) => {
  const errorMessages = {
    "auth/invalid-email": "Email không hợp lệ.",
    "auth/network-request-failed": "Mạng không ổn định. Vui lòng thử lại.",
  };

  try {
    // Bước 1: Kiểm tra email có tồn tại trong Firebase Authentication không
    const signInMethods = await fetchSignInMethodsForEmail(auth, email);
    const existsInAuth = signInMethods && signInMethods.length > 0;

    // Bước 2: Kiểm tra email có tồn tại trong Firestore (bộ sưu tập 'users')
    const userQuery = query(collection(db, "users"), where("email", "==", email));
    const querySnapshot = await getDocs(userQuery);
    const existsInFirestore = !querySnapshot.empty;

    // Nếu không tồn tại ở cả 2 nơi → trả về lỗi
    if (!existsInAuth && !existsInFirestore) {
      return {
        success: false,
        error: "Không tìm thấy tài khoản với email này.",
      };
    }

    // Nếu có tồn tại → gửi email reset
    await sendPasswordResetEmail(auth, email);
    return {
      success: true,
      message: "Email đặt lại mật khẩu đã được gửi. Vui lòng kiểm tra hộp thư.",
    };
  } catch (error) {
    console.error("Reset Password Error:", error.message);
    const customMessage = errorMessages[error.code] || "Đã xảy ra lỗi khi gửi email khôi phục.";
    return {
      success: false,
      error: customMessage,
    };
  }
};