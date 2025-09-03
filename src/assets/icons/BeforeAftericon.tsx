import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";
const BeforeAftericon = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" className="text-typo" {...props}>
    <Path
      fill="#ffffff"
      fillRule="evenodd"
      d="M11.25 4a.75.75 0 0 0-.75.75V6H6a3 3 0 0 0-3 3v6a3 3 0 0 0 3 3h4.5v1.25a.75.75 0 0 0 1.5 0V4.75a.75.75 0 0 0-.75-.75Zm-.75 3.5H6A1.5 1.5 0 0 0 4.5 9v6A1.5 1.5 0 0 0 6 16.5h4.5v-9Z"
      clipRule="evenodd"
    />
    <Path
      fill="#ffffff"
      d="M18 16.5h-4.5V18H18a3 3 0 0 0 3-3V9a3 3 0 0 0-3-3h-4.5v1.5H18A1.5 1.5 0 0 1 19.5 9v6a1.5 1.5 0 0 1-1.5 1.5Z"
    />
  </Svg>
);
export default BeforeAftericon;
