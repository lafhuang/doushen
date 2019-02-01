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
    loadDict();
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
			var singerId = $("#song_singer").val();
			for (var i = 0; i < data.length; i++) {
			    if (singerId == data[i].id) {
			        html += '<option value="' + data[i].id + '" selected>' + data[i].name + '</option>'
			    } else {
				    html += '<option value="' + data[i].id + '">' + data[i].name + '</option>'
			    }
			}

			$("#singerId").html(html);

			loadAlbum(singerId);

			$("#singerId").selectpicker().on('changed.bs.select', function (e, clickedIndex, isSelected, previousValue) {
			    singerId = $("#singerId").val();
			    loadAlbum(singerId);
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
            var data = result.rows;
            var albumId = $("#song_album").val();
			for (var i = 0; i < data.length; i++) {
			    if (albumId == data[i].id) {
                    html += '<option value="' + data[i].id + '" selected>' + data[i].name + '</option>'
                } else {
                    html += '<option value="' + data[i].id + '">' + data[i].name + '</option>'
                }
			}

			$("#albumId").html(html);
			$("#albumId").selectpicker('refresh');
        }
    });

}

$.validator.setDefaults({
	submitHandler : function() {
		update();
	}
});

function update() {

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

function loadDict() {
    load_song_dict("album_language");
    load_song_dict("audio_type");
}

function load_song_dict(dict_type) {
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
