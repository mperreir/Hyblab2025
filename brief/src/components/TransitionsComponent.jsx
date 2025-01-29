// /src/components/TransitionsComponent.jsx
import React from "react";
import { motion } from "framer-motion";
import PropTypes from "prop-types";

const animations = {
  feuille: {
    initial: { rotateY: 90, opacity: 0 },
    animate: { rotateY: 0, opacity: 1 },
    exit: { rotateY: -90, opacity: 0 },
    transition: { duration: 1, ease: "easeInOut" },
  },
  vent: {
    initial: { x: "100%", opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: "-100%", opacity: 0 },
    transition: { duration: 0.6, ease: "easeInOut" },
  },
  graine: {
    initial: { scale: 0.5, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.2, opacity: 0 },
    transition: { duration: 0.7, ease: "easeInOut" },
  },
  flamme: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.5 },
  },
  zoomIn: {
    initial: { scale: 0.8, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 1.5, opacity: 0 },
    transition: { duration: 0.6, ease: "easeInOut" },
  },
};

const TransitionsComponent = ({ animationType, children }) => {
  const animation = animations[animationType] || animations["feuille"];

  return (
    <motion.div
      initial={animation.initial}
      animate={animation.animate}
      exit={animation.exit}
      transition={animation.transition}
      style={{ height: "100%", width: "100%" }}
    >
      {children}
    </motion.div>
  );
};

TransitionsComponent.propTypes = {
  animationType: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default TransitionsComponent;
