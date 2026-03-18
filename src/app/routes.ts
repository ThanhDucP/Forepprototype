import { createBrowserRouter } from "react-router";
import Root from "./components/Root";
import Login from "./pages/Login";
import Register from "./pages/Register";
import EmployeeDashboard from "./pages/employee/Dashboard";
import TimeAttendance from "./pages/employee/TimeAttendance";
import PerformanceView from "./pages/employee/Performance";
import LearningDevelopment from "./pages/employee/Learning";
import CareerPath from "./pages/employee/CareerPathEnhanced";
import PayrollView from "./pages/employee/Payroll";
import ManagerDashboard from "./pages/manager/DashboardEnhanced";
import TeamPerformance from "./pages/manager/TeamPerformanceEnhanced";
import HRDashboard from "./pages/hr/Dashboard";
import EmployeeManagement from "./pages/hr/EmployeeManagement";
import OrgChart from "./pages/hr/OrgChartEnhanced";
import PayrollManagement from "./pages/hr/PayrollManagement";
import Onboarding from "./pages/hr/Onboarding";
import LeaveRequests from "./pages/hr/LeaveRequests";
import Contracts from "./pages/hr/Contracts";
import CEODashboard from "./pages/ceo/DashboardEnhanced";
import AdminDashboard from "./pages/admin/DashboardEnhanced";
import UserManagement from "./pages/admin/UserManagement";
import SystemConfig from "./pages/admin/SystemConfig";
import NotFound from "./pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Login },
      { path: "login", Component: Login },
      { path: "register", Component: Register },
      
      // Employee routes
      { path: "employee/dashboard", Component: EmployeeDashboard },
      { path: "employee/attendance", Component: TimeAttendance },
      { path: "employee/performance", Component: PerformanceView },
      { path: "employee/learning", Component: LearningDevelopment },
      { path: "employee/career", Component: CareerPath },
      { path: "employee/payroll", Component: PayrollView },
      
      // Manager routes
      { path: "manager/dashboard", Component: ManagerDashboard },
      { path: "manager/team", Component: TeamPerformance },
      
      // HR routes
      { path: "hr/dashboard", Component: HRDashboard },
      { path: "hr/employees", Component: EmployeeManagement },
      { path: "hr/org-chart", Component: OrgChart },
      { path: "hr/payroll", Component: PayrollManagement },
      { path: "hr/onboarding", Component: Onboarding },
      { path: "hr/leave-requests", Component: LeaveRequests },
      { path: "hr/contracts", Component: Contracts },
      
      // CEO routes
      { path: "ceo/dashboard", Component: CEODashboard },
      
      // Admin routes
      { path: "admin/dashboard", Component: AdminDashboard },
      { path: "admin/users", Component: UserManagement },
      { path: "admin/config", Component: SystemConfig },
      
      { path: "*", Component: NotFound },
    ],
  },
]);