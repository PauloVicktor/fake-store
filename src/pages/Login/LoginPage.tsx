import { useState, useEffect } from 'react';
import {
    Box,
    Button,
    Container,
    TextField,
    Typography,
    Paper,
    CircularProgress,
    Alert,
    InputAdornment,
    IconButton,
    useTheme,
    useMediaQuery,
    Card,
    CardContent,
    Stack,
    Divider,
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import { motion } from 'framer-motion'; // Assuma que framer-motion está instalado
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const navigate = useNavigate();

    const { login, loading, error, isAuthenticated } = useAuth();

    // Redireciona se já estiver autenticado
    useEffect(() => {
        if (isAuthenticated) {
            navigate('/products');
        }
    }, [isAuthenticated, navigate]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (username.trim() === '' || password.trim() === '') {
            return;
        }

        try {
            await login(username, password);
        } catch (err) {
            console.error('Erro no submit do login:', err);
        }
    };

    const handleTogglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <Container component="main" maxWidth="lg" sx={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Card
                component={motion.div}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                sx={{
                    width: '100%',
                    maxWidth: 1000,
                    borderRadius: 4,
                    overflow: 'hidden',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
                    display: 'flex',
                    flexDirection: isMobile ? 'column' : 'row',
                    background: 'linear-gradient(135deg, #1E1E1E 0%, #2D2D2D 100%)',
                }}
            >
                {/* Seção à esquerda - Banner/Imagem */}
                {!isMobile && (
                    <Box
                        sx={{
                            flex: 1,
                            background: 'linear-gradient(135deg, #6A38E8 0%, #BB86FC 100%)',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            p: 6,
                            color: 'white',
                            position: 'relative',
                            overflow: 'hidden',
                        }}
                    >
                        <ShoppingBagOutlinedIcon sx={{ fontSize: 80, mb: 3 }} />
                        <Typography variant="h3" fontWeight="bold" gutterBottom>
                            NebulaStore
                        </Typography>
                        <Typography variant="h6" align="center" sx={{ opacity: 0.9 }}>
                            Descubra produtos incríveis em um novo universo de compras
                        </Typography>

                        {/* Elementos decorativos */}
                        <Box
                            sx={{
                                position: 'absolute',
                                width: 300,
                                height: 300,
                                borderRadius: '50%',
                                background: 'rgba(255,255,255,0.1)',
                                top: -100,
                                left: -100,
                                zIndex: 0
                            }}
                        />
                        <Box
                            sx={{
                                position: 'absolute',
                                width: 200,
                                height: 200,
                                borderRadius: '50%',
                                background: 'rgba(255,255,255,0.1)',
                                bottom: -50,
                                right: -50,
                                zIndex: 0
                            }}
                        />
                    </Box>
                )}

                {/* Seção à direita - Formulário de Login */}
                <Box
                    sx={{
                        flex: 1,
                        p: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                    }}
                >
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                        <LockOutlinedIcon sx={{ color: theme.palette.primary.main, mr: 1, fontSize: 28 }} />
                        <Typography component="h1" variant="h4" fontWeight="bold">
                            Login
                        </Typography>
                    </Box>

                    {error && (
                        <Alert
                            severity="error"
                            sx={{
                                mb: 3,
                                borderRadius: 2,
                                bgcolor: 'rgba(207, 102, 121, 0.1)',
                                color: theme.palette.error.main,
                                '& .MuiAlert-icon': {
                                    color: theme.palette.error.main
                                }
                            }}
                        >
                            {error}
                        </Alert>
                    )}

                    <Box component="form" onSubmit={handleSubmit} noValidate>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Nome de usuário"
                            name="username"
                            autoComplete="username"
                            autoFocus
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            disabled={loading}
                            variant="outlined"
                            sx={{
                                mb: 3,
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': {
                                        borderColor: 'rgba(255, 255, 255, 0.2)',
                                    },
                                    '&:hover fieldset': {
                                        borderColor: 'rgba(187, 134, 252, 0.5)',
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: theme.palette.primary.main,
                                    },
                                },
                            }}
                        />

                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Senha"
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                            autoComplete="current-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            disabled={loading}
                            sx={{ mb: 4 }}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleTogglePasswordVisibility}
                                            edge="end"
                                            sx={{ color: 'rgba(255, 255, 255, 0.7)' }}
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            disabled={loading}
                            sx={{
                                py: 1.5,
                                background: 'linear-gradient(90deg, #6A38E8 0%, #BB86FC 100%)',
                                color: 'white',
                                fontWeight: 'bold',
                                fontSize: '1rem',
                                '&:hover': {
                                    background: 'linear-gradient(90deg, #5B2FD3 0%, #A76FEA 100%)',
                                },
                                transition: 'all 0.3s ease',
                                boxShadow: '0 4px 20px rgba(187, 134, 252, 0.3)',
                            }}
                        >
                            {loading ? <CircularProgress size={24} sx={{ color: 'white' }} /> : 'Entrar'}
                        </Button>

                        <Divider sx={{ my: 4, bgcolor: 'rgba(255, 255, 255, 0.1)' }} />

                        <Stack spacing={1} alignItems="center">
                            <Typography variant="subtitle1" fontWeight="medium" color="primary" sx={{ mb: 1 }}>
                                Credenciais de Teste
                            </Typography>
                            <Box sx={{
                                bgcolor: 'rgba(187, 134, 252, 0.1)',
                                borderRadius: 2,
                                p: 2,
                                width: '100%',
                                border: '1px solid rgba(187, 134, 252, 0.2)',
                            }}>
                                <Typography variant="body2" sx={{ mb: 1 }}>
                                    <strong>Usuário:</strong> mor_2314
                                </Typography>
                                <Typography variant="body2">
                                    <strong>Senha:</strong> 83r5^_
                                </Typography>
                            </Box>
                        </Stack>
                    </Box>
                </Box>
            </Card>
        </Container>
    );
};

export default LoginPage;