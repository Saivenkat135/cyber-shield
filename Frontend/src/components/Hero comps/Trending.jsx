import React from 'react'
import ScamTrend from './ScamTrend';
import NewsTrend from './NewsTrend';
import '../styles/Trending.css';
import { useState } from 'react';

 function Trending() {
    const [component,setComponent]= useState('Scam');
    const [tab,setTab]=useState(1);
    const goscam =()=>{ setComponent('Scam');setTab(1)}
    const gosearch=()=>{ setComponent('News');setTab(2)}
 
    return (
      <div className="trending-main">
       <div className="trending-head">
        <p onClick={goscam} className={tab === 1 ? "active-tab" : ""}>Trending Scam</p>
        <p onClick={gosearch}className={tab === 2 ? "active-tab" : ""}>Trending News</p>
       </div>
       <div className="trending-hero">
        {
          component=='Scam' && <ScamTrend/>
        }
        {
          component=='News' && <NewsTrend/>
        }
        
       </div>

      </div>
    );
}
export default Trending;
