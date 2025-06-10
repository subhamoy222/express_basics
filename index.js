const express = require('express');
const app = express();
const port = 3000;

var patients = [{
    firstname : "subhamoy",
    age : 20,
    kidney :[
        {healthy : true},
    ]
}];

app.get('/',(req,res)=>{
    const kidney = patients[0].kidney;
    let healthyKidey = 0;
    let unhealthykidney = 0;
    for(let i = 0; i< kidney.length ; i++){
        if(kidney[i].healthy == true){
            healthyKidey++;
        }
        else{
            unhealthykidney++;
        }
    }
    res.send(`Healthy Kidneys: ${healthyKidey}, Unhealthy Kidneys: ${unhealthykidney}`);

});
app.use(express.json());
app.post('/',(req,res)=>{
    const healthykidney = req.body.healthy;
    if(healthykidney === true){
        patients[0].kidney.push({healthy: true});
    }
    else{
        patients[0].kidney.push({healthy: false});
    }
    res.send(`Kidney status updated: ${healthykidney}`);
});
app.put('/',(req,res)=>{
    const kidney = patients[0].kidney;
    for(let i = 0; i< kidney.length ; i++){
        if(kidney[i].healthy == false){
            kidney[i].healthy = true; // Update unhealthy kidneys to healthy
        }
        
    }
    res.send(`Kidney status updated to healthy for all unhealthy kidneys.`);

});
app.delete('/',(req,res)=>{

});

app.listen(port);