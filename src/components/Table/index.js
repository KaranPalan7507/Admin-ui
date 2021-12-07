import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faPencilAlt } from "@fortawesome/free-solid-svg-icons";
//table component
export default function Table(props) {
  //props passed to this component
  const {
    data,
    keys,
    columns,
    onDelete,
    onEdit,
    onRecordSelectionChange,
    onSelectAllChange,
    selectedRecords,
    selectAll,
  } = props;
  // rener Table Header
  function renderHeaders() {
    return (
      <thead>
        <tr>
          <th className="checkbox">
            <input
              type="checkbox"
              checked={selectAll}
              onChange={(e) => onSelectAllChange(e.target.checked)}
            />
          </th>
          {columns.map((column) => (
            <th key={column} className={column}>
              {column}
            </th>
          ))}
          <th>Actions</th>
        </tr>
      </thead>
    );
  }

  //function to render row
  function renderRow(rowData) {
    return (
      <tr
        key={rowData.id}
        className={selectedRecords[rowData.id] ? "row-selected row" : "row"}
      >
        <td className="checkbox">
          <input
            type="checkbox"
            checked={selectedRecords[rowData.id] || false}
            onChange={(e) =>
              onRecordSelectionChange(rowData.id, e.target.checked)
            }
          />
        </td>

        {keys.map((key) => (
          <td className={key} key={rowData[key]}>
            {rowData[key]}
          </td>
        ))}
        <td>
          <button
            onClick={() => onEdit(rowData)}
            className="action-btn edit-btn"
          >
            <FontAwesomeIcon icon={faPencilAlt} />
          </button>
          <button
            onClick={() => onDelete(rowData)}
            className="action-btn delete-btn"
          >
            <FontAwesomeIcon icon={faTrashAlt} />
          </button>
        </td>
      </tr>
    );
  }

  //render table component
  return (
    <>
      <table>
        {renderHeaders()}
        <tbody>{data.map((item) => renderRow(item))}</tbody>
      </table>
    </>
  );
}
