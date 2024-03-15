import React from 'react'
import { Link } from 'react-router-dom'
import ReactSwitch from 'react-switch'
import DataTable from '../helper/dataTable/DataTable'

export const LocationTable = ({
  locationData,
  statusChange,
  locationDelete,
  handleChangeStatus,
  handleEditParent,
  setSelectedLocation,
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
        Cell: (values) => (
          <>
            {values.row.original.parent_id === 0
              ? values.row.original.title
              : 'N/A'}
            {
              <li
                className="list-inline-item"
                data-toggle="tooltip"
                data-placement="top"
                title="Edit"
                style={{ marginLeft: 10 }}
              >
                <button
                  onClick={() => handleEditParent(values?.row?.original)}
                  style={{ border: 'transparent', background: 'transparent' }}
                >
                  <span
                    className="flaticon-edit"
                    style={{ fontSize: 10 }}
                  ></span>
                </button>
              </li>
            }
          </>
        ),
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
      {
        Header: 'Action',
        accessor: 'actions',
        Cell: (values) => {
          return (
            <>
              {values.row.original.parent_id === 0 && (
                <ul className="view_edit_delete_list mb0">
                  {values.row.original.childLocations?.length > 0 && (
                    <li
                      className="list-inline-item"
                      data-toggle="tooltip"
                      data-placement="top"
                      title="Edit"
                    >
                      <Link
                        to={'/auth/location/edit/' + values.row.original.id}
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
                      onClick={() => {
                        locationDelete(values.row.original.id)
                      }}
                    >
                      <span className="flaticon-garbage"></span>
                    </a>
                  </li>
                </ul>
              )}
            </>
          )
        },
      },
    ],
    [
      statusChange,
      locationDelete,
      locationData,
      handleChangeStatus,
      handleEditParent,
      setSelectedLocation,
    ],
  )

  return <DataTable columns={columns} data={filterData} />
}
