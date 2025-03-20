import React from 'react'
import { Link } from 'react-router-dom'
import { Twitter,Youtube,Instagram,Facebook} from 'lucide-react';
const Footer = () => {
  return (
    <div >
       
        <div style={{display:"flex", justifyContent:"space-around", alignItems:"center", gap:"20px", backgroundColor:"#292929", color:"white", padding:"70px"}}>
            <div style={{display:"flex", flexDirection:"column", gap:"10px"}}>
                <h2 style={{color:"#fc4286"}}>About</h2>
                <Link style={{textDecoration:"none", color:"white"}}>About</Link>
                <Link style={{textDecoration:"none", color:"white"}}>Carrers</Link>
                <Link style={{textDecoration:"none", color:"white"}}>Contact</Link>
                <Link style={{textDecoration:"none", color:"white"}}>Press</Link>
                </div>
            <div style={{display:"flex", flexDirection:"column", gap:"10px"}}>
                <h2 style={{color:"#fc4286"}}>Services</h2>
                <Link style={{textDecoration:"none", color:"white"}}>For Tenants</Link>
                <Link style={{textDecoration:"none", color:"white"}}>For Landlords</Link>
                <Link style={{textDecoration:"none", color:"white"}}>For Agents</Link>
                <Link style={{textDecoration:"none", color:"white"}}>For Developers</Link>
            </div>
            <div style={{display:"flex", flexDirection:"column", gap:"10px"}}> 
                <h2 style={{color:"#fc4286"}}>Resources</h2>
                <Link style={{textDecoration:"none", color:"white"}}>Blog</Link>
                <Link style={{textDecoration:"none", color:"white"}}>FAQ</Link>
                <Link style={{textDecoration:"none", color:"white"}}>Help</Link>
                <Link style={{textDecoration:"none", color:"white"}}>Terms</Link>
            </div>
            <div style={{display:"flex", flexDirection:"column", gap:"10px"}}>
                <h2 style={{color:"#fc4286"}}>Legal</h2>
                <Link style={{textDecoration:"none", color:"white" }}>Privacy Policy</Link>
                <Link style={{textDecoration:"none", color:"white"}}>Terms & Conditions</Link>
                <Link style={{textDecoration:"none", color:"white"}}>Disclaimer</Link>
                <Link style={{textDecoration:"none", color:"white"}}>Refund Policy</Link>
            </div>
            <div style={{display:"flex", flexDirection:"column", gap:"10px"}}>
                <h2 style={{color:"#fc4286"}}>Support</h2>
                <Link style={{textDecoration:"none", color:"white"}}>Help</Link>
                <Link style={{textDecoration:"none", color:"white"}}>FAQ</Link>
                <Link style={{textDecoration:"none", color:"white"}}>Contact</Link>
                <Link style={{textDecoration:"none", color:"white"}}>Feedback</Link>
            </ div>
            <div >
                <h2 style={{color:"#fc4286"}}>Follow Us</h2>
                <div style={{display:"flex", flexDirection:"row", gap:"10px"}}>
                    <Link style={{textDecoration:"none", background:'#fc4286', padding:"7px", borderRadius:"30%",color:"black"}}><Twitter /></Link>
                    <Link style={{textDecoration:"none",background:'#fc4286', padding:"7px" , borderRadius:"30%" ,color:"black"}}><Youtube /></Link>
                    <Link style={{textDecoration:"none",background:'#fc4286', padding:"7px" , borderRadius:"30%",color:"black"}}><Instagram /></Link>
                    <Link style={{textDecoration:"none",background:'#fc4286', padding:"7px", borderRadius:"30%",color:"black"}}><Facebook /></Link>
                </div>
            </div>
        </div>
        <div style={{backgroundColor:"#292929", color:"white", padding:"20px", textAlign:"center"}}>
            <div style={{display:"flex", alignItems:"center", justifyContent:"center", gap:"30px"}}>
                <p>© 2025 Homorax. All Rights Reserved.</p>
                <p>Designed by Homorax</p>
            </div>
          
        </div>
    </div>
  )
}

export default Footer