/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import DataTable from '../helper/dataTable/DataTable'
// import defaultImg from '../../blank.png';
import Switch from 'react-switch'
import { Link } from 'react-router-dom'

export const TableUser = ({
  systemUserData,
  statusChange,
  systemUserDelete,
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
        Header: 'Role',
        disableSortBy: false,
        Cell: (values) =>
          values.row.original.role_id
            ? values.row.original.role_id === 2
              ? 'Agent'
              : 'User'
            : '--',
      },

      {
        Header: 'Status',
        disableSortBy: false,
        // Cell: (values) => values.row.original.rating ? values.row.original.rating : "--"
        Cell: (values) => {
          return (
            <>
              {values.row.original.role_id === 3 ? (
                <Switch
                  onChange={() =>
                    handleChangeStatus(values.row.original.user_id)
                  }
                  checked={values.row.original.status === 1}
                />
              ) : values.row.original.status === 1 ? (
                'Active'
              ) : (
                'Disabled'
              )}
            </>
          )
        },
      },
    ],
    [statusChange, systemUserDelete, systemUserData, handleChangeStatus],
  )

  return <DataTable columns={columns} data={systemUserData} />
}