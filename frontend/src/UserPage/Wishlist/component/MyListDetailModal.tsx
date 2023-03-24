import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./style/mylistdetailmodal.scss";

export default function MyListDetailModal({
  show,
  WishlistName,
}: {
  show: boolean;
  WishlistName: any;
}) {

  const navigate = useNavigate();
    const location = useLocation()
  const [visible, setVisible] = useState<boolean>(false);
  const [visiblePublic, setVisiblePublic] = useState<boolean>(false);

  const [newWishlistName, setWishlistName] = useState<string>('')
  const [newWishlistType, setNewWishlistType] = useState<string>('')

  // update my wishlist detail page
  const updateMyWishlist = async () => {
    await fetch(
      `http://localhost:8000/api/wishlist/update-mywishlist-detail/${location.state.wishlist_id.trim()}`,
      {
        method: "PUT",
        body: JSON.stringify({
          wishlist_name: newWishlistName,
          wishlist_type: newWishlistType
        }),
      }
    )
    .then((res)=>res.json())

    navigate('/wish-list')
  };

  if (!show) {
    return null;
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <p>Update Wishlist</p>
        </div>
        <div className="modal-body">
          <div className="wrap-input">
            <input type="text" value={newWishlistName} onChange={(e)=>setWishlistName(e.target.value)} />
          </div>
          <div className="wrap-visible">
            <div
              className="private"
              onClick={() => {
                setVisible(!visible);
                setVisiblePublic(false);
                setNewWishlistType('private')
              }}
              style={{
                backgroundColor: visible ? "#E4DCCF" : "#FFFF",
              }}
            >
              <p>Private</p>
            </div>
            <div
              className="public"
              onClick={() => {
                setVisiblePublic(!visiblePublic);
                setVisible(false);
                setNewWishlistType('public')
              }}
              style={{
                backgroundColor: visiblePublic ? "#E4DCCF" : "#FFFF",
              }}
            >
              <p>Public</p>
            </div>
          </div>
          <div className="wrap-button">
            <div>
              <button onClick={()=>updateMyWishlist()}>Update</button>
            </div>
            <div>
              <button onClick={() => navigate("/wish-list")}>Cancel</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
