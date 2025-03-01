import React from "react";
import { BarChart, Bar, XAxis, Tooltip } from "recharts";
import "./chartStyle.css";

const data = [
  { name: "Mon", "Calories Burnt": 2294, "Steps": 10234 },
  { name: "Tue", "Calories Burnt": 2146, "Steps": 15726 },
  { name: "Wed", "Calories Burnt": 2456, "Steps": 11876 },
  { name: "Thu", "Calories Burnt": 2789, "Steps": 7659 },
  { name: "Fri", "Calories Burnt": 1896, "Steps": 9785 },
  { name: "Sat", "Calories Burnt": 2393, "Steps": 17283 },
  { name: "Sun", "Calories Burnt": 2490, "Steps": 13823 },
];

const CustomBar = (props) => {
  const { x, y, width, height, fill } = props;

  return (
    <>
      <defs>
        <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="3" />
          <feOffset dx="8" dy="8" result="offsetblur" />
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.2" />
          </feComponentTransfer>
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        fill={fill}
        rx={4}
        ry={4}
        style={{ filter: "url(#shadow)" }}
      />
    </>
  );
};

const MyBarChart1 = () => {
  return (
    <BarChart className="bargraph"
      width={300}
      height={180}
      data={data}
      margin={{ top: 30, right: 0, left: 0, bottom: 0 }}
    >
      <XAxis
        dataKey="name"
        tick={{ fontFamily: "Courier New", fontSize: 14 }}
        tickLine={false}
      />
      <Tooltip
        cursor={{ fill: "rgba(0, 0, 0, 0.1)" }}
        contentStyle={{
          backgroundColor: "black",
          color: "white",
          borderRadius: "5px",
          border: "none",
        }}
      />
      <Bar dataKey="Calories Burnt" fill="white" shape={<CustomBar />} />
    </BarChart>
  );
};

const MyBarChart2 = () => {
  return (
    <BarChart className="bargraph"
      width={300}
      height={180}
      data={data}
      margin={{ top: 30, right: 0, left: 0, bottom: 0 }}
    >
      <XAxis
        dataKey="name"
        tick={{ fontFamily: "Courier New", fontSize: 14 }}
        tickLine={false}
      />
      <Tooltip
        cursor={{ fill: "rgba(0, 0, 0, 0.1)" }}
        contentStyle={{
          backgroundColor: "black",
          color: 'white',
          borderRadius: "5px",
          border: "none",
        }}
      />
      <Bar dataKey="Steps" fill="white" shape={<CustomBar />} />
    </BarChart>
  );
};

export { MyBarChart1, MyBarChart2 };
