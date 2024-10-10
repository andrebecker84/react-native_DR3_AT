import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Dropdown as SelectDropdown } from 'react-native-paper-dropdown';

interface DropdownProps {
  label: string;
  placeholder: string;
  options: { label: string; value: string }[];
  value: string | null; // Ou use 'string | undefined' dependendo do seu uso
  onSelect: (value: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({
  label,
  placeholder,
  options,
  value,
  onSelect,
}) => {
  return (
    <View style={styles.dropdownContainer}>
      <SelectDropdown
        label={label}
        placeholder={placeholder} 
        options={options}
        value={value}
        onSelect={onSelect}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  dropdownContainer: {
    margin: 20,
    backgroundColor: 'rgb(29, 33, 38)',
    borderColor: 'rgb(223, 70, 97)',
    borderWidth: 1,
    borderRadius: 5,
    marginVertical: 8,
    shadowColor: "rgb(255, 60, 97)",
    // shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 5,
  },
});

export default Dropdown;
