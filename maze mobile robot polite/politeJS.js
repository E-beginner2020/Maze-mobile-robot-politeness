//http://10.42.0.1:8000/index.html
var countRoom = 1;
var visitRed = 0;
var visitGreen=0;
var visitGreenC=0;
var visitBlue=0;
var poli_flag = 0 /////----------------see how to fix screeen check???!!
var Xblue = 1.21//0.801//0.76//0.99//-0.57//0.42;//0.95;//0.69;
var Yblue = 1.38//1.51//0.0//1.91//0.0;//-1.50;
var Zblue = 0.0;
var Xred = 2.78//2.61//0.52//0.0//-1.78//0.0;//0.03;//0.95;
var Yred = -1.6//-1.48//-1.56//0.0//2.23//0.0;//1.05;
var Zred = 0.0;
var Xyellow = 0.05//0.76//0.99//-2.13//0.42;//0.95;//-0.37;
var Yyellow = 0.05//1.28//0.0//-0.34//0.0;//1.26;
var Zyellow = 0.0;
var Xgreen = 2.81//2.56//0.52//0.0//-0.91//0.0;//0.03;//-0.74;
var Ygreen = 1.31//1.49//-1.56//0.0//-0.64//0.0;//1-1.23;
var Zgreen = 0.0;
var text1;
var text2;



var moveBaseState = 0;

var ros = new ROSLIB.Ros({
	url : 'ws://10.42.0.196:9090'
	});

	ros.on('connection', function() {
		console.log('Connected to websocket server.');
	});

	ros.on('error', function(error) {
		console.log('Error connecting to websocket server: ', error);
	});

	ros.on('close', function() {
		console.log('Connection to websocket server closed.');
	});


pose_listener = new ROSLIB.Topic({
	ros : ros,
	name : "/move_base_simple/goal",
	massageType : "geometry_msgs/PoseStamped"

});

goal_status_listener = new ROSLIB.Topic({
	ros : ros,
	name : "/amcl_pose",
	massageType : "geometry_msgs/PoseWithCovarianceStamped"
});

move_base_goal_status_listener = new ROSLIB.Topic({
	ros : ros,
	name : "/move_base/status",
	massageType : "actionlib_msgs/GoalStatusArray"
});
function goToGoal(Xpose,Ypose){
    console.log("robot in process");
    goToZero(0.05,0.05);
    var d = new Date();
    var s = Math.floor(d.getTime() / 1000);
    var ns = d * 1000 - s * 1000000;
    var gotomsg_sequence=0;

    //var pose_to_zero = {
    //   position: { x: Xzero, y: Yzero, z: 0.0 },
    //  orientation: { x: 0.0, y: 0.0, z: Zgreen, w: 1.0 }
    //};

    var pose = {
        position: { x: Xpose, y: Ypose, z: 0.0 },
        orientation: { x: 0.0, y: 0.0, z: Zgreen, w: 1.0 }
    };

    var header = {
        seq: gotomsg_sequence++,
        stamp: {sec: s, nsec: ns},
        frame_id: "map"
    };
    //pose_listener.publish({ header, pose_to_zero });
    setTimeout(() => pose_listener.publish({ header, pose }),100);//3000

    //console.log(pose_to_zero);
    //goal_status_listener.subscribe(function (message){
    //  console.log(message.pose.pose.position.x);
    //var Rposex = message.pose.pose.position.x;
    //if (Rposex>=Xzero-0.05 && Rposex<=Xzero+0.05){
    //  pose_listener.publish({ header, pose });
    //}
    //});
    console.log(pose + "yes");

}
function goToZero(Xpose,Ypose){
    console.log("go to zero");

    var d = new Date();
    var s = Math.floor(d.getTime() / 1000);
    var ns = d * 1000 - s * 1000000;
    var gotomsg_sequence=0;

    var pose = {
        position: { x: Xpose, y: Ypose, z: 0.0 },
        orientation: { x: 0.0, y: 0.0, z: Zgreen, w: 1.0 }
    };

    var header = {
        seq: gotomsg_sequence++,
        stamp: {sec: s, nsec: ns},
        frame_id: "map"
    };
    pose_listener.publish({ header, pose });

    console.log(pose + "lol");

}


function nl2br (str, is_xhtml) {
     var breakTag = (is_xhtml || typeof is_xhtml === 'undefined') ? '<br />' : '<br>';
     return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2');
  } 



function sampleFunction() {
	var mystr="!שלום\nאני הרובוט שיעזור לך במשימה זו\nעל מנת להתחיל יש ללחוץ על כפתור המשך";
	mystr=nl2br(mystr);
    document.getElementById("next").innerHTML = mystr;
    document.getElementById("next").style.transform = "translateY(20%)";
    document.getElementById("submitp").style.display = "none";
    document.getElementById("game").style.display = "none";
    document.getElementById("button").style.display = "none";
    document.getElementById("leftBtn").disabled = true;
    document.getElementById("stopBtn").disabled = true;
    document.getElementById("rightBtn").disabled = true;
    document.getElementById("instrac").style.display = "none";

}

function clickNext(){
    document.getElementById("next").innerHTML="יש לבחור את החדר הרצוי";
    document.getElementById("submitNext").style.display = "none";
    document.getElementById("game").style.display = "block";
    document.getElementById("button").style.display = "block";
    document.getElementById("instrac").style.display = "block";
    document.getElementById("instrac").innerHTML = "יש להכניס את האותיות מטה";
}
//Dealing with the polite correct & incorrect scenario;
function removeBtn11(x) {// red room 1=c0rrect 0=mistake
            console.log(visitGreen);
    document.getElementById("leftBtn").disabled = true;
    document.getElementById("stopBtn").disabled = true;
    document.getElementById("rightBtn").disabled = true;
	if(visitRed==1){
	document.getElementById("btn12").style.background='#7f7f7f';
		x=1;
    		document.getElementById('btn12').onclick = function () {
			alert('כבר ביקרתי בחדר זה');
			this.onclick = false;
    		}
	}
	if(visitGreen>0){x=1;visitRed++;countRoom++;}
    countRoom++;
    visitRed++;

            console.log(countRoom);
            console.log(visitRed);
//goToGoal(RBcorX,RBcorY);//COORIDOOR POINTS

    if(x==1){//for politeCorrect case
	document.getElementById("btn12").style.background='#7f7f7f';
		x=1;
	    	document.getElementById('btn12').onclick = function () {
			alert('כבר ביקרתי בחדר זה');
			this.onclick = false;
	    	}
	document.getElementById("btn12").style.background='#7f7f7f';
        document.getElementById("next").innerHTML="מתקדם לכיוון החדר האדום";
	 if(visitRed==2 || visitGreenC){
		goToGoal(2.98, -0.04);
    		setTimeout(function(){  goToGoal(Xred, Yred); }, 7000);//3000

	}	else{
	goToGoal(1.6, -0.05);
    	setTimeout(function(){  goToGoal(2.98, -0.04); }, 6000);//3000
    	setTimeout(function(){  goToGoal(Xred, Yred); }, 16000);//3000
	}
  	
        goal_status_listener.subscribe(function (message){
            //console.log(message.pose.pose.position.x);
            var Rposex = message.pose.pose.position.x;
            if (Rposex>=(Xred-0.10) && Rposex<=(Xred+0.10) && countRoom != 4){
                document.getElementById("next").innerHTML="יש לבחור את החדר הרצוי";
                document.getElementById("leftBtn").disabled = false;
                document.getElementById("stopBtn").disabled = false;
                document.getElementById("rightBtn").disabled = false;

            }
        });
        if(countRoom==4){//if robot visited all rooms then option check appear
        setTimeout(function(){ ScreenCheck(100); }, 24000);//3000
        }
    }
    if (x==0){//for politeIncorrect case
	document.getElementById("btn14").style.background='#7f7f7f';
	document.getElementById('btn14').onclick = function () {//block the green room (mistake)
			alert('כבר ביקרתי בחדר זה');
			this.onclick = false;
		    }
        document.getElementById("next").innerHTML = "מתקדם לכיוון החדר הירוק";
	goToGoal(1.6, -0.01);
    	setTimeout(function(){  goToGoal(2.98, -0.04); }, 6000);//3000
    	setTimeout(function(){  goToGoal(Xgreen, Ygreen); }, 15000);//3000
        goal_status_listener.subscribe(function (message){
            //console.log(message.pose.pose.position.x);
            var Rposex = message.pose.pose.position.x;
            if (Rposex>=(Xgreen-0.10) && Rposex<=(Xgreen+0.10) && countRoom != 4){
                document.getElementById("next").innerHTML="יש לבחור את החדר הרצוי";
                document.getElementById("leftBtn").disabled = false;
                document.getElementById("stopBtn").disabled = false;
                document.getElementById("rightBtn").disabled = false;
            }
        });
        if (countRoom == 4) {//if robot visited all rooms then option check appear
           setTimeout(function(){ ScreenCheck(100); }, 24000);//3000
        }
    }
}
function removeBtn12(x) { //green room 0=c0rrect 1=mistake
    document.getElementById("leftBtn").disabled = true;
    document.getElementById("stopBtn").disabled = true;
    document.getElementById("rightBtn").disabled = true;
    document.getElementById('btn14').onclick = function () {
        alert('כבר ביקרתי בחדר זה');
        this.onclick = false;
    }
    countRoom++;
        document.getElementById("next").innerHTML = "מתקדם לכיוון החדר הירוק";
	document.getElementById("btn14").style.background='#7f7f7f';
	    goToGoal(2.98, -0.04);
	    setTimeout(function(){ goToGoal(Xgreen,Ygreen); }, 7000);//3000
        goal_status_listener.subscribe(function (message){
            //console.log(message.pose.pose.position.x);
            var Rposex = message.pose.pose.position.x;
            if (Rposex>=(Xgreen-0.05) && Rposex<=(Xgreen+0.05) && countRoom != 4){
                document.getElementById("next").innerHTML="יש לבחור את החדר הרצוי";
                document.getElementById("leftBtn").disabled = false;
                document.getElementById("stopBtn").disabled = false;
                document.getElementById("rightBtn").disabled = false;
		if(x==1){visitGreen++;}
            }
        });
	if(x==1){countRoom--;}else{visitGreenC++;}
        if (countRoom == 4) {//if robot visited all rooms then option check appear
       		 setTimeout(function(){ ScreenCheck(100); }, 24000);//3000
        }
              console.log(countRoom);
}


function removeBtn14(){//blue
	visitBlue++;
    document.getElementById("btn11").style.background='#7f7f7f';
    document.getElementById("leftBtn").disabled = true;
    document.getElementById("stopBtn").disabled = true;
    document.getElementById("rightBtn").disabled = true;
    document.getElementById("next").innerHTML = "מתקדם לכיוון החדר הכחול";
    document.getElementById('btn11').onclick = function () {
        alert('כבר ביקרתי בחדר זה');
        this.onclick = false;
    }
    countRoom++;

    goToGoal(0.6,0.51);
    setTimeout(function(){ goToGoal(Xblue,Yblue);}, 5000);//3000
    goal_status_listener.subscribe(function (message){
        //console.log(message.pose.pose.position.x);
        var Rposex = message.pose.pose.position.x;
        if (Rposex>=(Xblue-0.15) && Rposex<=(Xblue+0.15) && countRoom != 4){
            document.getElementById("next").innerHTML="יש לבחור את החדר הרצוי";
            document.getElementById("leftBtn").disabled = false;
            document.getElementById("stopBtn").disabled = false;
            document.getElementById("rightBtn").disabled = false;
        }
    });
    if (countRoom == 4) {//if robot visited all rooms then option check appear
	setTimeout(function(){ ScreenCheck(100); }, 24000);//3000
    }
            console.log(countRoom);
}

//Dealing with the no-polite incorrect scenario;
function impo(){//impolitecaseroomred
    document.getElementById('submit').style.display = "none";
    document.getElementById("instracImpo").innerHTML = "יש להכניס את האותיות מטה";
    document.getElementById("leftBtn").disabled = true;
    document.getElementById("stopBtn").disabled = true;
    document.getElementById("rightBtn").disabled = true;



        goToRed(0);
		
    			setTimeout(function(){ impo1(2); }, 31000);//3000
				
}

function impo1(temp){//impolitecaseroomgreen
goToGreen(0);
    document.getElementById('submit').style.display = "none";
    document.getElementById("leftBtn").disabled = true;
    document.getElementById("stopBtn").disabled = true;
    document.getElementById("rightBtn").disabled = true;

  
			setTimeout(function(){ impo2(3); }, 31000);//3000
}

function impo2(tempx){//impolitecaseroomblue
goToBlue(0);

    document.getElementById('submit').style.display = "none";

    document.getElementById("leftBtn").disabled = true;
    document.getElementById("stopBtn").disabled = true;
    document.getElementById("rightBtn").disabled = true;
	
	setTimeout(function(){ ScreenCheck(0); }, 34000);//3000


	goal_status_listener.subscribe(function(message){
		console.log(message.pose.pose.position.x);
		var Rposex = message.pose.pose.position.x;
		if (Rposex>=(Xblue-0.15) && Rposex<=(Xblue+0.15)){
				
			document.getElementById("leftBtn").disabled = false;
			document.getElementById("stopBtn").disabled = false;
			document.getElementById("rightBtn").disabled = false;

		}
	});

}
			
		

function goToBlue(x){//Dealing with the impolite correct(=1) incorrect(x=0) scenario;
    document.getElementById("leftBtn").disabled = true;
    document.getElementById("stopBtn").disabled = true;
    document.getElementById("rightBtn").disabled = true;
    document.getElementById("instracImpo").innerHTML = "יש להכניס את האותיות מטה";
    document.getElementById("next").innerHTML="מתקדם לכיוון החדר הכחול";
    document.getElementById('submit').style.display = "none";
	
	if(x==0){
	goToGoal(3.26, 0.67);
	setTimeout(function(){goToGoal(2.98, -0.04); }, 3500);//3000
    	setTimeout(function(){goToGoal(0.05, 0.05); }, 6000);//3000
    	setTimeout(function(){  goToGoal(Xblue, Yblue); }, 15000);//3000

	}
	if (x == 1) {
 	 goToGoal(0.6,0.51);
   	 setTimeout(function(){ goToGoal(Xblue,Yblue); }, 5000);//3000
	 setTimeout(function(){ goToRed(1); }, 23500);//after 5 second moving to the green room
	}

    goal_status_listener.subscribe(function(message){
        console.log(message.pose.pose.position.x);
        var Rposex = message.pose.pose.position.x;
        if (Rposex>=(Xblue-0.10) && Rposex<=(Xblue+0.10)){

            document.getElementById("leftBtn").disabled = false;
            document.getElementById("stopBtn").disabled = false;
            document.getElementById("rightBtn").disabled = false;
            
        }
    });


     
}
function goToRed(x){
    document.getElementById("leftBtn").disabled = true;
    document.getElementById("stopBtn").disabled = true;
    document.getElementById("rightBtn").disabled = true;
    document.getElementById("next").innerHTML="מתקדם לכיוון החדר האדום";

	if(x==0){
		goToGoal(2.78, -0.2);
    		setTimeout(function(){ goToGoal(Xred,Yred); }, 10000);//3000

	}

	if(x==1){
		goToGoal(1.6, -0.01);
    		setTimeout(function(){  goToGoal(2.98, -0.04); }, 6000);//3000
    		setTimeout(function(){  goToGoal(Xred, Yred); }, 16000);//3000
		setTimeout(function(){ goToGreen(1); }, 38000);//after 5 second moving to the green room
	}

    goal_status_listener.subscribe(function(message){
        console.log(message.pose.pose.position.x);
        var Rposex = message.pose.pose.position.x;
        if (Rposex>=(Xred-0.10) && Rposex<=(Xred+0.10)){

            document.getElementById("leftBtn").disabled = false;
            document.getElementById("stopBtn").disabled = false;
            document.getElementById("rightBtn").disabled = false;
             }
    });
		
}

function goToGreen(x){

    document.getElementById("leftBtn").disabled = true;
    document.getElementById("stopBtn").disabled = true;
    document.getElementById("rightBtn").disabled = true;
    document.getElementById("next").innerHTML="מתקדם לכיוון החדר הירוק";

	
	if(x==0){
	    goToGoal(3.18,-0.98);
	    setTimeout(function(){ goToGoal(2.98, -0.04); }, 6000);//3000
	    setTimeout(function(){ goToGoal(Xgreen,Ygreen); }, 10000);//3000
	}

	if(x==1){
	    goToGoal(2.78, -0.2);
	    setTimeout(function(){ goToGoal(Xgreen,Ygreen); }, 7000);//3000
                setTimeout(function(){ ScreenCheck(1); }, 29000);//3000
	}

    goal_status_listener.subscribe(function(message){
        console.log(message.pose.pose.position.x);
        var Rposex = message.pose.pose.position.x;
        if (Rposex>=(Xgreen-0.15) && Rposex<=(Xgreen+0.15)){
            document.getElementById("leftBtn").disabled = false;
            document.getElementById("stopBtn").disabled = false;
            document.getElementById("rightBtn").disabled = false;

            if (x == 1) {

            }
           
        }
    });


}



function ScreenCheck(x){//x=:1=correct 0=mistake y:= 1=polite 0=mistake

	if(x!=0 && x!=1){
	    document.getElementById("next").innerHTML = "יש ללחוץ על כתפור 'בדיקה' לקבלת משוב";
            document.getElementById("submitp").style.display = "block";
            document.getElementById("game").style.transform = "translate(-7%,200%)";
            document.getElementById("instrac").style.transform = "translate(0%,290%)";
            document.getElementById("right_side").style.transform = "translate(0%,-10%)";
                document.getElementById("leftBtn").disabled = false;
                document.getElementById("stopBtn").disabled = false;
                document.getElementById("rightBtn").disabled = false;
	
	}

		document.getElementById('submit').style.display = "block";
		document.getElementById("next").innerHTML = "יש ללחוץ על כתפור 'בדיקה' לקבלת משוב";
		document.getElementById("next").style.color = "#000";
		document.getElementById("submit").style.transform = "translate(140%,80%)";
		document.getElementById("gameImpolite").style.transform = "translate(-5%,240%)";
		document.getElementById("instracImpo").style.transform = "translate(0%,400%)";
		if(x==1){
			document.getElementById('submit').addEventListener("click", () => {checkPC(3)});
		}
		if(x==0){
			document.getElementById('submit').addEventListener("click", () => {checkPC(4)});
		}
	

}

function checkPC(scenario) {
    document.getElementById("next").style.display = "block";
   
    var img = new Image();
    var div = document.getElementById('next');
    img.onload = function() {
        div.appendChild(img);
        img.height = 250;
        img.width = 400;
        img.offsetParent ;
    };

    if (scenario == 1 || scenario == 2){
        document.getElementById("game").style.transform = "translate(-5%,180%)";
	document.getElementById("button").style.display = "none";
    	document.getElementById("submitp").style.display = "none";
    }
    if (scenario == 3 || scenario == 4){
   	document.getElementById("submit").style.display = "none";
        document.getElementById("instracImpo").style.transform = "translate(0%,700%)";
        document.getElementById("gameImpolite").style.transform = "translate(0%,400%)";
    }

 

    var x = document.getElementById("firstNum").value;
    var y = document.getElementById("secondNum").value;
    var z = document.getElementById("thirdNum").value;

    switch (scenario) {
        case 1:
            if(x==="ש" && y==="ב" && z==="כ"){
                text = "כל הכבוד, הרכבת את המילה הנכונה";
                img.src = 'good.jpeg'
            }else{
                text ="מצטער, זו אינה המילה הנכונה";
                img.src = 'bad.jpeg'
            }
            break;
        case 2:
            if(x==="ב" && y==="ל" && z==="כ"){
                text = "כל הכבוד, הרכבת את המילה הנכונה";
                img.src = 'good.jpeg'
            }else{
                text ="מצטער, זו אינה המילה הנכונה";
                img.src = 'bad.jpeg'
            }
            break;
        case 3:
            if(x==="י" && y==="ד" && z==="ג" ){
                text = " זוהי מילה הנכונה";
            }else{
                text =" זוהי אינה המילה הנכונה";
            }
            break;
        case 4:
            if(x==="ל" && y==="מ" && z==="ג"){
                text = "זוהי המילה הנכונה";
            }else{
                text =" זוהי אינה התשובה הנכונה";
            }
            break;
        default:
            text = "No value found";
    }
    document.getElementById("next").innerHTML = text;
}

function setTopic(){
    this.topic = new ROSLIB.Topic({
        ros: this.ros,
        name: '/cmd_vel',
        messageType: 'geometry_msgs/Twist'

    })
}
function stop() {
    this.message = new ROSLIB.Message({
        linear: { x: 0, y: 0, z: 0, },
        angular: { x: 0, y: 0, z: 0, },
    })
    this.setTopic()
    this.topic.publish(this.message)
}
function turnLeft() {
    this.message = new ROSLIB.Message({
        linear: { x: 0, y: 0, z: 0, },
        angular: { x: 0, y: 0, z: 0.5, },
    })
    this.setTopic()
    this.topic.publish(this.message)
}
function turnRight() {
    this.message = new ROSLIB.Message({
        linear: { x: 0, y: 0, z: 0, },
        angular: { x: 0, y: 0, z: -0.5, },
    })
    this.setTopic()
    this.topic.publish(this.message)
}
