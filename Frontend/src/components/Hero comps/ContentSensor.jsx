import '../styles/ContentSensor.css'
import Text from './Text';
import Media from './Media';
import { useState } from "react";

function ContentSensor() {
  const [component,setComponent]= useState('Text');
  const[tab,setTab]=useState(1)
  const gotext =()=>{ setComponent('Text');setTab(1)}
  const goimage=()=>{ setComponent('Media');setTab(2)}
  return (
    <div className="sensor"> 
    <div className="sensor-main">
     <div className="sensor-head">
      <p onClick={gotext}className={tab === 1 ? "active-tab" : ""}>Text</p>
      <p onClick={goimage}className={tab === 2 ? "active-tab" : ""}>Image</p>
     </div>
     <div className="sensor-hero">
      {
        component=='Media' && <Media/>
      }
      {
        component=='Text' && <Text/>
      }
      {
        component==null && <div><p>Please select a option</p></div>
      }
     </div>
    </div>
    </div>
  );
}
export default ContentSensor;
