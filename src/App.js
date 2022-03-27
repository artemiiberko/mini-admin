// routes
import { useEffect, useState } from 'react';
import axios from 'axios';
import Router from './routes';
// theme
import ThemeConfig from './theme';
import GlobalStyles from './theme/globalStyles';
// components
import ScrollToTop from './components/ScrollToTop';
import { BaseOptionChartStyle } from './components/charts/BaseOptionChart';
import './App.css';

// ----------------------------------------------------------------------

export default function App() {
  const [login, setLogin] = useState({ userName: '', password: '' });
  const [token, setToken] = useState('');
  const [userName, setUserName] = useState('');
  axios.defaults.withCredentials = true;
  const tokenRequest = () => {
    axios
      .post(`https://wr.raneddo.ml/login`, JSON.stringify(login), {
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        }
      })
      .then((res) => {
        setToken(res.data.access_token);
        setUserName(res.data.username);
        setLogin({ userName: '', password: '' });
      });
  };

  return (
    <ThemeConfig>
      <ScrollToTop />
      <GlobalStyles />
      <BaseOptionChartStyle />
      <Router
        setLogin={setLogin}
        login={login}
        tokenRequest={tokenRequest}
        token={token}
        userName={userName}
        setToken={setToken}
      />
    </ThemeConfig>
  );
}
