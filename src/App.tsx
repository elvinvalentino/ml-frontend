import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navbar';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { DatePicker, Select } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import axios from 'axios';
import { PredictionItem } from './types';
import { decomposePrediction } from './utils/decomposePrediction';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Chart from './components/Chart';
import { getMonthName } from './utils/getMonthName';
import { getDayOfWeekName } from './utils/getDayOfWeekName';

const { RangePicker } = DatePicker;

function App() {
  const [rangePickerValue, setRangePickerValue] = useState<[Dayjs, Dayjs]>([
    dayjs(),
    dayjs(),
  ]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [predictions, setPredictions] = useState<any>(null);
  const [selectedItem, setSelectedItem] = useState<string>('all');

  const onPredict = async () => {
    setIsLoading(true);
    const { data } = await axios.post<{ data: PredictionItem[] }>(
      'http://127.0.0.1:5000/predict',
      {
        startDate: rangePickerValue[0].format('YYYY-MM-DD'),
        endDate: rangePickerValue[1].format('YYYY-MM-DD'),
      }
    );
    setPredictions(decomposePrediction(data.data));
    setIsLoading(false);
  };

  return (
    <>
      <Navbar />
      <Container className="mt-3">
        <div className="d-flex justify-content-center">
          <Card style={{ width: '40%' }}>
            <Card.Body>
              <Card.Title>Predict Stock</Card.Title>
              <div className="d-flex align-items-center">
                <RangePicker
                  value={rangePickerValue}
                  onChange={dates => {
                    setRangePickerValue(dates as [Dayjs, Dayjs]);
                  }}
                  className="w-100 my-2 me-2"
                />
                <Button variant="primary" size="sm" onClick={onPredict}>
                  Predict
                </Button>
              </div>
            </Card.Body>
          </Card>
        </div>
        {!isLoading && predictions && (
          <div>
            <h3>Result</h3>
            <Select
              className="mb-2"
              defaultValue="all"
              style={{ width: 200 }}
              onChange={value => setSelectedItem(value)}
              filterOption={(input, option) =>
                (option?.label.toLowerCase() ?? '').includes(
                  input.toLowerCase()
                )
              }
              showSearch
              options={Object.keys(predictions).map(p => ({
                value: p,
                label: (p === 'all' ? 'All Products' : p)
                  .toLowerCase()
                  .trim()
                  .replace(/(^\w{1})|(\s+\w{1})/g, letter =>
                    letter.toUpperCase()
                  ),
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
                  labels={Object.keys(predictions[selectedItem].dayOfWeek).map(
                    v => getDayOfWeekName(Number(v))
                  )}
                />
              </Col>
              <Col xs={12} sm={4}>
                <Chart
                  type="bar"
                  title="Sales vs Holiday"
                  subTitle="Stock Comparisons"
                  data={Object.values(predictions[selectedItem].isHoliday)}
                  labels={Object.keys(predictions[selectedItem].isHoliday).map(
                    v => (Number(v) == 0 ? 'Not Holiday' : 'Holiday')
                  )}
                />
              </Col>
              <Col xs={12} sm={4}>
                <Chart
                  type="bar"
                  title="Sales vs Weekend"
                  subTitle="Stock Comparisons"
                  data={Object.values(predictions[selectedItem].isWeekend)}
                  labels={Object.keys(predictions[selectedItem].isWeekend).map(
                    v => (Number(v) == 0 ? 'Not Weekend' : 'Weekend')
                  )}
                />
              </Col>
            </Row>
          </div>
        )}
      </Container>
    </>
  );
}

export default App;
