//设置购物车动态效果
handleCart();
function handleCart(){
	var oCart = document.querySelector('.top .cart');
	var oCartBox = document.querySelector('.top .cart .cart-box');
	var oCartContent = document.querySelector('.top .cart .cart-content');
	var oLoading = document.querySelector('.top .cart .loading');
	var oEmpty = document.querySelector('.top .cart .cart-empty');

	//当鼠标移入整个购物车大盒子时
	oCart.onmouseenter = function(){
		// oCartContent.style.height = "100px";
		// 显示加载图标
		oLoading.style.display = "block";
		animation(oCartContent,"height","100",true,function(){
			oLoading.style.display = "none";
			oEmpty.style.display = "block";
		});//盒子高度变成100px时加载图标去除，显示内容
	}
	//当鼠标移出整个购物车大盒子时
	oCart.onmouseleave = function(){
		// oCartContent.style.height = "0";
		animation(oCartContent,"height","0",true,function(){
			//鼠标移走购物车回到初始状态
			oLoading.style.display = "none";
			oEmpty.style.display = "none";
		})
	}
}


//设置选项卡动态效果
handleTab();
function handleTab(){
	var oCommodityBox = document.querySelector('.top-commodity');
	var oLi = document.querySelectorAll('.body-top .top-list li a');
	var oAllCss = oCommodityBox.querySelector('.allcss1');
	var cmdTimer = null;
	var loadDateTimer = null;

	//隐藏列表封装函数
	function hideCheck(){
		oCommodityBox.style.overflow = "hidden";
		animation(oCommodityBox,"height","0",true,function(){
			oCommodityBox.style.borderTop = "none";
			
		});
	}

	for(var i=0;i<oLi.length-2;i++){
		oLi[i].index = i;//存值i
		oLi[i].onmouseenter = function(){
			clearTimeout(cmdTimer);//清除隐藏选项卡定时器
			oCommodityBox.style.borderTop = "1px solid #ccc";
			oAllCss.innerHTML = '<div class="loading"></div>';
			animation(oCommodityBox,"height","200",true,function(){
				oCommodityBox.style.overflow = "visible";
			});
			//动态加载数据
			var index = this.index;
			loadDateTimer = setTimeout(function(){
				loadDate(index);
			},500);
		}
		oLi[i].onmouseleave = function(){
			cmdTimer = setTimeout(function(){
				hideCheck();
			},300);
		}
	}
	//鼠标移入商品显示内容
	oCommodityBox.onmouseenter = function(){
		clearTimeout(cmdTimer);
	}
	//鼠标移走隐藏商品内容
	oCommodityBox.onmouseleave = function(){
		hideCheck();
	}

	//动态加载数据函数
	function loadDate(index){
		//定义变量拿到列表中某个li对应的数组
		var date = cmdListAll[index];
		// console.log(date);
		var html = '';

		html +=	'<ul>'
		for(var i=0;i<date.length;i++){
			html +=		'<li>';
			html +=			'<a href="'+date[i].url+'">';
			html +=				'<div class="imgBox">';
			html +=					'<img src="'+date[i].src+'" alt="">';
			html +=				'</div>';
			html +=				'<p class="top-commodity-name">'+date[i].name+'</p>';
			html +=				'<p class="top-commodity-price">'+date[i].price+'</p>';
			if(date[i].tag){
				html +=				'<span class="tag">'+date[i].tag+'</span>';
			}
			html +=			'</a>';
			html +=		'</li>';
		}
		html +=	'</ul>'

		oAllCss.innerHTML = html;
	}
}


//轮播图动态效果
var bodyPhoto = new Coursel({
	id:"body-photo",
	width:1226,
	height:460,
	img:["./images/b1.jpg","./images/b2.jpg","./images/b3.jpg"],
	playTime:4000
});

//轮播图列表动态效果
handleCate();
function handleCate(){
	var oCateList = document.querySelectorAll('.body-list .sidebar li');
	var oCateBox = document.querySelector('.body-bottom1');
	var oCateContent = document.querySelector('.cate .cate-content');

	for(var i=0;i<oCateList.length;i++){
		oCateList[i].index = i;
		oCateList[i].onmouseenter = function(){
			for(var j=0;j<oCateList.length;j++){
				oCateList[j].className = "";
			}
			this.className = "active";
			oCateContent.style.display = "block";
			loadCate(this.index);
		}
	}
	oCateBox.onmouseleave = function(){
		for(var j=0;j<oCateList.length;j++){
			oCateList[j].className = "";
		}
		oCateContent.style.display = "none";

	}

	//商品列表动态传值
	function loadCate(index){
		var cate = cateComAll[index];
		// console.log(cate);
		var html = '';
			html += '<ul>'
			for(var i=0;i<cate.length;i++){
				html +=		'<li>';
				html +=			'<a href="'+ cate[i].url +'">';
				html +=				'<img src="'+ cate[i].src +'" alt="">';
				html +=				'<span>'+ cate[i].name +'</span>';
				html +=			'</a>';
				html +=		'</li>';
			}
			html +=	'</ul>'

		oCateContent.innerHTML = html;
	}
}


//家电部分选项卡
handleHousehold();
function handleHousehold(){
	var aLi = document.querySelectorAll('.household-list li');
	var oComUl = document.querySelector('.household-commodity .commodity-phone');

	//默认显示第一条
	loadDate(0);
	for(var i=0;i<aLi.length;i++){
		aLi[i].index = i;
		aLi[i].onmouseenter = function(){
			for(var j=0;j<aLi.length;j++){
				aLi[j].className = "";
			}
			this.className = "active";
			//加载数据
			loadDate(this.index);
		}
	}

	function loadDate(index){

		var date = dateComAll[index];
		var html = '';

			for(var i=0;i<date.length-1;i++){
				html += '<li>';
				html +=		'<a href="'+date[i].url+'">';
				html +=			'<img src="'+date[i].src+'" alt="">';
				html +=			'<p>'+date[i].name+'</p>';
				html +=			'<span>'+date[i].des+'</span>';
				html +=			'<strong>'+date[i].price+'</strong>';
				html +=		'</a>';
				if(date[i].comment){
					html +=		'<div class="comment">';
					html +=			'<p>'+date[i].comment.content+'</p>';
					html +=			'<span>'+date[i].comment.from+'</span>';
					html +=		'</div>';
				}
				html +=	'</li>';
			}

			//设置最后一个样式
			console.log(date.length-1)

			html += '<li>';
			html +=	'	<div class="commodity-last">';
			html +=	'		<a href="'+ date[date.length-1].url1 +'" class="commodity-last-top">';
			html +=	'			<p>'+ date[date.length-1].name +'</p>';
			html +=	'			<strong>'+ date[date.length-1].price +'</strong>';
			html +=	'			<img src="'+ date[date.length-1].src +'" alt="">';
			html +=	'		</a>';
			html +=	'		<a href="'+ date[date.length-1].url2 +'" class="commodity-last-bottom">';
			html +=	'			<p>'+ date[date.length-1].more +'</p>';
			html +=	'			<span>'+ date[date.length-1].hot +'</span>';
			html +=	'			<i class="iconfont">'+ date[date.length-1].icon +'</i>';
			html +=	'		</a>';
			html +=	'	</div>';
			html +=	'</li>';
			oComUl.innerHTML = html;
	}

	
}
