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
                url : "/ent/video/movie/list",
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
                            return "<a target='/ent/video/movie/info/" + row.id + "' id='movie_"+row.id+"'>" + value + "</a>"
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
    getTarget('/ent/video/movie/add');
}

function remove(id) {
    var movieName = $("#movie_"+id).text();

    $("#modal_title").html("删除电影");
    $("#modal_body p").text("是否要删除电影["+movieName+"]?");
    $("#modal_btn1").attr("class", "btn btn-danger");
    $("#modal_btn1").text("删除");
    $("#modal_btn1").show();
    $("#modal_btn1").click(function() {
        $.ajax({
            url : "/ent/video/movie/remove",
            type : "post",
            data : {
                'id' : id
            },
            error : function(request) {
                var title = "<i class='fa fa-warning'></i>删除电影失败";
                var msg = "删除电影["+movieName+"]失败";
                var btn1Text = "关闭";
                var btn1Class = "btn btn-default";
                var btn1Url = "";
                var btn2Text = "关闭";
                var btn2Class = "btn btn-default";
                var btn2Url = "close";
                showDialog(title, msg, btn1Text, btn1Class, btn1Url, btn2Text, btn2Class, btn2Url);
            },
            success : function(data) {
                var title = "删除电影";
                var msg = "删除电影["+movieName+"]成功";
                var btn1Text = "关闭";
                var btn1Class = "btn btn-default";
                var btn1Url = "";
                var btn2Text = "关闭";
                var btn2Class = "btn btn-default";
                var btn2Url = '/ent/video/movie';
                showDialog(title, msg, btn1Text, btn1Class, btn1Url, btn2Text, btn2Class, btn2Url);
            }
        });
    });

    $("#modal_btn2").attr("class", "btn btn-primary");
    $("#modal_btn2").text("取消");
    $("#modal_btn2").click(function() {
        $("#doudou_modal").modal('hide');
        $('.modal-backdrop').remove();
    });

    $("#doudou_modal").modal();
}
function edit(id) {
    getTarget(requestefix + '/ent/video/movie/edit/' + id);
}

function batchRemove() {
    var rows = $('#exampleTable').bootstrapTable('getSelections'); // 返回所有选择的行，当没有选择的记录时，返回一个空数组
    if (rows.length == 0) {
        var title = "批量删除电影";
        var msg = "未选中电影";
        var btn1Text = "关闭";
        var btn1Class = "btn btn-default";
        var btn1Url = "";
        var btn2Text = "关闭";
        var btn2Class = "btn btn-default";
        var btn2Url = "close";
        showDialog(title, msg, btn1Text, btn1Class, btn1Url, btn2Text, btn2Class, btn2Url);
        return;
    }

    $("#modal_title").html("批量删除电影");
    $("#modal_body p").text("是否要删除选中的电影?");
    $("#modal_btn1").attr("class", "btn btn-danger");
    $("#modal_btn1").text("删除");
    $("#modal_btn1").show();

    $("#modal_btn1").click(function() {
        var ids = new Array();
        $.each(rows, function(i, row) {
            ids[i] = row['id'];
        });

        $.ajax({
            type : 'POST',
            data : {
                "ids" : ids
            },
            url : '/ent/video/movie/batchRemove',
            error : function(data) {
                var title = "<i class='fa fa-warning'></i>批量删除电影失败";
                var msg = "批量删除电影失败";
                var btn1Text = "关闭";
                var btn1Class = "btn btn-default";
                var btn1Url = "";
                var btn2Text = "关闭";
                var btn2Class = "btn btn-default";
                var btn2Url = "close";
                showDialog(title, msg, btn1Text, btn1Class, btn1Url, btn2Text, btn2Class, btn2Url);
            },
            success : function(data) {
                var title = "批量删除电影";
                var msg = "批量删除电影成功";
                var btn1Text = "关闭";
                var btn1Class = "btn btn-default";
                var btn1Url = "";
                var btn2Text = "关闭";
                var btn2Class = "btn btn-default";
                var btn2Url = '/ent/video/movie';
                showDialog(title, msg, btn1Text, btn1Class, btn1Url, btn2Text, btn2Class, btn2Url);
            }
        });
    });

    $("#modal_btn2").attr("class", "btn btn-primary");
    $("#modal_btn2").text("取消");
    $("#modal_btn2").click(function() {
        $("#doudou_modal").modal('hide');
        $('.modal-backdrop').remove();
    });

    $("#doudou_modal").modal();

}

//# sourceURL=movie.js
