package info.doushen.ent.music.controller;

import info.doushen.common.Result;
import info.doushen.common.annotation.Log;
import info.doushen.common.controller.BaseController;
import info.doushen.common.utils.Pager;
import info.doushen.common.utils.Query;
import info.doushen.ent.music.biz.AlbumService;
import info.doushen.ent.music.biz.SongService;
import info.doushen.ent.music.entity.AlbumEntity;
import info.doushen.ent.music.entity.SongEntity;
import info.doushen.ent.music.vo.SongVO;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

/**
 * SongController
 *
 * @author huangdou
 * @date 2019/1/1
 */
@Controller
@RequestMapping("/ent/music/song")
public class SongController extends BaseController {

    public static final String TEMPLATE_PREFIX = "ent/music/song/";

    @Autowired
    private SongService songService;

    @Autowired
    private AlbumService albumService;

    @GetMapping()
    @RequiresPermissions("ent:music:song:song")
    String song() {
        return TEMPLATE_PREFIX + "song";
    }

    @ResponseBody
    @GetMapping("/list")
    @RequiresPermissions("ent:music:song:song")
    Pager list(@RequestParam Map<String, Object> params) {
        Query query = new Query(params);
        Pager pageSong = songService.pageSongList(query);
        return pageSong;
    }

    @RequiresPermissions("ent:music:song:add")
    @Log("添加歌曲")
    @GetMapping("/add")
    String add() {
        return TEMPLATE_PREFIX + "add";
    }

    @RequiresPermissions("ent:music:song:add")
    @Log("保存歌曲")
    @PostMapping("/save")
    @ResponseBody
    Result save(SongEntity song) {
        song.setCreateBy(getUserId());
        if (songService.save(song) > 0) {
            return Result.ok();
        }
        return Result.error();
    }

    @RequiresPermissions("ent:music:song:edit")
    @Log("编辑歌曲")
    @GetMapping("/edit/{id}")
    String edit(Model model, @PathVariable("id") int id) {
        SongVO song = songService.get(id);
        model.addAttribute("song", song);

        return TEMPLATE_PREFIX + "edit";
    }

    @RequiresPermissions("ent:music:song:edit")
    @Log("更新歌曲")
    @PostMapping("/update")
    @ResponseBody
    Result update(SongEntity song) {
        song.setUpdateBy(getUserId());
        if (songService.update(song) > 0) {
            return Result.ok();
        }
        return Result.error();
    }

    @GetMapping("/info/{id}")
    @RequiresPermissions("ent:music:song:song")
    String info(@PathVariable("id") int songId, Model model) {
        SongVO song = songService.get(songId);
        model.addAttribute("song", song);

        AlbumEntity album = albumService.get(song.getAlbumId());
        model.addAttribute("album", album);

        return TEMPLATE_PREFIX + "info";
    }

}
