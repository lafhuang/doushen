var request_prefix = "/ent/music/singer";

$().ready(function() {

    var title = "<li>音乐</li><li>歌手</li>";
    var menu_head = "<i class='fa fa-lg fa-fw fa-music'></i>&nbsp;音乐&nbsp;<span>>&nbsp;歌手&nbsp;</span>";
    changeTitle(title, menu_head, 'ent/music/singer');

    loadDict();
    load();

    $(".singer_tag__item").click(function(){
        $(this).siblings().removeClass("singer_tag__item--select");
        $(this).addClass("singer_tag__item--select");

        load();
    });

    $("article").on("click", ".singer_list__item_box a", function() {
        var target = $(this).attr("target");
        getTarget(target);
    });

});

function load() {

    var initial = $("#singer_initial_div").find("a.singer_tag__item--select").attr("data-id");
    if (initial == "-100") {
        initial = '';
    }
    var region = $("#singer_region_div").find("a.singer_tag__item--select").attr("data-id");
    if (region == "-100") {
        region = '';
    }
    var type = $("#singer_type_div").find("a.singer_tag__item--select").attr("data-id");
    if (type == "-100") {
        type = '';
    }

    var data = {
        "initial": initial,
        "region": region,
        "type" : type
    };

    $.ajax({
        type: 'post',
        url : request_prefix + "/list",
        data: JSON.stringify(data),
        dataType: 'json',
        cache:false,
        async:false,
        contentType:"application/json",
        success : function(result) {
            if (result) {
                var singerHtml = "<ul class='singer_list__list js_avtar_list'>";
                for (var idx = 0; idx < result.length; idx++) {
                    var singer = result[idx];
                    singerHtml += "    <li class='singer_list__item'>";
                    singerHtml += "        <div class='singer_list__item_box'>";
                    singerHtml += "            <a target='/ent/music/singer/info/" + singer.id + "' class='singer_list__cover js_singer' title='" + singer.name + "'>";
                    singerHtml += "                <img class='singer_list__pic' alt='" + singer.name + "' src='" + singer.photo + "'>";
                    singerHtml += "            </a>";
                    singerHtml += "            <h3 class='singer_list__title'>";
                    singerHtml += "                <a target='/ent/music/singer/info/" + singer.id + "' class='js_singer' title='" + singer.name + "'>" + singer.name + "</a>";
                    singerHtml += "            </h3>";
                    singerHtml += "        </div>";
                    singerHtml += "    </li>";
                }
                singerHtml += "</ul>";

                $(".mod_singer_list").html(singerHtml);
            }
        }
    });

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
        success : function(result) {
            //加载数据
            html += '<a href="javascript:;" class="singer_tag__item singer_tag__item--all singer_tag__item--select" data-key="' + dict_type + '" data-id="-100" hidefocus="">全部</a>';
            for (var i = 0; i < result.length; i++) {
                html += '<a href=\"javascript:;\" class=\"singer_tag__item\" data-key=\"' + dict_type + '\" data-id=\"' + result[i].dictValue + '\" hidefocus=\"\">' + result[i].dictName + '</a>';
            }

            $("#"+dict_type+"_div").html(html);
        }
    });
}

function add() {
	getTarget(request_prefix + '/add');
}

//# sourceURL=singer.js
