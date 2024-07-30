import "./Table.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const List = ({ orders }) => {
  // const rows = [
  //   {
  //     id: 1143155,
  //     product: "ASICS men Running Shoes",
  //     img: "https://m.media-amazon.com/images/I/81bc8mA3nKL._AC_UY327_FMwebp_QL65_.jpg",
  //     customer: "Kasun",
  //     date: "1 March",
  //     amount: 7850,
  //     method: "Online Payment",
  //     status: "Approved",
  //   },
  //   {
  //     id: 2235235,
  //     product: "Winner Ladies Lacing Shoe",
  //     img: "https://m.media-amazon.com/images/I/31JaiPXYI8L._AC_UY327_FMwebp_QL65_.jpg",
  //     customer: "Lahiru",
  //     date: "1 March",
  //     amount: 9000,
  //     method: "Online Payment",
  //     status: "Pending",
  //   },
  //   {
  //     id: 2342353,
  //     product: "ASICS Women Hiking Shoe",
  //     img: "https://m.media-amazon.com/images/I/71kr3WAj1FL._AC_UY327_FMwebp_QL65_.jpg",
  //     customer: "Yasiru",
  //     date: "1 March",
  //     amount: 35000,
  //     method: "Cash on Delivery",
  //     status: "Pending",
  //   },
  //   {
  //     id: 2357741,
  //     product: "AVI Jogging Lacing Shoe",
  //     img: "https://m.media-amazon.com/images/I/71wF7YDIQkL._AC_UY327_FMwebp_QL65_.jpg",
  //     customer: "Dasunika",
  //     date: "1 March",
  //     amount: 9200,
  //     method: "Online",
  //     status: "Approved",
  //   },
  //   {
  //     id: 2342355,
  //     product: "FILA Lacing Shoe",
  //     img: "https://m.media-amazon.com/images/I/81hH5vK-MCL._AC_UY327_FMwebp_QL65_.jpg",
  //     customer: "Charith",
  //     date: "1 March",
  //     amount: 20000,
  //     method: "Online",
  //     status: "Pending",
  //   },
  // ];
  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">Order ID</TableCell>
            {/* <TableCell className="tableCell">Product</TableCell> */}
            {/* <TableCell className="tableCell">Customer</TableCell> */}
            <TableCell className="tableCell">Date</TableCell>
            <TableCell className="tableCell">Time</TableCell>
            <TableCell className="tableCell">Amount</TableCell>
            {/* <TableCell className="tableCell">Payment Method</TableCell> */}
            <TableCell className="tableCell">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((row) => (
            <TableRow key={row.id}>
              <TableCell className="tableCell">{row.orderId}</TableCell>
              {/* <TableCell className="tableCell">
                <div className="cellWrapper">{row.orderItems.productName}</div>
              </TableCell> */}
              {/* <TableCell className="tableCell">{row.customer}</TableCell> */}
              <TableCell className="tableCell">{row.date}</TableCell>
              <TableCell className="tableCell">{row.time}</TableCell>
              <TableCell className="tableCell">{row.Total}</TableCell>
              {/* <TableCell className="tableCell">{row.method}</TableCell> */}
              <TableCell className="tableCell">
                <span className={`status ${row.status}`}>{row.status}</span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default List;
