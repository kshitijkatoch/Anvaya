import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import LeadContext from "../contexts/LeadContext";
import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../useFetch";

function LeadDetails() {
  const { leads, loading, error } = useContext(LeadContext);
  const [newComment, setNewComment] = useState("");
const [author, setAuthor] = useState("68f23b7fc4f7e63f4528c4fe");

  const { id: leadID } = useParams();
  const lead = leads?.find((l) => l._id === leadID);

  if (loading) {
    return (
      <main>
        <Header />
        <div className="row w-100">
          <Sidebar />
          <div className="col-md-9 ps-0">
            <div className="d-flex justify-content-center">
              <h2 className="p-3">Lead Details Loading...</h2>
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (error) return <h2 className="text-center p-3">Error: {error}</h2>;
  if (!lead) return <h2 className="text-center p-3">Lead Not Found</h2>;

  const { _id, name, salesAgent, status, source, tags, timeToClose, priority } =
    lead;

  const url = _id
    ? `https://anvaya-brown.vercel.app/leads/${_id}/comments`
    : null;

  const {
    data: comments = [],
    loading: loadingComments,
    error: errorComments,
    setData: setComments, 
  } = useFetch(url);

  const handleAddComment = async () => {
  if (!newComment.trim()) return alert("Comment cannot be empty");

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ commentText: newComment, author })
    });

    const saved = await res.json();
    if (!res.ok) return alert(saved.error);

    // Update UI instantly
    setComments(prev => [...prev, saved]);

    setNewComment("");

  } catch (err) {
    console.error(err);
  }
};



  return (
    <>
      <main>
        <Header />
        <div className="row w-100">
          <Sidebar />
          <div className="col-md-10 col-9 ps-0">
            <div className="container d-flex flex-column justify-content-center">
              <h2 className="p-3 text-center">Lead Details</h2>

              {/* Lead Details */}
              <ul className="list-group col-md-5 col-12">
                <li className="list-group-item py-3">
                  <p className="m-0">
                    <b>Lead Name:</b> {name}
                  </p>
                </li>
                <li className="list-group-item py-3">
                  <p className="m-0">
                    <b>Sales Agent:</b> {salesAgent.name}
                  </p>
                </li>
                <li className="list-group-item py-3">
                  <p className="m-0">
                    <b>Lead Source:</b> {source}
                  </p>
                </li>
                <li className="list-group-item py-3">
                  <p className="m-0">
                    <b>Lead Status:</b> {status}
                  </p>
                </li>
                <li className="list-group-item py-3">
                  <p className="m-0">
                    <b>Priority:</b> {priority}
                  </p>
                </li>
                <li className="list-group-item py-3">
                  <p className="m-0">
                    <b>Time to Close:</b> {timeToClose}
                  </p>
                </li>
              </ul>
              {/* Edit Detials Button */}
              <button className="btn btn-primary btn-lg col-md-4 my-4 align-self-center">
                Edit Lead Details
              </button>
              <hr />

              {/* Comment Section */}
              <h2 className="p-3 text-center">Comment Section</h2>
              {/* Comments List */}
              <div className="card p-3 mb-3">
  {loadingComments ? (
    <p className="text-center"> Loading Comments...</p>
  ) : comments.length === 0 ? (
    <h3 className="p-2 text-center text-secondary">No Comments Yet</h3>
  ) : (
    comments.map((c, index) => {
      const formattedDate = new Date(c.createdAt).toLocaleString("en-IN", {
        dateStyle: "medium",
        timeStyle: "short",
      });

      return (
        <div key={c._id}>
          <p><b>Author:</b> {c.author}</p>
          <p><b>Comment:</b> {c.commentText}</p>
          <p className="text-muted"><small>{formattedDate}</small></p>
          {index !== comments.length - 1 && <hr />}
        </div>
      );
    })
  )}
</div>


              {/* Add New Comment */}
              
  <textarea
    className="form-control mb-3"
    rows="3"
    placeholder="Write your comment..."
    value={newComment}
    onChange={(e) => setNewComment(e.target.value)}
  />

  <button
    className="btn btn-primary btn-lg col-md-4 my-4 align-self-center"
    onClick={handleAddComment}
  >
    Submit Comment
  </button>

              {/* <button className="btn btn-primary btn-lg col-md-4 my-4 align-self-center">
                Submit Comment
              </button> */}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default LeadDetails;
