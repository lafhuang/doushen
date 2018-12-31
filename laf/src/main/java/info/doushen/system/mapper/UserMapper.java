package info.doushen.system.mapper;

import info.doushen.common.utils.Query;
import info.doushen.system.entity.UserEntity;

import java.util.List;

/**
 * UserMapper
 *
 * @author huangdou
 * @date 2018/12/4
 */
public interface UserMapper {

    /**
     * 根据登录账户获取用户
     *
     * @param userName
     * @return
     */
    UserEntity getUserByUserName(String userName);

    /**
     * 用户记录数
     *
     * @param query
     * @return
     */
    int count(Query query);

    /**
     * 用户列表
     *
     * @param query
     * @return
     */
    List<UserEntity> list(Query query);

    /**
     * 获取用户信息
     *
     * @param id
     * @return
     */
    UserEntity get(int id);

    /**
     * 更新用户信息
     *
     * @param user
     * @return
     */
    int update(UserEntity user);

    /**
     * 保存用户
     *
     * @param user
     */
    void save(UserEntity user);

    /**
     * 删除用户
     *
     * @param id
     * @return
     */
    int remove(int id);

}
