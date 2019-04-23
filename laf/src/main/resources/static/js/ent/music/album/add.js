$().ready(function() {

	initDatepicker();
    initFileUpload();
    loadSinger();
    loadDict();
	formValidate();

});

function initDatepicker() {
	$.fn.datepicker.dates['cn'] = {   //切换为中文显示
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
		beforeShowDay: $.noop,    //在显示日期之前调用的函数
		calendarWeeks: false,     //是否显示今年是第几周
		clearBtn: false,          //显示清除按钮
		daysOfWeekDisabled: [],   //星期几不可选
		endDate: Infinity,        //日历结束日期
		forceParse: true,         //是否强制转换不符合格式的字符串
		format: 'yyyy-mm-dd',     //日期格式
		keyboardNavigation: true, //是否显示箭头导航
		language: 'cn',           //语言
		minViewMode: 0,
		orientation: "auto",      //方向
		rtl: false,
		startDate: -Infinity,     //日历开始日期
		startView: 0,             //开始显示
		todayBtn: false,          //今天按钮
		todayHighlight: false,    //今天高亮
		weekStart: 0              //星期几是开始
	});
}

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
        }
    });
}

function save() {
	$.ajax({
		cache : true,
		type : "POST",
		url : "/ent/music/album/save",
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
				html += '<option value="' + result[i].id + '">' + result[i].name + '</option>'
			}
			$("#singerId").html(html);
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
            for (var i = 0; i < result.length; i++) {
                html += '<option value="' + result[i].dictValue + '">' + result[i].dictName + '</option>'
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

//# sourceURL=add.js
