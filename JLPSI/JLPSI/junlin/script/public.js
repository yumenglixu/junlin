//分割时间
function splitStr(str) {
	var arr = str.split("~");
	arr[0] = trim(arr[0]);
	arr[1] = trim(arr[1]);
	return arr;
}
//删除两端字串
function trim(str) { //删除左右两端的空格
	return str.replace(/(^\s*)|(\s*$)/g, "");
}

//去除空格
function cky(obj) {
	var t = obj.value.replace(/(^\s*)|(\s*$)/g, "");
	if(obj.value != t)
		obj.value = t;
}

//去除空格
function cky_obj($obj) {
	var t = $obj.val().replace(/(^\s*)|(\s*$)/g, "");
	if($obj.val() != t)
		$obj.val(t);
}

//清空表单
function clearForm(id, textareastr, url, $tree) {
	$("#" + id + " input[type='text']").val("");
	$("#" + id + " input[type='password']").val("");
	$("#" + id + " select").val("-1");
	$("#" + id + " textarea").val(textareastr);
	$("#" + id + " img").attr("src", url + '/junlin/img/photo_icon.jpg');
	$("#" + id + " img").css({
		"height": 90,
		"width": 90
	});
	/*富文本框清空*/
	$("#editor .w-e-text").html("<p>请<b>删除此行</b>并在此处进行编辑。</p>")

	/*还原tree*/
	if($tree != undefined) {
		expandAll($tree);
		uncheckedAll($tree);
	}

}

//清空多张图片
function clearImgs(classname, url) {
	$("." + classname + "").html('<div class="big-photo"><div class="preview" id="preview0">' +
		'<img id="imghead0" border="0" src="' + url + '/junlin/img/photo_icon.jpg" width="90" height="90" onclick="$(\'#previewImg0\').click();" alt="0" >' +
		'</div><input type="file" onchange="previewImage(this,0,'+url+')" style="display: none;" id="previewImg0" name="previewImg" accept="image/gif,image/jpeg,image/jpg,image/png,image/svg"></div>');

}


//展开tree
function expandAll($tree) {
	var node = $tree.tree('getSelected');
	if(node) {
		$tree.tree('expandAll', node.target);
	} else {
		$tree.tree('expandAll');
	}
}
//设置tree所有为未选中
function uncheckedAll($tree) {

	var node = $tree.tree('getChecked', 'checked');
	$(node).each(function(index, obj) {
		if(obj) {
			$tree.tree('uncheck', obj.target);
		} else {
			$tree.tree('uncheck');
		}
	})

}


//layer
function publicMessageLayer(atext, callFun) {
	layer.confirm("你确定要" + atext + "吗？", {
		  btn: ['确认','取消'] //按钮
		}, function(index){
			callFun();
			layer.close(index);
		}, function(){});
	
}

function MessageLayer(atext, callFun) {
	layer.confirm(atext, {
		  btn: ['确认','取消'] //按钮
		}, function(index){
			callFun();
			layer.close(index);
		}, function(){
		});
	
}

//成功
function laysuccess(str) {
	layer.msg(str, {
		icon: 6,
		time: 2000
	});

}
//失败
function layfail(str) {
	layer.msg(str, {
		icon: 5,
		time: 1500
	});

}
//警告
function laywarn(str) {
	layer.msg(str, {
		icon: 0,
		time: 1500
	});

}
/*
 * 3s后才能关闭的layer
 */
function layerTwoConfrim($div, mess, message, callbackFun) {
	var $sureBtn = $div.find("button:first");
	var $calselBtn = $div.find("button:first").next();
	var count = 3;
	$div.find("article").html(message);
	$sureBtn.unbind("click");

	var index = layer.open({
		type: 1,
		title: mess,
		closeBtn: 1,
		area: ['300px', '150px'],
		content: $div,
		end:function(){
			clearInterval(interval);
			$sureBtn.html("确定(3s)");
		}
	});

	var interval = setInterval(function() {
		count--;
		$sureBtn.html("确定(" + count + "s)");
		if(count == 0) {
			$sureBtn.html("确定");
			clearInterval(interval);
			$sureBtn.click(function() {
				layer.close(index);
				callbackFun();
			})
		}
	}, 1000);

	$calselBtn.click(function() {
		layer.close(index);
	})
}



//时间插件
function laydateTwo(id, callFun) {
	laydate.render({
		elem: id,
		type: 'date',
		range: '~',
		min: 0,
		format: 'yyyy-MM-dd',
		change: function(value, date, endDate) {
			time = value;
			callFun();
		}
	});
}

//时间插件
function laydateTwo_max0(id, callFun) {
	laydate.render({
		elem: id,
		type: 'date',
		range: '~',
		max: 0,
		format: 'yyyy-MM-dd',
		change: function(value, date, endDate) {
			time = value;
			callFun();
		}
	});
}
function latdate(id){
laydate.render({
	elem: id,
	type: 'date',
	format: 'yyyy-MM-dd'
});			
}
function latdateNoBefore(id){
laydate.render({
	elem: id,
	type: 'date',
	format: 'yyyy-MM-dd',
	min:0
});			
}
//比较字符串类型日期（2017-11-22）
function compareDate(startDate, endDate) {
	var startMonth = startDate.substring(5, startDate.lastIndexOf("-"));
	var startDay = startDate.substring(startDate.length, startDate.lastIndexOf("-") + 1);
	var startYear = startDate.substring(0, startDate.indexOf("-"));

	var endMonth = endDate.substring(5, endDate.lastIndexOf("-"));
	var endDay = endDate.substring(endDate.length, endDate.lastIndexOf("-") + 1);
	var endYear = endDate.substring(0, endDate.indexOf("-"));

	if(Date.parse(startMonth + "/" + startDay + "/" + startYear) >
		Date.parse(endMonth + "/" + endDay + "/" + endYear)) {
		return false;
	}
	return true;
}

//全选全不选
function checkboxAll(checkall) {
	$(checkall).click(function() {
		if(this.checked) {
			$("#datatable :checkbox").prop("checked", true);
		} else {
			$("#datatable :checkbox").prop("checked", false);
		}
	});
	$("#datatable input[type=checkbox]").click(function() {
		if($("#datatable input:checkbox:checked").length == $("#datatable input:checkbox").length) {
			$(checkall).prop("checked", true);
		} else {
			$(checkall).prop("checked", false);
		}
	})
}

function checkboxController(thischeckbox) {
	if(thischeckbox.checked) {
		$("#datatable :checkbox").prop("checked", true);
	} else {
		$("#datatable :checkbox").prop("checked", false);
	}
}

function checkboxClick(checkall) {
	if($("#datatable input:checkbox:checked").length == $("#datatable input:checkbox").length) {
		$(checkall).prop("checked", true);
	} else {
		$(checkall).prop("checked", false);
	}
}

/*正则验证*/
/*是否为空*/
function isnotEmpty(str) {
	str = trim(str);
	if(str == "" || str == undefined || str === "") {
		return false;
	} else {
		return true;
	}
}

/* 检查手机号码是否正确 
 规则:共11位,第一位为1,第二位为34578
 */
function checkMobilePhone(mobilePhone) {
	var re = new RegExp(/^1[34578]\d{9}$/);
	var retu = mobilePhone.match(re);
	if(retu) {
		return true;
	} else {
		return false;
	}
}
/* 
 * 家庭电话正则验证
 * 传入参数
 */
function checkTell(tell) {
	var re = new RegExp( /^(\d{3,4}-)?\d{7,8}$/);
	var retu = tell.match(re);
	if(retu) {
		return true;
	} else {
		return false;
	}
}
/* 
 * 家庭电话或者手机的正则验证
 * 传入参数
 */
function checkPhone(phone){
	if(checkTell(phone)|checkMobilePhone(phone)) {
		return true;
	} else {
		return false;
	}
}
/* 检查密码是否正确 
 规则:共8-16位,字母数字下划线组合(字母大小写不限)
 验证安全级别:var reg=/^(?=.{8,16})(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*_).*$/;
 */
function checkPassword(pwd) {
	var re = new RegExp(/^[0-9a-zA-Z_]{8,16}$/);
	var retu = pwd.match(re);
	if(retu) {
		return true;
	} else {
		return false;
	}
}
/* 检查用户名是否正确 
 规则:共2-20个,汉字
 */
function checkChinese(username) {
	var re = new RegExp(/^[\u4e00-\u9fa5]{2,20}$/);
	var retu = username.match(re);
	if(retu) {
		return true;
	} else {
		return false;
	}
}

/* 
 * 邮箱正则验证
 * 规则：1、@之前必须有内容且只能是字母（大小写）、数字、下划线(_)、减号（-）、点（.）
 * 		 2、@和最后一个点（.）之间必须有内容且只能是字母（大小写）、数字、点（.）、减号（-），且两个点不能挨着
 * 		 3、最后一个点（.）之后必须有内容且内容只能是字母（大小写）、数字且长度为大于等于2个字节，小于等于6个字节
 * 传入参数
 */
function checkEmail(email) {
	var re = new RegExp(/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/);
	var retu = email.match(re);
	if(retu) {
		return true;
	} else {
		return false;
	}
}
/* 
 * 邮编正则验证
 * 规则：开头不能为0，共6位
 * 传入参数
 */
function checkPost(post) {
	var re = new RegExp(/^[1-9][0-9]{5}$/);
	var retu = post.match(re);
	if(retu) {
		return true;
	} else {
		return false;
	}
}
/* 
 * 网址正则验证
 * 传入参数
 */
function checkWebsite(website) {
	var re = new RegExp(/^([hH][tT]{2}[pP]:\/\/|[hH][tT]{2}[pP][sS]:\/\/)(([A-Za-z0-9-~]+)\.)+([A-Za-z0-9-~\/])+$|^(([A-Za-z0-9-~]+)\.)+([A-Za-z0-9-~\/])+$/);
	var retu = website.match(re);
	if(retu) {
		return true;
	} else {
		return false;
	}
}
/* 
 * 传真正则验证
 * 传入参数
 */
function checkFax(fax) {
	var re = new RegExp( /^(\d{3,4}-)?\d{7,8}$/);
	var retu = fax.match(re);
	if(retu) {
		return true;
	} else {
		return false;
	}
}
/* 
 * 身份证号正则验证
 * 传入参数
 */
function checkIDcard(id) {
	var re = new RegExp(/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/);
	var retu = id.match(re);
	if(retu) {
		return true;
	} else {
		return false;
	}
}



/*
 * jquery方法
 * 只能输入整数，不能输入小数
 * 请使用onkeyup()调用
 */
function pressInteger(ob) {
	ob.value = ob.value.replace(/[^\d]/g, ""); //清除"数字"以外的字符
}
/* 
 * jquery方法
 * 可以输入数值以及小数点小数点后只能输入两位
 * 请使用onkeyup()调用
 * 传入参数
 */
function pressMoney(ob) {
	ob.value = ob.value.replace(/[^\d.]/g, ""); //清除"数字"和"."以外的字符
	ob.value = ob.value.replace(/^\./g, ""); //验证第一个字符是数字
	ob.value = ob.value.replace(/\.{2,}/g, "."); //只保留第一个, 清除多余的
	ob.value = ob.value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
	ob.value = ob.value.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3'); //只能输入两个小数
	
	if(ob.value-0>=10000000){
		ob.value ="";
		laywarn("价格过大");
	}
}
/* 
 * jquery方法
 * 可以输入数值小于100的正整数
 * 请使用onkeyup()调用
 * 传入参数
 */
function pressIntegersOneHundred(ob) {
	ob.value = ob.value.replace(/[^\d]/g, ""); //清除"数字"以外的字符
	Leftzero(ob);
	if(ob.value>100){
		ob.value=100;
	}else if(ob.value==""){
		ob.value=0;
	}
}
/*去除左侧0*/
function  Leftzero(ob){
	ob.value=ob.value.replace(/\b(0+)/gi,"");
}

/* 
 * jquery方法
 * 可以输入小于1的数值以及小数点小数点后只能输入两位
 * 请使用onkeyup()调用
 * 传入参数
 */
function pressSmallNum(ob) {
	ob.value = ob.value.replace(/[^\d.]/g, ""); //清除"数字"和"."以外的字符
	ob.value = ob.value.replace(/^\d/gi, "0."); //验证第一个字符是数字
	ob.value = ob.value.replace(/\.{2,}/g, "."); //只保留第一个, 清除多余的
	ob.value = ob.value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
	ob.value = ob.value.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3'); //只能输入两个小数
}
/* 
 * jquery方法
 * 可以输入小于1的数值以及小数点小数点后只能输入两位或者是0
 * 请使用onkeyup()调用
 * 传入参数
 */
function pressSmallNumZero(ob) {
	ob.value = ob.value.replace(/[^\d.]/g, ""); //清除"数字"和"."以外的字符
	ob.value = ob.value.replace(/^\d/gi, "0"); //验证第一个字符是数字
	ob.value = ob.value.replace(/^\d{2}/gi, "0."); //验证第一个字符是数字
	ob.value = ob.value.replace(/\.{2,}/g, "."); //只保留第一个, 清除多余的
	ob.value = ob.value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
	ob.value = ob.value.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3'); //只能输入两个小数
}
/*兼容nextSibling*/
function getNextNode(node){
    node=typeof node=="string"?document.getElementById(node):node;
    var nextNode=node.nextSibling;
    if(!nextNode)return null;
    if(!document.all){  //FF不识别document.all
        while(true){
            if(nextNode.nodeType==1){
                break;
            }else{
                if(nextNode.nextSibling){
                    nextNode=nextNode.nextSibling;
                }else{
                    break;
                }
            }
        }
    }
    return nextNode;
}

//将NodeList转换成Array
function transformList(list) {
    var arr = [];
    for(var i = 0; i < list.length; i++) {
        arr.push(list[i]);
    }
    return arr;
}
//查找一个父节点下指定类名的子节点
function getParentdElement(parentNode, childName) {
    //如果父节点parentNode含有指定类名childName，这个节点就是目标节点
    if (parentNode.className.search(childName) !== -1) {
        console.log("if------");
        console.log(parentNode);
        return parentNode;
    } else {
        //父节点不含有指定类名childName，递归查找它的子节点。
        var nodes = parentNode.childNodes;
        //将子节点的list转换成标准数组并且过滤掉Text元素
        nodes = transformList(nodes).filter(function(item){
            if(item.nodeType !== 3) {
                return item;
            } else{ }
        });
        //如果子节点数组中有值，则递归查找
        if(nodes.length) {
            nodes.forEach(function(item) {
                getParentdElement(item, childName);
            });
        }
        console.log("else------");
        console.log(nodes);
    }
}



/*ajax封装*/
function ajaxJquery(type,url,data,callfun) {
	$.ajax({
		url: url,
		type: type,
		dataType: "json",
		async: false,
		cache: false,
		data: data,
		traditional: true,
		success: function(data) {
			if(callfun!=undefined){
				callfun(data);
			}
		}
	});
}

/*获取jQuery对象html*/
function getJqueryHtmlCode($obj) {
	var parent = $("<div></div>");
	parent.append($obj);
	return parent.html();
}
//功能：将浮点数四舍五入，取小数点后2位 
function toDecimal(x) { 
  var f = parseFloat(x); 
  if (isNaN(f)) { 
    return; 
  } 
  f = Math.round(x*100)/100; 
  return f; 
} 


//只保留2位小数，如：2，会在2后面补上00.即2.00 
function toDecimal2(x) { 
  var f = parseFloat(x); 
  if (isNaN(f)) { 
    return false; 
  } 
  var f = Math.round(x*100)/100; 
  var s = f.toString(); 
  var rs = s.indexOf('.'); 
  if (rs < 0) { 
    rs = s.length; 
    s += '.'; 
  } 
  while (s.length <= rs + 2) { 
    s += '0'; 
  } 
  return s; 
}

//将src小数保留pos位
function fomatFloat(src,pos){   
   return Math.round(src*Math.pow(10, pos))/Math.pow(10, pos);   
}



Array.prototype.indexOf = function(val) {
	for (var i = 0; i < this.length; i++) {
	if (this[i] == val) return i;
	}
	return -1;
	};
Array.prototype.remove = function(val) {  
	var index = this.indexOf(val);  
	if (index > -1) {  
	this.splice(index, 1);  
	}  
	};
	
	
	
	
	function clearSearchableSelect(idstr){
		/*console.log(getParentdElement(document.querySelector("#"+idstr), "searchable-select-item"))*/
		var fireOnThis =getNextNode(document.getElementById(idstr)).getElementsByClassName("searchable-select-item")[0];
	    var evObj = document.createEvent('MouseEvents');
	    evObj.initMouseEvent('click',true,true);
	    fireOnThis.dispatchEvent(evObj);
	}

	//带搜索的select框的默认选择
	function SearchableSelectsetValue(selector, value) {
		console.log("selector",selector);
		console.log("value",value);
		/*给select赋值*/
		$(selector).val(value);
		/*给插件赋值*/
		var $parent = $(selector).next();
		var $items = $parent.find(".searchable-select-items")
		var $ain_node = $parent.find(".searchable-select-item[data-value='" + value + "']");
		console.log("ain_node.html",$ain_node.html());
		$parent.find(".searchable-select-holder").html($ain_node.html().split(" ")[0]);
		$parent.find(".searchable-select-item").removeClass("selected");
		$ain_node.addClass("selected");

	}