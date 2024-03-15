/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import DataTable from '../helper/dataTable/DataTable'
import moment from 'moment'
// import defaultImg from '../../blank.png';
import Switch from 'react-switch'
import { Link } from 'react-router-dom'

export const Table = ({
  setMessage,
  inqueryData,
  statusChange,
  inqueryDelete,
  imgPath,
  handleChangeStatus,
  markReadAction,
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
        Header: 'Date',
        disableSortBy: false,
        Cell: (values) =>
          values.row.original.created_at ? moment(values.row.original.created_at).format(
            'MMMM Do YYYY, h:mm A',
          ) : '--',
      },
      // {
      //   Header: 'Address',
      //   disableSortBy: false,
      //   Cell: (values) =>
      //     values.row.original.address ? values.row.original.address : '--',
      // },
      // {
      //   Header: 'Details',
      //   disableSortBy: false,
      //   Cell: (values) =>
      //     values.row.original.details ? values.row.original.details : '--',
      // },
      {
        Header: 'Status',
        disableSortBy: false,
        Cell: (values) =>
          values.row.original.status ? (
            values.row.original.status === 1 ? (
              <span className="badge badge-success">Active</span>
            ) : (
              <span className="badge badge-danger">Disabled</span>
            )
          ) : (
            '--'
          ),
      },
      // {
      //   Header: 'Action',
      //   disableSortBy: false,
      //   // Cell: (values) => values.row.original.rating ? values.row.original.rating : "--"
      //   Cell: (values) => {
      //     return (
      //       <>
      //         {/* {values.row.original.is_read === 0 ? (
      //           // <span className="badge badge-warning">Unread</span>
      //           // <button
      //           //   className="btn btn-info btn-sm"
      //           //   onClick={() => markReadAction(values.row.original.id)}
      //           // >
      //           //   Mark Read
      //           // </button> */}
      //         <button
      //           onClick={() => setMessage(values.row.original)}
      //           type="button"
      //           className="btn dbxshad btn-sm btn-thm circle white"
      //           data-toggle="modal"
      //           data-target="#exampleModalCenter"
      //         >
      //           Details
      //         </button>
      //         {/* // )
      //         // : (
      //         //   <span className="badge badge-secondary">Seen</span>
      //         // )} */}
      //       </>
      //     )
      //   },
      // },
      {
        Header: 'Action',
        accessor: 'actions',
        Cell: (values) => {
          return (
            <>
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
                  title="View Property details"
                >
                  <a href={'/property-details/' + values.row.original.id} target='_blank' rel="noreferrer">
                    <i className="fa fa-light fa-list"></i>
                  </a>
                </li>
              </ul>
            </>
          )
        },
      },
      // {
      //   Header: 'Action',
      //   accessor: 'actions',
      //   Cell: (values) => {
      //     return (
      //       <ul className="view_edit_delete_list mb0">
      //         <li
      //           className="list-inline-item"
      //           data-toggle="tooltip"
      //           data-placement="top"
      //           title="Edit"
      //         >
      //           <Link
      //             to={'/auth/inquery/edit/' + values.row.original.id}
      //           >
      //             <span className="flaticon-edit"></span>
      //           </Link>
      //         </li>
      //         <li
      //           className="list-inline-item"
      //           data-toggle="tooltip"
      //           data-placement="top"
      //           title="Delete"
      //         >
      //           <a
      //             // href="#"
      //             onClick={() => {
      //               // console.log(values.row.original.id)
      //               inqueryDelete(values.row.original.id)
      //             }}
      //           >
      //             <span className="flaticon-garbage"></span>
      //           </a>
      //         </li>
      //       </ul>
      //     )
      //   },
      // },
    ],
    [
      setMessage,
      statusChange,
      inqueryDelete,
      inqueryData,
      handleChangeStatus,
      markReadAction,
    ],
  )

  return <DataTable columns={columns} data={inqueryData} />
}
