const  axios  = require("axios");
const express =require("express");
const app= express();
const cors=require('cors');
require("dotenv").config();

app.use(express.json())
app.use(cors());
 
app.get('/',(req,res)=>{
    res.send("hello ");
})

app.post("/khalti-api",async (req,res)=>{
    const payload=req.body;
    const khaltiResponse =await axios.post(
        "https://a.khalti.com/api/v2/epayment/initiate/",
        payload,
        {
        headers:{
            Authorization:`Key ${process.env.KHALTI_SECRET_KEY} `,
        }
    })
    if(khaltiResponse){
        res.json({
            success:true,
            data:khaltiResponse?.data
        })
    }else{
        res.json({
            success:false,
            message:"sth went wrong",
        })
    }
    console.log(khaltiResponse);

})

const PORT =process.env.PORT || 8000;

app.listen(PORT,()=>console.log(`Server listening on ${PORT}`));