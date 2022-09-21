import React, { memo, useState, useEffect } from "react";
import {
  MDBBadge,
  MDBBtn,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
} from "mdb-react-ui-kit";
import { useSelector, useDispatch } from "react-redux";
import Tasks from "../Task/Task";
import { updateTask } from "../../stores/slice/taskSlice";
import { getTasks, removeTask } from "../../stores/slice/taskSlice";
// import { Pagination } from "react-bootstrap";
import PaginatedItems from "../../component/Pagination/Pagination";
import taskSlice from "../../stores/slice/taskSlice";

function TableTask() {
  const dispatch = useDispatch();
  const paramTask=useSelector((state)=>state.filterSlice.paramTask)
  const { items, Loading,meta} = useSelector((state) => state?.taskSlice);
  const [pendingRemoveTasks,setPendingRemoveTask]= useState([])
  // console.log(meta)
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    dispatch(getTasks(paramTask));
  }, [currentPage]);
  // pagination;
  const setPage=(numPage)=>{
    setCurrentPage(numPage)
  }
  const reTasks = (id) => {
    setPendingRemoveTask((pre)=>{
      const isChecked=pendingRemoveTasks.includes(id);
      if(isChecked) {
        return pendingRemoveTasks.filter((item)=>item !== id)
      }
      else{
        return  [...pre,id]
      }
   })
    // dispatch(taskSlice.actions.removeTasks(id));
  };

  useEffect(()=>{
    dispatch(taskSlice.actions.removeTasks(pendingRemoveTasks));
  },[pendingRemoveTasks])
  if (Loading) return <p>Loading...</p>;
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
      <MDBTableBody>
        {items?.map((item) => (
          <Tasks
            key={item.id}
            data={item}
            currentPage={currentPage}
            reTasks={reTasks}
            pendingRemoveTasks={pendingRemoveTasks}
          />
        ))}
      </MDBTableBody>
      <div >
      {/* <span onClick={() => setCurrenPage(1)}>1</span> */}
        {/* <span onClick={() => setCurrenPage(2)}>2</span> */}
        {/* <PaginatedItems itemsPerPage={3}/> */}
        <PaginatedItems setPage={setPage}/>
      </div>
    </MDBTable>
  );
}
export default TableTask;
