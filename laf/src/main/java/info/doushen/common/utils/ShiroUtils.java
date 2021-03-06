package info.doushen.common.utils;

import info.doushen.system.entity.UserEntity;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.subject.Subject;

/**
 * ShiroUtils
 *
 * @author huangdou
 * @date 2018/12/4
 */
public class ShiroUtils {

    public static Subject getSubjct() {
        return SecurityUtils.getSubject();
    }

    public static UserEntity getUser() {
        Object object = getSubjct().getPrincipal();
        return (UserEntity)object;
    }

    public static int getUserId() {
        return getUser().getId();
    }

    public static void logout() {
        getSubjct().logout();
    }

}
