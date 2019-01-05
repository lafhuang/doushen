package info.doushen.ent.music.controller;

import info.doushen.common.Result;
import info.doushen.common.annotation.Log;
import info.doushen.common.controller.BaseController;
import info.doushen.common.utils.PageUtils;
import info.doushen.common.utils.Query;
import info.doushen.ent.music.biz.AlbumService;
import info.doushen.ent.music.biz.SongService;
import info.doushen.ent.music.entity.AlbumEntity;
import info.doushen.ent.music.entity.SongEntity;
import info.doushen.ent.music.vo.SongVO;
import info.doushen.system.biz.DictService;
import info.doushen.system.entity.DictEntity;
import org.apache.commons.lang3.StringUtils;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;
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

    @Autowired
    private DictService dictService;

    @GetMapping()
    @RequiresPermissions("ent:music:song:song")
    String song(Model model) {
        return TEMPLATE_PREFIX + "song";
    }

    @ResponseBody
    @GetMapping("/list")
    @RequiresPermissions("ent:music:song:song")
    PageUtils list(@RequestParam Map<String, Object> params) {
        Query query = new Query(params);
        PageUtils pageSong = songService.pageSongList(query);
        return pageSong;
    }

    @RequiresPermissions("ent:music:song:add")
    @Log("添加歌曲")
    @GetMapping("/add")
    String add(Model model) {
        List<DictEntity> languageList = dictService.queryDictByType("album_language");
        model.addAttribute("languageList", languageList);

        List<DictEntity> audiolList = dictService.queryDictByType("audio_type");
        model.addAttribute("audioList", audiolList);
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

        List<DictEntity> languageList = dictService.queryDictByType("album_language");
        model.addAttribute("languageList", languageList);

        List<DictEntity> audiolList = dictService.queryDictByType("audio_type");
        model.addAttribute("audioList", audiolList);

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

        List<DictEntity> audiolList = dictService.queryDictByType("audio_type");
        for (DictEntity dict : audiolList) {
            if (StringUtils.equals(dict.getDictValue(), song.getAudioType())) {
                model.addAttribute("audioType", dict.getDictName());
            }
        }

        return TEMPLATE_PREFIX + "info";
    }

}
