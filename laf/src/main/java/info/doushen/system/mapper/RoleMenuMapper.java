package info.doushen.system.mapper;

import java.util.List;
import java.util.Map;

/**
 * RoleMenuMapper
 *
 * @author huangdou
 * @date 2018/12/6
 */
public interface RoleMenuMapper {

    /**
     * 获取角色菜单权限
     *
     * @param roleId
     * @return
     */
    List<Integer> listMenuIdByRoleId(Integer roleId);

    /**
     * 删除角色所有菜单权限
     *
     * @param roleId
     */
    void deleteByRoleId(int roleId);

    /**
     * 批量插入角色菜单权限关联关系
     *
     * @param params
     */
    void batchInsert(Map<String, Object> params);

    /**
     * 为超级管理员分配菜单
     *
     * @param params
     * @return
     */
    int insertForAdmin(Map<String, Integer> params);

    /**
     * 根据菜单id删除权限
     *
     * @param menuId
     * @return
     */
    int removeByMenuId(int menuId);

}
