
//综合动画js
function animation(obj,oStyle,iNum,isLinear,fnEnd){//定义函数对象，属性，值，匀减速：true/false
		if(isLinear == undefined){//判断匀速或减速，默认匀速
			isLinear == true;
		}
		clearInterval(obj.time);//防止多次点击，清理定时器
		var iSpeed = 0;//定义速度
		obj.time = setInterval(function(){//定义循环定时器，ID为time
			//判断是否终止动画
			var isStopCurrent = false;
			var aOpacity = parseFloat(getComputedStyle(obj,false)[oStyle]);//获取属性的值
			if(oStyle == "opacity"){//判断是否属性是透明度
				aOpacity = Math.round(aOpacity*100);//透明度值*100
			}
			if(isLinear){//判断匀速还是减速
				if(aOpacity < iNum){//判断正反向
					iSpeed = 10;//变化的速度
				}else{
					iSpeed = -10;
				}
				if(Math.abs(iNum - aOpacity) < Math.abs(iSpeed)){//判断当目标值小于速度值时直接到达目标值
					if(oStyle == "opacity"){
						obj.style[oStyle] = iNum/100;
					}else{
						obj.style[oStyle] = iNum + "px";
					}
					isStopCurrent = true;//然后终止动画
				}
			}else{//减速
				iSpeed = (iNum - aOpacity)/10;//差值/10
				iSpeed = iSpeed>0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);//如果速度大于0则向上取整，反之向下取整
				if(!iSpeed){
					isStopCurrent = true;//终止当前动画
				}
			}
			if(isStopCurrent){
				clearInterval(obj.time);

				typeof fnEnd == "function" && fnEnd();
			}else{
				if(oStyle == "opacity"){
					obj.style[oStyle] = (aOpacity + iSpeed)/100;
				}else{
					obj.style[oStyle] = aOpacity + iSpeed + "px";
				}
			}
		},30)
	}


//链式动画js
function animate(obj,options,isLinear,fnEnd){
	//默认情况下做匀速动画
	if(isLinear == undefined){
		isLinear = true;
	}
	//防止用户多次点击
	clearInterval(obj.timer);
	//初始化速度
	var iSpeed = 0;
	obj.timer = setInterval(function(){
		//是否终止所有动画
		var isStopAll = true;
		for(attr in options){
			// 判断是否终止当前动画
			var isStopCurrent = false;
			// 获取当前该属性的值
			var currentVal = parseFloat(getComputedStyle(obj,false)[attr]);
			// 处理透明度取值
			if(attr == "opacity"){
				currentVal = Math.round(currentVal*100);
			}
			// 判断是匀速还是减速动画
			if(isLinear){//匀速动画
				// 匀速动画取值
				if(currentVal < options[attr]){
					iSpeed = 20;
				}else{
					iSpeed = -20;
				}
				// 动画的终止条件
				if(Math.abs(options[attr] - currentVal) < Math.abs(iSpeed)){
					//处理透明度和非透明度的取值
					if(attr == "opacity"){
						obj.style[attr] = options[attr]/100;
					}else{
						obj.style[attr] = options[attr] + "px";
					}
					// 终止当前动画
					isStopCurrent = true;
				}else{
					//还有动画没有执行完毕，不能终止所有动画
					isStopAll = false;
				}
			}else{//减速动画
				// 减速动画的取值
				iSpeed = (options[attr] - currentVal)/10;
				iSpeed = iSpeed>0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
				// 减速动画终止条件
				if(!iSpeed){
					// 终止当前动画
					isStopCurrent = true;
				}else{
					//还有动画没有执行完毕，不能终止所有动画
					isStopAll = false;
				}
			}
			if(!isStopCurrent){//动画执行过程
				//处理透明度和非透明度的动画执行过程
				if(attr == "opacity"){
					obj.style[attr] = (currentVal + iSpeed)/100;
				}else{
					obj.style[attr] = currentVal + iSpeed + "px";
				}
			}
		}
		if(isStopAll){//所有动画执行完毕
			// 清除定时器
			clearInterval(obj.timer);
			typeof fnEnd == "function" && fnEnd();
		}
	},30)
}