import { FC, createContext, useContext, useState } from 'react';

interface Position {
  latitude: number | null;
  longitude: number | null;
}

interface LocationContextState {
  position: Position;
  updatePosition(position: Position): void;
}

const LocationContext = createContext<LocationContextState>(
  {} as LocationContextState,
);

export const LocationContextProvider: FC = ({ children }) => {
  const [position, setPosition] = useState<Position>({
    latitude: null,
    longitude: null,
  });

  return (
    <LocationContext.Provider value={{ position, updatePosition: setPosition }}>
      {children}
    </LocationContext.Provider>
  );
};

export function useLocation(): LocationContextState {
  const contextState = useContext(LocationContext);

  return contextState;
}
