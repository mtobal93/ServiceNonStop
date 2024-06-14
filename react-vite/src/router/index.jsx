import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import Layout from './Layout';
import HomePage from '../components/HomePage';
import CreateCompanyForm from '../components/CompanyFormPage/CreateCompanyForm'
import EditCompanyForm from '../components/CompanyFormPage/EditCompanyForm'
import ManageCompanyPage from "../components/ManageCompaniesPage/ManageCompanyPage"
import SingleCompanyPage from '../components/SingleCompanyPage/SingleCompanyPage';

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
    ],
  },
]);