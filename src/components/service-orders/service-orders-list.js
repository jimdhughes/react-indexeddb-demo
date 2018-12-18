import * as React from 'react';
import { DBService } from '../../services/DBService';
import { Link } from 'react-router-dom';
import { CircularProgress, Table, TableHead, TableCell, TableRow, TableBody } from '@material-ui/core';
import './service-orders-list.css';

export default class ServiceOrdersListComponent extends React.Component {
  constructor(props) {
    super(props)
    this._db = new DBService()
    console.log(this.props.match.params)
    this.state = {
      bucket: this.props.match.params.bucket,
      businessUnit: this.props.match.params.businessUnit,
      status: this.props.match.params.status,
      isLoading: true
    }
    this._getOrders()
  }

  _getOrders() {
    let idx = [this.state.bucket, this.state.businessUnit, this.state.status]
    console.log(idx)
    this._db.getAll('ServiceOrders', 'BucketBusinessUnitStatus', idx).then(orders => {
      console.log(orders);
      this.setState({ orders: orders, isLoading: false })

    });
  }

  render() {
    let { bucket, businessUnit, status, isLoading } = this.state
    let { orders } = this.state
    return <div>
      <h1>{bucket} - {businessUnit} - {status}</h1>
      {orders && <p>Viewing {orders.length} orders</p>}
      {isLoading && <CircularProgress />}
      {!isLoading && <Table>
        <TableHead>
          <TableRow>
            <TableCell className="sticky-header">ID</TableCell>
            <TableCell className="sticky-header">Bucket</TableCell>
            <TableCell className="sticky-header">Business Unit</TableCell>
            <TableCell className="sticky-header">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody style={{ overflowY: 'scroll' }}>
          {orders && orders.map(o => <TableRow key={o.id}>
            <TableCell>
              <Link to={'/serviceOrders/' + o.id}>{o.id}</Link></TableCell>
            <TableCell>{o.bucket}</TableCell>
            <TableCell>{o.businessUnit}</TableCell>
            <TableCell>{o.status}</TableCell>
          </TableRow>)}
        </TableBody>
      </Table>}
    </div>;
  }
}