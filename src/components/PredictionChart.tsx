import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Chart from './Chart';
import { getMonthName } from '../utils/getMonthName';
import { getDayOfWeekName } from '../utils/getDayOfWeekName';
import { Select } from 'antd';

interface IProps {
  predictions: any;
  selectedItem: string;
  setSelectedItem: React.Dispatch<React.SetStateAction<string>>;
}

const PredictionChart: React.FC<IProps> = ({
  predictions,
  selectedItem,
  setSelectedItem,
}) => {
  return (
    <div>
      <Select
        className="mb-2"
        defaultValue="all"
        style={{ width: 200 }}
        onChange={value => setSelectedItem(value)}
        filterOption={(input, option) =>
          (option?.label.toLowerCase() ?? '').includes(input.toLowerCase())
        }
        showSearch
        options={Object.keys(predictions).map(p => ({
          value: p,
          label: (p === 'all' ? 'All Products' : p)
            .toLowerCase()
            .trim()
            .replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase()),
        }))}
      />
      <Row>
        <Col xs={12} sm={6}>
          <Chart
            type="area"
            title="Sales vs Date"
            subTitle="Stock Movements"
            data={Object.values(predictions[selectedItem].date)}
            labels={Object.keys(predictions[selectedItem].date)}
          />
        </Col>
        <Col xs={12} sm={6}>
          <Chart
            type="area"
            title="Sales vs Month"
            subTitle="Stock Movements"
            data={Object.values(predictions[selectedItem].month)}
            labels={Object.keys(predictions[selectedItem].month).map(v =>
              getMonthName(Number(v))
            )}
          />
        </Col>
      </Row>
      <Row>
        <Col xs={12} sm={4}>
          <Chart
            type="bar"
            title="Sales vs Holiday"
            subTitle="Stock Comparisons"
            data={Object.values(predictions[selectedItem].dayOfWeek)}
            labels={Object.keys(predictions[selectedItem].dayOfWeek).map(v =>
              getDayOfWeekName(Number(v))
            )}
          />
        </Col>
        <Col xs={12} sm={4}>
          <Chart
            type="bar"
            title="Sales vs Holiday"
            subTitle="Stock Comparisons"
            data={Object.values(predictions[selectedItem].isHoliday)}
            labels={Object.keys(predictions[selectedItem].isHoliday).map(v =>
              Number(v) == 0 ? 'Not Holiday' : 'Holiday'
            )}
          />
        </Col>
        <Col xs={12} sm={4}>
          <Chart
            type="bar"
            title="Sales vs Weekend"
            subTitle="Stock Comparisons"
            data={Object.values(predictions[selectedItem].isWeekend)}
            labels={Object.keys(predictions[selectedItem].isWeekend).map(v =>
              Number(v) == 0 ? 'Not Weekend' : 'Weekend'
            )}
          />
        </Col>
      </Row>
    </div>
  );
};

export default PredictionChart;
