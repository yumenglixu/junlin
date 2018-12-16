/*
 *生成单据
 * 版本：2.0
 * */
class Bill{
	/*构造器*/
	constructor(json) {
		this.jsondata = json;
		
		this.title=this.jsondata.title;
		this.date=this.jsondata.date;
		this.oddNumbers=this.jsondata.oddNumbers;
		
		this.theadArr = this.jsondata.table.thead;
		this.tbodyArr = this.jsondata.table.tbody;
		this.totalJson = this.jsondata.table.total;
		
		this.head=this.jsondata.head;
		this.footer=this.jsondata.footer;
	}
	toPrintContent(){
		return $('<div class="print-content"></div>');
	}
	toContainer(){
		return $('<div class="container"></div>');
	}
	toTitle(title){
		return $('<h3 class="print-title">' + title + '</h3>');
	}
	toTop(date,oddNumbers){
		return $(`<div class="row">
					<div class="col-xs-6"></div>
					<div class="col-xs-3">
						<div class="form-group">
							<label for="" class="col-xs-4 control-label" style="text-align: left;">日期:</label>
							<div class="col-xs-8">` + date + `</div>
						</div>
					</div>
					<div class="col-xs-3">
						<div class="form-group">
							<label for="" class="col-xs-4 control-label" style="text-align: left;">单号:</label>
							<div class="col-xs-8">` + oddNumbers + `</div>
						</div>
					</div>
				</div>`);
	}
	toTip(tip,name){
		return $(`<div class="col-xs-3"><div class="form-group">
							<label for="" class="col-xs-4 control-label" style="text-align: left;">` + tip + `:</label>
							<div class="col-xs-8">` + name + `</div>
						</div></div>`)
	}
	toRow(){
		return $('<div class="row"></div>');
	}
	toFieldsRow(number,count,arr){
		let $row=this.toRow();
		for(let i=number;i<(number+count)&&i<arr.length;i++) {
			let fieldName = arr[i]["fieldName"];
			let fieldValue = arr[i]["fieldValue"];
			let $obj = this.toTip(fieldName,fieldValue);
			$row.append($obj);
		}
		return $row;
	}
	toFields(arr){
		let $allrow=this.toRow();
		for(let i=0;i<arr.length;i++) {
			if((i%4)==0){
				console.log(i)
				$allrow.append(this.toFieldsRow(i,4,arr));
			}
		}
		return $allrow;
	}
	
	toTable(theadArr,tbodyArr,totalJson){
		let $table = $('<table class="table table-bordered print-table"></table>');
		let $thead = $('<tr></tr>')
		let $tbody = $('<tbody></tbody>')
	
		for(let i=0;i<theadArr.length;i++) {
			let tableHeadName = theadArr[i];
			let $th = $('<th>' + tableHeadName + '</th>');
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
			let count = theadArr.length - 2
			let $total = $('<tr><td>合&nbsp;&nbsp;计</td><td colspan="' + count + '"></td><td>' + totalJson.total + '</td></tr>')
			$tbody.append($total);
		}
	
		$table.append($tbody);
		
		return $table;
	}
	
	toPrint(){
		let $printContent=this.toPrintContent();
		let $container=this.toContainer();
		$container.append(this.toTitle(this.title));
		$container.append(this.toTop(this.date,this.oddNumbers));
		$container.append(this.toFields(this.head));
		$container.append(this.toTable(this.theadArr,this.tbodyArr,this.totalJson));
		$container.append(this.toFields(this.footer));
		$printContent.append($container);
		
		return $printContent;
	}
	
}
