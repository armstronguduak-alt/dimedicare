// Animations disabled per user request
export const fadeInUp = {
  hidden: { opacity: 1, y: 0 },
  visible: { opacity: 1, y: 0, transition: { duration: 0 } },
};

export const fadeInDown = {
  hidden: { opacity: 1, y: 0 },
  visible: { opacity: 1, y: 0, transition: { duration: 0 } },
};

export const fadeInLeft = {
  hidden: { opacity: 1, x: 0 },
  visible: { opacity: 1, x: 0, transition: { duration: 0 } },
};

export const fadeInRight = {
  hidden: { opacity: 1, x: 0 },
  visible: { opacity: 1, x: 0, transition: { duration: 0 } },
};

export const scaleIn = {
  hidden: { opacity: 1, scale: 1 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0 } },
};

export const staggerContainer = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0,
    },
  },
};

export const staggerContainerFast = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0,
    },
  },
};

export const staggerContainerSlow = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0,
    },
  },
};

export const staggerItem = {
  hidden: { opacity: 1, y: 0 },
  visible: { opacity: 1, y: 0, transition: { duration: 0 } },
};

export const navItem = {
  hidden: { opacity: 1, y: 0 },
  visible: { opacity: 1, y: 0, transition: { duration: 0 } },
};

export const heroTitle = {
  hidden: { opacity: 1, y: 0 },
  visible: { opacity: 1, y: 0, transition: { duration: 0 } },
};

export const heroSubtitle = {
  hidden: { opacity: 1, y: 0 },
  visible: { opacity: 1, y: 0, transition: { duration: 0 } },
};

export const heroCTA = {
  hidden: { opacity: 1, y: 0 },
  visible: { opacity: 1, y: 0, transition: { duration: 0 } },
};

export const heroImage = {
  hidden: { opacity: 1, scale: 1 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0 } },
};

export const heroStat = {
  hidden: { opacity: 1, scale: 1 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0 } },
};

export const scrollViewport = { once: true, amount: 0 };
