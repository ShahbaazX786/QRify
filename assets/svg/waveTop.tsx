import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
const WaveTop = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" {...props}>
    <Path
      fill="#1e40af"
      d="m0 128 30-16c30-16 90-48 150-64s120-16 180 5.3C420 75 480 117 540 122.7c60 5.3 120-26.7 180-16C780 117 840 171 900 176s120-37 180-21.3c60 16.3 120 90.3 180 96 60 5.3 120-58.7 150-90.7l30-32V0H0Z"
    />
  </Svg>
);
export default WaveTop;
