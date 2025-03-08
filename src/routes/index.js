import HistoryPage from "../pages/HistoryPage/HistoryPage";
import HomePage from "../pages/HomePage/HomePage";
import LoginPage from "../pages/LoginPage/LoginPage";
import PaymentPage from "../pages/PaymentPage/PaymentPage";
import ProfilePage from "../pages/ProfilePage/ProfilePage";
import RegisterPage from "../pages/RegisterPage/RegisterPage";
import SearchResultsPage from "../pages/SearchResultPage/SearchResultPage";
import SuccessPage from "../pages/SuccessPage/SuccessPage";
import PurchaseHistory from '../pages/ProfilePage/PurchaseHistory/PurchaseHistory';
import HomeSection from '../pages/ProfilePage/HomeSection/HomeSection';
import Account from '../pages/ProfilePage/Account/Account';

export const routes = [
    {
        path: '/',
        page: HomePage,
    },
    {
        path: '/login',
        page: LoginPage,
    },
    {
        path: '/signup',
        page: RegisterPage,
    },
    {
        path: '/search-results',
        page: SearchResultsPage
    },
    {
        path: '/payment',
        page: PaymentPage
    },
    {
        path: '/success',
        page: SuccessPage
    },
    {
        path: '/history',
        page: HistoryPage
    },
    {
        path: '/profile',
        page: ProfilePage,
        children: [ 
            {
                path: 'home',
                page: HomeSection,
            },
            {
                path: 'purchase-history',
                page: PurchaseHistory,
            },
            {
                path: 'account',
                page: Account,
            },
        ],
    }
]