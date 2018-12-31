package info.doushen.system.biz;

import info.doushen.common.utils.PageUtils;
import info.doushen.common.utils.Query;
import info.doushen.system.entity.UserEntity;
import info.doushen.system.vo.UserVO;

import java.util.Map;

/**
 * UserService
 *
 * @author huangdou
 * @date 2018/12/4
 */
public interface UserService {

    /**
     * 根据登录账户查询用户
     *
     * @param userName
     * @return
     */
    UserEntity getUserByUserName(String userName);

    /**
     * 分页查询用户
     *
     * @param query
     * @return
     */
    PageUtils pageUserList(Query query);

    /**
     * 获取用户信息
     *
     * @param id
     * @return
     */
    UserVO get(int id);

    /**
     * 更新用户
     *
     * @param user
     * @return
     */
    int update(UserVO user);

    /**
     * 保存用户
     *
     * @param user
     * @return
     */
    int save(UserVO user);

    /**
     * 判断用户名是否存在
     *
     * @param params
     * @return
     */
    boolean exist(Map<String, Object> params);

    /**
     * 删除用户
     *
     * @param id
     * @return
     */
    int remove(int id);

    /**
     * 批量删除用户
     *
     * @param userIds
     * @return
     */
    int batchremove(int[] userIds);

    /**
     * 重置密码
     *
     * @param userVO
     * @param user
     */
    int resetPwd(UserVO userVO, UserEntity user) throws Exception ;

    /**
     * 管理员重置用户密码
     *
     * @param userVO
     * @return
     */
    int adminResetPwd(UserVO userVO);

}
