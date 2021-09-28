import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { fetchCSRF } from '../request/auth';

const CSRFToken = () => {
  const [csrftoken, setcsrftoken] = useState('');

  const getCookie = (name) => {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i += 1) {
        const cookie = cookies[i].trim();
        if (cookie.substring(0, name.length + 1) === `${name}=`) {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        fetchCSRF().then((res) => {
          console.log(res);
        });
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
    setcsrftoken(getCookie('csrftoken'));
  }, []);

  return <input type="hidden" name="csrfmiddlewaretoken" value={csrftoken} />;
};

export default CSRFToken;
