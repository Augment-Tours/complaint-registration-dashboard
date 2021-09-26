import { useEffect, useState } from 'react';
// routes
import Router from './routes';
// theme
import ThemeConfig from './theme';
// components
import ScrollToTop from './components/ScrollToTop';
import { UserContext } from './utils/context';
import { loggedInProfile } from './request/auth';

// ----------------------------------------------------------------------

export default function App() {
  const [user, setUser] = useState({});

  useEffect(() => {
    loggedInProfile()
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <ThemeConfig>
      <UserContext.Provider value={{ user, setUser }}>
        <ScrollToTop />
        <Router />
      </UserContext.Provider>
    </ThemeConfig>
  );
}
