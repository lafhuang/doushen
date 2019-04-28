package info.doushen.ent.video.controller;

import info.doushen.common.Result;
import info.doushen.common.annotation.Log;
import info.doushen.common.controller.BaseController;
import info.doushen.common.utils.Pager;
import info.doushen.common.utils.Query;
import info.doushen.ent.video.biz.MovieService;
import info.doushen.ent.video.entity.MovieEntity;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

/**
 * MovieController
 *
 * @Author: huangdou
 * @Date: 2019-02-19
 */
@Controller
@RequestMapping("/ent/video/movie")
public class MovieController extends BaseController {

    public static final String TEMPLATE_PREFIX = "ent/video/movie/";

    @Autowired
    private MovieService movieService;

    @GetMapping()
    @RequiresPermissions("ent:video:movie:movie")
    String movie() {
        return TEMPLATE_PREFIX + "movie";
    }

    @ResponseBody
    @GetMapping("/list")
    @RequiresPermissions("ent:video:movie:movie")
    Pager list(@RequestParam Map<String, Object> params) {
        Query query = new Query(params);
        Pager pageMovie = movieService.pageMovieList(query);
        return pageMovie;
    }

    //@RequiresPermissions("ent:video:movie:add")
    @Log("添加电影")
    @GetMapping("/add")
    String add() {
        return TEMPLATE_PREFIX + "add";
    }

    @RequiresPermissions("ent:video:movie:add")
    @Log("保存电影")
    @PostMapping("/save")
    @ResponseBody
    Result save(MovieEntity movie) {
        movie.setCreateBy(getUserId());
        if (movieService.save(movie) > 0) {
            return Result.ok();
        }
        return Result.error();
    }

    @GetMapping("/info/{id}")
    @RequiresPermissions("ent:video:movie:movie")
    String info(@PathVariable("id") int movieId, Model model) {
        MovieEntity movie = movieService.get(movieId);
        model.addAttribute("movie", movie);
        return TEMPLATE_PREFIX + "info";
    }

}
