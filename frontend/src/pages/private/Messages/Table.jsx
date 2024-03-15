/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import DataTable from '../helper/dataTable/DataTable'

export const Table = ({ 
  setMessage,
  data, statusChange, onDelete, markReadAction }) => {
  const columns = React.useMemo(
    () => [
      // {
      //   Header: 'SL',
      //   disableSortBy: false,
      //   Cell: (values) => (values.row.id ? Number(values.row.id) + 1 : '--'),
      // },
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
      // {
      //   Header: 'Subject',
      //   disableSortBy: false,
      //   Cell: (values) =>
      //     values.row.original.subject ? values.row.original.subject : '--',
      // },
      // {
      //   Header: 'Message',
      //   disableSortBy: false,
      //   Cell: (values) =>
      //     values.row.original.message ? values.row.original.message : '--',
      // },

      {
        Header: 'Status',
        disableSortBy: false,
        Cell: (values) => {
          return (
            <>
              {values.row.original.is_read === 0 ? (
                <span
                  className="badge badge-primary"
                  // style={{ border: 'transparent', cursor: 'pointer' }}
                  // onClick={() => markReadAction(values.row.original.id)}
                >
                  Unread
                </span>
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
                  title="Details"
                >
                  <button
                    onClick={() => setMessage(values.row.original)}
                    type="button"
                    className="btn btn-sm"
                    data-toggle="modal"
                    data-target="#exampleModalCenter"
                  >
                    <i className="fa fa-eye"></i>
                  </button>
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
                    onDelete(values.row.original.id)
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
    [statusChange, onDelete, data, markReadAction],
  )

  return <DataTable columns={columns} data={data} />
}
