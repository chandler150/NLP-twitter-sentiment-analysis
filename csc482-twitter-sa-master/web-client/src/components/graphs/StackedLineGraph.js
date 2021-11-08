import React from 'react'
// install (please make sure versions match peerDependencies)
// yarn add @nivo/core @nivo/line
import { ResponsiveLine } from '@nivo/line'
// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
const theme = {
  axis: {
    tickColor: "#eee",
    ticks: {
      line: {
        stroke: "#555555"
      },
      text: {
        fill: "#ffffff",
        fontSize: 14
      }
    },
    legend: {
      text: {
        fill: "#ffffff",
        fontSize: 20
      }
    }
  },
  grid: {
    line: {
      stroke: "#555555"
    }
  }
};

const Graph = (data, timeline) => (
  <ResponsiveLine
    data={data}
    margin={{ top: 40, right: 40, bottom: 80, left: 80 }}
    xScale={{
      type: 'linear',
      min: 0,
      max: timeline === 'day' ? 24 : timeline === 'week' ? 7 : 30
    }}
    yScale={{
      type: 'linear',
      min: 0,
      max: 'auto',
      stacked: false,
      reverse: false
    }}
    curve="natural"
    axisTop={null}
    axisRight={null}
    axisBottom={{
      orient: 'bottom',
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: 'Time',
      legendOffset: 60,
      legendPosition: 'middle'
    }}
    axisLeft={{
      orient: 'left',
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: 'Tweets',
      legendOffset: -60,
      legendPosition: 'middle'
    }}
    pointSize={10}
    pointColor={{ theme: 'background' }}
    pointBorderWidth={2}
    pointBorderColor={{ from: 'serieColor' }}
    pointLabelYOffset={-12}
    enableArea={true}
    areaOpacity={0.5}
    useMesh={true}
    theme={theme}
  />
);
    // legends={[
    //   {
    //     anchor: 'bottom-right',
    //     direction: 'column',
    //     justify: false,
    //     translateX: 100,
    //     translateY: 0,
    //     itemsSpacing: 0,
    //     itemDirection: 'left-to-right',
    //     itemWidth: 80,
    //     itemHeight: 20,
    //     itemOpacity: 1.00,
    //     symbolSize: 12,
    //     symbolShape: 'circle',
    //     symbolBorderColor: 'rgba(0, 0, 0, .5)',
    //     effects: [
    //       {
    //         on: 'hover',
    //         style: {
    //           itemBackground: 'rgba(0, 0, 0, .03)',
    //           itemOpacity: 1,
    //           itemTextColor: "#eee"
    //         }
    //       }
    //     ]
    //   }
    // ]}

function StackedLineGraph(props) {
  return (
    <div className="StackedLineGraph">
      {Graph(props.data, props.timeline.toLowerCase())}
    </div>
  );
}

export default StackedLineGraph;
