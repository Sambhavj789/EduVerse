import { useState } from "react";
import { FaBookOpen, FaFileAlt } from "react-icons/fa";

function ResourceTab({
  textResouces,
  fileResouces,
  handleFileOpen,
}) {
  const [selectedText, setSelectedText] = useState(null);

  return (
    <>
      <div className="tab-content">
        <div className="items-list">
          {[...textResouces, ...fileResouces].map(
            (resource, index) => (
              <div
                className="list-card"
                key={index}
              >
                <div>
                  <h3>{resource.title}</h3>

                  <p>
                    Resource #{index + 1}
                  </p>

                  <p className="resource-type">
                    {resource.type === "text"
                      ? "Text Resource"
                      : "File Resource"}
                  </p>
                </div>

                {resource.type === "file" ? (
                  <div className="lecture-view-btn">
                    <button
                      onClick={() =>
                        handleFileOpen(
                          resource.fileUrl
                        )
                      }
                    >
                      View File
                    </button>
                  </div>
                ) : (
                  <div className="lecture-view-btn">
                    <button
                      onClick={() =>
                        setSelectedText(
                          resource
                        )
                      }
                    >
                      Read Text
                    </button>
                  </div>
                )}
              </div>
            )
          )}
        </div>
      </div>

      {selectedText && (
        <div
          className="resource-modal-overlay"
          onClick={() =>
            setSelectedText(null)
          }
        >
          <div
            className="resource-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >
            <div className="resource-modal-header">
              <div>
                <h2>
                  <FaBookOpen />
                  {selectedText.title}
                </h2>
              </div>

              <button
                className="resource-close-btn"
                onClick={() =>
                  setSelectedText(null)
                }
              >
                ✕
              </button>
            </div>

            <div className="resource-modal-body">
              <p>
                {
                  selectedText.textContent
                }
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ResourceTab;