import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Box,
    Container,
    Typography,
    CircularProgress,
    Card,
    CardMedia,
    Button,
    Chip,
    Divider,
    AppBar,
    Toolbar,
    IconButton,
    Grid,
    Paper,
    Alert,
    Rating,
    Stack,
    Breadcrumbs,
    Badge,
    Tab,
    Tabs,
    useTheme,
    useMediaQuery,
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    ListItemButton,
    Avatar,
    Link
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import AssignmentReturnIcon from '@mui/icons-material/AssignmentReturn';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import DashboardIcon from '@mui/icons-material/Dashboard';
import NotificationsIcon from '@mui/icons-material/Notifications';
import LogoutIcon from '@mui/icons-material/Logout';
import NightsStayIcon from '@mui/icons-material/NightsStay';
import LightModeIcon from '@mui/icons-material/LightMode';
import StarIcon from '@mui/icons-material/Star';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { motion } from 'framer-motion'; // Assuma que framer-motion está instalado

import { fetchProductById } from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme as useAppTheme } from '../../contexts/ThemeContext';

interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating?: {
        rate: number;
        count: number;
    };
}

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`product-tabpanel-${index}`}
            aria-labelledby={`product-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ pt: 3 }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

const ProductDetailPage = () => {
    const { id } = useParams<{ id: string }>();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [tabValue, setTabValue] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const navigate = useNavigate();
    const { logout } = useAuth();
    const { theme: appTheme, toggleTheme } = useAppTheme();

    const drawerWidth = 280;

    useEffect(() => {
        const getProductDetails = async () => {
            if (!id) return;

            try {
                setLoading(true);
                const data = await fetchProductById(id);
                setProduct(data);
                setError(null);
            } catch (err) {
                console.error(`Failed to fetch product ${id}:`, err);
                setError('Falha ao carregar detalhes do produto. Por favor, tente novamente.');
            } finally {
                setLoading(false);
            }
        };

        getProductDetails();
    }, [id]);

    const handleLogout = () => {
        logout();
    };

    const handleDrawerToggle = () => {
        setDrawerOpen(!drawerOpen);
    };

    const handleBackToProducts = () => {
        navigate('/products');
    };

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };

    const handleQuantityChange = (delta: number) => {
        setQuantity(prev => Math.max(1, prev + delta));
    };

    const getCategoryColor = (category: string) => {
        const categories: Record<string, string> = {
            "men's clothing": theme.palette.success.main,
            "women's clothing": theme.palette.error.main,
            "electronics": theme.palette.info.main,
            "jewelery": theme.palette.warning.main
        };
        return categories[category] || theme.palette.primary.main;
    };

    const categoryChip = (category: string) => (
        <Chip
            size="small"
            label={category}
            sx={{
                backgroundColor: `${getCategoryColor(category)}20`, // 20% opacity
                color: getCategoryColor(category),
                borderRadius: '4px',
                fontWeight: 500,
                fontSize: '0.7rem'
            }}
        />
    );

    const drawer = (
        <Box
            sx={{
                width: drawerWidth,
                height: '100%',
                p: 2,
                background: theme.palette.background.paper
            }}
        >
            {/* Logo and Title */}
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 4, px: 2 }}>
                <ShoppingBagIcon color="primary" sx={{ fontSize: 32, mr: 1 }} />
                <Typography variant="h5" fontWeight="bold" color="primary">
                    NebulaStore
                </Typography>
            </Box>

            {/* User Profile */}
            <Box sx={{ px: 2, mb: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Avatar
                        src="https://api.dicebear.com/6.x/avataaars/svg?seed=Alex"
                        sx={{ width: 56, height: 56, mr: 2, border: '2px solid', borderColor: theme.palette.primary.main }}
                    />
                    <Box>
                        <Typography variant="h6" fontWeight="bold">Alex Johnson</Typography>
                        <Typography variant="body2" color="text.secondary">Cliente Premium</Typography>
                    </Box>
                </Box>
            </Box>

            {/* Navigation */}
            <List sx={{ px: 1 }}>
                <ListItem disablePadding sx={{ mb: 1 }}>
                    <ListItemButton
                        sx={{
                            borderRadius: 2,
                            '&:hover': {
                                backgroundColor: `${theme.palette.primary.main}10`
                            }
                        }}
                    >
                        <ListItemIcon>
                            <DashboardIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText primary="Dashboard" />
                    </ListItemButton>
                </ListItem>

                <ListItem disablePadding sx={{ mb: 1 }}>
                    <ListItemButton
                        onClick={handleBackToProducts}
                        sx={{
                            borderRadius: 2,
                            backgroundColor: `${theme.palette.primary.main}20`,
                            '&:hover': {
                                backgroundColor: `${theme.palette.primary.main}30`
                            }
                        }}
                    >
                        <ListItemIcon>
                            <ShoppingBagIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText primary="Produtos" primaryTypographyProps={{ fontWeight: 'bold' }} />
                    </ListItemButton>
                </ListItem>

                <ListItem disablePadding sx={{ mb: 1 }}>
                    <ListItemButton
                        sx={{
                            borderRadius: 2,
                            '&:hover': {
                                backgroundColor: `${theme.palette.primary.main}10`
                            }
                        }}
                    >
                        <ListItemIcon>
                            <FavoriteIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText primary="Favoritos" />
                    </ListItemButton>
                </ListItem>
            </List>

            <Divider sx={{ my: 2, backgroundColor: 'rgba(255,255,255,0.1)' }} />

            {/* Settings and Logout */}
            <List sx={{ px: 1 }}>
                <ListItem disablePadding sx={{ mb: 1 }}>
                    <ListItemButton
                        onClick={toggleTheme}
                        sx={{
                            borderRadius: 2,
                            '&:hover': {
                                backgroundColor: `${theme.palette.primary.main}10`
                            }
                        }}
                    >
                        <ListItemIcon>
                            {appTheme === 'dark' ? (
                                <LightModeIcon color="primary" />
                            ) : (
                                <NightsStayIcon color="primary" />
                            )}
                        </ListItemIcon>
                        <ListItemText primary={appTheme === 'dark' ? "Modo Claro" : "Modo Escuro"} />
                    </ListItemButton>
                </ListItem>

                <ListItem disablePadding>
                    <ListItemButton
                        onClick={handleLogout}
                        sx={{
                            borderRadius: 2,
                            '&:hover': {
                                backgroundColor: theme.palette.error.dark,
                                color: 'white'
                            }
                        }}
                    >
                        <ListItemIcon>
                            <LogoutIcon color="error" />
                        </ListItemIcon>
                        <ListItemText primary="Logout" primaryTypographyProps={{ color: theme.palette.error.main }} />
                    </ListItemButton>
                </ListItem>
            </List>
        </Box>
    );

    return (
        <Box sx={{ display: 'flex', minHeight: '100vh' }}>
            {/* AppBar */}
            <AppBar
                position="fixed"
                sx={{
                    zIndex: theme.zIndex.drawer + 1,
                    backgroundImage: 'linear-gradient(90deg, #6A38E8 0%, #BB86FC 100%)',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.15)'
                }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { md: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>

                    <ShoppingBagIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontWeight: 700,
                            letterSpacing: '.1rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        NEBULASTORE
                    </Typography>

                    <Box sx={{ flexGrow: 1 }} />

                    {/* Action buttons */}
                    <Box sx={{ display: 'flex' }}>
                        <IconButton color="inherit">
                            <Badge badgeContent={3} color="error">
                                <NotificationsIcon />
                            </Badge>
                        </IconButton>
                        <IconButton color="inherit">
                            <Badge badgeContent={4} color="error">
                                <ShoppingCartIcon />
                            </Badge>
                        </IconButton>
                        {!isMobile && (
                            <Button
                                color="inherit"
                                onClick={handleLogout}
                                startIcon={<LogoutIcon />}
                                sx={{ ml: 2 }}
                            >
                                Logout
                            </Button>
                        )}
                    </Box>
                </Toolbar>
            </AppBar>

            {/* Drawer */}
            <Box
                component="nav"
                sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
            >
                {/* Mobile drawer */}
                <Drawer
                    variant="temporary"
                    open={drawerOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{ keepMounted: true }}
                    sx={{
                        display: { xs: 'block', md: 'none' },
                        '& .MuiDrawer-paper': { width: drawerWidth, boxSizing: 'border-box' },
                    }}
                >
                    {drawer}
                </Drawer>

                {/* Desktop drawer */}
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', md: 'block' },
                        '& .MuiDrawer-paper': { width: drawerWidth, boxSizing: 'border-box', borderRight: '1px solid rgba(255,255,255,0.1)' },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>

            {/* Main content */}
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    width: { md: `calc(100% - ${drawerWidth}px)` },
                    marginTop: '64px', // AppBar height
                }}
            >
                <Container maxWidth="xl" sx={{ py: 4 }}>
                    {/* Breadcrumbs */}
                    <Breadcrumbs
                        separator={<NavigateNextIcon fontSize="small" />}
                        aria-label="breadcrumb"
                        sx={{ mb: 3 }}
                    >
                        <Link
                            color="inherit"
                            href="#"
                            onClick={(e) => { e.preventDefault(); navigate('/products'); }}
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                textDecoration: 'none',
                                '&:hover': { color: theme.palette.primary.main }
                            }}
                        >
                            <ShoppingBagIcon sx={{ mr: 0.5 }} fontSize="small" />
                            Produtos
                        </Link>
                        {product && (
                            <Typography color="text.primary">
                                {product.title.length > 30 ? `${product.title.substring(0, 30)}...` : product.title}
                            </Typography>
                        )}
                    </Breadcrumbs>

                    {/* Error message */}
                    {error && (
                        <Alert
                            severity="error"
                            sx={{
                                mb: 4,
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

                    {/* Loading indicator */}
                    {loading ? (
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
                            <CircularProgress color="primary" size={60} thickness={4} />
                        </Box>
                    ) : product ? (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            <Card
                                sx={{
                                    borderRadius: 4,
                                    boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
                                    overflow: 'hidden',
                                    background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
                                    backdropFilter: 'blur(10px)',
                                    border: '1px solid rgba(255,255,255,0.1)'
                                }}
                            >
                                <Grid container>
                                    {/* Product Image */}
                                    <Grid item xs={12} md={6} lg={5}>
                                        <Box sx={{ p: 4, display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                                            <Paper
                                                elevation={0}
                                                sx={{
                                                    width: '100%',
                                                    height: 500,
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    position: 'relative',
                                                    borderRadius: 3,
                                                    overflow: 'hidden',
                                                    backgroundColor: 'rgba(255,255,255,0.05)',
                                                    boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.1)',
                                                }}
                                            >
                                                <CardMedia
                                                    component="img"
                                                    image={product.image}
                                                    alt={product.title}
                                                    sx={{
                                                        p: 4,
                                                        objectFit: 'contain',
                                                        maxHeight: '100%',
                                                        maxWidth: '100%',
                                                        filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.2))',
                                                    }}
                                                />
                                                {/* Category badge */}
                                                <Box sx={{ position: 'absolute', top: 16, left: 16 }}>
                                                    {categoryChip(product.category)}
                                                </Box>
                                            </Paper>
                                        </Box>
                                    </Grid>

                                    {/* Product Details */}
                                    <Grid item xs={12} md={6} lg={7}>
                                        <Box sx={{ p: 4 }}>
                                            <motion.div
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.5, delay: 0.2 }}
                                            >
                                                <Typography variant="h4" component="h1" fontWeight="bold" gutterBottom>
                                                    {product.title}
                                                </Typography>
                                            </motion.div>

                                            <motion.div
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.5, delay: 0.3 }}
                                            >
                                                {product.rating && (
                                                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                                        <Rating
                                                            value={product.rating.rate}
                                                            precision={0.5}
                                                            readOnly
                                                            icon={<StarIcon fontSize="inherit" sx={{ color: theme.palette.warning.main }} />}
                                                            emptyIcon={<StarIcon fontSize="inherit" sx={{ opacity: 0.5 }} />}
                                                        />
                                                        <Typography variant="body2" sx={{ ml: 1, color: theme.palette.text.secondary }}>
                                                            ({product.rating.count} avaliações)
                                                        </Typography>
                                                    </Box>
                                                )}
                                            </motion.div>

                                            <motion.div
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.5, delay: 0.4 }}
                                            >
                                                <Typography
                                                    variant="h3"
                                                    component="p"
                                                    color="primary"
                                                    fontWeight="bold"
                                                    sx={{ mt: 2, mb: 3 }}
                                                >
                                                    ${product.price.toFixed(2)}
                                                </Typography>
                                            </motion.div>

                                            <Divider sx={{ mb: 3, borderColor: 'rgba(255,255,255,0.1)' }} />

                                            <motion.div
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.5, delay: 0.5 }}
                                            >
                                                <Tabs
                                                    value={tabValue}
                                                    onChange={handleTabChange}
                                                    aria-label="product tabs"
                                                    sx={{
                                                        '& .MuiTabs-indicator': {
                                                            backgroundColor: theme.palette.primary.main,
                                                        },
                                                        '& .MuiTab-root': {
                                                            textTransform: 'none',
                                                            fontWeight: 600,
                                                            fontSize: '0.9rem',
                                                            minWidth: 'auto',
                                                            marginRight: 4,
                                                            '&.Mui-selected': {
                                                                color: theme.palette.primary.main,
                                                            },
                                                        },
                                                    }}
                                                >
                                                    <Tab label="Descrição" />
                                                    <Tab label="Detalhes" />
                                                    <Tab label="Avaliações" />
                                                </Tabs>

                                                <TabPanel value={tabValue} index={0}>
                                                    <Typography variant="body1" paragraph>
                                                        {product.description}
                                                    </Typography>
                                                </TabPanel>

                                                <TabPanel value={tabValue} index={1}>
                                                    <Grid container spacing={2}>
                                                        <Grid item xs={12} sm={6}>
                                                            <Box sx={{ mb: 3 }}>
                                                                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                                                                    Categoria
                                                                </Typography>
                                                                <Typography variant="body1">
                                                                    {product.category}
                                                                </Typography>
                                                            </Box>

                                                            <Box sx={{ mb: 3 }}>
                                                                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                                                                    ID do Produto
                                                                </Typography>
                                                                <Typography variant="body1">
                                                                    #{product.id}
                                                                </Typography>
                                                            </Box>
                                                        </Grid>

                                                        <Grid item xs={12} sm={6}>
                                                            <Box sx={{ mb: 3 }}>
                                                                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                                                                    Disponibilidade
                                                                </Typography>
                                                                <Typography variant="body1" color={theme.palette.success.main}>
                                                                    Em estoque
                                                                </Typography>
                                                            </Box>

                                                            <Box sx={{ mb: 3 }}>
                                                                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                                                                    Classificação
                                                                </Typography>
                                                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                                    <Rating value={product.rating?.rate || 0} precision={0.5} readOnly size="small" />
                                                                    <Typography variant="body2" sx={{ ml: 1 }}>
                                                                        {product.rating?.rate.toFixed(1)}
                                                                    </Typography>
                                                                </Box>
                                                            </Box>
                                                        </Grid>
                                                    </Grid>
                                                </TabPanel>

                                                <TabPanel value={tabValue} index={2}>
                                                    <Box sx={{ mb: 3 }}>
                                                        <Typography variant="h6" gutterBottom>
                                                            Avaliações de Clientes
                                                        </Typography>
                                                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                                            <Typography variant="h3" fontWeight="bold" color="primary">
                                                                {product.rating?.rate.toFixed(1)}
                                                            </Typography>
                                                            <Box sx={{ ml: 2 }}>
                                                                <Rating value={product.rating?.rate || 0} precision={0.5} readOnly />
                                                                <Typography variant="body2" color="text.secondary">
                                                                    Baseado em {product.rating?.count} avaliações
                                                                </Typography>
                                                            </Box>
                                                        </Box>
                                                    </Box>

                                                    <Divider sx={{ mb: 3, borderColor: 'rgba(255,255,255,0.1)' }} />

                                                    <Typography variant="body1" color="text.secondary">
                                                        As avaliações detalhadas não estão disponíveis para este produto no momento.
                                                    </Typography>
                                                </TabPanel>
                                            </motion.div>

                                            <Divider sx={{ my: 3, borderColor: 'rgba(255,255,255,0.1)' }} />

                                            <motion.div
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.5, delay: 0.6 }}
                                            >
                                                {/* Product Actions */}
                                                <Box sx={{ mb: 4 }}>
                                                    <Typography variant="subtitle1" gutterBottom fontWeight="medium">
                                                        Quantidade
                                                    </Typography>
                                                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                                                        <IconButton
                                                            onClick={() => handleQuantityChange(-1)}
                                                            disabled={quantity <= 1}
                                                            sx={{
                                                                border: '1px solid rgba(255,255,255,0.2)',
                                                                borderRadius: 2,
                                                                '&:hover': { backgroundColor: 'rgba(255,255,255,0.05)' },
                                                            }}
                                                        >
                                                            <RemoveIcon />
                                                        </IconButton>
                                                        <Typography
                                                            variant="body1"
                                                            sx={{
                                                                mx: 2,
                                                                width: 40,
                                                                textAlign: 'center',
                                                                fontWeight: 'bold',
                                                                fontSize: '1.2rem'
                                                            }}
                                                        >
                                                            {quantity}
                                                        </Typography>
                                                        <IconButton
                                                            onClick={() => handleQuantityChange(1)}
                                                            sx={{
                                                                border: '1px solid rgba(255,255,255,0.2)',
                                                                borderRadius: 2,
                                                                '&:hover': { backgroundColor: 'rgba(255,255,255,0.05)' },
                                                            }}
                                                        >
                                                            <AddIcon />
                                                        </IconButton>
                                                    </Box>

                                                    <Grid container spacing={2}>
                                                        <Grid item xs={12} sm={8}>
                                                            <Button
                                                                variant="contained"
                                                                fullWidth
                                                                size="large"
                                                                startIcon={<ShoppingCartIcon />}
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
                                                                Adicionar ao Carrinho
                                                            </Button>
                                                        </Grid>
                                                        <Grid item xs={12} sm={4}>
                                                            <Button
                                                                variant="outlined"
                                                                fullWidth
                                                                size="large"
                                                                sx={{
                                                                    py: 1.5,
                                                                    borderColor: 'rgba(255,255,255,0.2)',
                                                                    color: theme.palette.primary.main,
                                                                    '&:hover': {
                                                                        borderColor: theme.palette.primary.main,
                                                                        backgroundColor: 'rgba(187, 134, 252, 0.05)',
                                                                    },
                                                                }}
                                                            >
                                                                <FavoriteIcon />
                                                            </Button>
                                                        </Grid>
                                                    </Grid>
                                                </Box>
                                            </motion.div>

                                            <motion.div
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.5, delay: 0.7 }}
                                            >
                                                {/* Product features */}
                                                <Box sx={{ mt: 3 }}>
                                                    <Grid container spacing={3}>
                                                        <Grid item xs={12} sm={4}>
                                                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                                <LocalShippingIcon color="primary" sx={{ mr: 1.5 }} />
                                                                <Typography variant="body2">
                                                                    Entrega gratuita
                                                                </Typography>
                                                            </Box>
                                                        </Grid>
                                                        <Grid item xs={12} sm={4}>
                                                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                                <AssignmentReturnIcon color="primary" sx={{ mr: 1.5 }} />
                                                                <Typography variant="body2">
                                                                    Devolução em 30 dias
                                                                </Typography>
                                                            </Box>
                                                        </Grid>
                                                        <Grid item xs={12} sm={4}>
                                                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                                <VerifiedUserIcon color="primary" sx={{ mr: 1.5 }} />
                                                                <Typography variant="body2">
                                                                    Garantia de 2 anos
                                                                </Typography>
                                                            </Box>
                                                        </Grid>
                                                    </Grid>
                                                </Box>
                                            </motion.div>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Card>
                        </motion.div>
                    ) : (
                        <Alert severity="warning" sx={{ borderRadius: 2 }}>
                            Produto não encontrado.
                        </Alert>
                    )}
                </Container>
            </Box>
        </Box>
    );
};

export default ProductDetailPage;