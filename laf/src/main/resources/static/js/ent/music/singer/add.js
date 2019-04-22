$().ready(function() {

    initFileInput();
    initDatepicker();
    initStar();
    initDict();
    formValidate();

});

function initFileInput() {
    $("#img").fileinput({
        language: 'zh',
        uploadUrl: "/upload/music_singer",
        showPreview: false,
        allowedFileExtensions: ["jpg", "jpeg", "gif", "png"],
        elErrorContainer: "#errorBlock"
    }).on("fileuploaded", function (e, data) {//文件上传成功的回调函数，还有其他的一些回调函数，比如上传之前...
        var res = data.response;
        if (res.code == '0') {
            $("#photo").val(res.msg);
        }
    });
}

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

    $('#birthday').datepicker({
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

function initStar() {
    $('#star').rating({
        language: 'zh',
        min: 0,
        max: 6,
        step: 1,
        stars: 6,
        starCaptions: {1: '无所谓', 2: '随便听听', 3: '还不错', 4: '喜欢', 5: '超爱', 6 : '偶像'}
    });
}

function initDict() {
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
            if ("singer_initial" == dict_type) {
                html += '<option selected="" disabled="">歌手首字母</option>'
            } else if ("singer_region" == dict_type) {
                html += '<option selected="" disabled="">歌手所在地区</option>'
            } else if ("singer_type" == dict_type) {
                html += '<option selected="" disabled="">歌手类型</option>'
            }
            for (var i = 0; i < result.length; i++) {
                html += '<option value="' + result[i].dictValue + '">' + result[i].dictName + '</option>'
            }
            $("#"+dict_type).html(html);
        }
    });
}

function formValidate() {
    $('#singerForm').validate({
        ignore: [],
        errorClass: 'invalid',
        errorElement: 'em',
        highlight: function (element) {
            console.log($(element).attr("name"));
            if ("star" == $(element).attr("name")) {
                $(element).parent().parent().parent().removeClass('state-success').addClass("state-error");
                $(element).removeClass('valid');
            } else {
                $(element).parent().removeClass('state-success').addClass("state-error");
                $(element).removeClass('valid');
            }
        },
        unhighlight: function (element) {
            if ("star" == $(element).attr("name")) {
                $(element).parent().parent().parent().removeClass("state-error").addClass('state-success');
                $(element).addClass('valid');
            } else {
                $(element).parent().removeClass("state-error").addClass('state-success');
                $(element).addClass('valid');
            }
        },
        rules: {
            name: {
                required: true
            },
            enName: {
                required: true
            },
            region: {
                required: true
            },
            initial: {
                required: true
            },
            birthday: {
                required: true
            },
            type: {
                required: true
            },
            star: {
                required: true
            },
            photo: {
                required: true
            }
        },
        messages: {
            name: {
                required: '请输入歌手姓名'
            },
            enName: {
                required: '请输入歌手英文名'
            },
            region: {
                required: '请选择歌手所在地区'
            },
            initial: {
                required: '请选择歌手首字母'
            },
            birthday: {
                required: '请选择歌手出生日期'
            },
            type: {
                required: '请选择歌手类型'
            },
            star: {
                required: '请选择歌手星级'
            },
            photo: {
                required: '请上传歌手图片'
            }
        },
        submitHandler: function () {
            save();
        },
        errorPlacement: function (error, element) {
            if ("star" == element.attr("name")) {
                error.insertAfter(element.parent().parent().parent());
            } else {
                error.insertAfter(element.parent());
            }
        }
    });
}

function save() {
    $.ajax({
        cache : true,
        type : "POST",
        url : "/ent/music/singer/save",
        data : $('#singerForm').serialize(),
        async : false,
        error : function(request) {
            $("#doudou_modal_title").text("添加歌手失败");
            $("#doudou_modal_body p").text("添加歌手失败");
            activateModal();
        },
        success : function(data) {
            $("#doudou_modal_title").text("添加歌手");
            $("#doudou_modal_body p").text(data.msg);
            activateModal();
        }
    });
}

function goBack(target) {
    getTarget(target);
}

function activateModal() {
    var btn = "<button type='button' class='btn btn-default' id='backBtn'>返回</button>" +
        "<button type='button' class='btn btn-primary' id='addBtn'>继续添加</button>";

    $("#doudou_modal_footer").html(btn);

    $("#doudou_modal").modal();

    $("#backBtn").click(function () {
        $("#closeBtn").click();
        getTarget("/ent/music/singer");
    });

    $("#addBtn").click(function () {
        $("#closeBtn").click();
        getTarget("/ent/music/singer/add");
    });
}

//# sourceURL=add.js
