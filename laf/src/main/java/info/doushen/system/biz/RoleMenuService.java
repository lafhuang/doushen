package info.doushen.system.biz;

import info.doushen.system.vo.RoleVO;

import java.util.List;

/**
 * RoleMenuService
 *
 * @author huangdou
 * @date 2018/12/6
 */
public interface RoleMenuService {

    /**
     * 获取角色所有菜单权限
     *
     * @param roleId
     * @return
     */
    List<Integer> listMenuIdByRoleId(Integer roleId);

    /**
     * 批量更新角色菜单权限
     *
     * @param role
     */
    void batchUpdate(RoleVO role);

    /**
     * 为超级管理员分配菜单
     *
     * @param menuId
     * @return
     */
    int saveForAdmin(int menuId);

}
