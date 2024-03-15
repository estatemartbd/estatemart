import React from 'react'
import { Link } from 'react-router-dom'
import ReactSwitch from 'react-switch'
import DataTable from '../helper/dataTable/DataTable'

export const LocationTableUser = ({
  locationData,
  statusChange,
  locationDelete,
  handleChangeStatus,
}) => {
  const filterData = locationData
    .map((item) => ({
      ...item,
      childLocations: locationData.filter((f) => f.parent_id === item.id),
    }))
    .filter((e) => e.parent_id === 0)
  console.log(filterData)
  const columns = React.useMemo(
    () => [
      {
        Header: 'SL',
        disableSortBy: false,
        Cell: (values) => Number(values.row.id) + 1,
      },
      {
        Header: 'Parent Location',
        disableSortBy: false,
        Cell: (values) =>
          values.row.original.parent_id === 0
            ? values.row.original.title
            : 'N/A',
      },
      {
        Header: 'Child Location',
        disableSortBy: false,
        Cell: (values) =>
          values.row.original.childLocations
            .map((e) => e.title)
            .filter(Boolean)
            .join(' , ') ||
          (values.row.original.parent_id !== 0 && values.row.original.title),
      },
      {
        Header: 'Status',
        disableSortBy: false,
        Cell: (values) => {
          return (
            <>
              <ReactSwitch
                onChange={() => handleChangeStatus(values.row.original.id)}
                checked={values.row.original.status === 1}
              />
            </>
          )
        },
      },
    ],
    [statusChange, locationDelete, locationData, handleChangeStatus],
  )

  return <DataTable columns={columns} data={filterData} />
}
