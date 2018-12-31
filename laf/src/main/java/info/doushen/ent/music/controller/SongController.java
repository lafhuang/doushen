package info.doushen.ent.music.controller;

import info.doushen.common.controller.BaseController;
import info.doushen.ent.music.biz.SongService;
import info.doushen.system.entity.DictEntity;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

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

    @GetMapping()
    @RequiresPermissions("ent:music:song:song")
    String song(Model model) {
        return TEMPLATE_PREFIX + "song";
    }

}
