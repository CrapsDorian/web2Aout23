import HomePage from '../Pages/HomePage';
import Login from '../Pages/Login';
import Register from  '../Pages/Register';
import AddFilms from  '../Pages/AddFIlms';
import logout from '../logout/logout';


const routes = {
  '/': HomePage,
  '/login': Login,
  '/register': Register,
  '/addFilms': AddFilms,
  '/logout': logout,
};

export default routes;
