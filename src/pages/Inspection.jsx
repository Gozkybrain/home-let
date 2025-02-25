import React from "react";
import "../styles/Inspection.css";
import { auth } from "../lib/firebase";
import { useInspectionsData } from "../lib/inspectionDisplayLogic";

function Inspection() {
  const currentUser = auth.currentUser;
  const {
    matchedData,
    vendor,
    client,
    handleStatusChange,
    loading,
    handleDelete,
    handleClick,
  } = useInspectionsData(currentUser);

  const InspectionCard = ({ inspect }) => (
    <div className="inpectionContainer">
      <div className="inpectionsubContainer">
        {/* Schedule Section */}
        <section className="inspectorPropertySchedule">
          <div className="inspectionPropertyAddressContainer">
            <p className="scheduleDetail">
              <strong>ADDRESS: </strong>{" "}
              {inspect.property?.address || "Address not provided"}
            </p>
            <p className="place">
              Your schedule is on {inspect.date || "No date available"} at{" "}
              {inspect.time || "No time available"}
            </p>
            {/* Action buttons for Vendor or Client */}
            {vendor && inspect.status === "Pending" ? (
              <div className="vButtonContainer">
                <button
                  disabled={loading}
                  className="accept"
                  onClick={() =>
                    handleStatusChange(
                      inspect.id,
                      inspect.submittedAt,
                      "Accepted"
                    )
                  }>
                  Accept
                </button>
                <button
                  disabled={loading}
                  className="reject"
                  onClick={() =>
                    handleStatusChange(
                      inspect.id,
                      inspect.submittedAt,
                      "Rejected"
                    )
                  }>
                  Reject
                </button>
              </div>
            ) : (
              vendor && (
                <div className="vButtonContainer">
                  <p
                    className={` ${
                      (inspect.status === "Pending" && "") ||
                      (inspect.status === "Rejected" && "reject") ||
                      (inspect.status === "Accepted" && "accept") ||
                      (inspect.status === "Completed" && "accept") ||
                      (inspect.status === "Canceled" && "reject")
                    } 
                 
                `}>
                    {inspect.status === "Completed"
                      ? "Inspection Completed"
                      : `You ${inspect.status} this request.`}
                  </p>
                  {inspect.status === "Accepted" && (
                    <button
                      disabled={loading}
                      className="reject"
                      onClick={() =>
                        handleStatusChange(
                          inspect.id,
                          inspect.submittedAt,
                          "Canceled"
                        )
                      }>
                      cancel
                    </button>
                  )}
                </div>
              )
            )}
            {!vendor && (
              <div className="vButtonContainer">
                <p
                  className={` ${
                    (inspect.status === "Pending" && "pending") ||
                    (inspect.status === "Rejected" && "reject") ||
                    (inspect.status === "Accepted" && "accept") ||
                    (inspect.status === "Completed" && "accept") ||
                    (inspect.status === "Canceled" && "reject")
                  } 
                       
                      `}>
                  {inspect.status === "Completed"
                    ? "Inspection Completed"
                    : inspect.status === "Canceled"
                    ? "Inspection Canceled"
                    : inspect.status}
                </p>
                {/* cancel button  */}
                {inspect.status === "Pending" && (
                  <button
                    disabled={loading}
                    onClick={() =>
                      handleDelete(inspect.id, inspect.submittedAt)
                    }
                    className="reject">
                    cancel
                  </button>
                )}
                {inspect.status === "Accepted" && (
                  <button
                    disabled={loading}
                    onClick={() =>
                      handleStatusChange(
                        inspect.id,
                        inspect.submittedAt,
                        "Completed"
                      )
                    }
                    className="pending">
                    Completed
                  </button>
                )}
              </div>
            )}
          </div>
        </section>

        {/* Property Section */}
        <section
          className="inspectorPropertyDetails"
          onClick={() => handleClick(inspect.property?.id)}>
          <img
            className="inspectorPropertyImage"
            src={inspect.property?.imageUrls[0] || "/default-image.png"}
            alt="Property"
          />
          <div>
            <p className="inspectorPropertyTitle">
              {inspect.property?.title || "Property title unavailable"}
            </p>
            <p className="inspectorPropertyDetail">
              <span className="inspectorPropertySubDetail">
                {vendor
                  ? "Inspector name: " + inspect?.inspectorName
                  : "Vendor name: " + inspect?.creatorName}
              </span>
            </p>
          </div>
        </section>
      </div>
    </div>
  );

  return (
    <div className="inspectionC">
      <h3 className="inspectionH">Property Inspections</h3>

      {matchedData.length ? (
        matchedData
          .filter(
            (inspect) =>
              (vendor && inspect.id.endsWith(currentUser.uid)) ||
              (client && inspect.userReqId === currentUser.uid)
          )
          .map((inspect, index) => (
            <InspectionCard key={index} inspect={inspect} />
          ))
      ) : (
        <div>No data found ...</div>
      )}
    </div>
  );
}

export default Inspection;
