var request_prefix = "/ent/music/singer";

$(function() {
    load();

    $(".singer_tag__item").click(function(){
        $(this).siblings().removeClass("singer_tag__item--select");
        $(this).addClass("singer_tag__item--select");

        load();
    });

});

function load() {

    var initial = $("#initial_div").find("a.singer_tag__item--select").attr("data-id");
    if (initial == "-100") {
        initial = '';
    }
    var region = $("#region_div").find("a.singer_tag__item--select").attr("data-id");
    if (region == "-100") {
        region = '';
    }
    var type = $("#type_div").find("a.singer_tag__item--select").attr("data-id");
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
        error : function(request) {
            parent.layer.alert("Connection error");
        },success : function(result) {
            if (result) {
                var singerHtml = "<ul class='singer_list__list js_avtar_list'>";
                for (var idx = 0; idx < result.length; idx++) {
                    var singer = result[idx];
                    singerHtml += "    <li class='singer_list__item'>";
                    singerHtml += "        <div class='singer_list__item_box'>";
                    singerHtml += "            <a href='/ent/music/singer/info/" + singer.id + "' class='singer_list__cover js_singer' title='" + singer.name + "'>";
                    singerHtml += "                <img class='singer_list__pic' alt='" + singer.name + "' src='" + singer.photo + "'>";
                    singerHtml += "            </a>";
                    singerHtml += "            <h3 class='singer_list__title'>";
                    singerHtml += "                <a href='/ent/music/singer/info/" + singer.id + "' class='js_singer' title='" + singer.name + "'>" + singer.name + "</a>";
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

function reLoad() {
    load();
}

function add() {
	// iframe层
	layer.open({
		type : 2,
		title : '添加歌手',
		maxmin : true,
		shadeClose : false, // 点击遮罩关闭层
		area : [ '60%', '60%' ],
		content : request_prefix + '/add'
	});
}
