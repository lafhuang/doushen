package info.doushen.ent.music.controller;

import info.doushen.common.Result;
import info.doushen.common.annotation.Log;
import info.doushen.common.controller.BaseController;
import info.doushen.common.utils.Pager;
import info.doushen.common.utils.Query;
import info.doushen.ent.music.biz.AlbumService;
import info.doushen.ent.music.biz.SingerService;
import info.doushen.ent.music.biz.SongService;
import info.doushen.ent.music.entity.AlbumEntity;
import info.doushen.ent.music.entity.SingerEntity;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
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
    private SingerService singerService;

    @Autowired
    private SongService songService;

    @GetMapping()
    @RequiresPermissions("ent:music:album:album")
    String album() {
        return TEMPLATE_PREFIX + "album";
    }

    @ResponseBody
    @GetMapping("/list")
    @RequiresPermissions("ent:music:album:album")
    Pager list(@RequestParam Map<String, Object> params) {
        Query query = new Query(params);
        Pager albumPage = albumService.pageAlbumList(query);
        return albumPage;
    }

    @RequiresPermissions("ent:music:album:add")
    @Log("添加专辑")
    @GetMapping("/add")
    String add() {
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

    @RequiresPermissions("ent:music:album:edit")
    @Log("编辑专辑")
    @GetMapping("/edit/{id}")
    String edit(Model model, @PathVariable("id") int id) {
        AlbumEntity album = albumService.get(id);
        model.addAttribute("album", album);

        return TEMPLATE_PREFIX + "edit";
    }

    @RequiresPermissions("ent:music:album:edit")
    @Log("更新专辑")
    @PostMapping("/update")
    @ResponseBody
    Result update(AlbumEntity album) {
        album.setUpdateBy(getUserId());
        if (albumService.update(album) > 0) {
            return Result.ok();
        }
        return Result.error();
    }

    @GetMapping("/info/{id}")
    @RequiresPermissions("ent:music:album:album")
    String info(@PathVariable("id") int albumId, Model model) {
        AlbumEntity album = albumService.get(albumId);
        model.addAttribute("album", album);

        SingerEntity singer = singerService.get(album.getSingerId());
        model.addAttribute("singer", singer);

        Map<String, Object> songParams = new HashMap<>();
        songParams.put("limit", 200);
        songParams.put("offset", 0);

        songParams.put("albumId", String.valueOf(albumId));

        Query songQuery = new Query(songParams);
        Pager songPage = songService.pageSongList(songQuery);

        model.addAttribute("songPage", songPage);

        return TEMPLATE_PREFIX + "info";
    }

    @RequiresPermissions("ent:music:album:remove")
    @Log("删除专辑")
    @PostMapping("/remove")
    @ResponseBody
    Result remove(int id) {
        if (albumService.remove(id) > 0) {
            return Result.ok();
        }
        return Result.error();
    }

}
