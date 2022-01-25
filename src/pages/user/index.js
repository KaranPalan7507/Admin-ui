import React, { useEffect, useState } from "react";
import { getUserList } from "./../../api/getUserList";
import Table from "./../../components/Table";
import Pagination from "./../../components/Pagination";
import UserEditModal from "./../../components/UserEditModal";
import UserAddModal from "./../../components/UserAddModal";
import "./style.css";
// user component
export default function User() {
  // state values
  const [list, setList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [currentPageData, setCurrentPageData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [editUserData, setEditUserData] = useState(null);
  const [addUserData, setAddUserData] = useState(null);

  const [searchText, setSearchText] = useState("");
  const [selectedRecords, setSelectedRecords] = useState({});
  const [selectAll, setSelectAll] = useState(false);
  const [sortKey, setSortKey] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  //component variables
  const columns = ["Name", "Email", "Role"];
  const keys = ["name", "email", "role"];
  const perPageRecords = 10;
  // hook - useefect - get user data on component load
  useEffect(() => {
    let mounted = true;
    getUserList().then((items) => {
      if (mounted) {
        setList(items.data);
        setFilteredList([...items.data]);
      }
    });
    return () => (mounted = false);
  }, []);

  // hook - use effect -  get filter data n list value change
  useEffect(() => {
    if (list) {
      filterData();
    }
  }, [list]);
  // sort functionality handling
  useEffect(() => {
    if (!sortKey) {
      filterData();
      return;
    }
    let sortedData;
    if (sortOrder === "desc") {
      sortedData = [...filteredList].sort((item1, item2) =>
        item1[sortKey] < item2[sortKey] ? 1 : -1
      );
    } else {
      sortedData = [...filteredList].sort((item1, item2) =>
        item1[sortKey] < item2[sortKey] ? -1 : 1
      );
    }
    setFilteredList(sortedData);
  }, [sortKey, sortOrder]);

  // hook - use effect -  get current page data on page change
  useEffect(() => {
    const startIndex = (currentPage - 1) * perPageRecords;
    const endIndex = startIndex + perPageRecords;
    const currentPageData = filteredList.slice(startIndex, endIndex);
    setCurrentPageData(currentPageData);
    setSelectAll(false);
    setSelectedRecords({});
  }, [currentPage, filteredList]);

  // filter data based on user input
  function filterData(searchText = "") {
    setSearchText(searchText);
    const filteredList = list.filter(function (item) {
      for (var key in item) {
        if (item[key].toLowerCase().indexOf(searchText.toLowerCase()) > -1)
          return item;
      }
    });
    setFilteredList(filteredList);
    setCurrentPage(1);
  }

  // on page change from pagination
  function onPageChange(pageNo) {
    setCurrentPage(pageNo);
  }

  // handle delete individual user
  function onDelete(deleteItem) {
    const afterDeleteList = list.filter((item) => item.id !== deleteItem.id);
    setList(afterDeleteList);
    if (currentPageData.length === 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  //on edit user click
  function onEdit(editItem) {
    setEditUserData(editItem);
  }

  // save updated user details
  function updateUser(data) {
    const editIndex = list.findIndex((item) => item.id === data.id);
    list[editIndex] = data;
    setList(list);
    filterData(searchText);
  }
  // save add user details
  function addUser(data) {
    setList([...list, data]);
    filterData(searchText);
  }

  //detele multiple users
  function deleteUsers() {
    const afterDeleteList = list.filter((item) => !selectedRecords[item.id]);
    setList(afterDeleteList);
    setSelectedRecords({});
    if (Object.keys(selectedRecords).length === currentPageData.length) {
      setCurrentPage(currentPage - 1);
    }
    setSelectAll(false);
  }

  //handle select all selection change
  function onSelectAllChange(checked) {
    const records = {};
    if (checked) {
      for (let item of currentPageData) {
        records[item.id] = checked;
      }
    }
    setSelectedRecords(records);

    setSelectAll(checked);
  }

  // handle row selection change
  function onRecordSelectionChange(id, checked) {
    if (checked) {
      selectedRecords[id] = checked;
    } else {
      delete selectedRecords[id];
    }
    setSelectedRecords({ ...selectedRecords });
    setSelectAll(
      Object.keys(selectedRecords).length === currentPageData.length
    );
  }

  //render loading while api call is going on
  if (list === null) {
    return <h2>Loading...</h2>;
  }
  function onSort(key) {
    if (sortOrder === "desc" && key === sortKey) {
      setSortOrder("");
      setSortKey("");
    } else if (sortKey === key) {
      setSortOrder("desc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
    console.log(sortKey, sortOrder);
  }

  // render user component
  return (
    <>
      <h2>User List</h2>
      <input
        type="text"
        onChange={(e) => filterData(e.target.value)}
        placeholder="Search by Name, Email or Role"
        className="search-text-box"
      />
      {list.length === 0 || filteredList.length === 0 ? (
        <div>No Data</div>
      ) : (
        <>
          <Table
            data={currentPageData}
            columns={columns}
            keys={keys}
            onDelete={onDelete}
            onEdit={onEdit}
            onRecordSelectionChange={onRecordSelectionChange}
            onSelectAllChange={onSelectAllChange}
            selectedRecords={selectedRecords}
            selectAll={selectAll}
            onSort={onSort}
          />
          <Pagination
            perPageRecords={perPageRecords}
            total={filteredList.length}
            onPageChange={onPageChange}
            currentPage={currentPage}
          />
          <UserEditModal
            isOpen={!!editUserData}
            onClose={() => setEditUserData(false)}
            onSubmit={updateUser}
            data={editUserData}
          />
          <UserAddModal
            isOpen={!!addUserData}
            onClose={() => setAddUserData(false)}
            onSubmit={addUser}
          />

          {Object.keys(selectedRecords).length ? (
            <button onClick={deleteUsers} className="delete-selected-btn">
              Delete Selected
            </button>
          ) : null}
          <button
            onClick={() => setAddUserData(true)}
            className="add-selected-btn"
          >
            Add User
          </button>
        </>
      )}
    </>
  );
}
