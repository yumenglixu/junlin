 let warehousingGoodsarr = [];
/*检查商品是否重复*/
function checkWarehousingGoods(str) {
	var flag = false;/*false不重复 true重复*/
	for(var i in warehousingGoodsarr) {
		if(warehousingGoodsarr[i] == str) {
			flag = true;
		}
	}
	if(!flag) {
		warehousingGoodsarr.push(str);
	}
	return flag;

}
/*删除入库商品*/
function delWarehousingGoods(thisbtn) {
	let str=$(thisbtn).parents("tr").find("#identifier").html()+"";
	console.log(warehousingGoodsarr);
	console.log(typeof(str));
	console.log(str);
	warehousingGoodsarr.remove(str);
	if($(thisbtn).parents("tbody").children("tr").length - 1 == 1) {
		$(thisbtn).parents("tr").html('<td colspan="7">请选择入库商品</td>').addClass("tiptr");
	} else {
		$(thisbtn).parents("tr").remove();
		
	}
}

/*添加入库商品*/
function addWarehousingGoods(thisbtn) {
	let goodsid = $(thisbtn).prev().val();
	let goodsname = $(thisbtn).prev().find("option:selected").text();
	let pOrderId=$(thisbtn).prev().find("option:selected").attr("attr-pOrderId");
	let state=$(thisbtn).prev().find("option:selected").attr("attr-state");
	let pCommodityId=$(thisbtn).prev().find("option:selected").attr("attr-pCommodityId");
	let identifier=$(thisbtn).prev().find("option:selected").attr("attr-identifier");
	let orderNum=$(thisbtn).prev().find("option:selected").attr("attr-orderNum");
	let arrivalQuantity=$(thisbtn).prev().find("option:selected").attr("attr-arrivalQuantity");
	let warehouseingId=$(thisbtn).prev().find("option:selected").attr("attr-warehouseingId");
	let lotNumber=$(thisbtn).prev().find("option:selected").attr("attr-lotNumber");
	
	let $table = $(thisbtn).parents("form").find("table tbody");
	

	let $tr = `<tr><td class="hidden" id="pOrderId">`+pOrderId+`</td><td class="hidden" id="pState">`+state+`</td><td class="hidden" id="pCommodityId">`+pCommodityId+`</td><td id="identifier">` + identifier + `</td>
							<td id="name">` + goodsname + `</td>
							<td><select class="form-control" id="wareHouseId">
								<option value="-1">请选择 </option>`;
	let $option;
	/*模拟仓库数据*/
	let warehouseData = orderGoodsArray;
	
 
	for(let warehousekey=0;warehousekey<warehouseData.length;warehousekey++) {
		$option += `<option value="` + warehouseData[warehousekey]["id"] + `">` + warehouseData[warehousekey]["name"] + ` </option>`;
	}
	$tr = $tr + $option + `</select></td><td id="arrivalQuantity">` + (orderNum- arrivalQuantity)+`(` +(orderNum) + `)</td>
							<td><input type="text" class="form-control" attr-orderNum="`+(orderNum- arrivalQuantity)+`"  value="" id="commodityNum" attr-name="本次入库数量"  maxlength="9"  onkeyup="pressInteger(this)"/></td>
							<td><input type="text" id="lotNumber" class="form-control"  value="` +lotNumber + `" attr-name="批号" /></td>
							<td><input type="button" class="btncss jl-btn-defult" onclick="delWarehousingGoods(this)" value="删除" /></td>
					</tr>`;
	let repeat=checkWarehousingGoods(identifier);
	if(goodsid == -1) {
		layfail("请先选择入库商品。");
	}else if(repeat){
		layfail("请勿选择重复商品。");
	} else if(!repeat){
		$('.tiptr').remove();
		$table.append($tr);
		if(warehouseingId>0){
			console.log("warehouseingId:"+warehouseingId);
			$table.find("select:last").val(warehouseingId);
			$table.find("select:last").attr("disabled","disabled");
		} 
	}
	
	
	

}