package info.doushen.system.biz.impl;

import info.doushen.common.utils.TreeUtils;
import info.doushen.system.biz.MenuService;
import info.doushen.system.biz.RoleMenuService;
import info.doushen.system.entity.MenuEntity;
import info.doushen.system.mapper.MenuMapper;
import info.doushen.system.utils.Tree;
import info.doushen.system.vo.MenuVO;
import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.dozer.DozerBeanMapper;
import org.dozer.Mapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

/**
 * MenuServiceImpl
 *
 * @author huangdou
 * @date 2018/12/4
 */
@Service
public class MenuServiceImpl implements MenuService {

    @Autowired
    private MenuMapper menuMapper;
    @Autowired
    private RoleMenuService roleMenuService;

    @Override
    public Set<String> queryUserPerms(int userId) {
        List<String> perms = menuMapper.queryUserPerms(userId);
        Set<String> permsSet = new HashSet<>();
        for (String perm : perms) {
            if (StringUtils.isNotBlank(perm)) {
                permsSet.addAll(Arrays.asList(perm.trim().split(",")));
            }
        }
        return permsSet;
    }

    @Override
    public List<Tree<MenuEntity>> queryUserMenuTree(int userId) {
        List<Tree<MenuEntity>> menuList = new ArrayList<>();
        List<MenuEntity> menuEntityList = menuMapper.queryMenuByUser(userId);
        if (CollectionUtils.isNotEmpty(menuEntityList)) {
            for (MenuEntity menuEntity : menuEntityList) {
                Tree<MenuEntity> tree = new Tree<>();
                tree.setId(String.valueOf(menuEntity.getId()));
                tree.setParentId(String.valueOf(menuEntity.getParentId()));
                tree.setText(menuEntity.getMenuName());
                Map<String, Object> attributes = new HashMap<>(16);
                attributes.put("url", menuEntity.getUrl());
                attributes.put("icon", menuEntity.getIcon());
                tree.setAttributes(attributes);
                menuList.add(tree);
            }
        }
        List<Tree<MenuEntity>> tree = TreeUtils.buildList(menuList, "0");
        return tree;
    }

    @Override
    public List<MenuEntity> list(Map<String, Object> params) {
        return menuMapper.list(params);
    }

    @Override
    public MenuEntity get(int id) {
        return menuMapper.get(id);
    }

    @Override
    @Transactional
    public int save(MenuEntity menu) {
        menuMapper.save(menu);
        // 默认给超级管理员分配菜单
        roleMenuService.saveForAdmin(menu.getId());
        return menu.getId();
    }

    @Override
    public int update(MenuEntity menu) {
        return menuMapper.update(menu);
    }

    @Override
    public List<MenuEntity> getMenuTree() {
        List<MenuEntity> menuList = menuMapper.list(new HashMap<>(16));
        return menuList;
    }

    @Override
    public List<MenuVO> getRoleMenu(int roleId) {
        List<MenuVO> roleMenuList = new ArrayList<>();

        // 根据roleId查询权限
        List<MenuEntity> menuList = menuMapper.list(new HashMap<>(16));
        List<Integer> menuIds = roleMenuService.listMenuIdByRoleId(roleId);

        Mapper mapper = new DozerBeanMapper();
        for (MenuEntity menu : menuList) {
            MenuVO menuVO = mapper.map(menu, MenuVO.class);
            if (menuIds.contains(menuVO.getId())) {
                menuVO.setChecked(true);
            }
            roleMenuList.add(menuVO);
        }

        return roleMenuList;
    }

    @Override
    public int remove(int id) {
        List<MenuEntity> menuList = menuMapper.querySubMenu(id);
        for (MenuEntity menu : menuList) {
            menuMapper.remove(menu.getId());
            roleMenuService.removeByMenuId(menu.getId());
        }
        return menuList.size();
    }

}
