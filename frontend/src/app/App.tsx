import { BrowserRouter, Route, Routes } from 'react-router-dom';

import '@/shared';
import { ThemeProvider } from '@emotion/react';
import { CombineLayout, MainLayout } from './layouts';
import { useAppDispatch, useAppSelector } from './model/store';
import { lightTheme, darkTheme, typography } from './model/data';

import {
  CompanyPage,
  DashboardPage,
  ResponsesPage,
  NotFoundPage,
  ProfilePage,
  ReportsPage,
  UsersPage,
  VacanciesPage,
  SignUpPage,
  SignInPage,
  EmailVerificationPage,
  ChangePasswordPage,
  VacancyPage,
  AuthSuccess,
  ContactPage,
} from '@/pages';
import { useEffect } from 'react';
import { fetchPing } from '@/features';
import { getUser } from '@/entities';
import ProtectedRoute from '@/shared/ui/ProtectedRoute';

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchPing());
  }, [dispatch]);

  const authStatus = useAppSelector(state => state.authReducer.status);

  useEffect(() => {
    if (authStatus === 'success') {
      dispatch(getUser());
    }
  }, [authStatus, dispatch]);

  const theme = useAppSelector(state => state.themeReducer.theme);
  return (
    <ThemeProvider theme={{ ...(theme === 'light' ? lightTheme : darkTheme), typography }}>
      <BrowserRouter>
        <Routes>
          {/* Pages with NavBar */}
          <Route
            path="/"
            element={<MainLayout />}
          >
            <Route
              path="/sign-up"
              element={<SignUpPage />}
            />
            <Route
              path="/sign-in"
              element={<SignInPage />}
            />
            <Route
              path="/email-verification"
              element={<EmailVerificationPage />}
            />
            <Route
              path="/change-password"
              element={<ChangePasswordPage />}
            />
            <Route
              path="/contact"
              element={<ContactPage />}
            />
            {/* Pages with SideBar and Navbar */}

            <Route
              path="/"
              element={<CombineLayout />}
            >
              {/*Pages available only to admin */}
              <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
                <Route
                  path="/users"
                  element={<UsersPage />}
                />
                <Route
                  path="/dashboard"
                  element={<DashboardPage />}
                />
                <Route
                  path="/reports"
                  element={<ReportsPage />}
                />
              </Route>
              {/*Pages available to employer and admin */}
              <Route element={<ProtectedRoute allowedRoles={['employer', 'admin']} />}>
                <Route
                  path="/company"
                  element={<CompanyPage />}
                />
              </Route>
              {/*Pages available only to registered users */}
              <Route element={<ProtectedRoute />}>
                <Route
                  path="/profile"
                  element={<ProfilePage />}
                />
                <Route
                  path="/responses"
                  element={<ResponsesPage />}
                />
              </Route>
              <Route
                path="*"
                element={<NotFoundPage />}
              />
              <Route
                path="/"
                element={<VacanciesPage />}
              />
              <Route
                path="/vacancies"
                element={<VacanciesPage />}
              />
              <Route
                path="/vacancy/:id"
                element={<VacancyPage />}
              />
              <Route
                path="/auth/success"
                element={<AuthSuccess />}
              />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
