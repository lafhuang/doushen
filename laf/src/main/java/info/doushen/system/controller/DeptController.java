package info.doushen.system.controller;

import info.doushen.common.Result;
import info.doushen.common.controller.BaseController;
import info.doushen.system.biz.DeptService;
import info.doushen.system.entity.DeptEntity;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * DeptController
 *
 * @author huangdou
 * @date 2018/12/5
 */
@Controller
@RequestMapping("/system/dept")
public class DeptController extends BaseController {

    public static final String TEMPLATE_PREFIX = "system/dept/";

    @Autowired
    private DeptService deptService;

    @GetMapping()
    @RequiresPermissions("system:dept:dept")
    String dept() {
        return TEMPLATE_PREFIX + "dept";
    }

    @ResponseBody
    @GetMapping("/list")
    @RequiresPermissions("system:dept:dept")
    public List<DeptEntity> list() {
        Map<String, Object> params = new HashMap<>(16);
        List<DeptEntity> deptList = deptService.list(params);
        return deptList;
    }

    @GetMapping("/add/{pId}")
    @RequiresPermissions("system:dept:add")
    String add(@PathVariable("pId") int pId, Model model) {
        model.addAttribute("pId", pId);
        if (pId == 0) {
            model.addAttribute("pName", "总部");
        } else {
            model.addAttribute("pName", deptService.get(pId).getDeptName());
        }
        return  TEMPLATE_PREFIX + "add";
    }

    @ResponseBody
    @PostMapping("/save")
    @RequiresPermissions("system:dept:add")
    public Result save(DeptEntity dept) {
        dept.setCreateBy(getUserId());
        if (deptService.save(dept) > 0) {
            return Result.ok();
        }
        return Result.error();
    }

    @GetMapping("/tree")
    @ResponseBody
    public List<DeptEntity> tree() {
        return deptService.getDeptTree();
    }

    @GetMapping("/treeView")
    String treeView() {
        return  TEMPLATE_PREFIX + "deptTree";
    }

}
