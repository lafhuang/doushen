var request_prefix = "/ent/video/movie";

$(function() {

    var title = "<li>视频</li><li>电影</li>";
    var menu_head = "<i class='fa fa-lg fa-fw fa-film'></i>&nbsp;视频&nbsp;<span>>&nbsp;电影&nbsp;</span>";
    changeTitle(title, menu_head, 'ent/video/movie');

    load();

    $("article").on("click", "a", function() {
        var target = $(this).attr("target");
        if (target) {
            getTarget(target);
        }
    });
});

function load() {
    $('#exampleTable')
        .bootstrapTable(
            {
                method : 'get',
                url : request_prefix + "/list",
                iconSize : 'outline',
                striped : true,
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
                        name:$('#name').val()
                    };
                },
                columns : [
                    {
                        checkbox : true
                    },
                    {
                        field : 'name',
                        title : '片名',
                        formatter : function(value, row, index) {
                            return "<a target='/ent/video/movie/info/" + row.id + "'>" + value + "</a>"
                        }
                    },
                    {
                        field : 'cnName',
                        title : '译名',
                        formatter : function(value, row, index) {
                            if (value != null) {
                                return "<a target='/ent/video/movie/info/" + row.id + "'>" + value + "</a>"
                            } else {
                                return "";
                            }
                        }
                    },
                    {
                        field : 'sourceName',
                        title : '源文件名',
                        formatter : function(value, row, index) {
                            return "<a target='/ent/video/movie/info/" + row.id + "'>" + value + "</a>"
                        }
                    },
                    {
                        field : 'size',
                        title : '文件大小',
                        formatter : function(value, row, index) {
                            return value + " GB";
                        }
                    },
                    {
                        field : 'length',
                        title : '时长',
                        formatter : function(value, row, index) {
                            return value + " 分钟";
                        }
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
                            return e + d;
                        }
                    } ]
            });
}

function reLoad() {
    $('#exampleTable').bootstrapTable('refresh');
}

function add() {
    getTarget(request_prefix + '/add');
}
function remove(id) {
    layer.confirm('确定要删除选中的记录？', {
        btn : [ '确定', '取消' ]
    }, function() {
        $.ajax({
            url : request_prefix + "/remove",
            type : "post",
            data : {
                'id' : id
            },
            success : function(r) {
                if (r.code === 0) {
                    layer.msg("删除成功");
                    reLoad();
                } else {
                    layer.msg(r.msg);
                }
            }
        });
    })

}
function edit(id) {
    getTarget(request_prefix + '/edit/' + id);
}
function batchRemove() {
    var rows = $('#exampleTable').bootstrapTable('getSelections'); // 返回所有选择的行，当没有选择的记录时，返回一个空数组
    if (rows.length == 0) {
        layer.msg("请选择要删除的数据");
        return;
    }
    layer.confirm("确认要删除选中的'" + rows.length + "'条数据吗?", {
        btn : [ '确定', '取消' ]
    }, function() {
        var ids = new Array();
        $.each(rows, function(i, row) {
            ids[i] = row['id'];
        });
        console.log(ids);
        $.ajax({
            type : 'POST',
            data : {
                "ids" : ids
            },
            url : request_prefix + '/batchRemove',
            success : function(r) {
                if (r.code == 0) {
                    layer.msg(r.msg);
                    reLoad();
                } else {
                    layer.msg(r.msg);
                }
            }
        });
    }, function() {});
}

//# sourceURL=movie.js
