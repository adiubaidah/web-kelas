import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { lazy, Suspense } from "react";
import { Provider } from "react-redux";
import ToasterProvider from "./components/layout/Toaster";

import { store } from "./reducers/store";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Home from "./pages/Home/Home";
import Loader from "./fragments/Loader";
import ProtectedRoute from "./components/layout/ProtectedRoute";
import UnauthorizedRoute from "./components/layout/UnauthorizedRoute";

//For User
const Members = lazy(() => import("./pages/Members/Members"));
const MemberDetails = lazy(() => import("./pages/MemberDetails/MemberDetails"));

//For Admin
const Admin = lazy(()=> import("./pages/Admin/Dashboard"))
const EditMember = lazy(() => import("./pages/Admin/members/EditMember"));
const AddMember = lazy(() => import("./pages/Admin/members/AddMember"));
const Login = lazy(() => import("./pages/Admin/Login"));
const AdminMembers = lazy(() => import("./pages/Admin/members/Members"));
const Event = lazy(()=> import("./pages/Admin/events/Event"));
const GalleryAdmin = lazy(()=> import("./pages/Admin/galleries/Gallery"));

function App() {
  return (
    <Provider store={store}>
      <ToasterProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Wrapper />}>
              <Route path="/" element={<Home />} />
              <Route
                path="/anggota"
                element={
                  <Suspense fallback={<Loader />}>
                    <Members />
                  </Suspense>
                }
              />
              <Route
                path="/anggota/:slug"
                element={
                  <Suspense fallback={<Loader />}>
                    <MemberDetails />
                  </Suspense>
                }
              />
              <Route element={<UnauthorizedRoute />}>
                <Route
                  path="/login"
                  element={
                    <Suspense fallback={<Loader />}>
                      <Login />
                    </Suspense>
                  }
                />
              </Route>
            </Route>
            <Route element={<ProtectedRoute redirectPath="/login" />}>
              
              <Route
                path="/admin"
                element={
                  <Suspense fallback={<Loader />}>
                    <Admin />
                  </Suspense>
                }
              />
              
              <Route
                path="/admin/member"
                element={
                  <Suspense fallback={<Loader />}>
                    <AdminMembers />
                  </Suspense>
                }
              />
              <Route
                path="/admin/add-member"
                element={
                  <Suspense fallback={<Loader />}>
                    <AddMember />
                  </Suspense>
                }
              />
              <Route
                path="/admin/edit-member/:id"
                element={
                  <Suspense fallback={<Loader />}>
                    <EditMember />
                  </Suspense>
                }
              />
               <Route
                path="/admin/event"
                element={
                  <Suspense fallback={<Loader />}>
                    <Event />
                  </Suspense>
                }
              />
               <Route
                path="/admin/event/:eventId/gallery"
                element={
                  <Suspense fallback={<Loader />}>
                    <GalleryAdmin />
                  </Suspense>
                }
              />
            </Route>
          </Routes>
        </BrowserRouter>
      </ToasterProvider>
    </Provider>
  );
}

function Wrapper() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}
export default App;
