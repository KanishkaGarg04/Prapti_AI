import { useEffect, useState } from "react";

export default function Spotlight() {
  const [position, setPosition] = useState({
    x: -500,
    y: -500,
  });

  useEffect(() => {
    const move = (e) => {
      setPosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener("mousemove", move);

    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 transition-all duration-150"
      style={{
        background: `
        radial-gradient(
          600px circle at ${position.x}px ${position.y}px,
          rgba(37,99,235,0.15),
          transparent 40%
        )
      `,
      }}
    />
  );
}