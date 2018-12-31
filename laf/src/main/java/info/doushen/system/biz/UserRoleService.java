package info.doushen.system.biz;

import info.doushen.system.vo.UserVO;

import java.util.List;

/**
 * UserRoleService
 *
 * @author huangdou
 * @date 2018-12-07
 */
public interface UserRoleService {

    /**
     * 获取用户对应角色列表
     *
     * @param userId
     * @return
     */
    List<Integer> listRoleId(int userId);

    /**
     * 批量更新用户角色
     *
     * @param user
     */
    void batchUpdate(UserVO user);

}
