/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import DataTable from '../helper/dataTable/DataTable'
// import defaultImg from '../../blank.png';
import Switch from 'react-switch'
import { Link } from 'react-router-dom'

export const Table = ({
  // setMessage,
  tableData,
  // statusChange,
  // inqueryDelete,
  // imgPath,
  // handleChangeStatus,
  // markReadAction,
}) => {
  const columns = React.useMemo(
    () => [
      {
        Header: 'SL',
        disableSortBy: false,
        Cell: (values) => (values.row.id ? Number(values.row.id) + 1 : '--'),
      },
      {
        Header: 'Page Name',
        disableSortBy: false,
        Cell: (values) =>
          values.row.original?.page_name ? values.row.original.page_name : '--',
      },
      {
        Header: 'Meta Title',
        disableSortBy: false,
        Cell: (values) =>
          values.row.original.meta_title
            ? values.row.original.meta_title
            : '--',
      },
      {
        Header: 'Meta Description',
        disableSortBy: false,
        Cell: (values) =>
          values.row.original?.meta_description
            ? values.row.original.meta_description
            : '--',
      },
      {
        Header: 'Meta Canonical URL',
        disableSortBy: false,
        Cell: (values) =>
          values.row.original?.meta_canonical_url ? (
            <a
              href={values.row.original.meta_canonical_url}
              className="badge badge-success"
            >
              {values.row.original.meta_canonical_url}
            </a>
          ) : (
            '--'
          ),
      },
      {
        Header: 'Meta Tag',
        disableSortBy: false,
        Cell: (values) =>
          values.row.original?.meta_tag ? values.row.original.meta_tag : '--',
      },
      {
        Header: 'Status',
        disableSortBy: false,
        Cell: (values) =>
          values.row.original?.status ? (
            values.row.original.status === 1 ? (
              <span className="badge badge-success">Active</span>
            ) : (
              <span className="badge badge-danger">Disabled</span>
            )
          ) : (
            '--'
          ),
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
                  to={'/auth/page-meta/edit/' + values.row.original.id}
                >
                  <span className="flaticon-edit"></span>
                </Link>
              </li>
              {/* <li
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
              </li> */}
            </ul>
          )
        },
      },
    ],
    [

    ],
  )

  return <DataTable columns={columns} data={tableData} />
}
