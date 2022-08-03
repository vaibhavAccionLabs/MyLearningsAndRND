import React from "react";
import UserJobFilters from "../job-filters";
import TableUi from "../components/TableUi";
import LoadingIndicator from "../components/LoadingIndicator";

const View = ({ userJobs, isFetching, tableSchema }) => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-12">
          <UserJobFilters />
        </div>
        <div className="col-lg-12">
          {isFetching ? (
            <LoadingIndicator />
          ) : (
            <TableUi tableSchema={tableSchema} tableBody={userJobs} />
          )}
        </div>
      </div>
    </div>
  );
};

export default View;
