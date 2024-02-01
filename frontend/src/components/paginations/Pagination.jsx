import Pagination from "react-mui-pagination";
import { useState } from "react";

function PaginationComponent() {
  // console.log(props);
  const [page, setMyPage] = useState([]); // this an example using hooks
  const setPage = () => {
    setMyPage();
  };
  return (
    <Pagination numOfLinks={6} page={page} setPage={setPage} total={100} />
  );
}

export default PaginationComponent;