import React from "react";

export default function Group() {
  return (
    <>
      <div className="send-mail-container card">
        <div className="card-body">
        <h2 className="mx-3 card-title">Create Group</h2>
        <div className="row m-0 p-0">
          <div className="col-md-12 col-sm-12 col-xl-12">
            <label className="form-label font-size-16">Group Name</label>
            <input 
                type="text"
                className="form-control" />
          </div>
        </div>
        <div className="row m-0 p-0 d-flex flex-column">
          <div className="col-md-12 col-sm-12 col-xl-12">
            <label className="form-label font-size-16">Enter Tracking Number</label>
            <textarea 
                className="form-control"
                placeholder="#Tracking Number"
            >
            </textarea>
          </div>
          <div className="col-md-12 col-sm-12 col-xl-12 mt-3 d-flex justify-content-between">
            <button
                className="btn btn-primary btn-block"
            >
                Create
            </button>
            <button
                className="btn btn-secondary btn-block"
            >
                Cancel
            </button>
          </div>
        
          </div>
        </div>

      </div>
    </>
  );
}
