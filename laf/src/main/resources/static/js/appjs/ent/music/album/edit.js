var album_cover = $("#album_cover").attr("src");
var singerId = $("#singer").val();

var album_language = $("#album_language").val();
var album_type = $("#album_type").val();
var album_style = $("#album_style").val();

$().ready(function() {

    initFileUpload();

    validateRule();

    $(".fileinput-remove-button").click(function() {
        $("#cover").val(album_cover);
        $("#album_cover").attr("src", album_cover);
    });

    loadSinger();
    loadDict();

});

function initFileUpload() {
    $("#img").fileinput({
        language : 'zh',
        uploadUrl : "/upload/music_album",
        showPreview: false,
        allowedFileExtensions: ["jpg", "jpeg", "gif", "png"],
        elErrorContainer: "#errorBlock"
    }).on("fileuploaded", function(e, data) {//文件上传成功的回调函数，还有其他的一些回调函数，比如上传之前...
        var res = data.response;
        if (res.code == '0') {
            $("#cover").val(res.msg);
            $("#album_cover").attr("src", res.msg);
        }
    });
}

$.validator.setDefaults({
	submitHandler : function() {
		update();
	}
});

function update() {
	$.ajax({
		cache : true,
		type : "POST",
		url : "/ent/music/album/update",
		data : $('#signupForm').serialize(),// 你的formid
		async : false,
		error : function(request) {
			alert("Connection error");
		},
		success : function(data) {
			if (data.code == 0) {
				parent.layer.msg(data.msg);
				parent.reLoad();
				var index = parent.layer.getFrameIndex(window.name); // 获取窗口索引
				parent.layer.close(index);
			} else {
				parent.layer.msg(data.msg);
			}

		}
	});
}

function validateRule() {

    var icon = "<i class='fa fa-times-circle'></i> ";
	$("#signupForm").validate({
		rules : {
			name : {
				required : true
			},
			singerId : {
				required : true
			},
			issueDate : {
				required : true
			},
			language : {
				required : true
			},
			type : {
				required : true
			},
			style : {
				required : true
			},
            cover : {
                required : true
            }
		},
		messages : {
			name : {
				required : icon + "请输入专辑名"
			},
			singerId : {
				required : icon + "请选择专辑所属歌手"
			},
			issueDate : {
				required : icon + "请输入专辑发行日期"
			},
			language : {
				required : icon + "请选择专辑语言"
			},
			type : {
            	required : icon + "请选择专辑类型"
            },
            style : {
                required : icon + "请选择专辑风格"
            },
            cover : {
                required : icon + "请上传专辑封面"
            }
		}
	})
}

function loadSinger() {
	var html = "";

    var data = {};

    $.ajax({
        type: 'post',
        url : "/ent/music/singer/list",
        data: JSON.stringify(data),
        dataType: 'json',
        cache:false,
        async:false,
        contentType:"application/json",
        error : function(request) {
            parent.layer.alert("Connection error");
        },success : function(result) {

			//加载数据
			for (var i = 0; i < result.length; i++) {
			    if (singerId == result[i].id) {
			        html += '<option value="' + result[i].id + '" selected>' + result[i].name + '</option>'
			    } else {
			        html += '<option value="' + result[i].id + '">' + result[i].name + '</option>'
			    }
			}
			$("#singerId").html(html);
			$("#singerId").selectpicker();
		}
	});
}

function loadDict() {
    load_album_dict("album_language");
    load_album_dict("album_type");
    load_album_dict("album_style");
}

function load_album_dict(dict_type) {
    var html = "";
    $.ajax({
        type: 'get',
        url : "/system/dict/list/" + dict_type,
        dataType: 'json',
        cache:false,
        async:false,
        contentType:"application/json",
        error : function(request) {
            parent.layer.alert("Connection error");
        },success : function(result) {
            //加载数据
            var dictValue = $("#"+dict_type+"_").val();
            for (var i = 0; i < result.length; i++) {
                if (dictValue == result[i].dictValue) {
                    html += '<option value="' + result[i].dictValue + '" selected>' + result[i].dictName + '</option>';
                } else {
                   html += '<option value="' + result[i].dictValue + '">' + result[i].dictName + '</option>'
                }
            }

            $("#"+dict_type).html(html);
            $("#"+dict_type).selectpicker();
        }
    });
}
