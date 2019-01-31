var singerMap;
var albumMap;

$().ready(function() {
    validateRule();

    var lyrics = $("#lyrics").val();
    $(".click2edit").html(lyrics);

    $('.click2edit').summernote({
        height : '500px',
        lang : 'zh-CN',
        callbacks: {
            onImageUpload: function(files, editor, $editable) {
                sendFile(files);
            }
        }
    });

    loadSinger();
});

var edit = function() {
    $('.click2edit').summernote({focus: true});
};

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
        },success : function(data) {
			//加载数据

			var singerId = $("#singerId").val();

			for (var i = 0; i < data.length; i++) {
			    if (singerId == data[i].id) {
			        html += '<option value="' + data[i].id + '" selected>' + data[i].name + '</option>'
			    } else {
				    html += '<option value="' + data[i].id + '">' + data[i].name + '</option>'
			    }
			}

			$("#singer").append(html);

			loadAlbum(singerId);

			$("#singer").editableSelect({
			    effects: 'fade'
			}).on('select.editable-select', function (e, li) {
			    singerId = li.val();
			    console.log(singerId);
			    if (singerId) {
			        loadAlbum(singerId);
			    }
            });

			//点击事件
			$("#singer").on('input propertychange', function() {
			    $("#albumId").val("");
			    $("#album").next().remove();
			    $("#album").remove();

			    var albumHtml = "<select id='album' data-placeholder='选择专辑' class='form-control chosen-select' tabindex='2' style='width: 100%'></select>";
			    $("#albumId").after(albumHtml);
            });

		}
	});
}

function loadAlbum(singerId) {

    var html = "";
	var data = {
	    "offset" : 0,
	    "limit" : 1000,
	    "singerId" : singerId
	};

    $.ajax({
        type: 'get',
        url : "/ent/music/album/list",
        data: data,
        dataType: 'json',
        cache:false,
        async:false,
        contentType:"application/json",
        error : function(request) {
            parent.layer.alert("Connection error");
        },success : function(result) {
            //加载数据
            var albumId = $("#albumId").val();

            var data = result.rows;
			for (var i = 0; i < data.length; i++) {
			    if (albumId == data[i].id) {
                    html += '<option value="' + data[i].id + '" selected>' + data[i].name + '</option>'
                } else {
                    html += '<option value="' + data[i].id + '">' + data[i].name + '</option>'
                }
			}
			$("#album").append(html);

			$("#album").editableSelect({
			    effects: 'fade'
			}).on('select.editable-select', function (e, li) {
			    var albumId = li.val();
			    if (albumId) {
			        $("#albumId").val(albumId);
			    }
            });

            //点击事件
            $("#album").on('input propertychange', function() {
                $("#albumId").val("");
            });
        }
    });

}

$.validator.setDefaults({
	submitHandler : function() {
		save();
	}
});

function save() {

    $("#lyrics").val($(".note-editable").html());

	$.ajax({
		cache : true,
		type : "POST",
		url : "/ent/music/song/update",
		data : $('#signupForm').serialize(),// 你的formid
		async : false,
		error : function(request) {
			parent.layer.alert("Connection error");
		},
		success : function(data) {
			if (data.code == 0) {
				parent.layer.msg("操作成功");
				parent.reLoad();
				var index = parent.layer.getFrameIndex(window.name); // 获取窗口索引
				parent.layer.close(index);

			} else {
				parent.layer.alert(data.msg)
			}

		}
	});

}

function validateRule() {

    var icon = "<i class='fa fa-times-circle'></i> ";
	$("#signupForm").validate({
	    ignore : [],
		rules : {
			name : {
				required : true
			},
			albumId : {
				required : true
			},
			trackNumber : {
				required : true,
				digits : true
			},
			language : {
			    required : true,
			},
			length : {
				required : true
			},
			size : {
				required : true,
				number : true
			},
			audioType : {
				required : true
			}
		},
		messages : {
			name : {
				required : icon + "请输入歌曲名"
			},
			albumId : {
				required : icon + "请选择所属专辑"
			},
			trackNumber : {
				required : icon + "请输入音轨号"
			},
			language : {
			    required : icon + "请选择歌曲语言"
			},
			length : {
				required : icon + "请输入歌曲时长"
			},
			size : {
            	required : icon + "请输入音频文件大小"
            },
            audioType : {
                required : icon + "请选择音频类型"
            }
		}
	})
}