import { toast } from "react-toastify";
import React from "react";

const CustomToast = ({closeToast,text, onConfirm}) => {
    return (
        <div>
          <p>{text}</p>
          <button onClick={() => {
            if(onConfirm) onConfirm();
            toast.dismiss();
          }} style={{ marginRight: 10, padding: 5, backgroundColor: "green", color: "white", border: "none", cursor: "pointer" }}>
            OK
          </button>
    
          <button onClick={() => {
            closeToast(); 
          }} style={{ padding: 5, backgroundColor: "red", color: "white", border: "none", cursor: "pointer" }}>
            Hủy
          </button>
        </div>
    );
}

export default CustomToast