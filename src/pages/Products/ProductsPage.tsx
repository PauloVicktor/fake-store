import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Box,
    Grid,
    Typography,
    CircularProgress,
    AppBar,
    Toolbar,
    Button,
    Alert,
    Card,
    CardContent,
    CardMedia,
    IconButton,
    InputBase,
    Chip,
    useMediaQuery,
    useTheme,
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    ListItemButton,
    Avatar,
    Badge,
    Container,
    Divider,
    Rating
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import FavoriteIcon from '@mui/icons-material/Favorite';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import StarIcon from '@mui/icons-material/Star';
import NightsStayIcon from '@mui/icons-material/NightsStay';
import LightModeIcon from '@mui/icons-material/LightMode';
import { motion } from 'framer-motion'; // Assuma que framer-motion está instalado

import { fetchProducts } from '../../services/api';
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

const ProductsPage = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const navigate = useNavigate();
    const { logout } = useAuth();
    const { theme: appTheme, toggleTheme } = useAppTheme();

    const drawerWidth = 280;

    useEffect(() => {
        const getProducts = async () => {
            try {
                setLoading(true);
                const data = await fetchProducts();
                setProducts(data);
                setFilteredProducts(data);
                setError(null);
            } catch (err) {
                console.error('Failed to fetch products:', err);
                setError('Falha ao carregar produtos. Por favor, tente novamente.');
            } finally {
                setLoading(false);
            }
        };

        getProducts();
    }, []);

    // Filtrar produtos com base na busca
    useEffect(() => {
        if (searchQuery.trim() === '') {
            setFilteredProducts(products);
        } else {
            const filtered = products.filter(product =>
                product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                product.category.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredProducts(filtered);
        }
    }, [searchQuery, products]);

    const handleLogout = () => {
        logout();
    };

    const handleDrawerToggle = () => {
        setDrawerOpen(!drawerOpen);
    };

    const handleProductClick = (id: number) => {
        navigate(`/products/${id}`);
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

                    {/* Search bar */}
                    <Box
                        sx={{
                            position: 'relative',
                            borderRadius: 2,
                            backgroundColor: 'rgba(255, 255, 255, 0.15)',
                            '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.25)' },
                            marginRight: theme.spacing(2),
                            marginLeft: 0,
                            width: '100%',
                            [theme.breakpoints.up('sm')]: { marginLeft: theme.spacing(3), width: 'auto' },
                        }}
                    >
                        <Box sx={{ padding: theme.spacing(0, 2), height: '100%', position: 'absolute', pointerEvents: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <SearchIcon />
                        </Box>
                        <InputBase
                            placeholder="Buscar produtos..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            sx={{
                                color: 'inherit',
                                padding: theme.spacing(1, 1, 1, 0),
                                paddingLeft: `calc(1em + ${theme.spacing(4)})`,
                                transition: theme.transitions.create('width'),
                                width: '100%',
                                [theme.breakpoints.up('md')]: { width: '30ch' },
                            }}
                        />
                    </Box>

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
                    {/* Page title */}
                    <Box sx={{ mb: 4 }}>
                        <Typography variant="h4" fontWeight="bold" gutterBottom>
                            Produtos
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            Descubra nossa seleção de produtos de alta qualidade
                        </Typography>
                    </Box>

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
                    ) : (
                        <>
                            {/* Search results count */}
                            <Box sx={{ mb: 3 }}>
                                <Typography variant="body2" color="text.secondary">
                                    {filteredProducts.length === 0
                                        ? 'Nenhum produto encontrado'
                                        : `Mostrando ${filteredProducts.length} ${filteredProducts.length === 1 ? 'produto' : 'produtos'}`}
                                </Typography>
                            </Box>

                            {/* Products grid */}
                            <Grid container spacing={3}>
                                {filteredProducts.map((product) => (
                                    <Grid
                                        item
                                        key={product.id}
                                        xs={12}
                                        sm={6}
                                        md={4}
                                        lg={3}
                                        component={motion.div}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.3, delay: product.id * 0.05 % 0.5 }}
                                    >
                                        <Card
                                            onClick={() => handleProductClick(product.id)}
                                            sx={{
                                                height: '100%',
                                                display: 'flex',
                                                flexDirection: 'column',
                                                borderRadius: 3,
                                                overflow: 'hidden',
                                                boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
                                                transition: 'all 0.3s ease',
                                                cursor: 'pointer',
                                                '&:hover': {
                                                    transform: 'translateY(-8px)',
                                                    boxShadow: '0 12px 30px rgba(0,0,0,0.15)',
                                                }
                                            }}
                                        >
                                            <Box
                                                sx={{
                                                    position: 'relative',
                                                    pt: '100%', // 1:1 aspect ratio
                                                    backgroundColor: 'rgba(255,255,255,0.05)'
                                                }}
                                            >
                                                <CardMedia
                                                    component="img"
                                                    image={product.image}
                                                    alt={product.title}
                                                    sx={{
                                                        position: 'absolute',
                                                        top: 0,
                                                        left: 0,
                                                        width: '100%',
                                                        height: '100%',
                                                        objectFit: 'contain',
                                                        p: 2,
                                                    }}
                                                />
                                                {/* Category badge */}
                                                <Box sx={{ position: 'absolute', top: 12, left: 12 }}>
                                                    {categoryChip(product.category)}
                                                </Box>
                                            </Box>

                                            <CardContent sx={{ flexGrow: 1, p: 3 }}>
                                                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1, lineHeight: 1.3 }} noWrap>
                                                    {product.title}
                                                </Typography>

                                                {product.rating && (
                                                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                                        <Rating
                                                            value={product.rating.rate}
                                                            precision={0.5}
                                                            size="small"
                                                            readOnly
                                                        />
                                                        <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                                                            ({product.rating.count})
                                                        </Typography>
                                                    </Box>
                                                )}

                                                <Typography
                                                    variant="h5"
                                                    color="primary"
                                                    fontWeight="bold"
                                                    sx={{
                                                        mt: 2,
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'space-between'
                                                    }}
                                                >
                                                    ${product.price.toFixed(2)}
                                                    <IconButton
                                                        color="primary"
                                                        size="small"
                                                        sx={{
                                                            bgcolor: `${theme.palette.primary.main}20`,
                                                            '&:hover': {
                                                                bgcolor: `${theme.palette.primary.main}30`,
                                                            }
                                                        }}
                                                    >
                                                        <ShoppingCartIcon fontSize="small" />
                                                    </IconButton>
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                ))}
                            </Grid>
                        </>
                    )}
                </Container>
            </Box>
        </Box>
    );
};

export default ProductsPage;