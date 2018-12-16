function orderBillEdit(title, calfun) {
	setFormDisabled();
	layer.open({
		type: 1,
		title: "编辑" + title,
		closeBtn: 1,
		area: ['100%', '100%'],
		content: $("#editDiv"),
		btn: ['提交', '取消'],
		yes: function(index) {
			if(checkFormNoEmpty()) {
				calfun(index);
			}
		},
		end: function(index, layero) {
			layer.close(index);
			clearForm("editDiv", "");
			clearBill();
			$("#currency").val("人民币");
		}
	});
}

function orderBillAdd(title, calfun) {
	$("#summary").val("无");
	$("#remark").val("无");
	removeFormDisabled();
	layer.open({
		type: 1,
		title: "新增" + title,
		closeBtn: 1,
		area: ['100%', '100%'],
		content: $("#editDiv"),
		btn: ['提交', '取消'],
		yes: function(index) {
			if(checkFormNoEmpty()) {
				calfun(index);

			}

		},
		end: function(index, layero) {
			layer.close(index);
			clearForm("editDiv", "");
			clearBill();
			$("#currency").val("人民币");
			
		}
	});
}

function orderBillDetail(title) {
	layer.open({
		type: 1,
		title: title + "详情",
		closeBtn: 1,
		area: ['100%', '100%'],
		content: $("#detailDiv"),
		btn: ['关闭'],
	});
}
/*判断单据是否为空*/
function checkFormNoEmpty() {

	//判断表单是否填写完整 填写完整返回true,相反返回false
	var res = true;
	$("#headEdit select").each(function(index, val) {
		if($(val).val() == "-1" && res) {
			checkInputEmptyLayer(val);
			res = false;
		}

	});
	if(!res) return res;
	$("#headEdit input").each(function(index, val) {
		if($(val).val() == "" && (!$(val).hasClass("searchable-select-input")) && res) {
			checkInputEmptyLayer(val);
			res = false;
		}

	});
	if(!res) return res;
	if($(".tipTr").length > 0) {
		res = false;
		layfail("单据不能为空");
	}
	if(!res) return res;
	$("#billTbody input").each(function(index, val) {
		if($(val).val() == "" && (!$(val).prop("disabled")) && res) {
			checkTableInputEmptyLayer(val);
			res = false;
		}
	});
	if(!res) return res;
	$("#billTbody select").each(function(index, val) {
		if($(val).val() == "-1" && res) {
			checkTableInputEmptyLayer(val);
			res = false;
		}
	});
	if(!res) return res;
	$("#middleEdit select").each(function(index, val) {
		if($(val).val() == "-1" && res) {
			checkInputEmptyLayer(val);
			res = false;
		}
	});
	if(!res) return res;
	$("#middleEdit input").each(function(index, val) {
		if($(val).val() == "" && res) {
			checkInputEmptyLayer(val);
			res = false;
		}
	});
	if(!res) return res;
	$("#footerEdit select").each(function(index, val) {
		if($(val).val() == "-1" && res) {
			checkInputEmptyLayer(val);
			res = false;
		}
	});
	if(!res) return res;
	$("#footerEdit input").each(function(index, val) {
		if($(val).val() == "" && res) {
			checkInputEmptyLayer(val);
			res = false;
		}
	});

	return res;
}

function checkInputEmptyLayer(thisInput) {
	//判断footer或者header中Input框为空时弹出layer
	var $input = $(thisInput);
	var name = $input.parents(".form-group").find(".control-label").text();
	layfail(name + "不能为空");
}

function checkTableInputEmptyLayer(thisInput) {
	//判断table中Input框为空时弹出layer
	var $input = $(thisInput);
	var name = $input.attr("attr-name");
	layfail(name + "不能为空");
}

function checkInputHaveZero(className) {
	var res = false;
	$("#editDiv ." + className).each(function(index, val) {
		if($(val).val() == "0") {
			res = true;
		}
	});
	return res;
}

function setFormDisabled() {
	$("#intercourseUnit").attr("disabled", true);
	$("#bill").parents(".jl-title").find("i").addClass("hidden");
	$("#billTbody .tipTr").remove();
	$("#billTbody tr:first").children().last().addClass("hidden");
}

function removeFormDisabled() {
	$("#intercourseUnit").attr("disabled", false);
	$("#bill").parents(".jl-title").find("i").removeClass("hidden");
	$("#billTbody tr:first").children().last().removeClass("hidden");
}