/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import DataTable from '../../../helper/dataTable/DataTable'
// import defaultImg from '../../blank.png';
import Switch from 'react-switch'
import { Link } from 'react-router-dom'

export const Table = ({
  inqueryData,
  statusChange,
  inqueryDelete,
  imgPath,
  handleChangeStatus,
}) => {
  const columns = React.useMemo(
    () => [
      {
        Header: 'SL',
        disableSortBy: false,
        Cell: (values) => (values.row.id ? Number(values.row.id) + 1 : '--'),
      },
      {
        Header: 'Name',
        disableSortBy: false,
        Cell: (values) =>
          values.row.original.name ? values.row.original.name : '--',
      },
      {
        Header: 'Email',
        disableSortBy: false,
        Cell: (values) =>
          values.row.original.email ? values.row.original.email : '--',
      },
      {
        Header: 'Phone',
        disableSortBy: false,
        Cell: (values) =>
          values.row.original.phone ? values.row.original.phone : '--',
      },
      {
        Header: 'Address',
        disableSortBy: false,
        Cell: (values) =>
          values.row.original.address ? values.row.original.address : '--',
      },
      {
        Header: 'Details',
        disableSortBy: false,
        Cell: (values) =>
          values.row.original.details ? values.row.original.details : '--',
      },

      {
        Header: 'Status',
        disableSortBy: false,
        // Cell: (values) => values.row.original.rating ? values.row.original.rating : "--"
        Cell: (values) => {
          return (
            <>
              {values.row.original.is_read === 0 ? (
                <span className="badge badge-warning">Unread</span>
              ) : (
                <span className="badge badge-secondary">Seen</span>
              )}
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
              <li
                className="list-inline-item"
                data-toggle="tooltip"
                data-placement="top"
                title="Edit"
              >
                <Link
                  to={'/submitted-inqueries/edit/' + values.row.original.id}
                >
                  <span className="flaticon-edit"></span>
                </Link>
              </li>
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
                    inqueryDelete(values.row.original.id)
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
    [statusChange, inqueryDelete, inqueryData, handleChangeStatus],
  )

  return <DataTable columns={columns} data={inqueryData} />
}
