import Dashboard from "../components/pages/Home/Dashboard";
import Users from "../components/pages/Home/Users"
import News from "../components/pages/Home/News";
import Faq from "../components/pages/Home/Faq";
import Exam from '../components/pages/Home/Exam'
import Ranking from "../components/pages/Home/Ranking";
import Survey from "../components/pages/Home/Survey"
import Order from "../components/pages/Home/Order"
import Material from "../components/pages/Home/Material"


import Cloud from '@material-ui/icons/Cloud';
import SupervisorAccount from '@material-ui/icons/SupervisorAccount';
import Person from "@material-ui/icons/Person";
import ExitToApp from "@material-ui/icons/ExitToApp";

import { logout } from "../store/actions/auth";


const homeRoutes = [
    {
      path: "/home/dashboard",
      sidebarName: "Dashboard",
      navbarName: "Dashboard",
      icon: Cloud,
      component: Dashboard
    },
    {
      path: "/home/users",
      sidebarName: "User Management",
      navbarName: "User Management",
      icon: SupervisorAccount,
      component: Users
    },
    
    {
      path: "/home/news",
      sidebarName: "News",
      navbarName: "News ",
      icon: Person,
      component: News
    },
    {
      path: "/home/faq",
      sidebarName: "FAQ",
      navbarName: "FAQ",
      icon: Person,
      component: Faq
    },
    {
      path: "/home/material",
      sidebarName: "Materials",
      navbarName: "Materials",
      icon: Person,
      component: Material
    },
    {
      path: "/home/exam",
      sidebarName: "Exam",
      navbarName: "Exam",
      icon: Person,
      component: Exam
    },
    // {
    //   path: "/home/ranking",
    //   sidebarName: "Ranking",
    //   navbarName: "Ranking",
    //   icon: Person,
    //   component: Ranking
    // },
    {
      path: "/home/survey",
      sidebarName: "Survey",
      navbarName: "Survey",
      icon: Person,
      component: Survey
    },
    // {
    //   path: "/home/order",
    //   sidebarName: "Order",
    //   navbarName: "Order",
    //   icon: Person,
    //   component: Order
    // },
    {
      path: "/home/logout",
      sidebarName: "Log Out",
      navbarName: "Log Out",
      icon: ExitToApp,
      component: logout
    },

    { redirect: true, path: "/home", to: "/home/dashboard", navbarName: "Redirect" }
];

export default homeRoutes

  