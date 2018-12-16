/*
 *生成单据
 * 版本：2.2
 * */
class DetailBill {
	/*构造器*/
	constructor(json,type) {
		this.type=type||1;
		
		this.jsondata = json;

		this.title = this.jsondata.title;
		this.date = this.jsondata.date;
		this.oddNumbers = this.jsondata.oddNumbers;

		this.head = this.jsondata.head;
		this.footer = this.jsondata.footer;
		
		switch(this.type) {
			case 1: //一个table
				this.table = this.jsondata.table;
				this.tableTheadArr = this.jsondata.table.thead;
				this.tableTbodyArr = this.jsondata.table.tbody;
				this.tableTotalJson = this.jsondata.table.total||{haveTotal:false};
				break;
			case 2: //两个table
				this.table1 = this.jsondata.table1;
				this.table2 = this.jsondata.table2;
				this.table1TheadArr = this.jsondata.table1.thead;
				this.table1TbodyArr = this.jsondata.table1.tbody;
				this.table1TotalJson = this.jsondata.table1.total||{haveTotal:false};
				this.table2TheadArr = this.jsondata.table2.thead;
				this.table2TbodyArr = this.jsondata.table2.tbody;
				this.table2TotalJson = this.jsondata.table2.total||{haveTotal:false};
				break;
			case 3://两个table 有标题
				this.table1 = this.jsondata.table1;
				this.table2 = this.jsondata.table2;
				this.table1Title = this.jsondata.table1.title;
				this.table1TheadArr = this.jsondata.table1.thead;
				this.table1TbodyArr = this.jsondata.table1.tbody;
				this.table1TotalJson = this.jsondata.table1.total||{haveTotal:false};
				this.table2Title = this.jsondata.table2.title;
				this.table2TheadArr = this.jsondata.table2.thead;
				this.table2TbodyArr = this.jsondata.table2.tbody;
				this.table2TotalJson = this.jsondata.table2.total||{haveTotal:false};
				break;
		}
		
	}
	toPrintContent() {
		return $('<div class="print-content"></div>');
	}

	toTitle(title) {
		return $('<h3 class="print-title">' + title + '</h3>');
	}
	toTop(date, oddNumbers) {
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
	toTip(tip, name) {
		return $(`<div class="col-xs-3"><div class="form-group">
							<label for="" class="col-xs-4 control-label" style="text-align: left;">` + tip + `:</label>
							<div class="col-xs-8">` + name + `</div>
						</div></div>`)
	}
	toRow() {
		return $('<div class="row"></div>');
	}
	toFieldsRow(number, count, arr) {
		let $row = this.toRow();
		for(let i = number; i < (number + count) && i < arr.length; i++) {
			let fieldName = arr[i]["fieldName"];
			let fieldValue = arr[i]["fieldValue"];
			let $obj = this.toTip(fieldName, fieldValue);
			$row.append($obj);
		}
		return $row;
	}
	toFields(arr) {
		let $allrow = this.toRow();
		for(let i = 0; i < arr.length; i++) {
			if((i % 4) == 0) {
				$allrow.append(this.toFieldsRow(i, 4, arr));
			}
		}
		return $allrow;
	}

	toTable(theadArr, tbodyArr, totalJson) {
		let $tableDiv = $('<div class="print-table-div"></div>');
		let $table = $('<table class="table table-bordered table-striped table-hover" border="" cellspacing="0" cellpadding="0"></table>');
		let $thead = $('<tr></tr>');
		let $tbody = $('<tbody></tbody>');

		for(let i = 0; i < theadArr.length; i++) {
			let tableHeadName = theadArr[i];
			let $th = $('<th nowrap="nowrap">' + tableHeadName + '</th>');
			$thead.append($th);
		}

		$tbody.append($thead);

		for(let i = 0; i < tbodyArr.length; i++) {
			let $tr = $('<tr></tr>');
			for(let j = 0; j < tbodyArr[i].length; j++) {
				let tableBodyName = tbodyArr[i][j];
				let $td = $('<td>' + tableBodyName + '</td>');
				$tr.append($td);
			}
			$tbody.append($tr);
		}
		//合计
		if(totalJson.haveTotal == "true") {
			let $tr = $('<tr></tr>');
			$tr.append($('<td>合计</td>'));
			for(let i = 0; i < theadArr.length - 1; i++) {
				let $td = $('<td></td>');
				let arr = totalJson.total;
				for(let j = 0; j < arr.length; j++) {
					if((i + 1) == arr[j]["col"]) $td.html(arr[j]["colTotal"]);
				}
				$tr.append($td);
			}
			$tbody.append($tr);
		}

		$table.append($tbody);
		$tableDiv.append($table);
		return $tableDiv;
	}

	toPrint() {
		let $printContent = this.toPrintContent();
		$printContent.append(this.toTitle(this.title));
		$printContent.append(this.toTop(this.date, this.oddNumbers));
		$printContent.append(this.toFields(this.head));
		switch(this.type) {
			case 1: //一个table
				$printContent.append(this.toTable(this.tableTheadArr, this.tableTbodyArr, this.tableTotalJson));
				break;
			case 2: //两个table
				$printContent.append(this.toTable(this.table1TheadArr, this.table1TbodyArr, this.table1TotalJson));
				$printContent.append(this.toTable(this.table2TheadArr, this.table2TbodyArr, this.table2TotalJson));
				break;
			case 3: //两个table 有标题
				$printContent.append(this.toRow().append(this.table1Title));
				$printContent.append(this.toTable(this.table1TheadArr, this.table1TbodyArr, this.table1TotalJson));
				$printContent.append(this.toRow().append(this.table2Title));
				$printContent.append(this.toTable(this.table2TheadArr, this.table2TbodyArr, this.table2TotalJson));
				break;
		}
		$printContent.append(this.toFields(this.footer));
		return $printContent;
	}

}