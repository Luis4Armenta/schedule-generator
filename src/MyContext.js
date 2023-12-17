import React, { createContext, useContext, useState } from 'react';

const MyContext = createContext();

export const MyProvider = ({ children }) => {
  const [apiData, setApiData] = useState(null);

  const updateApiData = (newData) => {
    setApiData(newData);
  };

  return (
    <MyContext.Provider value={{ apiData, updateApiData }}>
      {children}
    </MyContext.Provider>
  );
};

export const useMyContext = () => {
  return useContext(MyContext);
};
