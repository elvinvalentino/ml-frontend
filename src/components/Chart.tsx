import React from 'react';
import ReactApexChart from 'react-apexcharts';

interface IProps {
  data: number[];
  labels: string[];
  title: string;
  subTitle: string;
  type:
    | 'area'
    | 'line'
    | 'bar'
    | 'histogram'
    | 'pie'
    | 'donut'
    | 'radialBar'
    | 'scatter'
    | 'bubble'
    | 'heatmap'
    | 'treemap'
    | 'boxPlot'
    | 'candlestick'
    | 'radar'
    | 'polarArea'
    | 'rangeBar'
    | undefined;
}

const Chart: React.FC<IProps> = ({ data, labels, title, subTitle, type }) => {
  return (
    <ReactApexChart
      type={type}
      height={350}
      series={[
        {
          data,
          name: 'Predicted Stock',
        },
      ]}
      options={{
        stroke: {
          curve: 'smooth',
        },
        xaxis: {
          categories: labels,
        },
        ...(type === 'area' && {
          fill: {
            type: 'gradient',
            gradient: {
              shadeIntensity: 1,
              type: 'vertical',
              gradientToColors: ['#FFF'],
              inverseColors: false,
              opacityFrom: 0.65,
              opacityTo: 0.65,
              stops: [20, 100, 100, 100],
            },
          },
        }),
        title: {
          text: title,
          align: 'left',
        },
        subtitle: {
          text: subTitle,
          align: 'left',
        },
        dataLabels: {
          enabled: false,
        },
      }}
    />
  );
};

export default Chart;
