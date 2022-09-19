import React, { memo } from "react";
import {
  MDBBadge,
  MDBBtn,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
} from "mdb-react-ui-kit";
import { useSelector } from "react-redux";
import Tasks from "../Task/Task";
import Loading from "../../component/Loading/Loading";

function TableTask() {
  const tasks = useSelector((state) => state.taskSlice?.items);
  console.log(tasks)
  return (
    <MDBTable bordered>
      <MDBTableHead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Title</th>
          <th scope="col">Categories</th>
          <th scope="col">Create at</th>
          <th scope="col">Update at</th>
          <th scope="col">Complete</th>
          <th scope="col">Option</th>
        </tr>
      </MDBTableHead>
      {
        !tasks ? <Loading/> : (
          <MDBTableBody>
        {tasks?.map((item) => (
          <Tasks key={item.id} data={item} />
        ))}
      </MDBTableBody>
        )
      }
      
    </MDBTable>
  );
}
export default memo(TableTask);
