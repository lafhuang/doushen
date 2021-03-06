package info.doushen.system.controller;

import com.github.pagehelper.PageInfo;
import info.doushen.common.Result;
import info.doushen.common.annotation.Log;
import info.doushen.common.controller.BaseController;
import info.doushen.common.utils.Pager;
import info.doushen.common.utils.Query;
import info.doushen.system.biz.RoleService;
import info.doushen.system.entity.DictEntity;
import info.doushen.system.entity.RoleEntity;
import info.doushen.system.vo.RoleVO;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

/**
 * RoleController
 *
 * @author huangdou
 * @date 2018/12/6
 */
@Controller
@RequestMapping("/system/role")
public class RoleController extends BaseController {

    public static final String TEMPLATE_PREFIX = "system/role/";

    @Autowired
    private RoleService roleService;

    @RequiresPermissions("system:role:role")
    @GetMapping("")
    String role() {
        return TEMPLATE_PREFIX + "role";
    }

    @RequiresPermissions("system:role:role")
    @GetMapping("/list")
    @ResponseBody()
    Pager list(@RequestParam Map<String, Object> params) {
        Query query = new Query(params);
        PageInfo<RoleEntity> pageRole = roleService.pageRoleList(query);
        return new Pager(pageRole.getTotal(), pageRole.getList());
    }

    @Log("编辑角色")
    @RequiresPermissions("system:role:edit")
    @GetMapping("/edit/{id}")
    String edit(@PathVariable("id") Integer id, Model model) {
        RoleEntity role = roleService.get(id);
        model.addAttribute("role", role);
        return TEMPLATE_PREFIX + "edit";
    }

    @Log("更新角色")
    @RequiresPermissions("system:role:edit")
    @PostMapping("/update")
    @ResponseBody()
    Result update(RoleVO role) {
        role.setUpdateBy(getUserId());
        if (roleService.update(role) > 0) {
            return Result.ok();
        } else {
            return Result.error(1, "保存失败");
        }
    }

    @Log("添加角色")
    @RequiresPermissions("system:role:add")
    @GetMapping("/add")
    String add() {
        return TEMPLATE_PREFIX + "add";
    }

    @Log("保存角色")
    @RequiresPermissions("system:role:add")
    @PostMapping("/save")
    @ResponseBody()
    Result save(RoleVO role) {
        role.setCreateBy(getUserId());
        if (roleService.save(role) > 0) {
            return Result.ok();
        } else {
            return Result.error(1, "保存失败");
        }
    }

    @Log("删除角色")
    @RequiresPermissions("system:role:remove")
    @PostMapping("/remove")
    @ResponseBody()
    Result remove(int id) {
        if (roleService.remove(id) > 0) {
            return Result.ok();
        } else {
            return Result.error(1, "删除失败");
        }
    }

    @RequiresPermissions("system:role:batchRemove")
    @Log("批量删除角色")
    @PostMapping("/batchRemove")
    @ResponseBody
    Result batchRemove(@RequestParam("ids[]") int[] roleIdList) {
        int result = roleService.batchremove(roleIdList);
        if (result > 0) {
            return Result.ok();
        }
        return Result.error();
    }

}
