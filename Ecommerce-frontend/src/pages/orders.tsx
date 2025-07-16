import { useState, type ReactElement } from 'react';
import { Link } from 'react-router-dom';
import TableHOC from '../components/admin/TableHOC';

// If you use react-table, import Column from there, or define it as below:
type Column<T> = {
  Header: string;
  accessor: keyof T;
};

type DataType = {
  _id: string;
  amount: number;
  quantity: number;
  discount: number;
  status: ReactElement;
  action: ReactElement;
};

const column: Column<DataType>[] = [
  {
    Header: "ID",
    accessor: "_id",
  },
  {
    Header: "Quantity",
    accessor: "quantity",
  },
  {
    Header: "Discount",
    accessor: "discount",
  },
  {
    Header: "Amount",
    accessor: "amount",
  },
  {
    Header: "Status",
    accessor: "status",
  },
];

const Orders = () => {
  const [rows] = useState<DataType[]>([
    {
      _id: "gbgrbgbgu",
      amount: 9955,
      quantity: 435,
      discount: 355,
      status: <span className='red'>processing</span>,
      action: <Link to={'/order/asdwedwd'}>View</Link>,
    },
  ]);

  const Table = TableHOC<DataType>(
    column,
    rows,
    "dashboard-product-box",
    "Orders",
    rows.length > 6
  )();

  return (
    <div className="container">
      <h1>My Orders</h1>
      {Table}
    </div>
  );
};

export default Orders;