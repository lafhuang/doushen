function initDatepicker() {
	$.fn.datepicker.dates['cn'] = {
		days: ["周日", "周一", "周二", "周三", "周四", "周五", "周六", "周日"],
		daysShort: ["日", "一", "二", "三", "四", "五", "六", "七"],
		daysMin: ["日", "一", "二", "三", "四", "五", "六", "七"],
		months: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
		monthsShort: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
		today: "今天",
		clear: "清除"
	};

	$('#issueDate').datepicker({
		autoclose: true, //自动关闭
		beforeShowDay: $.noop,
		calendarWeeks: false,
		clearBtn: false,
		daysOfWeekDisabled: [],
		endDate: Infinity,
		forceParse: true,
		format: 'yyyy-mm-dd',
		keyboardNavigation: true,
		language: 'cn',
		minViewMode: 0,
		orientation: "auto",
		rtl: false,
		startDate: -Infinity,
		startView: 0,
		todayBtn: false,
		todayHighlight: false,
		weekStart: 0
	});
}

function initFileUpload() {
    $("#img").fileinput({
        language : 'zh',
        uploadUrl : "/upload/music_album",
        showPreview: false,
        allowedFileExtensions: ["jpg", "jpeg", "gif", "png"],
        elErrorContainer: "#errorBlock"
    }).on("fileuploaded", function(e, data) {
        var res = data.response;
        if (res.code == '0') {
            $("#cover").val(res.msg);
        }
    });
}

function initSinger() {
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
            // TODO
        },success : function(result) {
			//加载数据
			var singerId = $("#singer_id").val();
			html += '<option value="">--专辑歌手--</option>';
			for (var i = 0; i < result.length; i++) {
			    if (singerId == result[i].id) {
			        html += '<option value="' + result[i].id + '" selected>' + result[i].name + '</option>'
			    } else {
				    html += '<option value="' + result[i].id + '">' + result[i].name + '</option>'
			    }
			}
			$("#singerId").html(html);
		}
	});
}

function initDict() {
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
			// TODO
        },success : function(result) {

            var album_language = $("#album_language_").val();
            var album_type = $("#album_type_").val();
            var album_style = $("#album_style_").val();

			if ("album_language" == dict_type) {
				html += '<option value="">--专辑语言--</option>'
			} else if ("album_type" == dict_type) {
				html += '<option value="">--专辑类型--</option>'
			} else if ("album_style" == dict_type) {
				html += '<option value="">--专辑风格--</option>'
			}

            //加载数据
            for (var i = 0; i < result.length; i++) {
                if (result[i].dictValue == album_language || result[i].dictValue == album_type || result[i].dictValue == album_style) {
                    html += '<option value="' + result[i].dictValue + '" selected>' + result[i].dictName + '</option>'
                } else {
                    html += '<option value="' + result[i].dictValue + '">' + result[i].dictName + '</option>'
                }

            }
            $("#"+dict_type).html(html);
        }
    });
}

function formValidate() {
	$('#albumForm').validate({
		ignore: [],
		errorClass: 'invalid',
		errorElement: 'em',
		highlight: function (element) {
			$(element).parent().removeClass('state-success').addClass("state-error");
			$(element).removeClass('valid');
		},
		unhighlight: function (element) {
			$(element).parent().removeClass("state-error").addClass('state-success');
			$(element).addClass('valid');
		},
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
				required : "请输入专辑名"
			},
			singerId : {
				required : "请选择专辑所属歌手"
			},
			issueDate : {
				required : "请输入专辑发行日期"
			},
			language : {
				required : "请选择专辑语言"
			},
			type : {
				required : "请选择专辑类型"
			},
			style : {
				required : "请选择专辑风格"
			},
			cover : {
				required : "请上传专辑封面"
			}
		},
		submitHandler: function () {
			var albumId = $("#id").val();
			if (albumId) {
				update();
			} else {
				save();
			}
		},
		errorPlacement: function (error, element) {
			error.insertAfter(element.parent());
		}
	});
}

function goBack() {
    getTarget('/ent/music/album');
}

//# sourceURL=albumEdit.js
