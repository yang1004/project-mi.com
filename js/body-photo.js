function Coursel(options){
	this.box = document.getElementById(options.id);
	this.width = options.width;
	this.height = options.height;
	this.img = options.img;
	this.playTime = options.playTime;
	this.oUlImg = null;
	this.oLiImg = null;
	this.oImgs = null;
	this.leftbtn = null;
	this.rightbtn = null;
	this.bottom = null;
	this.bottomBtns = null;


	//默认显示第一张照片
	this.now = 0;

	//设置页面静态结构函数
	this.init();

	//绑定事件
	this.event();

	this.auto();
}

Coursel.prototype.init = function(){
	this.box.style.width = this.width + 'px';
	this.box.style.height = this.height + 'px';
	this.box.style.position = "relative";

	//生成图片容器ul
	this.oUlImg = document.createElement('ul');
	this.oUlImg.style.width = "100%";
	this.oUlImg.style.height = "100%";
	//插入box
	this.box.appendChild(this.oUlImg);

	//生成图片盒子li
	for(var i=0;i<this.img.length;i++){
		this.oLiImg = document.createElement('li');
		this.oLiImg.style.width = "100%";
		this.oLiImg.style.height = "100%";
		this.oLiImg.style.position = "absolute";
		this.oLiImg.style.left = 0;
		this.oLiImg.style.right = 0;
		this.oUlImg.appendChild(this.oLiImg);

		//生成图片
		this.oImgs = document.createElement('img');
		this.oImgs.src = this.img[i];
		this.oLiImg.appendChild(this.oImgs);

		if(i == 0){
			this.oLiImg.style.zIndex = 99;
		}
	}

	//生成左右按钮
	this.leftbtn = document.createElement('span');
	this.rightbtn = document.createElement('span');
	this.leftbtn.className = "leftbtn";
	this.rightbtn.className = "rightbtn";
	this.leftbtn.innerHTML = "&lt;";
	this.rightbtn.innerHTML = "&gt;";
	this.box.appendChild(this.leftbtn);		
	this.box.appendChild(this.rightbtn);

	//生成底部按钮
	this.bottom = document.createElement('ul');
	this.bottom.className = "bottom";
	
	this.box.appendChild(this.bottom);
	for(var j=0;j<this.img.length;j++){
		this.bottomBtns = document.createElement('li');
		this.bottom.style.marginLeft = -(this.bottom.offsetWidth)*0.5 + 'px';
		this.bottom.appendChild(this.bottomBtns);
		if(j == 0){
			this.bottomBtns.className = "active";
		}
	}
}

//绑定事件
Coursel.prototype.event = function(){
	var _this = this;
	//给右箭头添加事件
	this.rightbtn.onclick = function(){
		_this.now++;
		_this.tab();
	}
	//给左箭头添加事件
	this.leftbtn.onclick = function(){
		_this.now--;
		_this.tab();
	}
	//给底部按钮添加事件
	for(var i=0;i<this.bottom.children.length;i++){
		this.bottom.children[i].index = i;
		this.bottom.children[i].onclick = function(){
			_this.now = this.index;
			_this.tab();
		}
	}
}

Coursel.prototype.tab = function(){
	if(this.now > this.img.length-1){
		this.now = 0;
	}else if(this.now < 0){
		this.now = this.img.length-1
	}
	// console.log(this.now);
	for(var i=0;i<this.oUlImg.children.length;i++){
		this.oUlImg.children[i].style.zIndex = 0;
		this.oUlImg.children[i].style.opacity = 0.2;
		this.bottom.children[i].className = "";
	}
	this.oUlImg.children[this.now].style.zIndex = 99;
	animation(this.oUlImg.children[this.now],"opacity",100);
	this.bottom.children[this.now].className = "active";
}

//自动轮播图片
Coursel.prototype.auto = function(){
	var timer = null;
	var _this = this;

	timer = setInterval(this.rightbtn.onclick,this.playTime);

	this.box.onmouseover = function(){
		clearInterval(timer);
	}

	this.box.onmouseout = function(){
		timer = setInterval(_this.rightbtn.onclick,_this.playTime);
	}
}


