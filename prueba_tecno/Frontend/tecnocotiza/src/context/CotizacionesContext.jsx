import { createContext, useContext } from "react";
import { getCotizacionesRequet } from "../api/auth";

const CotizacionContext = createContext();

export const useCotizacion = () => {
  const context = useContext(CotizacionContext);
  if (!context) {
    throw new Error("useCotizacion debe usarse dentro de un CotizacionContext");
  }
  return context;
};

export function CotizacionProvider({ children }) {
  const getCotizaciones = async (id) => {
    try {
      const res = await getCotizacionesRequet(id);
      console.log(res);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <CotizacionContext.Provider
      value={{
        getCotizaciones,
      }}
    >
      {children}
    </CotizacionContext.Provider>
  );
}
