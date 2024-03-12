import React from "react";
import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import Job from "./pages/job/Job";
import JobDetail from "./pages/job/JobDetail";
import { SnackbarProvider } from "notistack";

const roots = document.getElementById("root");
const root = createRoot(roots);

root.render(
  <Router>
    <SnackbarProvider maxSnack={3}>
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/jobs" element={<Job />}></Route>
        <Route path="/jobs-detail" element={<JobDetail />}>
          <Route path=":id" element={<JobDetail />}></Route>
        </Route>
      </Routes>
    </SnackbarProvider>
  </Router>
);
