import React from 'react'
import DataTable from '../../helper/dataTable/DataTable'
// import defaultImg from '../../blank.png';
import Switch from 'react-switch'
import { Link } from 'react-router-dom'

export const PackageTable = ({
  packageData,
  statusChange,
  packageDelete,
  imgPath,
  handleChangeStatus,
}) => {
  const columns = React.useMemo(
    () => [
      {
        Header: 'SL',
        disableSortBy: false,
        Cell: (values) =>
          values.row.original.id ? values.row.original.id : '--',
      },
      {
        Header: 'Title',
        disableSortBy: false,
        Cell: (values) =>
          values.row.original.title ? values.row.original.title : '--',
      },

      {
        Header: 'Status',
        disableSortBy: false,
        // Cell: (values) => values.row.original.rating ? values.row.original.rating : "--"
        Cell: (values) => {
          return (
            <>
              <Switch
                onChange={() => handleChangeStatus(values.row.original.id)}
                checked={values.row.original.status === 1}
              />
            </>
          )
        },
      },
      {
        Header: 'Action',
        accessor: 'actions',
        Cell: (values) => {
          return (
            <ul className="view_edit_delete_list mb0">
              {/* <li
                className="list-inline-item"
                data-toggle="tooltip"
                data-placement="top"
                title=""
                data-original-title="View"
              >
                <a href="#">
                  <span className="flaticon-view"></span>
                </a>
              </li> */}
              {values.row.original.status === 1 && (
                <li
                  className="list-inline-item"
                  data-toggle="tooltip"
                  data-placement="top"
                  title="Edit"
                >
                  <Link
                    to={'/auth/outdoor-amenities/edit/' + values.row.original.id}
                  >
                    <span className="flaticon-edit"></span>
                  </Link>
                </li>
              )}
              <li
                className="list-inline-item"
                data-toggle="tooltip"
                data-placement="top"
                title="Delete"
              >
                <a
                  // href="#"
                  onClick={() => {
                    // console.log(values.row.original.id)
                    packageDelete(values.row.original.id)
                  }}
                >
                  <span className="flaticon-garbage"></span>
                </a>
              </li>
            </ul>
          )
        },
      },
    ],
    [statusChange, packageDelete, packageData, handleChangeStatus],
  )

  return <DataTable columns={columns} data={packageData} />
}
