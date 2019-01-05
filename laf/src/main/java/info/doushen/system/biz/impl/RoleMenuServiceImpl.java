package info.doushen.system.biz.impl;

import info.doushen.system.biz.RoleMenuService;
import info.doushen.system.mapper.RoleMenuMapper;
import info.doushen.system.vo.RoleVO;
import org.apache.commons.collections.CollectionUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * RoleMenuServiceImpl
 *
 * @author huangdou
 * @date 2018/12/6
 */
@Service
public class RoleMenuServiceImpl implements RoleMenuService {

    @Autowired
    private RoleMenuMapper roleMenuMapper;

    @Override
    public List<Integer> listMenuIdByRoleId(Integer roleId) {
        return roleMenuMapper.listMenuIdByRoleId(roleId);
    }

    @Override
    @Transactional
    public void batchUpdate(RoleVO role) {
        roleMenuMapper.deleteByRoleId(role.getId());
        if (CollectionUtils.isNotEmpty(role.getMenuIdList())) {
            Map<String, Object> params = new HashMap<>();
            params.put("roleId", role.getId());
            params.put("menuIdList", role.getMenuIdList());
            roleMenuMapper.batchInsert(params);
        }
    }

    @Override
    public int saveForAdmin(int menuId) {
        Map<String, Integer> params = new HashMap<>();
        params.put("roleId", 1);
        params.put("menuId", menuId);
        return roleMenuMapper.insertForAdmin(params);
    }

    @Override
    public int removeByMenuId(int menuId) {
        return roleMenuMapper.removeByMenuId(menuId);
    }

}
