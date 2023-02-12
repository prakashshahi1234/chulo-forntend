import React, { useRef ,useLayoutEffect  , useEffect} from "react";
import "./subnav.css";
import { useSelector, useDispatch } from "react-redux";
import { SearchItem } from "../../redux/actions/productAction";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import {useParams , useNavigate} from 'react-router-dom';

function SubNav() {
  const { category } = useSelector((state) => state.productReducer);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const drop1 = {
    title: "Category",
    item: category,
  };
  const lRef = useRef("");
  const rRef = useRef("");
  const hzRef = useRef("");
  const drop = [drop1];
  let {name} = useParams();
   useEffect(()=>{

   },[name])
  const getproductByCategory = (categoryId , title) => {
    dispatch(SearchItem(categoryId, "category"));
    navigate("/search/" + categoryId , {title});
  };
  

  const moveElement = (direction, element) => {
    if (direction === "left") { element.current.scrollLeft += 170;  }
    if (direction === "right"){ element.current.scrollLeft -= 170; }
  };

  const compare = (a, b) => {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  };

  return (
    <div className="sub-nav">
      {drop?.map((current, key) => {
        return (
          <div key={key} className="">
            <KeyboardArrowLeftIcon
              sx={{ color: "white" }}
              ref={lRef}
              fontSize={"large"}
              onClick={() => {
                moveElement("right", hzRef);
              }}
            />
            <ul ref={hzRef}>
              {current?.item?.sort(compare)?.map((item, key) => {
                return (
                  <li
                    key={key}
                    onClick={() => {
                    getproductByCategory(item?.id, item?.name);
                    }}
                    style={{border:item?.id===name && '1px solid white'}}
                  >
                    {item?.name}
                  </li>
                );
              })}
            </ul>
            <KeyboardArrowRightIcon
              sx={{ color: "white" }}
              ref={rRef}
              fontSize={"large"}
              onClick={() => {
                moveElement("left", hzRef);
              }}
            />
          </div>
        );
      })}
    </div>
  );
}

export default SubNav;
