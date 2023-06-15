import { createContext, useContext, useState } from "react";

const FilterContext = createContext({
  selectedGame: null,
  selectedFilter: null,
  selectedSortNewest: null,
  setSelectedGame: undefined,
  setSelectedFilter: undefined,
  setSelectedSortNewest: undefined,
});

export const FilterProvider = ({ children }) => {
  const [selectedGame, setSelectedGame] = useState(0);
  const [selectedFilter, setSelectedFilter] = useState({
    onlyMyGames: false,
    onlyMyCommunities: false,
    includeOpen: true,
    includeRunning: true,
    includeEnded: true,
    includeCancelled: true,
  });
  const [selectedSortNewest, setSelectedSortNewest] = useState(true);

  return (
    <FilterContext.Provider
      value={{
        selectedGame,
        selectedFilter,
        selectedSortNewest,
        setSelectedGame,
        setSelectedFilter,
        setSelectedSortNewest,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export const useFilterContext = () => useContext(FilterContext);
