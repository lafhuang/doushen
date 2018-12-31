package info.doushen.system.biz.impl;

import info.doushen.system.biz.RoleMenuService;
import info.doushen.system.biz.RoleService;
import info.doushen.system.biz.UserRoleService;
import info.doushen.system.entity.RoleEntity;
import info.doushen.system.mapper.RoleMapper;
import info.doushen.system.vo.RoleVO;
import org.apache.commons.collections.CollectionUtils;
import org.dozer.DozerBeanMapper;
import org.dozer.Mapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;

/**
 * RoleServiceImpl
 *
 * @author huangdou
 * @date 2018/12/6
 */
@Service
public class RoleServiceImpl implements RoleService {

    @Autowired
    private RoleMapper roleMapper;
    @Autowired
    private RoleMenuService roleMenuService;
    @Autowired
    private UserRoleService userRoleService;

    @Override
    public List<RoleEntity> list(Map<String, Object> params) {
        return roleMapper.list(params);
    }

    @Override
    public RoleEntity get(Integer id) {
        return roleMapper.get(id);
    }

    @Override
    @Transactional
    public int update(RoleVO role) {
        Mapper mapper = new DozerBeanMapper();
        int result = roleMapper.update(mapper.map(role, RoleEntity.class));
        roleMenuService.batchUpdate(role);
        return result;
    }

    @Override
    public List<RoleEntity> list(int userId) {
        List<Integer> rolesIds = userRoleService.listRoleId(userId);
        List<RoleEntity> roleList = roleMapper.list(new HashMap<>(16));
        for (RoleEntity role : roleList) {
            role.setRoleSign("false");
            for (Integer roleId : rolesIds) {
                if (Objects.equals(role.getId(), roleId)) {
                    role.setRoleSign("true");
                    break;
                }
            }
        }
        return roleList;
    }

    @Override
    @Transactional
    public int save(RoleVO role) {
        Mapper mapper = new DozerBeanMapper();
        RoleEntity roleEntity = mapper.map(role, RoleEntity.class);
        roleMapper.save(roleEntity);
        role.setId(roleEntity.getId());
        if (CollectionUtils.isNotEmpty(role.getMenuIdList())) {
            roleMenuService.batchUpdate(role);
        }
        return roleEntity.getId();
    }

    @Override
    public int remove(int id) {
        RoleVO role = new RoleVO();
        role.setId(id);
        roleMenuService.batchUpdate(role);
        return roleMapper.remove(id);
    }

    @Override
    public int batchremove(int[] roleIdList) {
        for (int roleId : roleIdList) {
            remove(roleId);
        }
        return roleIdList.length;
    }

}
