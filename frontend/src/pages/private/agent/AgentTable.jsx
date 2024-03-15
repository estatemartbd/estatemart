import React from 'react';
// import { Link } from 'react-router-dom';
// import { KTSVG } from '../../../../_jutemplate/helpers';
import DataTable from '../helper/dataTable/DataTable';
import AgentStyle from './AgentStyle.module.css';
// import defaultImg from '../../blank.png';

export const AgentTable = ({
  agentData,
  statusChange,
  agentDelete,
  imgPath,
}) => {
  const columns = React.useMemo(
    () => [
      {
        Header: 'Agent OR User',
        disableSortBy: false,
        Cell: values => {
          console.log('values');
          console.log(values);
          return (
            <div className="feat_property list favorite_page style2">
              <div className={AgentStyle.thumb}>
                <img
                  className={AgentStyle.img}
                  src={values.row.original.image}
                  alt="fp1.jpg"
                />
                {/* <div className="thmb_cntnt">
                  <ul className="tag mb0">
                    <li className="list-inline-item dn"></li>
                    <li className="list-inline-item">
                      <a href="#">For {values.row.original.purpose}</a>
                    </li>
                  </ul>
                </div> */}
              </div>
              <div className="details">
                <div className="tc_content">
                  <h4>{values.row.original.firstName+' '+values.row.original.lastName}</h4>
                  <p>
                    <span className="flaticon-user"></span>
                    {values.row.original.userName}
                  </p>
                  <a className="fp_price text-thm" href="#">
                    {values.row.original.phone}
                  </a>
                </div>
              </div>
            </div>
          );
        },
      },
      {
        Header: 'Type',
        disableSortBy: false,
        Cell: values =>
          values.row.original.type ? values.row.original.type : '--',
      },
      {
        Header: 'Package Status',
        disableSortBy: false,
        Cell: values =>
          values.row.original.package ? values.row.original.package : '--',
      },

      {
        Header: 'Status',
        disableSortBy: false,
        // Cell: (values) => values.row.original.rating ? values.row.original.rating : "--"
        Cell: values => {
          return (
            <>
              <span className="status_tag badge">
                {values.row.original.status}
              </span>
            </>
          );
        },
      },
      {
        Header: 'Action',
        accessor: 'actions',
        Cell: values => {
          return (
            <ul className="view_edit_delete_list mb0">
              <li
                className="list-inline-item"
                data-toggle="tooltip"
                data-placement="top"
                title=""
                data-original-title="View">
                <a href="#">
                  <span className="flaticon-view"></span>
                </a>
              </li>
              <li
                className="list-inline-item"
                data-toggle="tooltip"
                data-placement="top"
                title="Edit">
                <a href="#">
                  <span className="flaticon-edit"></span>
                </a>
              </li>
              <li
                className="list-inline-item"
                data-toggle="tooltip"
                data-placement="top"
                title="Delete">
                <a href="#">
                  <span className="flaticon-garbage"></span>
                </a>
              </li>
            </ul>
          );
        },
      },
    ],
    [statusChange, agentDelete, agentData],
  );

  return <DataTable columns={columns} data={agentData} />;
};
