import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import Layout from './Layout';
import HomePage from '../components/HomePage';
import CreateCompanyForm from '../components/CompanyFormPage/CreateCompanyForm'
import EditCompanyForm from '../components/CompanyFormPage/EditCompanyForm'
import ManageCompanyPage from "../components/ManageCompaniesPage/ManageCompanyPage"
import SingleCompanyPage from '../components/SingleCompanyPage/SingleCompanyPage';
import AddImageToCompany from '../components/AddImageToCompany/AddImageToCompany';
import ImagesModal from '../components/ImagesModal/ImagesModal';
import CreateReviewPage from '../components/ReviewForms/CreateReviewPage';
import UpdateReviewPage from '../components/ReviewForms/UpdateReviewPage';
import UserPage from '../components/UserPage/UserPage'
import SearchFormPage from '../components/SearchFormPage';



export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "login",
        element: <LoginFormPage />,
      },
      {
        path: "signup",
        element: <SignupFormPage />,
      },
      {
        path: "search",
        element: <SearchFormPage />,
      },
      {
        path: "/companies/new",
        element: <CreateCompanyForm />,
      },
      {
        path: "/companies/:companyId/edit",
        element: <EditCompanyForm />
      },
      {
        path: "/companies/current",
        element: <ManageCompanyPage />
      },
      {
        path: "/companies/:companyId",
        element: <SingleCompanyPage/>
      },
      {
        path: "/companies/:companyId/addphotos",
        element: <AddImageToCompany />,
      },
      {
        path: "/companies/:companyId/images",
        element: <ImagesModal />,
      },
      {
        path: "/companies/:companyId/reviews/new",
        element: <CreateReviewPage />,
      },
      {
        path: "/companies/:companyId/reviews/edit",
        element: <UpdateReviewPage />,
      },
      {
        path: "/users/:userId",
        element: <UserPage />,
      },
    ],
  },
]);