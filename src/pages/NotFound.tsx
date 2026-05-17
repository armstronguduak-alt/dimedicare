import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Home } from "lucide-react";
import { fadeInUp, scaleIn } from "@/lib/animations";

const NotFound = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-sage-gradient px-6">
      <motion.div
        variants={scaleIn}
        initial="hidden"
        animate="visible"
        className="text-center max-w-md"
      >
        <motion.h1
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          className="font-serif text-8xl font-bold text-primary mb-4"
        >
          404
        </motion.h1>
        <h2 className="font-serif text-2xl font-bold text-foreground mb-3">
          Page Not Found
        </h2>
        <p className="text-muted-foreground mb-8 leading-relaxed">
          The page you're looking for doesn't exist or has been moved to a new location.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/">
            <motion.span
              whileHover={{ scale: 1.03, y: -1 }}
              whileTap={{ scale: 0.97 }}
              className="btn-premium btn-premium-filled inline-flex items-center gap-2"
            >
              <Home className="h-4 w-4" />
              Go Home
            </motion.span>
          </Link>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => window.history.back()}
            className="btn-premium btn-premium-outline inline-flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Go Back
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFound;
