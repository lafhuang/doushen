package info.doushen.system.controller;

import info.doushen.common.Result;
import info.doushen.common.annotation.Log;
import info.doushen.common.controller.BaseController;
import info.doushen.system.biz.MenuService;
import info.doushen.system.entity.MenuEntity;
import info.doushen.system.vo.MenuVO;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

/**
 * MenuController
 *
 * @author huangdou
 * @date 2018/12/5
 */
@Controller
@RequestMapping("/system/menu")
public class MenuController extends BaseController {

    public static final String TEMPLATE_PREFIX = "system/menu/";

    @Autowired
    private MenuService menuService;

    @RequiresPermissions("system:menu:menu")
    @GetMapping()
    String menu(Model model) {
        return TEMPLATE_PREFIX + "menu";
    }

    @RequiresPermissions("system:menu:menu")
    @RequestMapping("/list")
    @ResponseBody
    List<MenuEntity> list(@RequestParam Map<String, Object> params) {
        List<MenuEntity> menus = menuService.list(params);
        return menus;
    }

    @Log("添加菜单")
    @RequiresPermissions("system:menu:add")
    @GetMapping("/add/{pId}")
    String add(Model model, @PathVariable("pId") int pId) {
        model.addAttribute("pId", pId);
        if (pId == 0) {
            model.addAttribute("pName", "菜单权限");
        } else {
            model.addAttribute("pName", menuService.get(pId).getMenuName());
        }
        return TEMPLATE_PREFIX + "add";
    }

    @Log("保存菜单")
    @RequiresPermissions("system:menu:add")
    @PostMapping("/save")
    @ResponseBody
    Result save(MenuEntity menu) {
        menu.setCreateBy(getUserId());
        if (menuService.save(menu) > 0) {
            return Result.ok();
        } else {
            return Result.error(1, "保存失败");
        }
    }

    @Log("编辑菜单")
    @RequiresPermissions("system:menu:edit")
    @GetMapping("/edit/{id}")
    String edit(Model model, @PathVariable("id") int id) {
        MenuEntity menu = menuService.get(id);
        int pId = menu.getParentId();
        model.addAttribute("pId", pId);
        if (pId == 0) {
            model.addAttribute("pName", "根目录");
        } else {
            model.addAttribute("pName", menuService.get(pId).getMenuName());
        }
        model.addAttribute("menu", menu);
        return TEMPLATE_PREFIX + "edit";
    }

    @Log("更新菜单")
    @RequiresPermissions("system:menu:edit")
    @PostMapping("/update")
    @ResponseBody
    Result update(MenuEntity menu) {
        menu.setUpdateBy(getUserId());
        if (menuService.update(menu) > 0) {
            return Result.ok();
        } else {
            return Result.error(1, "更新失败");
        }
    }

    @GetMapping("/tree")
    @ResponseBody
    List<MenuEntity> tree() {
        List<MenuEntity>  tree = menuService.getMenuTree();
        return tree;
    }

    @GetMapping("/tree/{roleId}")
    @ResponseBody
    List<MenuVO> tree(@PathVariable("roleId") int roleId) {
        List<MenuVO> menuList = menuService.getRoleMenu(roleId);
        return menuList;
    }

}
