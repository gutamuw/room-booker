import { Pressable, StyleSheet, Text } from "react-native";

type Variant = "primary" | "secondary" | "danger";

type Props = {
  label: string;
  onPress: () => void;
  variant?: Variant;
};

export default function PillButton({ label, onPress, variant = "primary" }: Props) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.base,
        variants[variant].container,
        pressed && variants[variant].pressed,
      ]}
      onPress={onPress}
    >
      <Text style={[styles.baseText, variants[variant].text]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 9999,
    borderWidth: 1,
  },
  baseText: {
    fontSize: 12,
    fontWeight: "600",
    letterSpacing: 0.5,
    textTransform: "uppercase",
  },
});

const variants = {
  primary: StyleSheet.create({
    container: { backgroundColor: "#111111", borderColor: "#111111" },
    pressed: { backgroundColor: "#000000" },
    text: { color: "#FFFFFF" },
  }),
  secondary: StyleSheet.create({
    container: { backgroundColor: "#FFFFFF", borderColor: "#EAEAEA" },
    pressed: { backgroundColor: "#F5F5F5" },
    text: { color: "#111111" },
  }),
  danger: StyleSheet.create({
    container: { backgroundColor: "#FFFFFF", borderColor: "#fd3c3c" },
    pressed: { backgroundColor: "#FFF1F1" },
    text: { color: "#fd3c3c" },
  }),
};
