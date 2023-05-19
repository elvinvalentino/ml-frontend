import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navbar';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import { DatePicker } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import axios from 'axios';
import { PredictionItem } from './types';
import { decomposePrediction } from './utils/decomposePrediction';
import PredictionChart from './components/PredictionChart';
import PredictionTable from './components/PredictionTable';

const { RangePicker } = DatePicker;

function App() {
  const [rangePickerValue, setRangePickerValue] = useState<[Dayjs, Dayjs]>([
    dayjs(),
    dayjs(),
  ]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [predictions, setPredictions] = useState<any>(null);
  const [selectedItem, setSelectedItem] = useState<string>('all');
  const [selectedTab, setSelectedTab] = useState<'chart' | 'table'>();

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
          <>
            <h3>Result</h3>

            <Tabs
              id="controlled-tab-example"
              activeKey={selectedTab}
              onSelect={k => setSelectedTab(k as 'chart' | 'table')}
              className="mb-3"
            >
              <Tab eventKey="chart" title="Chart">
                <PredictionChart
                  predictions={predictions}
                  selectedItem={selectedItem}
                  setSelectedItem={setSelectedItem}
                />
              </Tab>
              <Tab eventKey="table" title="Table">
                <PredictionTable predictions={predictions} />
              </Tab>
            </Tabs>
          </>
        )}
      </Container>
    </>
  );
}

export default App;
