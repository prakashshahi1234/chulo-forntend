import React, { useEffect, useRef, useState } from "react";
import "./filter.css";
import SortIcon from "@mui/icons-material/Sort";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import { useDispatch } from "react-redux";
import { SearchItem } from "../../redux/actions/productAction";
import { useNavigate } from "react-router-dom";

function Filter() {
  const opener_box = useRef("");
  const [review, setreview] = useState(null);
  const [price, setprice] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (price) {
      dispatch(SearchItem(price, "filter"));
      navigate("/search/filter");
    }
  }, [price]);

  return (
    <div className="sort">
      <button className="filter-btn">
        <SortIcon />
        <p>Sort By</p>
      </button>
      {price && review && (
        <div className="filter-data">
          {" "}
          price : {price} rating : {review}
        </div>
      )}
      <div className="initial opener-box" ref={opener_box}>
        <ul>
          <p>Price</p>
          <li
            style={{ fontWeight: price === 250 && "bold" }}
            onClick={() => {
              setprice({ min: 200, max: 300 });
            }}
          >
            {" "}
            Rs 200-300
          </li>
          <li
            style={{ fontWeight: price === 450 && "bold" }}
            onClick={() => {
              setprice({ min: 400, max: 500 });
            }}
          >
            {" "}
            Rs 400-500
          </li>
          <li
            style={{ fontWeight: price === 750 && "bold" }}
            onClick={() => {
              setprice({ min: 600, max: 900 });
            }}
          >
            {" "}
            Rs 600-900
          </li>
          <li
            style={{ fontWeight: price === 1000 && "bold" }}
            onClick={() => {
              setprice({ min: 1000, max: 100000 });
            }}
          >
            {" "}
            Rs 1000+
          </li>
        </ul>
        {/* <ul>
                          <p>Reviews</p> 
                        <li  style={{transform:review===5 && "scale(1.2)"}} onClick={()=>setreview(5)}><TextRating value="5"/></li>                       
                        <li  style={{transform:review===4 && "scale(1.2)"}} onClick={()=>setreview(4)}><TextRating value="4"/></li>                       
                        <li  style={{transform:review===3 && "scale(1.2)"}} onClick={()=>setreview(3)}><TextRating value="3"/></li>                       
                        <li  style={{transform:review===2 && "scale(1.2)"}} onClick={()=>setreview(2)}><TextRating value="3"/></li>                       
                        <li  style={{transform:review===1 && "scale(1.2)"}} onClick={()=>setreview(1)}><TextRating value="1"/></li>                       
                      </ul> */}
      </div>
    </div>
  );
}

export default Filter;

export function TextRating({ value }) {
  return (
    <Box
      sx={{
        width: 200,
        display: "flex",
        alignItems: "center",
      }}
    >
      <Rating
        name="text-feedback"
        value={value}
        readOnly
        precision={0.2}
        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
      />
    </Box>
  );
}
