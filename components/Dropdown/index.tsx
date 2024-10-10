import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Dropdown as SelectDropdown } from 'react-native-paper-dropdown';

interface DropdownProps {
  label: string;
  placeholder: string;
  options: { label: string; value: string }[];
  value?: string;
  onSelect: (value?: string) => void;
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

// Exemplo de uso Quando você usar o componente Dropdown, não será necessário passar um valor null, mas sim undefined se você não quiser que nada seja selecionado.

{/* <Dropdown
  label="Selecione uma opção"
  placeholder="Escolha"
  options={[
    { label: 'Opção 1', value: '1' },
    { label: 'Opção 2', value: '2' },
  ]}
  value={undefined} // ou um valor válido
  onSelect={(value) => console.log(value)} // agora aceita 'undefined'
/> */}
