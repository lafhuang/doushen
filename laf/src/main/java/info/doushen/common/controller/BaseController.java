package info.doushen.common.controller;

import info.doushen.common.utils.ShiroUtils;
import info.doushen.system.entity.UserEntity;
import org.springframework.stereotype.Controller;

/**
 * BaseController
 *
 * @author huangdou
 * @date 2018/12/4
 */
@Controller
public class BaseController {

    public UserEntity getUser() {
        return ShiroUtils.getUser();
    }

    public int getUserId() {
        return getUser().getId();
    }

    public String getUserName() {
        return getUser().getUserName();
    }

}
