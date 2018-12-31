package info.doushen.ent.music.controller;

import info.doushen.common.Result;
import info.doushen.common.annotation.Log;
import info.doushen.common.controller.BaseController;
import info.doushen.common.utils.PageUtils;
import info.doushen.common.utils.Query;
import info.doushen.ent.music.biz.AlbumService;
import info.doushen.ent.music.biz.SingerService;
import info.doushen.ent.music.entity.AlbumEntity;
import info.doushen.ent.music.entity.SingerEntity;
import info.doushen.system.biz.DictService;
import info.doushen.system.entity.DictEntity;
import org.apache.commons.lang3.StringUtils;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

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
    private DictService dictService;

    @GetMapping()
    @RequiresPermissions("ent:music:singer:singer")
    String singer(Model model) {
        List<DictEntity> regionList = dictService.queryDictByType("singer_region");
        model.addAttribute("regionList", regionList);

        List<DictEntity> typeList = dictService.queryDictByType("singer_type");
        model.addAttribute("typeList", typeList);

        List<DictEntity> initialList = dictService.queryDictByType("singer_initial");
        model.addAttribute("initialList", initialList);

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
    String add(Model model) {

        List<DictEntity> regionList = dictService.queryDictByType("singer_region");
        model.addAttribute("regionList", regionList);

        List<DictEntity> typeList = dictService.queryDictByType("singer_type");
        model.addAttribute("typeList", typeList);

        List<DictEntity> initialList = dictService.queryDictByType("singer_initial");
        model.addAttribute("initialList", initialList);

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

        List<DictEntity> regionList = dictService.queryDictByType("singer_region");
        model.addAttribute("regionList", regionList);

        List<DictEntity> typeList = dictService.queryDictByType("singer_type");
        model.addAttribute("typeList", typeList);

        List<DictEntity> initialList = dictService.queryDictByType("singer_initial");
        model.addAttribute("initialList", initialList);

        StringBuffer region_type = new StringBuffer();
        for (DictEntity dict : regionList) {
            if (StringUtils.equals(dict.getDictValue(), singer.getRegion())) {
                region_type.append(dict.getDictName());
                break;
            }
        }

        for (DictEntity dict : typeList) {
            if (StringUtils.equals(dict.getDictValue(), singer.getType())) {
                region_type.append(dict.getDictName());
                break;
            }
        }

        model.addAttribute("region_type", region_type);

        Map<String, Object> params = new HashMap<>();
        params.put("limit", 5);
        params.put("offset", 0);

        params.put("singerId", singer.getId());

        Query query = new Query(params);
        PageUtils albumPage = albumService.pageAlbumList(query);

        model.addAttribute("albumPage", albumPage);
        model.addAttribute("songPage", new PageUtils(1000, new ArrayList<AlbumEntity>()));

        //model.addAttribute("songList", 100);
        // model.addAttribute("albumList", 100);

        return TEMPLATE_PREFIX + "info";
    }

    @RequiresPermissions("ent:music:singer:edit")
    @Log("编辑歌手")
    @GetMapping("/edit/{id}")
    String edit(Model model, @PathVariable("id") int id) {
        SingerEntity singer = singerService.get(id);
        model.addAttribute("singer", singer);

        List<DictEntity> regionList = dictService.queryDictByType("singer_region");
        model.addAttribute("regionList", regionList);

        List<DictEntity> typeList = dictService.queryDictByType("singer_type");
        model.addAttribute("typeList", typeList);

        List<DictEntity> initialList = dictService.queryDictByType("singer_initial");
        model.addAttribute("initialList", initialList);

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

}
