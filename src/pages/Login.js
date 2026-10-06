import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import { useAuth } from '../context/AuthContext';

/**
 * Editorial Login page:
 * - Desktop split layout: cinematic backdrop on left, understated form on right
 * - No card shadows, no gradient buttons
 * - Human copy
 */
const Login = () => {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [authError, setAuthError] = useState('');

  const from = location.state?.from?.pathname || '/';

  React.useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from]);

  const validate = () => {
    const errs = {};
    if (!username.trim()) {
      errs.username = 'Username is required';
    }
    if (!password.trim()) {
      errs.password = 'Password is required';
    } else if (password.length < 4) {
      errs.password = 'Password must be at least 4 characters';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setAuthError('');

    if (!validate()) return;

    const result = login(username, password);
    if (result.success) {
      navigate(from, { replace: true });
    } else {
      setAuthError(result.message || 'Invalid credentials');
    }
  };

  const demoUser = process.env.REACT_APP_DEMO_USER || 'demo';
  const demoPass = process.env.REACT_APP_DEMO_PASS || 'password123';

  return (
    <Box
      sx={{
        minHeight: 'calc(100vh - 56px)',
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
      }}
    >
      {/* Left side: Cinematic visual column (desktop only) */}
      <Box
        sx={{
          display: { xs: 'none', md: 'flex' },
          flex: '1 1 50%',
          position: 'relative',
          backgroundColor: '#0E0E0F',
          backgroundImage:
            'url(https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1600&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          p: 6,
          '&::before': {
            content: '""',
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(to top, rgba(14, 14, 15, 0.95) 0%, rgba(14, 14, 15, 0.4) 60%, rgba(14, 14, 15, 0.6) 100%)',
          },
        }}
      >
        <Box sx={{ position: 'relative', zIndex: 1, maxWidth: 480, color: '#F2F1ED' }}>
          <Typography
            variant="h2"
            sx={{
              fontFamily: '"Instrument Serif", Georgia, serif',
              fontSize: '3rem',
              lineHeight: 1.1,
              mb: 1.5,
            }}
          >
            The Cinema Archive
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: 'rgba(242, 241, 237, 0.75)',
              lineHeight: 1.6,
            }}
          >
            Curate your collection, explore weekly festival picks, and track credits from
            thousands of productions worldwide.
          </Typography>
        </Box>
      </Box>

      {/* Right side: Understated login form */}
      <Box
        sx={{
          flex: '1 1 50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: { xs: 3, sm: 6, md: 8 },
        }}
      >
        <Box sx={{ width: '100%', maxWidth: 380 }}>
          <Typography
            variant="h3"
            component="h1"
            sx={{
              fontFamily: '"Instrument Serif", Georgia, serif',
              fontSize: '2.5rem',
              mb: 0.5,
            }}
          >
            Sign in
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3 }}>
            Enter your credentials to continue
          </Typography>

          {authError && (
            <Alert
              severity="error"
              sx={{
                mb: 2.5,
                borderRadius: '4px',
                fontSize: '0.85rem',
              }}
              onClose={() => setAuthError('')}
            >
              {authError}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit} noValidate>
            <TextField
              margin="dense"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                if (errors.username) setErrors((prev) => ({ ...prev, username: '' }));
              }}
              error={Boolean(errors.username)}
              helperText={errors.username}
              sx={{ mb: 1.5 }}
            />

            <TextField
              margin="dense"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (errors.password) setErrors((prev) => ({ ...prev, password: '' }));
              }}
              error={Boolean(errors.password)}
              helperText={errors.password}
              sx={{ mb: 2.5 }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="medium"
              sx={{
                py: 1.1,
                fontSize: '0.9rem',
                fontWeight: 600,
                borderRadius: '4px',
                mb: 3,
              }}
            >
              Sign in
            </Button>

            {/* Understated Demo credentials note */}
            <Box
              sx={{
                p: 2,
                borderRadius: '4px',
                border: 1,
                borderColor: 'divider',
                backgroundColor: 'background.paper',
              }}
            >
              <Typography
                variant="caption"
                sx={{
                  color: 'text.secondary',
                  display: 'block',
                  mb: 1,
                  lineHeight: 1.5,
                }}
              >
                <strong>Demo credentials:</strong>
                <br />
                User: <code>{demoUser}</code> &nbsp;·&nbsp; Pass: <code>{demoPass}</code>
              </Typography>
              <Button
                size="small"
                variant="outlined"
                onClick={() => {
                  setUsername(demoUser);
                  setPassword(demoPass);
                  setErrors({});
                  setAuthError('');
                }}
                sx={{
                  fontSize: '0.75rem',
                  py: 0.25,
                  px: 1,
                  borderColor: 'divider',
                }}
              >
                Autofill demo credentials
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
