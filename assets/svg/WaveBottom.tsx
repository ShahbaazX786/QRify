import Svg, { SvgProps, Path } from "react-native-svg";
const WaveBottom = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" {...props}>
    <Path
      fill="#1e40af"
      fillOpacity={0.69}
      d="m0 32 30 26.7c30 26.3 90 80.3 150 80 60 .3 120-53.7 180-80C420 32 480 32 540 69.3 600 107 660 181 720 202.7c60 21.3 120-10.7 180-5.4 60 5.7 120 47.7 180 64 60 15.7 120 5.7 180 0 60-5.3 120-5.3 150-5.3h30v64H0Z"
    />
  </Svg>
);
export default WaveBottom;
