import { SpinPie } from "../types/SpinPie";
import { colorFor } from "../utils/colors";

export const Slice = ({
  index,
  spinPie,
  radius,
  highlight
}: {
  index: number;
  spinPie: SpinPie;
  radius: number;
  highlight: boolean;
}) => {
  const y = (t: number) => radius * Math.cos(t);
  const x = (t: number) => radius * Math.sin(t);

  const average = (spinPie.maxAngle + spinPie.minAngle) / 2;

  return (
    <g className="cursor-pointer">
      <path
        d={`M0 0 L${x(spinPie.minAngle)} ${y(
          spinPie.minAngle
        )} A${radius} ${radius} 0 0 0 ${x(spinPie.maxAngle)} ${y(
          spinPie.maxAngle
        )} Z`}
        fill={colorFor(index)}
      />
      <path
        id={`path-${index}`}
        d={`M${x(average)} ${y(average)} L0 0`}
        fill="none"
      />
      <text textAnchor="middle">
        <textPath
          href={`#path-${index}`}
          startOffset="50%"
          dominantBaseline="middle"
          fontSize={highlight ? "1.5em" : "1em"}
          fill={highlight ? "white" : "black"}
        >
          {spinPie.value}
        </textPath>
      </text>
    </g>
  );
};
