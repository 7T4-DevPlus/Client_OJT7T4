import { createContext, useState, useEffect } from "react";

export const LayoutContext = createContext();

const LayoutContextProvider = ({ children }) => {
  const [layout, setLayout] = useState(window.innerWidth < 1150);

  const updateLayout = () => {
    setLayout(window.innerWidth < 1150);
  };

  useEffect(() => {
    window.addEventListener("resize", updateLayout);

    return () => {
      window.removeEventListener("resize", updateLayout);
    };
  }, []);

  const contextData = {
    layout,
    setLayout,
  };

  return (
    <LayoutContext.Provider value={contextData}>
      {children}
    </LayoutContext.Provider>
  );
};

export default LayoutContextProvider;
