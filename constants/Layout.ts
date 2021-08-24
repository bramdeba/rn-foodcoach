import { Dimensions } from "react-native";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export default {
  window: {
    width,
    height,
    padding: 32,
  },
  container: {
    width: width - 64,
  },
  card: {
    padding: 16,
  },
  isSmallDevice: width < 375,
};
