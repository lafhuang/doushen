$().ready(function() {

	laydate.render({
		elem: '#birthday'
		,theme: 'molv'
	});

    $('#star').rating({
        language: 'zh',
        min: 0,
        max: 5,
        step: 1,
        stars: 5,
        starCaptions: {1: '就那样', 2: '可以听听', 3: '还不错', 4: '喜欢', 5: '超爱'}
    });

    loadDict();

    initFileUpload();

	validateRule();

    $(".fileinput-remove-button").click(function() {
        $("#photo").val("");
    })
});

function initFileUpload() {
    $("#img").fileinput({
        language : 'zh',
        uploadUrl : "/upload/music_singer",
        showPreview: false,
        allowedFileExtensions: ["jpg", "jpeg", "gif", "png"],
        elErrorContainer: "#errorBlock"
    }).on("fileuploaded", function(e, data) {//文件上传成功的回调函数，还有其他的一些回调函数，比如上传之前...
        var res = data.response;
        if (res.code == '0') {
            $("#photo").val(res.msg);
        }
    });
}

$.validator.setDefaults({
	submitHandler : function() {
		save();
	}
});

function save() {
	$.ajax({
		cache : true,
		type : "POST",
		url : "/ent/music/singer/save",
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
		rules : {
			name : {
				required : true
			},
			enName : {
				required : true
			},
			region : {
				required : true
			},
			initial : {
				required : true
			},
			birthday : {
				required : true
			},
			type : {
				required : true
			},
			photo : {
			    required : true
			}
		},
		messages : {
			name : {
				required : icon + "请输入歌手姓名"
			},
			enName : {
				required : icon + "请输入歌手英文名"
			},
			region : {
				required : icon + "请选择歌手所在国家/地区"
			},
			initial : {
				required : icon + "请选择歌手首字母"
			},
			birthday : {
            	required : icon + "请选择歌手出生日期"
            },
            type : {
                required : icon + "请选择歌手类型"
            },
            photo : {
                required : icon + "请上传歌手照片"
            }
		}
	})
}

function loadDict() {
    load_singer_dict("singer_initial");
    load_singer_dict("singer_region");
    load_singer_dict("singer_type");
}

function load_singer_dict(dict_type) {
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
            for (var i = 0; i < result.length; i++) {
                html += '<option value="' + result[i].dictValue + '">' + result[i].dictName + '</option>'
            }

            $("#"+dict_type).html(html);
            $("#"+dict_type).selectpicker();
        }
    });
}
