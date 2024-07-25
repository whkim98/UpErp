import React, { useState, useEffect, useRef } from "react";
import * as d3 from "d3";
import debounce from "lodash/debounce";

const PADDING = 30;

function useResize(ref) {
  const [state, setState] = useState();
  useEffect(() => {
    const getSize = debounce(() => {
      if (!ref || !ref.current) {
        return;
      }

      const width = ref.current.offsetWidth;
      const height = ref.current.offsetHeight;
      setState({
        width,
        height
      });
    }, 1000);

    window.addEventListener("resize", getSize);
    getSize();
    return () => window.removeEventListener("resize", getSize);
  }, [ref]);

  return state;
}

const LineChart = (props) => {
  const [lineData, setLineData] = useState();
  const [markers, setMarkers] = useState();

  const rootRef = useRef(null);
  const xAxisRef = useRef(null);
  const yAxisRef = useRef(null);
  const yLabelRef = useRef(null);
  const size = useResize(rootRef);

  useEffect(() => {
    if (!size || !props.data) {
      return;
    }

    const data = props.data;
    const { width, height } = size;

    const isSalaryData = props.option === 'salary';

    const xScale = d3
      .scaleLinear()
      .domain([0, data.length - 1])
      .range([PADDING, width - PADDING]);

    const yScale = d3
      .scaleLinear()
      .domain(isSalaryData ? [1, 10] : [0, 30])
      .range([height - PADDING, PADDING]);

    const lineGenerator = d3
      .line()
      .x((d, i) => xScale(i))
      .y((d) => yScale(isSalaryData ? d.salary / 1000000 : d.count))
      .curve(d3.curveMonotoneX);

    const xAxis = d3
      .axisBottom(xScale)
      .ticks(data.length)
      .tickFormat((d, i) => isSalaryData ? d : data[i].job_title);

    const yAxis = d3.axisLeft(yScale).ticks(height / 50);

    d3.select(xAxisRef.current).call(xAxis);
    d3.select(yAxisRef.current).call(yAxis);

    d3.select(yLabelRef.current).text(isSalaryData ? "단위: 백만" : "명");

    setLineData(lineGenerator(data));
    setMarkers(
      data.map((d, i) => ({
        x: xScale(i),
        y: yScale(isSalaryData ? d.salary / 1000000 : d.count),
      }))
    );
  }, [size, props]);

  return (
    <div className="chart-area" ref={rootRef} style={{ maxWidth: '80%', margin: 'auto' }}>
      {size && (
        <svg width={size.width} height={size.height}>
          <g id="axes">
            <g
              id="x-axis"
              ref={xAxisRef}
              transform={`translate(0, ${size.height - PADDING})`}
            />
            <g
              id="y-axis"
              ref={yAxisRef}
              transform={`translate(${PADDING}, 0)`}
            />
            <text
              ref={yLabelRef}
              transform="rotate(-90)"
              x={-(size.height / 2)}
              y={15}
              textAnchor="middle"
            />
          </g>
          <g id="chart">
            {lineData && (
              <path stroke="#48bb78" className="chart-line" d={lineData} />
            )}
            {markers &&
              markers.map((marker, i) => (
                <circle
                  key={i}
                  cx={marker.x}
                  cy={marker.y}
                  r={4}
                  className="chart-marker"
                />
              ))}
          </g>
        </svg>
      )}
    </div>
  );
};

export default LineChart;
