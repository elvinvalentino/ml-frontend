import React, { useState } from 'react';
import DataTable, { Alignment, Direction } from 'react-data-table-component';
import { CSVLink } from 'react-csv';
import { Input } from 'antd';

const { Search } = Input;

interface IProps {
  predictions: any;
}

const PredictionTable: React.FC<IProps> = ({ predictions }) => {
  const [filterString, setFilterString] = useState<string>('');

  const columns = [
    {
      name: 'No',
      selector: (row: any) => row.no,
      sortable: true,
    },
    {
      name: 'Name',
      selector: (row: any) => row.name,
      sortable: true,
    },
    {
      name: 'Stock Needed',
      selector: (row: any) => row.stockNeeded,
      sortable: true,
    },
  ];

  const rows = Object.entries(predictions).map(
    ([key, value]: [string, any], index) => {
      return {
        no: index + 1,
        name: key
          .trim()
          .toLowerCase()
          .replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase()),
        stockNeeded: value.quantity,
      };
    }
  );
  const data = [...rows]
    .filter(
      r =>
        r.name !== 'All' &&
        r.stockNeeded > 0 &&
        r.name.toLowerCase().includes(filterString.toLowerCase())
    )
    .map((v, i) => ({
      ...v,
      no: i + 1,
    }));

  return (
    <>
      <div className="d-flex justify-content-between">
        <Search
          placeholder="Search..."
          onChange={e => setFilterString(e.target.value)}
          onSearch={v => setFilterString(v)}
          style={{ width: 300 }}
        />
        <CSVLink
          data={[
            ['No', 'Name', 'Stock Needed'],
            ...rows.slice(1).map((r, i) => [i + 1, r.name, r.stockNeeded]),
          ]}
          className="btn btn-primary"
        >
          Export Data
        </CSVLink>
      </div>
      <DataTable
        direction={Direction.AUTO}
        fixedHeaderScrollHeight="300px"
        pagination
        responsive
        subHeaderAlign={Alignment.RIGHT}
        subHeaderWrap
        columns={columns}
        data={data}
      />
    </>
  );
};

export default PredictionTable;
