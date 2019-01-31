package info.doushen.system.controller;

import info.doushen.common.Constant;
import info.doushen.common.Result;
import info.doushen.common.annotation.Log;
import info.doushen.common.controller.BaseController;
import info.doushen.common.redis.RedisUtil;
import info.doushen.common.utils.Pager;
import info.doushen.common.utils.Query;
import info.doushen.system.biz.DictService;
import info.doushen.system.entity.DictEntity;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

/**
 * DictController
 *
 * @author huangdou
 * @date 2018/12/12
 */
@Controller
@RequestMapping("/system/dict")
public class DictController extends BaseController {

    public static final String TEMPLATE_PREFIX = "system/dict/";

    @Autowired
    private DictService dictService;

    @GetMapping()
    @RequiresPermissions("system:dict:dict")
    String dict() {
        return TEMPLATE_PREFIX + "dict";
    }

    @GetMapping("/type")
    @ResponseBody
    @RequiresPermissions("system:dict:dict")
    public List<DictEntity> listType() {
        return dictService.listType();
    }

    @ResponseBody
    @GetMapping("/list")
    @RequiresPermissions("system:dict:dict")
    public Pager list(@RequestParam Map<String, Object> params) {
        // 查询列表数据
        Query query = new Query(params);
        Pager pageDict = dictService.pageDictList(query);
        return pageDict;
    }

    @GetMapping("/add")
    @RequiresPermissions("system:dict:add")
    public String add() {
        return TEMPLATE_PREFIX + "add";
    }

    @ResponseBody
    @PostMapping("/save")
    @RequiresPermissions("system:dict:add")
    public Result save(DictEntity dict) {
        dict.setCreateBy(getUserId());
        if (dictService.save(dict) > 0) {
            return Result.ok();
        }
        return Result.error();
    }

    @GetMapping("/edit/{id}")
    @RequiresPermissions("system:dict:edit")
    String edit(@PathVariable("id") int id, Model model) {
        DictEntity dict = dictService.get(id);
        model.addAttribute("dict", dict);
        return TEMPLATE_PREFIX + "edit";
    }

    @PostMapping("/remove")
    @ResponseBody
    @RequiresPermissions("system:dict:remove")
    public Result remove(int id) {
        if (dictService.remove(id) > 0) {
            return Result.ok();
        }
        return Result.error();
    }

    @ResponseBody
    @PostMapping("/batchRemove")
    @RequiresPermissions("system:dict:batchRemove")
    public Result batchRemove(@RequestParam("ids[]") int[] dictIdList) {
        int result = dictService.batchremove(dictIdList);
        if (result > 0) {
            return Result.ok();
        }
        return Result.error();
    }

    @GetMapping("/add/{type}")
    @RequiresPermissions("system:dict:add")
    String addD(Model model, @PathVariable("type") String type) {
        model.addAttribute("type", type);
        return TEMPLATE_PREFIX + "add";
    }

    @Log("更新字典")
    @RequiresPermissions("system:dict:edit")
    @PostMapping("/update")
    @ResponseBody
    Result update(DictEntity dict) {
        dict.setUpdateBy(getUserId());
        if (dictService.update(dict) > 0) {
            return Result.ok();
        } else {
            return Result.error(1, "更新失败");
        }
    }

    @GetMapping("/list/{type}")
    @ResponseBody
    public List<DictEntity> listType(@PathVariable("type") String type) {
        List dictList = RedisUtil.listGet(Constant.DICT_CACHE_PREFIX + type, 0, -1);
        return dictService.queryDictByType(type);
    }

}
