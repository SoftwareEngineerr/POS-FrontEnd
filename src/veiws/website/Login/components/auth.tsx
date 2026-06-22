import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { Main } from '../../../../constant';
import { Input } from '../../../../components/input/input';
import { Box, Grid, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginauth } from '../../../../redux/actions/loginauth';
import { CustomBtn } from '../../../../components/button/button';
import Logo from '../../../../components/logo/logo';
import { WebSrnStorage } from '../../../../hooks/FirstTimeWebSrn/Websrn';

// TypeScript interfaces
interface InputField {
  name: string;
  label: string;
  type: string;
  data?: string;
  required?: boolean;
}

interface LoginData {
  inputs: InputField[];
  butn: string;
}

interface RootState {
  Api: {
    Login: string;
  };
}

interface GeoLocation {
  latitude: number;
  longitude: number;
  accuracy: number;
}

const Auth: React.FC = () => {
  const [data] = useState<LoginData>(Main().Login);
  const dispatch = useDispatch<any>();
  const apilink = useSelector((state: RootState) => state.Api.Login);
  const navigate = useNavigate();
  const getWebSrnStorage = WebSrnStorage();

  const [inputValues, setInputValues] = useState<Record<string, string>>(
    Object.fromEntries(data.inputs.map((item) => [item.name, '']))
  );
  const [loginError, setLoginError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [geoLocation, setGeoLocation] = useState<string>('');
  const [blockLogin, setBlockLogin] = useState<boolean>(
    localStorage.getItem('Activated') === 'true'
  );

  // Geolocation fetch
  useEffect(() => {
    const fetchLocation = async () => {
      if (!('geolocation' in navigator)) {
        console.warn('Geolocation not supported');
        return;
      }

      try {
        const position: GeolocationPosition = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0,
          });
        });

        const locationObj: GeoLocation = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
        };

        setGeoLocation(JSON.stringify(locationObj));

        if (position.coords.accuracy <= 5000) {
          setBlockLogin(true);
        } else {
          console.warn('Location accuracy too low:', position.coords.accuracy);
        }
      } catch (error: any) {
        console.warn('Geolocation error:', error.code, error.message);
      }
    };

    fetchLocation();
  }, []);

  // Handle input changes
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Submit login
  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setLoginError('');

    const payload = {
      ...inputValues,
      business_id: getWebSrnStorage,
      api: apilink,
      geoLocation,
    };

    try {
      const result = await dispatch(loginauth(payload));
      if (result?.success) {
        setLoading(false);
        navigate('/Private/Order');
      } else {
        setLoading(false);
        setLoginError('Invalid credentials or login failed.');
      }
    } catch (error: any) {
      console.error('Login error:', error);
      setLoading(false);
      setLoginError('Something went wrong. Please try again.');
    }
  };

  // Format activation date
  const rawDate = localStorage.getItem('ActivationDate');
  const readableDate = rawDate
    ? new Date(rawDate.split('/').reverse().join('-')).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : '';

  return (
    <form onSubmit={handleLogin}>
      <Stack spacing={2.5}>
  <Logo />

  {data.inputs.map((item, index) => (
    <Box key={index}>
      <Typography
        variant="subtitle2"
        fontWeight={600}
        sx={{ mb: 1 }}
      >
        {item.label}
      </Typography>

      <Input
        type={item.type}
        placeholder={item.data}
        required={item.required}
        name={item.name}
        onChange={handleInputChange}
        // style={{
        //   borderRadius: "10px",
        //   padding: "12px",
        //   border: "1px solid #e2e8f0",
        //   width: "100%",
        //   background: "#f8fafc",
        //   transition: "all .2s ease",
        // }}
      />
    </Box>
  ))}

  <CustomBtn
    type="submit"
    data={loading ? "Logging in..." : data.butn}
    disabled={!blockLogin || loading}
    style={{
      borderRadius: "12px",
      padding: "12px",
      fontWeight: 600,
      background: "linear-gradient(135deg,#667eea,#764ba2)",
      color: "white",
    }}
  />

  {loginError && (
    <Typography color="error" variant="body2" textAlign="center">
      {loginError}
    </Typography>
  )}

  {readableDate && (
    <Typography
      variant="caption"
      color="text.secondary"
      textAlign="center"
    >
      Activation expires on: {readableDate}
    </Typography>
  )}
</Stack>
    </form>
  );
};

export default Auth;