import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navbar';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { DatePicker } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import axios from 'axios';

const { RangePicker } = DatePicker;

function App() {
  const [rangePickerValue, setRangePickerValue] = useState<[Dayjs, Dayjs]>([
    dayjs(),
    dayjs(),
  ]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [predictions, setPredictions] = useState<
    | {
        Bulan: number;
        'Di Tanggal': number;
        'Harga Per Item': number;
        Hari: number;
        'Hari Libur': number;
        Nama: string;
        Quantity: number;
        Tahun: number;
        Tanggal: string;
        Weekend: number;
      }[]
    | null
  >(null);

  const onPredict = async () => {
    setIsLoading(true);
    const { data } = await axios.post('http://127.0.0.1:5000/predict', {
      startDate: rangePickerValue[0].format('YYYY-MM-DD'),
      endDate: rangePickerValue[1].format('YYYY-MM-DD'),
    });
    setPredictions(data);
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
      </Container>
    </>
  );
}

export default App;
