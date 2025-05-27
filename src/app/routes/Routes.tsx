import { Routes, Route } from 'react-router-dom';
import React from 'react';

import DefaultLayout from '@app/layouts/DefaultLayout';
import { AuthPage, DashboardPage, OtherPage, ProfilePage } from '@pages/index';

const RoutesList = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <DefaultLayout type="wide">
            <DashboardPage />
          </DefaultLayout>
        }
      />
      <Route
        path="/auth"
        element={
          <DefaultLayout>
            <AuthPage />
          </DefaultLayout>
        }
      />
      <Route
        path="/profile"
        element={
          <DefaultLayout>
            <ProfilePage />
          </DefaultLayout>
        }
      />
      <Route
        path="/other"
        element={
          <DefaultLayout>
            <OtherPage />
          </DefaultLayout>
        }
      />
    </Routes>
  );
};

export default RoutesList;
