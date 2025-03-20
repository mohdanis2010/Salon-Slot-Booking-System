// src/components/molecules/SearchBar.tsx
import React from "react";
import { Input } from "../atoms/Input";
import { Icon } from "../atoms/Icon";
import { Button } from "../atoms/Button";
import styles from "./SearchBar.module.css";

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  onSearch: () => void;
  onVoiceSearch: () => void;
  onKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  searchTerm,
  setSearchTerm,
  onSearch,
  onVoiceSearch,
  onKeyPress,
}) => {
  return (
    <div className={styles.searchBar}>
      <div className={styles.inputWrapper}>
        <Input
          placeholder="Search by Stylist, Service, Date, or Time"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={onKeyPress}
        />
        <Icon type="mic" className={styles.micIcon} onClick={onVoiceSearch} data-testid="voice-icon" />
      </div>
      <Button variant="primary" onClick={onSearch}>
        <Icon type="search" className={styles.searchIcon} />
        Search
      </Button>
    </div>
  );
};