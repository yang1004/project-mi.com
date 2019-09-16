//���ù��ﳵ��̬Ч��
handleCart();
function handleCart(){
	var oCart = document.querySelector('.top .cart');
	var oCartBox = document.querySelector('.top .cart .cart-box');
	var oCartContent = document.querySelector('.top .cart .cart-content');
	var oLoading = document.querySelector('.top .cart .loading');
	var oEmpty = document.querySelector('.top .cart .cart-empty');

	//����������������ﳵ�����ʱ
	oCart.onmouseenter = function(){
		// oCartContent.style.height = "100px";
		// ��ʾ����ͼ��
		oLoading.style.display = "block";
		animation(oCartContent,"height","100",true,function(){
			oLoading.style.display = "none";
			oEmpty.style.display = "block";
		});//���Ӹ߶ȱ��100pxʱ����ͼ��ȥ������ʾ����
	}
	//������Ƴ��������ﳵ�����ʱ
	oCart.onmouseleave = function(){
		// oCartContent.style.height = "0";
		animation(oCartContent,"height","0",true,function(){
			//������߹��ﳵ�ص���ʼ״̬
			oLoading.style.display = "none";
			oEmpty.style.display = "none";
		})
	}
}


//����ѡ���̬Ч��
handleTab();
function handleTab(){
	var oCommodityBox = document.querySelector('.top-commodity');
	var oLi = document.querySelectorAll('.body-top .top-list li a');
	var oAllCss = oCommodityBox.querySelector('.allcss1');
	var cmdTimer = null;
	var loadDateTimer = null;

	//�����б��װ����
	function hideCheck(){
		oCommodityBox.style.overflow = "hidden";
		animation(oCommodityBox,"height","0",true,function(){
			oCommodityBox.style.borderTop = "none";
			
		});
	}

	for(var i=0;i<oLi.length-2;i++){
		oLi[i].index = i;//��ֵi
		oLi[i].onmouseenter = function(){
			clearTimeout(cmdTimer);//�������ѡ���ʱ��
			oCommodityBox.style.borderTop = "1px solid #ccc";
			oAllCss.innerHTML = '<div class="loading"></div>';
			animation(oCommodityBox,"height","200",true,function(){
				oCommodityBox.style.overflow = "visible";
			});
			//��̬��������
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
	//���������Ʒ��ʾ����
	oCommodityBox.onmouseenter = function(){
		clearTimeout(cmdTimer);
	}
	//�������������Ʒ����
	oCommodityBox.onmouseleave = function(){
		hideCheck();
	}

	//��̬�������ݺ���
	function loadDate(index){
		//��������õ��б���ĳ��li��Ӧ������
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


//�ֲ�ͼ��̬Ч��
var bodyPhoto = new Coursel({
	id:"body-photo",
	width:1226,
	height:460,
	img:["./images/b1.jpg","./images/b2.jpg","./images/b3.jpg"],
	playTime:4000
});

//�ֲ�ͼ�б�̬Ч��
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

	//��Ʒ�б�̬��ֵ
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


//�ҵ粿��ѡ�
handleHousehold();
function handleHousehold(){
	var aLi = document.querySelectorAll('.household-list li');
	var oComUl = document.querySelector('.household-commodity .commodity-phone');

	//Ĭ����ʾ��һ��
	loadDate(0);
	for(var i=0;i<aLi.length;i++){
		aLi[i].index = i;
		aLi[i].onmouseenter = function(){
			for(var j=0;j<aLi.length;j++){
				aLi[j].className = "";
			}
			this.className = "active";
			//��������
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

			//�������һ����ʽ
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
