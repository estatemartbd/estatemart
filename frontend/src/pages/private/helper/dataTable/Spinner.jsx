// import { Loader } from "semantic-ui-react";
import * as React from 'react';
import './Spinner.css';

const Spinner = props => {
  return props.loading ? (
    <div className="loading_div">
      <div className="loading"></div>
    </div>
  ) : null;
};

export default Spinner;
