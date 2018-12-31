package info.doushen.system.controller;

import info.doushen.common.Result;
import info.doushen.common.annotation.Log;
import info.doushen.common.controller.BaseController;
import info.doushen.common.utils.MD5Utils;
import info.doushen.common.utils.PageUtils;
import info.doushen.common.utils.Query;
import info.doushen.system.biz.RoleService;
import info.doushen.system.biz.UserService;
import info.doushen.system.entity.RoleEntity;
import info.doushen.system.vo.UserVO;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * UserController
 *
 * @author huangdou
 * @date 2018/12/5
 */
@Controller
@RequestMapping("/system/user")
public class UserController extends BaseController {

    public static final String TEMPLATE_PREFIX = "system/user/";

    @Autowired
    private UserService userService;
    @Autowired
    private RoleService roleService;

    @RequiresPermissions("system:user:user")
    @GetMapping("")
    String user() {
        return TEMPLATE_PREFIX + "user";
    }

    @GetMapping("/list")
    @ResponseBody
    PageUtils list(@RequestParam Map<String, Object> params) {
        // 查询列表数据
        Query query = new Query(params);
        PageUtils userPage = userService.pageUserList(query);
        return userPage;
    }

    @RequiresPermissions("system:user:edit")
    @Log("编辑用户")
    @GetMapping("/edit/{id}")
    String edit(Model model, @PathVariable("id") int id) {
        UserVO user = userService.get(id);
        model.addAttribute("user", user);
        List<RoleEntity> roles = roleService.list(id);
        model.addAttribute("roles", roles);
        return TEMPLATE_PREFIX + "edit";
    }

    @RequiresPermissions("system:user:edit")
    @Log("更新用户")
    @PostMapping("/update")
    @ResponseBody
    Result update(UserVO user) {
        user.setUpdateBy(getUserId());
        if (userService.update(user) > 0) {
            return Result.ok();
        }
        return Result.error();
    }

    @RequiresPermissions("system:user:add")
    @Log("添加用户")
    @GetMapping("/add")
    String add(Model model) {
        List<RoleEntity> roles = roleService.list(new HashMap<>());
        model.addAttribute("roles", roles);
        return TEMPLATE_PREFIX + "add";
    }

    @GetMapping("/personal")
    String personal(Model model) {
        UserVO user  = userService.get(getUserId());
        model.addAttribute("user", user);
        return TEMPLATE_PREFIX + "personal";
    }

    @RequiresPermissions("system:user:add")
    @Log("保存用户")
    @PostMapping("/save")
    @ResponseBody
    Result save(UserVO user) {
        user.setCreateBy(getUserId());
        user.setPassword(MD5Utils.encrypt(user.getUserName(), user.getPassword()));
        if (userService.save(user) > 0) {
            return Result.ok();
        }
        return Result.error();
    }

    @PostMapping("/exist")
    @ResponseBody
    boolean exit(@RequestParam Map<String, Object> params) {
        // 存在，不通过，false
        return !userService.exist(params);
    }

    @RequiresPermissions("system:user:remove")
    @Log("删除用户")
    @PostMapping("/remove")
    @ResponseBody
    Result remove(int id) {
        if (userService.remove(id) > 0) {
            return Result.ok();
        }
        return Result.error();
    }

    @RequiresPermissions("system:user:batchRemove")
    @Log("批量删除用户")
    @PostMapping("/batchRemove")
    @ResponseBody
    Result batchRemove(@RequestParam("ids[]") int[] userIds) {
        int result = userService.batchremove(userIds);
        if (result > 0) {
            return Result.ok();
        }
        return Result.error();
    }

    @RequiresPermissions("system:user:resetPwd")
    @Log("请求更改用户密码")
    @GetMapping("/resetPwd/{id}")
    String resetPwd(@PathVariable("id") int userId, Model model) {
        UserVO user = new UserVO();
        user.setId(userId);
        model.addAttribute("user", user);
        return TEMPLATE_PREFIX + "reset_pwd";
    }

    @Log("提交更改用户密码")
    @PostMapping("/resetPwd")
    @ResponseBody
    Result resetPwd(UserVO userVO) {
        try{
            userVO.setUpdateBy(getUserId());
            userService.resetPwd(userVO, getUser());
            return Result.ok();
        } catch (Exception e){
            return Result.error(1,e.getMessage());
        }

    }

    @RequiresPermissions("system:user:resetPwd")
    @Log("admin提交更改用户密码")
    @PostMapping("/adminResetPwd")
    @ResponseBody
    Result adminResetPwd(UserVO userVO) {
        try{
            userVO.setUpdateBy(getUserId());
            userService.adminResetPwd(userVO);
            return Result.ok();
        } catch (Exception e){
            return Result.error(1,e.getMessage());
        }
    }

}
