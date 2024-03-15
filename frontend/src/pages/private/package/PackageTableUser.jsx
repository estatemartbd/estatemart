import React from 'react'
import DataTable from '../helper/dataTable/DataTable'
// import defaultImg from '../../blank.png';
import Switch from 'react-switch'
import { Link } from 'react-router-dom'

export const PackageTableUser = ({
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
        Header: 'Package Name',
        disableSortBy: false,
        Cell: (values) =>
          values.row.original.title ? values.row.original.title : '--',
      },
      {
        Header: 'Price',
        disableSortBy: false,
        Cell: (values) =>
          values.row.original.price ? values.row.original.price : '--',
      },
      {
        Header: 'Discount Price',
        disableSortBy: false,
        Cell: (values) =>
          values.row.original.discount_amount
            ? values.row.original.discount_amount
            : '--',
      },
      {
        Header: 'Duration',
        disableSortBy: false,
        Cell: (values) =>
          values.row.original.duration ? values.row.original.duration : '--',
      },

      // {
      //   Header: 'Status',
      //   disableSortBy: false,
      //   // Cell: (values) => values.row.original.rating ? values.row.original.rating : "--"
      //   Cell: (values) => {
      //     return (
      //       <>
      //         {values.row.original.status === 1 ? (
      //           <span className="status_tag badge2">Active</span>
      //         ) : (
      //           <span className="status_tag badge">Inactive</span>
      //         )}
      //       </>
      //     )
      //   },
      // },
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
    ],
    [statusChange, packageDelete, packageData, handleChangeStatus],
  )

  return <DataTable columns={columns} data={packageData} />
}
