package info.doushen.system.biz;

import info.doushen.system.entity.MenuEntity;
import info.doushen.system.utils.Tree;
import info.doushen.system.vo.MenuVO;

import java.util.List;
import java.util.Map;
import java.util.Set;

/**
 * MenuService
 *
 * @author huangdou
 * @date 2018/12/4
 */
public interface MenuService {

    /**
     * 获取用户权限集合
     *
     * @param userId
     * @return
     */
    Set<String> queryUserPerms(int userId);

    /**
     * 获取用户权限树集合
     *
     * @param userId
     * @return
     */
    List<Tree<MenuEntity>> queryUserMenuTree(int userId);

    /**
     * 获取菜单列表
     *
     * @param params
     * @return
     */
    List<MenuEntity> list(Map<String, Object> params);

    /**
     * 获取菜单信息
     *
     * @param id
     * @return
     */
    MenuEntity get(int id);

    /**
     * 保存菜单
     *
     * @param menu
     * @return
     */
    int save(MenuEntity menu);

    /**
     * 更新菜单
     *
     * @param menu
     * @return
     */
    int update(MenuEntity menu);

    /**
     * 获取菜单树
     *
     * @return
     */
    List<MenuEntity> getMenuTree();

    /**
     * 获取角色权限树
     *
     * @param roleId
     * @return
     */
    List<MenuVO> getRoleMenu(int roleId);

    /**
     * 删除菜单
     *
     * @param id
     * @return
     */
    int remove(int id);

}
