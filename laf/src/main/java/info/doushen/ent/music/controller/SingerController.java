package info.doushen.ent.music.controller;

import com.fasterxml.jackson.databind.JavaType;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.github.pagehelper.PageInfo;
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
import info.doushen.ent.music.vo.SongVO;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * SingerController
 *
 * @author huangdou
 * @date 2018/12/5
 */
@Controller
@RequestMapping("/ent/music/singer")
public class SingerController extends BaseController {

    public static final String TEMPLATE_PREFIX = "ent/music/singer/";

    @Autowired
    private SingerService singerService;

    @Autowired
    private AlbumService albumService;

    @Autowired
    private SongService songService;

    @GetMapping()
    @RequiresPermissions("ent:music:singer:singer")
    String singer() {
        return TEMPLATE_PREFIX + "singer";
    }

    @ResponseBody
    @PostMapping("/list")
    @RequiresPermissions("ent:music:singer:singer")
    List<SingerEntity> list(@RequestBody Map<String, Object> params) {
        List<SingerEntity> singerList = singerService.list(params);
        return singerList;
    }

    @RequiresPermissions("ent:music:singer:add")
    @Log("添加歌手")
    @GetMapping("/add")
    String add() {
        return TEMPLATE_PREFIX + "add";
    }

    @RequiresPermissions("ent:music:singer:add")
    @Log("保存歌手")
    @PostMapping("/save")
    @ResponseBody
    Result save(SingerEntity singer) {
        singer.setCreateBy(getUserId());
        if (singerService.save(singer) > 0) {
            return Result.ok();
        }
        return Result.error();
    }

    @GetMapping("/info/{id}")
    @RequiresPermissions("ent:music:singer:singer")
    String info(@PathVariable("id") int singerId, Model model) {
        SingerEntity singer = singerService.get(singerId);
        model.addAttribute("singer", singer);

        Map<String, Object> albumParams = new HashMap<>();
        albumParams.put("limit", 10);
        albumParams.put("offset", 0);

        albumParams.put("singerId", String.valueOf(singerId));

        Query albumQuery = new Query(albumParams);
        PageInfo<AlbumEntity> albumPageInfo = albumService.pageAlbumList(albumQuery);
        Pager albumPage = new Pager(albumPageInfo.getTotal(), albumPageInfo.getList());

        model.addAttribute("albumPage", albumPage);

        Map<String, Object> songParams = new HashMap<>();
        songParams.put("limit", 20);
        songParams.put("offset", 0);

        songParams.put("singerId", String.valueOf(singerId));

        Query songQuery = new Query(songParams);
        PageInfo<SongVO> songPageInfo = songService.pageSongList(songQuery);
        Pager songPage = new Pager(songPageInfo.getTotal(), songPageInfo.getList());

        model.addAttribute("songPage", songPage);

        return TEMPLATE_PREFIX + "info";
    }

    @RequiresPermissions("ent:music:singer:edit")
    @Log("编辑歌手")
    @GetMapping("/edit/{id}")
    String edit(Model model, @PathVariable("id") int id) {
        SingerEntity singer = singerService.get(id);
        model.addAttribute("singer", singer);

        return TEMPLATE_PREFIX + "edit";
    }

    @RequiresPermissions("ent:music:singer:edit")
    @Log("更新歌手")
    @PostMapping("/update")
    @ResponseBody
    Result update(SingerEntity singer) {
        singer.setUpdateBy(getUserId());
        if (singerService.update(singer) > 0) {
            return Result.ok();
        }
        return Result.error();
    }

    @RequiresPermissions("ent:music:singer:importAlbum")
    @Log("歌手导入专辑")
    @GetMapping("/importAlbum/{id}")
    String importAlbum(Model model, @PathVariable("id") int id) {
        SingerEntity singer = singerService.get(id);
        model.addAttribute("singer", singer);
        return TEMPLATE_PREFIX + "import_album";
    }

    @RequiresPermissions("ent:music:singer:importAlbum")
    @Log("歌手专辑导入保存")
    @PostMapping("/saveAlbum")
    @ResponseBody
    Result saveAlbum(@RequestParam("albumList") String albums) {
        ObjectMapper mapper = new ObjectMapper();
        JavaType jt = mapper.getTypeFactory().constructParametricType(ArrayList.class, AlbumEntity.class);
        List<AlbumEntity> albumList = null;
        try {
            albumList = mapper.readValue(albums, jt);
            albumService.saveSingerAlbum(getUserId(), albumList);
        } catch (IOException e) {
            return Result.error();
        }
        return Result.ok();
    }

    @RequiresPermissions("ent:music:singer:importSong")
    @Log("歌手导入歌曲")
    @GetMapping("/importSong/{id}")
    String importSong(Model model, @PathVariable("id") int id) {
        SingerEntity singer = singerService.get(id);
        model.addAttribute("singer", singer);
        return TEMPLATE_PREFIX + "import_song";
    }

    @RequiresPermissions("ent:music:singer:importSong")
    @Log("歌手歌曲导入保存")
    @PostMapping("/saveSong")
    @ResponseBody
    Result saveSong(@RequestParam("songList") String songs) {
        ObjectMapper mapper = new ObjectMapper();
        JavaType jt = mapper.getTypeFactory().constructParametricType(ArrayList.class, SongVO.class);
        List<SongVO> songList = null;
        try {
            songList = mapper.readValue(songs, jt);
            songService.saveSingerSong(getUserId(), songList);
        } catch (IOException e) {
            return Result.error();
        }
        return Result.ok();
    }

}
