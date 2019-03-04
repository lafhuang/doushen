package info.doushen.common.controller;

import info.doushen.common.annotation.Log;
import info.doushen.system.biz.MenuService;
import info.doushen.system.entity.MenuEntity;
import info.doushen.system.utils.Tree;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

/**
 * MainController
 *
 * @author huangdou
 * @date 2018/12/5
 */
@Controller
public class MainController extends BaseController {

    @Autowired
    private MenuService menuService;

    @GetMapping({ "/", "", "/index" })
    String welcome(Model model) {
        List<Tree<MenuEntity>> menus = menuService.queryUserMenuTree(getUserId());
        model.addAttribute("menus", menus);
        model.addAttribute("name", getUser().getName());
        /*
        FileDO fileDO = fileService.get(getUser().getPicId());
        if(fileDO!=null&&fileDO.getUrl()!=null){
            if(fileService.isExist(fileDO.getUrl())){
                model.addAttribute("picUrl",fileDO.getUrl());
            }else {
                model.addAttribute("picUrl","/img/photo_s.jpg");
            }
        }else {
            model.addAttribute("picUrl","/img/photo_s.jpg");
        }
        */
        model.addAttribute("username", getUser().getUserName());
        return "index";
    }

    @GetMapping("/main")
    String main() {
        return "main";
    }

}
