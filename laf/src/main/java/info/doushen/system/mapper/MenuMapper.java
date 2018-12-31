package info.doushen.system.mapper;

import info.doushen.system.entity.MenuEntity;

import java.util.List;
import java.util.Map;

/**
 * MenuMapper
 *
 * @author huangdou
 * @date 2018/12/4
 */
public interface MenuMapper {

    /**
     * 获取用户权限列表
     *
     * @param userId
     * @return
     */
    List<String> queryUserPerms(int userId);

    /**
     * 获取用户菜单列表
     *
     * @param userId
     * @return
     */
    List<MenuEntity> queryMenuByUser(int userId);

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
     * 保存菜单信息
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

}
