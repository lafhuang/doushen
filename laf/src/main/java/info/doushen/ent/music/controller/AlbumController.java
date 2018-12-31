package info.doushen.ent.music.controller;

import info.doushen.common.Result;
import info.doushen.common.annotation.Log;
import info.doushen.common.controller.BaseController;
import info.doushen.common.utils.PageUtils;
import info.doushen.common.utils.Query;
import info.doushen.ent.music.biz.AlbumService;
import info.doushen.ent.music.entity.AlbumEntity;
import info.doushen.ent.music.entity.SingerEntity;
import info.doushen.system.biz.DictService;
import info.doushen.system.entity.DictEntity;
import info.doushen.system.entity.RoleEntity;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * AlbumController
 *
 * @author huangdou
 * @date 2018/12/29
 */
@Controller
@RequestMapping("/ent/music/album")
public class AlbumController extends BaseController {

    public static final String TEMPLATE_PREFIX = "ent/music/album/";

    @Autowired
    private AlbumService albumService;

    @Autowired
    private DictService dictService;

    @GetMapping()
    @RequiresPermissions("ent:music:album:album")
    String album() {
        return TEMPLATE_PREFIX + "album";
    }

    @ResponseBody
    @GetMapping("/list")
    @RequiresPermissions("ent:music:album:album")
    PageUtils list(@RequestParam Map<String, Object> params) {
        Query query = new Query(params);
        PageUtils albumPage = albumService.pageAlbumList(query);
        return albumPage;
    }

    @RequiresPermissions("ent:music:album:add")
    @Log("添加专辑")
    @GetMapping("/add")
    String add(Model model) {
        List<DictEntity> typeList = dictService.queryDictByType("album_type");
        model.addAttribute("typeList", typeList);

        List<DictEntity> styleList = dictService.queryDictByType("album_style");
        model.addAttribute("styleList", styleList);

        List<DictEntity> languageList = dictService.queryDictByType("album_language");
        model.addAttribute("languageList", languageList);

        return TEMPLATE_PREFIX + "add";
    }

    @RequiresPermissions("ent:music:album:add")
    @Log("保存专辑")
    @PostMapping("/save")
    @ResponseBody
    Result save(AlbumEntity album) {
        album.setCreateBy(getUserId());
        if (albumService.save(album) > 0) {
            return Result.ok();
        }
        return Result.error();
    }

}
