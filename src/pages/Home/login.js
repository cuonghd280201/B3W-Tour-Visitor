import React, { useEffect } from 'react';
import { UserAuth } from "../../utils/AuthContext";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { signInWithPopup } from '@firebase/auth';
import { auth, googleAuthProvider } from '../../utils/firebase';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import userServices from '../../services/user.services';



const Login = () => {
    const navigate = useNavigate();

    const handleSignInWithGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, googleAuthProvider);
            console.log('Google Sign-In Result:', result);

            // Store token and user data in local storage
            localStorage.setItem('token', result.user.accessToken);
            localStorage.setItem('user', JSON.stringify(result.user));

            // Get user profile and role
            const userProfileResponse = await userServices.getUserProfile();
            if (userProfileResponse === 403) {
                navigate('/forbidden');
            } else {
                const userProfile = userProfileResponse.data.data;
                const userRole = userProfile.role;
                console.log('User Role:', userRole);

                // Navigate based on user role
                switch (userRole) {
                    case 'USER':
                        navigate('/');
                        break;
                    case 'STAFF':
                        navigate('/listTourStaff');
                        break;
                    default:
                        navigate('/dashboard');
                        break;
                }
                toast.success('Đăng nhập thành công!');
            }

        } catch (error) {
            console.error('Error during Google Sign-In:', error);
            toast.error('Đăng nhập thất bại!');
            navigate('/forbidden')
        }
    };

    // Check user authentication status
    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser) {
            navigate('/');
        }
    }, [navigate]);

    const { googleSignIn, user } = UserAuth();
    //const navigate = useNavigate();
    const handleGoogleSignIn = async () => {
        try {
            await googleSignIn();
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        if (user != null) {
            navigate('/login');
        }
    }, [user]);
    return (
        <div>
            <div className="hero-wrap js-fullheight" style={{ backgroundImage: 'url("images/bg_1.jpg")' }}>
                <div className="overlay" />
                <div className="container">
                    <div className="row no-gutters slider-text js-fullheight align-items-center justify-content-center" data-scrollax-parent="true">
                        <div className="col-md-9 text-center ftco-animate" data-scrollax=" properties: { translateY: '70%' }">
                            <p className="breadcrumbs" data-scrollax="properties: { translateY: '30%', opacity: 1.6 }"><span className="mr-2"><a href="index.html">Home</a></span> <span>Hotel</span></p>
                            <h1 className="mb-3 bread" data-scrollax="properties: { translateY: '30%', opacity: 1.6 }">Chuyến Đi</h1>
                        </div>
                    </div>
                </div>
            </div>
            <div className="limiter">
                <div className="container-login100" style={{ backgroundImage: 'url("images/bg-01.jpg")' }}>
                    <div className="wrap-login100 p-l-110 p-r-110 p-t-62 p-b-33">
                        <form className="login100-form validate-form flex-sb flex-w">
                            <span className="login100-form-title p-b-53">
                                Đăng Nhập
                            </span>
                            <a href="#" className="btn-face m-b-20">
                                <i className="fa fa-facebook-official" />
                                Facebook
                            </a>
                            <a href="#" className="btn-google m-b-20" onClick={handleSignInWithGoogle}>
                                <img src="images/icongoogle.jpg" alt="GOOGLE" />
                                Google
                            </a>
                            <div className="p-t-31 p-b-9">
                                <span className="txt1">
                                    Tài Khoản
                                </span>
                            </div>
                            <div className="wrap-input100 validate-input" data-validate="Username is required">
                                <input className="input100" type="text" name="username" />
                                <span className="focus-input100" />
                            </div>
                            <div className="p-t-13 p-b-9">
                                <span className="txt1">
                                    Mật Khẩu
                                </span>
                                <a href="#" className="txt2 bo1 m-l-5">
                                    Quên Mật Khẩu?
                                </a>
                            </div>
                            <div className="wrap-input100 validate-input" data-validate="Password is required">
                                <input className="input100" type="password" name="pass" />
                                <span className="focus-input100" />
                            </div>
                            <div className="container-login100-form-btn m-t-17">
                                <Link to="/listTourStaff">
                                    <button className="login100-form-btn">
                                        Đăng Nhập
                                    </button>
                                </Link>
                            </div>
                            <div className="w-full text-center p-t-55">
                                <span className="txt2">
                                    Không có tài khoản?
                                </span>
                                <a href="#" className="txt2 bo1">
                                    Đăng ký tại đây
                                </a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div id="dropDownSelect1" />
        </div>

    );
}
export default Login;