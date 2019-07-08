$(function() {
    var title = "<li>系统管理</li><li>数据字典</li>";
    var menu_head = "<i class='fa fa-lg fa-fw fa-desktop'></i>&nbsp;系统管理&nbsp;<span>>&nbsp;数据字典&nbsp;</span>";
    changeTitle(title, menu_head, 'system/dict');

	initDictType();
	load();
	initSelect();
});

function initDictType() {
	$.ajax({
		url : '/system/dict/type',
		success : function(data) {
		    var html = "<option value=''>--类型--</option>";
			for (var i = 0; i < data.length; i++) {
				html += '<option value="' + data[i].dictType + '">' + data[i].description + '</option>';
			}
			$("#dict_type").html(html);
			$("#select2-dict_type-container").text("--类型--");
		}
	});
}

function load() {
	$('#exampleTable')
		.bootstrapTable(
			{
				method : 'get',
				url : "/system/dict/list",
				iconSize : 'outline',
				striped : true,
				contentType : "application/x-www-form-urlencoded",
				dataType : "json",
				pagination : true,
				singleSelect : false,
				pageSize : 10,
				pageNumber : 1,
				showColumns : false,
				sidePagination : "server",
				queryParams : function(params) {
					return {
						limit : params.limit,
						offset : params.offset,
                        dictType : $("#dict_type").val()
					};
				},
				columns : [
					{
						checkbox : true
					},
					{
						field : 'dictName',
						title : '数据字典名',
                        formatter : function(value, row, index) {
                            return "<a id='dictName_" + row.id + "'>" + value + "</a>"
                        }
					},
					{
						field : 'dictValue',
						title : '数据字典值',
                        formatter : function(value, row, index) {
                            return "<a id='dictValue_" + row.id + "'>" + value + "</a>"
                        }
					},
					{
						field : 'dictType',
						title : '数据字典类型'
					},
					{
						field : 'description',
						title : '数据字典描述'
					},
					{
						field : 'sort',
						title : '排序'
					},
					{
						title : '操作',
						field : 'id',
						align : 'center',
						formatter : function(value, row, index) {
							var e = '<a class="btn btn-primary btn-sm ' + s_edit_h + '" href="#" mce_href="#" title="编辑" onclick="edit(\''
								+ row.id
								+ '\')"><i class="fa fa-edit"></i></a> ';
							var d = '<a class="btn btn-warning btn-sm ' + s_remove_h + '" href="#" title="删除"  mce_href="#" onclick="remove(\''
								+ row.id
								+ '\')"><i class="fa fa-remove"></i></a> ';
							var f = '<a class="btn btn-success btn-sm ' + s_add_h + '" href="#" title="增加"  mce_href="#" onclick="addD(\''
								+ row.dictType
								+ '\')"><i class="fa fa-plus"></i></a> ';
							return e + d +f;
						}
					} ]
			});
}

function reset() {
    $("#dict_type").val("");
    $("#select2-dict_type-container").text("--类型--");
    $('#exampleTable').bootstrapTable('refresh');
}

function reLoad() {
	$('#exampleTable').bootstrapTable('refresh');
}

function add() {
	getTarget('/system/dict/add');
}

function edit(id) {
	getTarget('/system/dict/edit/' + id);
}

function remove(id) {
    var dictName = $("#dictName_"+id).text();
    var dictValue = $("#dictValue_"+id).text();

    $("#dict_title").html("删除数据字典");
    $("#dict_body p").text("是否要删除数据字典:"+dictName+"["+dictValue+"]?");
    $("#dict_btn1").attr("class", "btn btn-danger");
    $("#dict_btn1").text("删除");
    $("#dict_btn1").show();
    $("#dict_btn1").click(function() {
        $.ajax({
            url : "/system/dict/remove",
            type : "post",
            data : {
                'id' : id
            },
            error : function(request) {
                $("#dict_title").html("<i class='fa fa-warning'></i>删除数据字典失败");
                $("#dict_body p").text("删除数据字典:"+dictName+"["+dictValue+"]失败");
                $("#dict_btn1").hide();
                $("#dict_btn2").attr("class", "btn btn-default");
                $("#dict_btn2").text("关闭");
                $("#dict_btn2").click(function() {
                    $("#dict_modal").modal('hide');
                    $('.modal-backdrop').remove();
                });
                $("#dict_modal").modal();
            },
            success : function(data) {
                $("#dict_title").html("删除数据字典");
                $("#dict_body p").text("删除数据字典:"+dictName+"["+dictValue+"]成功");
                $("#dict_btn1").hide();
                $("#dict_btn2").attr("class", "btn btn-default");
                $("#dict_btn2").text("关闭");
                $("#dict_btn2").click(function() {
                    $("#dict_modal").modal('hide');
                    $('.modal-backdrop').remove();
                    getTarget("/system/dict");
                });
                $("#dict_modal").modal();
            }
        });
    });

    $("#dict_btn2").attr("class", "btn btn-primary");
    $("#dict_btn2").text("取消");
    $("#dict_btn2").click(function() {
        $("#dict_modal").modal('hide');
        $('.modal-backdrop').remove();
    });

    $("#dict_modal").modal();
}

function addD(type) {
	getTarget('/system/dict/add/'+type);
}

function batchRemove() {
	var rows = $('#exampleTable').bootstrapTable('getSelections');
	if (rows.length == 0) {
        $("#dict_title").html("批量删除数据字典");
        $("#dict_body p").text("未选中数据字典");
        $("#dict_btn1").hide();
        $("#dict_btn2").attr("class", "btn btn-default");
        $("#dict_btn2").text("关闭");
        $("#dict_btn2").click(function() {
            $("#dict_modal").modal('hide');
            $('.modal-backdrop').remove();
        });
        $("#dict_modal").modal();
        return;
	}

	$("#dict_title").html("批量删除数据字典");
    $("#dict_body p").text("是否要删除选中的数据字典?");
    $("#dict_btn1").attr("class", "btn btn-danger");
    $("#dict_btn1").text("删除");
    $("#dict_btn1").show();

    $("#dict_btn1").click(function() {
        var ids = new Array();
        $.each(rows, function(i, row) {
            ids[i] = row['id'];
        });

        $.ajax({
            type : 'POST',
            data : {
                "ids" : ids
            },
            url : '/system/dict/batchRemove',
            error : function(data) {
                $("#dict_title").html("<i class='fa fa-warning'></i>批量删除数据字典失败");
                $("#dict_body p").text("批量删除数据字典失败");
                $("#dict_btn1").hide();
                $("#dict_btn2").attr("class", "btn btn-default");
                $("#dict_btn2").text("关闭");
                $("#dict_btn2").click(function() {
                    $("#dict_modal").modal('hide');
                    $('.modal-backdrop').remove();
                });
                $("#dict_modal").modal();
            },
            success : function(data) {
                $("#dict_title").html("批量删除数据字典");
                $("#dict_body p").text("批量删除数据字典成功");
                $("#dict_btn1").hide();
                $("#dict_btn2").attr("class", "btn btn-default");
                $("#dict_btn2").text("关闭");
                $("#dict_btn2").click(function() {
                    $("#dict_modal").modal('hide');
                    $('.modal-backdrop').remove();
                    getTarget("/system/dict");
                });
                $("#dict_modal").modal();
            }
        });
    });

    $("#dict_btn2").attr("class", "btn btn-primary");
    $("#dict_btn2").text("取消");
    $("#dict_btn2").click(function() {
        $("#dict_modal").modal('hide');
        $('.modal-backdrop').remove();
    });

    $("#dict_modal").modal();
}

//# sourceURL=dict.js
