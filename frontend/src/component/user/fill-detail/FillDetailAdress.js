import React, { useState, useEffect  , useRef} from "react";
import "./filldetail.css";
import { DeadButton } from "../../util-component/AllSmallComponent";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useNavigate } from "react-router-dom";
import {
  getUserAdress,
  updateUserAdress,
} from "../../../redux/actions/userAction";
import { useAlert } from "react-alert";

function FillDetailAdress() {
  const dispatch = useDispatch();
  const [loading, setloading] = useState(false);
  const [name, setname] = useState("");
  const [phone, setphone] = useState("");
  const [province, setprovince] = useState("");
  const [district, setdistrict] = useState("");
  const [localState, setlocalState] = useState("");
  const [wardNo, setwardNo] = useState("");
  const [area, setArea] = useState("");
  const [streetName, setstreetName] = useState("");
  const [reference, setreference] = useState("");
  const [otp, setotp] = useState("");
  const { error, orderedItem, user, adress } = useSelector(
    (state) => state.userReducer
  );
  const alert = useAlert();
  const navigate = useNavigate();

  // store all data
  const [allData, setallData] = useState({
    province: [],
    district: [],
    localState: [],
    wardNo: [],
    area:[]
  });

  const [verifiedReference , setverifiedReference]= useState(false)
  useEffect(() => {
    if(user){
      if(Number.isInteger(parseInt(user?.identity))){
         setverifiedReference(true)
      }
     }
    dispatch(getUserAdress());
  }, [user]);
 
  // get all data
  useEffect(() => {
    const load = async () => {
      const { data } = await axios.get("api/v1/getProvince");


      setallData((state) => {
        return {  province: data.result  , district: [],localState: [],wardNo: [], };
      });
       
      setdistrict("")
      setlocalState("")
      setwardNo("")
      setphone("")
      setArea("")

    };
    load();
    
  }, []);

  // province
  useEffect(() => {
    const load = async () => {
      const { data } = await axios.post("api/v1/getDistrict", {
        provinceId: province,
      });

      setlocalState("")
      setwardNo("")
      setphone("")
      setArea("")
      setallData((state) => {
        return { ...state, district: data.result };
      });
     
    };
    load();
  }, [province]);

  // localstate
  useEffect(() => {
    const load = async () => {
      const { data } = await axios.post("api/v1/getLocalState", {
        districtId: district,
      });

      setallData((state) => {
        return { ...state, localState: data.result };
      });
      setwardNo("")
      setphone("")
      setArea("")
    };
    load();
  }, [district]);

  // area
  useEffect(() => {
    const load = async () => {
      const { data } = await axios.post("api/v1/getArea", {
        localstateId: localState,
      });

      setallData((state) => {
        return { ...state, area: data.result };
      });
      setwardNo("")
      setphone("")
    };
    load();
  }, [localState]);

  // ward no
  useEffect(() => {
    const load = async () => {
      const wardNo = allData?.localState?.filter((item) => {
        return item?.id === parseInt(localState);
      });

      const arr =
        wardNo &&
        Array.from({ length: parseInt(wardNo[0]?.wardNo) }, (_, i) => i + 1);

      setallData((state) => {
        return { ...state, wardNo: arr };
      });
    };

    load();
  }, [localState]);



  const otpRef =useRef("")
  const submitRef =useRef("")
  const phoneRef = useRef("")
  const otpBtn = useRef("")
  
  useEffect(()=>{
    
    if(adress?.reference===reference  || reference===user?.identity?.replace("+977" , "")){
      setverifiedReference(true)
    }else{
      setverifiedReference(false)
    }
  },[adress , reference , user])

  const sendOtp = async()=>{
    if(reference.length===10){
    const {data} =await axios.post("/api/v1/send-otp-for-reference", {phone:`+977${reference}`});
     if(data.sendOtp===true){
      alert.success("OTP Send Successful. Check Your Phone.")
      phoneRef.current.disabled ='true'
      otpBtn.current.disabled ='true'
      phoneRef.current.style.opacity ='0.6'
      otpRef.current.style.display = 'flex'
      otpRef.current.focus = "true";
     }
    }else{
      alert.error("Enter 10 digit Phone.")
    }

  }

  const verifyOtp = async()=>{
    if(reference.length===10){
    const {data} =await axios.post("/api/v1/verify-otp-for-reference", {phone:`+977${reference}` , otp});
     if(data.verifyOtp===true){
      setverifiedReference(true)
      alert.success("Phone verify Successful.")
      phoneRef.current.disabled ='true'
      otpBtn.current.disabled ='true'
      phoneRef.current.style.opacity ='0.6'
      otpRef.current.style.display = 'none'
     }else{
      alert.error("Otp is wrong.")
     }
    }else{
      alert.error("Enter 10 digit Phone.")
    }

  }



  const onPressed = (e) => {
    e.preventDefault();

    if (
      !error &&
      district &&
      province &&
      localState &&
      wardNo &&
      reference &&
      streetName &&
      verifiedReference===true &&
      orderedItem?.length <= 0  &&
      area 
    ) {
      return (
        dispatch(
          updateUserAdress(
            province,
            district,
            localState,
            wardNo,
            reference,
            streetName,
            area
          )
        ),
        dispatch(getUserAdress()),
        navigate(-1)
      ); //
    } else {
      if (orderedItem?.length >= 1) {
        alert.error(<p style={{textTransform:"capitalize"}}>Already you have a order ,so you can change after delivary.</p>);

      } else {
        !district && alert.error(<p style={{textTransform:"capitalize"}}> district is Invalid. select one.  </p>);
        !province && alert.error(<p style={{textTransform:"capitalize"}}>  province is Invalid. select one.  </p>);
        !localState && alert.error(<p style={{textTransform:"capitalize"}}> localState is Invalid. select one.  </p>);
        !wardNo && alert.error(<p style={{textTransform:"capitalize"}}>  wardNo is Invalid. select one.  </p>);
        !reference && alert.error(<p invalid style={{textTransform:"capitalize"}}>invalid phone enter 10 digit phone  </p>);
        !streetName && alert.error(<p style={{textTransform:"capitalize"}}>  streetNameis Invalid. select one.  </p>);
        verifiedReference===false && alert.error(<p Verify style={{textTransform:"capitalize"}}>Click send Otp button and Verify Your Phone  </p>)
        !area && alert.error(<p style={{textTransform:"capitalize"}}> Area is Invalid. select one.  </p>);

      }
    }
  };

  return (
    <div className="fill-detail">
     <div className="header">
     <div className="header-out" onClick={()=>{navigate(-1)}}>
         <ArrowBackIosIcon fontSize="30"/>
         <span>Back</span>
     </div>
      <h3>Fill your deatail</h3>
      </div>
      {/* {orderedItem && <p style={{color:orderedItem && "red"}}>**Don't change adress you have  a order.**</p>} */}
      <div className="down-form">
        <form>
          {/* <li><label>Name </label><input type="text" required onChange={(e)=>{setname(e.target.value)}}/></li>
                     <li><label>Phone</label><input type="text" required onChange={(e)=>{setphone(e.target.value)}}/></li> */}
          <li>
            <label>Select Province</label>
            <select
              onChange={(e) => {
                setprovince(e.target.value);
              }}
            >
              <option value={null}>Select an province</option>
              {allData.province.map((item, key) => {
                return (
                  <option key={key} value={item?.id}>
                    {item?.name}
                  </option>
                );
              })}
            </select>
          </li>
          <li >
            <label>Select District</label>
            <select
              onChange={(e) => {
                setdistrict(e.target.value);
              }}
            >
              <option value={null}>Select District</option>
              {allData.district.map((item, key) => {
                return (
                  <option key={key} value={item?.id}>
                    {item?.name}{" "}
                  </option>
                );
              })}
            </select>
          </li>
          <li>
            <label>Select Muncipality</label>
            <select
              onChange={(e) => {
                setlocalState(e.target.value);
              }}
            >
              <option value={null}>Select Muncipality</option>
              {allData.localState.map((item, key) => {
                return (
                  <option key={key} value={item?.id}>
                    {item?.name}{" "}
                  </option>
                );
              })}
            </select>
          </li>
          <li>
            <label>Select Ward No</label>
            <select
              onChange={(e) => {
                setwardNo(e.target.value);
              }}
            >
              <option>Select Ward No</option>

              {allData?.wardNo.map((item, key) => {
                return (
                  <option key={key} value={item}>
                    {item}
                  </option>
                );
              })}
            </select>
          </li>
          <li>
            <label>Select Area</label>
            <select
              onChange={(e) => {
                setArea(e.target.value);
              }}
            >
              <option>Select Area</option>
             

              {allData?.area?.sort((a, b)=> a.name === b.name ? 0 : a.name < b.name ? -1 : 1).map((item, key) => {
                return (
                  <option key={key} value={item?.id}>
                    {item?.name}
                  </option>
                );
              })}
            </select>
          </li>
          <li>
            <label>Street Line / Office (Your exact location )</label>
            <input
              type="text"
              required
              onChange={(e) => {
                setstreetName(e.target.value);
              }}
            />
          </li>
         <li >
            <label>
              Phone (<b>Person who recieve order in this adress.</b>)
            </label>
          <div className="phone-field">
                  <input
                    ref={phoneRef}
                    type="number"
                    required
                    onChange={(e) => {
                      setreference(e.target.value);
                    }}
                  />
             {verifiedReference===false &&  <button ref={otpBtn} type="button" onClick={()=>sendOtp()}>Send OTP</button>}
                         </div>
          </li>
          <li ref={otpRef} style={{display:"none"}}> 
            <label>
              Enter OTP (<b>Check Your Message.</b>)
            </label>
            <div className="phone-field">
                  <input
                    type="number"
                    required
                    onChange={(e) => {
                      setotp(e.target.value);
                    }}
                  />
                <button type="button" onClick={verifyOtp}>Verify OTP</button>
          </div>
          </li>
          <li>
            
              <button ref={submitRef} type="sumbit" onClick={onPressed}>
                Submit
              </button>
          
            {/* <button>Set-up Later</button> */}
          </li>
        </form>
      </div>
    </div>
  );
}

export default FillDetailAdress;
