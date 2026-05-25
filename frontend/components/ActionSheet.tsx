import { forwardRef } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";

type Action = {
  label: string;
  onPress: () => void;
  destructive?: boolean;
};

type Props = {
  title: string;
  description?: string;
  primary: Action;
  secondary?: Action;
};

const ActionSheet = forwardRef<BottomSheetModal, Props>(
  ({ title, description, primary, secondary }, ref) => (
    <BottomSheetModal ref={ref} enableDynamicSizing>
      <BottomSheetView style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        {description ? <Text style={styles.description}>{description}</Text> : null}
        <View style={styles.actions}>
          {secondary ? (
            <Pressable style={styles.secondary} onPress={secondary.onPress}>
              <Text style={styles.secondaryText}>{secondary.label}</Text>
            </Pressable>
          ) : null}
          <Pressable
            style={[styles.primary, primary.destructive && styles.primaryDestructive]}
            onPress={primary.onPress}
          >
            <Text style={styles.primaryText}>{primary.label}</Text>
          </Pressable>
        </View>
      </BottomSheetView>
    </BottomSheetModal>
  )
);

export default ActionSheet;

const styles = StyleSheet.create({
  content: {
    padding: 24,
    paddingBottom: 40,
    gap: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111111",
  },
  description: {
    fontSize: 14,
    color: "#787774",
  },
  actions: {
    flexDirection: "row",
    gap: 12,
    marginTop: 8,
  },
  secondary: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#EAEAEA",
    alignItems: "center",
  },
  secondaryText: {
    fontSize: 15,
    fontWeight: "500",
    color: "#111111",
  },
  primary: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 8,
    backgroundColor: "#111111",
    alignItems: "center",
  },
  primaryDestructive: {
    backgroundColor: "#fd3c3c",
  },
  primaryText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#FFFFFF",
  },
});
