import { createBrowserRouter } from "react-router";
import Root from "./components/Root";
import Login from "./pages/Login";
import Register from "./pages/Register";

// Employee pages
import EmployeeDashboard from "./pages/employee/Dashboard";
import WorkProfile from "./pages/employee/WorkProfile";
import PerformanceView from "./pages/employee/Performance";
import Skills from "./pages/employee/Skills";
import LearningDevelopment from "./pages/employee/Learning";
import CareerPath from "./pages/employee/Career";

// Lead pages
import LeadDashboard from "./pages/lead/Dashboard";
import LeadTeam from "./pages/lead/Team";
import OneOnOne from "./pages/lead/OneOnOne";

// HR pages
import HRDashboard from "./pages/hr/Dashboard";
import EmployeeManagement from "./pages/hr/EmployeeManagement";
import SkillFramework from "./pages/hr/SkillFramework";
import Programs from "./pages/hr/Programs";
import OrgChart from "./pages/hr/OrgChartEnhanced";

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
      { path: "employee/work-profile", Component: WorkProfile },
      { path: "employee/performance", Component: PerformanceView },
      { path: "employee/skills", Component: Skills },
      { path: "employee/learning", Component: LearningDevelopment },
      { path: "employee/career", Component: CareerPath },
      
      // Lead routes
      { path: "lead/dashboard", Component: LeadDashboard },
      { path: "lead/team", Component: LeadTeam },
      { path: "lead/one-on-one", Component: OneOnOne },
      
      // HR routes
      { path: "hr/dashboard", Component: HRDashboard },
      { path: "hr/employees", Component: EmployeeManagement },
      { path: "hr/skill-framework", Component: SkillFramework },
      { path: "hr/programs", Component: Programs },
      { path: "hr/org-chart", Component: OrgChart },
      
      { path: "*", Component: NotFound },
    ],
  },
]);
