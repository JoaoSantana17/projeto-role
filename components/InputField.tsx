import { StyleSheet, Text, TextInput, TextInputProps, View } from "react-native";

type InputFieldProps = TextInputProps & {
  label?: string;
};

export default function InputField({
  label,
  placeholder,
  value,
  onChangeText,
  secureTextEntry,
}: InputFieldProps) {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#aaa"
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { width: "100%", marginBottom: 16 },
  label: { color: "#fff", fontSize: 16, fontWeight: "600", marginBottom: 4 },
  input: {
    backgroundColor: "rgba(255,255,255,0.1)",
    color: "#fff",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
  },
});
