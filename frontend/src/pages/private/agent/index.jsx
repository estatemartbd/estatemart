import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import { AgentTable, PropertyTable } from './AgentTable';
import SelectStyle from '../helper/SelectStyle';

const options = [
  {
    label: 'Agent',
    value: 1,
  },
  {
    label: 'Viewer',
    value: 2,
  },
];
const data = [
  {
    id: 1,
    firstName: 'Mr',
    lastName: 'X',
    userName: 'userName1',
    address: 'Road# 2, House# 19-20, Pallabi, Mirpur, Dhaka 1216',
    email: 'x@gmail.com',
    type: 'agent',
    phone: '01675485436',
    package: 'Active',
    listingItem: '30',
    status: 'Apporved',
    image:
      'https://creativelayers.net/themes/findhouse-html/images/resource/review4.png',
  },
  {
    id: 1,
    firstName: 'Mr',
    lastName: 'Y',
    userName: 'userName2',
    address: 'Pallabi, Mirpur, Dhaka 1216',
    email: 'x@gmail.com',
    type: 'viewer',
    phone: '01675485436',
    package: 'Active',
    listingItem: '30',
    status: 'Apporved',
    image:
      'https://creativelayers.net/themes/findhouse-html/images/resource/review2.png',
  },
];



const AgentAndUser = () => {
  const [propertyData, setPropertyData] = useState();
  useEffect(() => {
    setPropertyData(data.map(i => i));
  }, []);
  return (
    <>
      <div className="row">
        <div className="col-lg-4 col-xl-4 mb10">
          <div className="breadcrumb_content style2 mb30-991">
            <h2 className="breadcrumb_title">All Agent and User</h2>
            {/* <p>We are glad to see you again!</p> */}
          </div>
        </div>
        <div className="col-lg-8 col-xl-8">
          <div className="my_profile_setting_input text-right">
            <Link to='/add-agent-user' className="btn btn2">Add Agent</Link>
          </div>
        </div>
        <div className="col-lg-12">
          <div className="my_dashboard_review mb40">
            <div className="candidate_revew_select style2 mb30-991">
              <ul className="mb0">
                <li className="list-inline-item">
                  <div className="candidate_revew_search_box course fn-520">
                    <form className="form-inline my-2">
                      <input
                        className="form-control mr-sm-2"
                        type="search"
                        placeholder="Search here"
                        aria-label="Search"
                      />
                      <button className="btn my-2 my-sm-0" type="submit">
                        <span className="flaticon-magnifying-glass"></span>
                      </button>
                    </form>
                  </div>
                </li>
                <li className="list-inline-item">
                  <Select styles={SelectStyle} options={options} />
                </li>
              </ul>
            </div>
            <div className="property_table">
              <AgentTable agentData={data} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AgentAndUser;
