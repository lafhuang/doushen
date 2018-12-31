package info.doushen.system.mapper;

import java.util.List;
import java.util.Map;

/**
 * UserRoleMapper
 *
 * @author huangdou
 * @date 2018-12-07
 */
public interface UserRoleMapper {

    /**
     * 获取用户对应角色列表
     *
     * @param userId
     * @return
     */
    List<Integer> listRoleId(int userId);

    /**
     * 删除用户角色关联关系
     *
     * @param userId
     */
    void deleteByUserId(int userId);

    /**
     * 批量插入用户角色关联关系
     *
     * @param params
     */
    void batchInsert(Map<String, Object> params);

}
