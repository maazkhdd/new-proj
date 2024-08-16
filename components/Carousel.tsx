import React from "react";
import { StyleSheet, View, Text } from "react-native";
import PagerView from "react-native-pager-view";

const Carousel = () => {
  return (
    <PagerView style={styles.pagerView} initialPage={1}>
      <View key="1">
        <Text>First page</Text>
      </View>
      <View key="2">
        <Text>Second page</Text>
      </View>
    </PagerView>
  );
};

export default Carousel;

const styles = StyleSheet.create({
  pagerView: {
    flex: 1,
    width: 200,
    height: 200,
    borderWidth: 1,
    borderColor: "red",
  },
});
