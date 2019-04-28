$().ready(function() {

    var title = "<li>视频</li><li>电影</li><li>添加</li>";
    var menu_head = "<i class='fa fa-lg fa-fw fa-film'></i>&nbsp;视频&nbsp;<span>>&nbsp;电影&nbsp;</span><span>>&nbsp;添加&nbsp;</span>";
    changeTitle(title, menu_head, 'ent/video/movie');

    initDatepicker();
    initFileUpload();
    initEditor();
    initDict();
    formValidate();

});

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

    $('#releaseDate').datepicker({
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
        uploadUrl : "/upload/video_movie",
        showPreview: false,
        allowedFileExtensions: ["jpg", "jpeg", "gif", "png"],
        elErrorContainer: "#errorBlock"
    }).on("fileuploaded", function(e, data) {//文件上传成功的回调函数，还有其他的一些回调函数，比如上传之前...
        var res = data.response;
        if (res.code == '0') {
            $("#poster").val(res.msg);
        }
    });
}

function initEditor() {
    var discribe = $("#discribe").val();
    $('.summernote').html(discribe);

    $('.summernote').summernote({
        height : 300,
        lang : 'zh-CN',
        toolbar: [
            ['font', ['bold', 'italic', 'underline', 'clear']],
            ['fontname', ['fontname']],
            ['color', ['color']],
            ['para', ['ul', 'ol', 'paragraph']],
            ['height', ['height']],
            ['view', ['codeview']]
        ]
    });
}

function initDict() {
    load_movie_dict("video_medium");
    load_movie_dict("video_encode");
    load_movie_dict("video_audioEncode");
    load_movie_dict("video_definition");
    load_movie_dict("video_region");
    load_movie_dict("movie_type");
    load_movie_dict("video_language");
}

function load_movie_dict(dict_type) {
    var html = "";
    $.ajax({
        type: 'get',
        url : "/system/dict/list/" + dict_type,
        dataType: 'json',
        cache:false,
        async:false,
        contentType:"application/json",
        error : function() {
            // TODO
        },success : function(result) {
            //加载数据

            if ("video_medium" == dict_type) {
                html += "<option value=''>--媒介--</option>";;
            } else if ("video_encode" == dict_type) {
                html += "<option value=''>--编码--</option>";;
            } else if ("video_audioEncode" == dict_type) {
                html += "<option value=''>--音频编码--</option>";;
            } else if ("video_definition" == dict_type) {
                html += "<option value=''>--分辨率--</option>";;
            } else if ("video_region" == dict_type) {
                html += "<option value=''>--地区--</option>";;
            } else if ("movie_type" == dict_type) {
                html += "<option value=''>--类别--</option>";;
            } else if ("video_language" == dict_type) {
                html += "<option value=''>--语言--</option>";;
            }

            for (var i = 0; i < result.length; i++) {
                html += '<option value="' + result[i].dictValue + '">' + result[i].dictName + '</option>'
            }
            $("#"+dict_type).html(html);
        }
    });
}


function save() {

    $("#discribe").val($(".note-editable").html());

    $.ajax({
        cache : true,
        type : "POST",
        url : "/ent/video/movie/save",
        data : $('#signupForm').serialize(),// 你的formid
        async : false,
        error : function(request) {
            // TODO
        },
        success : function(data) {
            // TODO
        }
    });
}

function formValidate() {
    $('#movieForm').validate({
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
            sourceName : {
                required : true
            },
            poster : {
                required : true
            },
            size : {
                required : true,
                number : true
            },
            medium : {
                required : true
            },
            encode : {
                required : true
            },
            audioEncode : {
                required : true
            },
            definition : {
                required : true
            },
            releaseDate : {
                required : true,
                digits : true
            },
            length : {
                required : true,
                digits : true
            }
        },
        messages : {
            name : {
                required : "&nbsp;&nbsp;请输入片名"
            },
            sourceName : {
                required : "&nbsp;&nbsp;请输入源文件名"
            },
            poster : {
                required : "&nbsp;&nbsp;请上传海报"
            },
            size : {
                required : "&nbsp;&nbsp;请输入文件大小"
            },
            medium : {
                required : "&nbsp;&nbsp;请选择媒介"
            },
            encode : {
                required : "&nbsp;&nbsp;请选择编码"
            },
            audioEncode : {
                required : "&nbsp;&nbsp;请选择音频编码"
            },
            definition : {
                required : "&nbsp;&nbsp;请选择分辨率"
            },
            releaseDate : {
                required : "&nbsp;&nbsp;请输入上映日期"
            },
            length : {
                required : "&nbsp;&nbsp;请输入时长"
            }
        },
        submitHandler: function () {
            var songId = $("#id").val();
            if (songId) {
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
    getTarget('ent/video/movie');
}
