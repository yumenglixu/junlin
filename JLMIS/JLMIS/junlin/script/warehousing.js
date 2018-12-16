 let warehousingGoodsarr = [];
/*检查商品是否重复*/
function checkWarehousingGoods(str) {
	var flag = false;/*false不重复 true重复*/
	for(i in warehousingGoodsarr) {
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
	let str=$(thisbtn).parents("tr").children().first().html()+"";
	console.log(warehousingGoodsarr);
	console.log(typeof(str));
	
	warehousingGoodsarr.remove(str);
	if($(thisbtn).parents("tbody").children("tr").length - 1 == 1) {
		$(thisbtn).parents("tr").html('<td colspan="6">请选择返货入库商品</td>').addClass("tiptr");
	} else {
		$(thisbtn).parents("tr").remove();
	}
}

/*添加入库商品*/
function addWarehousingGoods(thisbtn) {
	let goodsid = $(thisbtn).prev().val();
	let goodsNum=$(thisbtn).prev().find("option:selected").attr("attr-deliverNum");
	let commoditySpecificationId=$(thisbtn).prev().find("option:selected").attr("commoditySpecificationId");
	let warehousing = $(thisbtn).prev().find("option:selected").attr("attr-warehousing");
	let warehouseId=$(thisbtn).prev().find("option:selected").attr("warehouseId");
	let goodsname = $(thisbtn).prev().find("option:selected").text();
	let $table = $(thisbtn).parents("form").find("table tbody");
	let $tr = `<tr>			<td class="hidden">` + commoditySpecificationId + `</td>
							<td class="commoditySpecificationId">` + goodsid + `</td>
							<td class="hidden">`+warehouseId+`</td>
							
							<td>` + goodsname + `</td>
							<td>`+warehousing+`</td>
							<td class="goodNum">`+goodsNum+`</td>
							<td><input type="text" class="form-control"   maxlength="9"  value="" onkeyup="toZero(this)" /></td>
							<td class="hidden"><input type="text" name="lotNumber" class="form-control hidden"  value="" /></td>
							<td><input type="button" class="btncss jl-btn-defult" onclick="delWarehousingGoods(this)" value="删除" /></td>
					</tr>`;
	let repeat=checkWarehousingGoods(commoditySpecificationId);
	if(goodsid == -1) {
		layfail("请先选择返货入库商品。");
	}else if(repeat){
		layfail("请勿选择重复商品。");
	} else if(!repeat){
		$('.tiptr').remove();
		$table.append($tr);
		
	}

}