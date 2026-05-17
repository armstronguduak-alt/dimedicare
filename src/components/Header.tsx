import { Link, useLocation } from "react-router-dom";
import { Menu, User, Search, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { navItem, staggerContainerFast } from "@/lib/animations";
import { useCategories } from "@/hooks/use-data";
import logo from "@/assets/logo.png";

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { data: categories = [] } = useCategories();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [location.pathname]);

  // Dynamic nav: Home + each DB category
  const navLinks = [
    { name: "Home", path: "/" },
    ...categories.map((c) => ({ name: c.name, path: `/category/${c.slug}` })),
  ];

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`sticky top-0 z-50 w-full transition-all duration-500 ${
        scrolled
          ? "bg-background/95 backdrop-blur-xl border-b border-border/50 shadow-sm"
          : "bg-transparent"
      }`}
    >
      <nav className="container mx-auto flex h-14 items-center justify-between px-4 md:px-6">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2 group flex-shrink-0">
          <motion.img
            src={logo}
            alt="Dimedicare"
            className="h-7 w-auto"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          />
        </Link>

        {/* Desktop Navigation — Dynamic categories from DB */}
        <motion.div
          className="hidden items-center gap-1 md:flex overflow-x-auto scrollbar-hide"
          variants={staggerContainerFast}
          initial="hidden"
          animate="visible"
        >
          {navLinks.map((link) => (
            <motion.div key={link.path} variants={navItem}>
              <Link
                to={link.path}
                className={`relative px-3 py-1.5 text-xs font-medium tracking-wide transition-colors duration-300 rounded-full whitespace-nowrap ${
                  location.pathname === link.path
                    ? "text-primary bg-primary/6"
                    : "text-foreground/60 hover:text-foreground hover:bg-secondary/50"
                }`}
              >
                {link.name}
                {location.pathname === link.path && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute bottom-0 left-2 right-2 h-px bg-primary rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Right Actions — Smaller, cleaner */}
        <motion.div
          className="hidden items-center gap-2 md:flex flex-shrink-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <Link to="/search">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="h-8 w-8 rounded-full flex items-center justify-center text-foreground/50 hover:text-foreground hover:bg-secondary/60 transition-colors"
            >
              <Search className="h-3.5 w-3.5" />
            </motion.button>
          </Link>
          <Link to="/auth">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="text-xs font-medium text-foreground/60 hover:text-foreground px-3 py-1.5 rounded-full hover:bg-secondary/50 transition-colors"
            >
              Log In
            </motion.button>
          </Link>
          <Link to="/newsletter">
            <motion.button
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.98 }}
              className="text-xs font-medium bg-primary text-primary-foreground px-4 py-1.5 rounded-full hover:bg-forest-800 transition-colors"
            >
              Sign Up
            </motion.button>
          </Link>
        </motion.div>

        {/* Mobile Toggle */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          className="md:hidden p-1.5 rounded-lg hover:bg-secondary transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </motion.button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="md:hidden overflow-hidden border-t border-border/50 bg-background/98 backdrop-blur-xl"
          >
            <motion.div
              className="container mx-auto px-4 py-4 space-y-0.5"
              variants={staggerContainerFast}
              initial="hidden"
              animate="visible"
            >
              {navLinks.map((link) => (
                <motion.div key={link.path} variants={navItem}>
                  <Link
                    to={link.path}
                    className={`block py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                      location.pathname === link.path
                        ? "text-primary bg-primary/5"
                        : "text-foreground/60 hover:text-foreground hover:bg-secondary/30"
                    }`}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              <motion.div variants={navItem} className="pt-3 flex gap-2">
                <Link to="/auth" className="flex-1">
                  <button className="w-full text-xs font-medium py-2 rounded-full border border-border/60 hover:border-primary/40 transition-colors">
                    Log In
                  </button>
                </Link>
                <Link to="/newsletter" className="flex-1">
                  <button className="w-full text-xs font-medium py-2 rounded-full bg-primary text-primary-foreground">
                    Sign Up
                  </button>
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;