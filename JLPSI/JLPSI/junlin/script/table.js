/*
 *生成table
 * 版本：2.0
 * */
class Table{
	/*构造器*/
	constructor(json) {
		this.jsondata = json;
		
		this.title=this.jsondata.title;
		this.beginDate=this.jsondata.beginDate;
		this.endDate=this.jsondata.endDate;
		
		this.theadArr = this.jsondata.table.thead;
		this.tbodyArr = this.jsondata.table.tbody;
		this.totalJson = this.jsondata.table.total;
		
	}
	toRow(){
		return $('<div class="row"></div>');
	}
	toTitle(title){
		return $('<h3 class="print-title">' + title + '</h3>');
	}
	toTop(beginDate,endDate){
		return $(`<div class="row" style="letter-spacing: 1px;">起始时间:` + beginDate + ` &nbsp; &nbsp;终止时间:` + endDate + `</div>`);
	}
	toTable(theadArr,tbodyArr,totalJson){
		let $tableDiv = $('<div class="print-table-div"></div>');
		let $table = $('<table class="table table-bordered print-table"></table>');
		let $thead = $('<tr></tr>')
		let $tbody = $('<tbody></tbody>')
	
		for(let i=0;i<theadArr.length;i++) {
			let tableHeadName = theadArr[i];
			let $th = $('<th nowrap="nowrap">' + tableHeadName + '</th>');
			$thead.append($th);
		}
		
		$tbody.append($thead);
		
		for(let i=0;i<tbodyArr.length;i++) {
			let $tr = $('<tr></tr>');
			for(let j=0;j<tbodyArr[i].length;j++) {
				let tableBodyName = tbodyArr[i][j];
				let $td = $('<td>' + tableBodyName + '</td>');
				$tr.append($td);
			}
			$tbody.append($tr);
		}
		
		if(totalJson.haveTotal == "true") {
			let $total = $('<tr></tr>')
			for(let i=0;i<theadArr.length;i++) {
				$total.append("<td></td>");
			}
			$total.find("td").eq(0).html("合&nbsp;计");
			
			
			for(let i=0;i<totalJson.total.length;i++){
				console.log()
				$total.find("td").eq(totalJson["total"][i]["columns"]-0-1).html(totalJson["total"][i]["content"]);
				
			}
			
			
			
			
			$tbody.append($total);
		}
	
		$table.append($tbody);
		$tableDiv.append($table);
		return $tableDiv;
	}
	getTable(){
		let $row=this.toRow();
		$row.append(this.toTitle(this.title));
		$row.append(this.toTop(this.beginDate,this.endDate));
		$row.append(this.toTable(this.theadArr,this.tbodyArr,this.totalJson));
		return $row;
	}
	
}
