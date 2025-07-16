import { motion, animate, useMotionValue, useTransform } from "framer-motion";
import { useEffect } from "react";

export const AnimatedCount = ({ target }: { target: number }) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  useEffect(() => {
    const controls = animate(count, target, { duration: 1.2 });
    return () => controls.stop();
  }, [target]);

  return (
    <>
      (<motion.span className="inline-block">{rounded}</motion.span>)
    </>
  );
};
